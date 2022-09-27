"use strict";

import * as viewElem from "./viewElem.js";
import * as keyAnim from "./animation.js";
import * as mainLogic from "./logic.js";

let CUR_ROW = 1; //현재 작성 가능한 ROW
let CUR_COLUMN = 0; //현재 작성 가능한 COLUMN
let isGameOver = false; //게임 실패 체크
let isSuccess = false; //게임 성공 체크
let isAnimation = false;
const pushBtnMap = new Map();

//전체 이벤트 등록
export const registEvent = () => {
  RestartBtn();
  keyboardEvent();
  document.querySelector("body").addEventListener("keydown", keydownEvent);
  document.querySelector("body").addEventListener("keyup", keyupEvent);
};

//다시하기 버튼 등록
const RestartBtn = () => {
  const restartBtn = document.querySelector(".btn_close");
  restartBtn.addEventListener("click", () => {
    restart();
  });
};

//게임 데이터 초기화
const restart = () => {
  document.querySelector("#pop_info_1").style.display = "none";
  CUR_ROW = 1;
  CUR_COLUMN = 0;
  isGameOver = false;
  isSuccess = false;
  //updateWord();
  viewElem.drawBoard();
};

const keydownEvent = (event) => {
  if (isGameOver || isAnimation || isPushKeyCheck(event.key)) {
    return;
  }

  pushBtnMap.set(event.key, null);

  const curRow = document.querySelector(".board").querySelectorAll(`.row${CUR_ROW} button`);

  switch (event.key) {
    case "Backspace":
      pushBackspace(curRow);
      break;
    case "Enter":
      pushEnter(curRow);
      break;
    default:
      pushAlphabet(curRow, event);
      break;
  }
};

const keyupEvent = (event) => {
  pushBtnMap.delete(event.key);
};

const isPushKeyCheck = (key) => {
  return pushBtnMap.get(key) === undefined ? false : true;
};

//키 입력 이벤트 등록
export const keyboardEvent = () => {
  const inputKey = document.querySelector(".keyboard");

  inputKey.addEventListener("mouseup", (event) => {
    const keyText = event.target.textContent;
    const eventKey = keyText == "ENTER" ? "Enter" : keyText == "BACK" ? "Backspace" : keyText;
    keydownEvent({ key: eventKey });
    keyupEvent({ key: eventKey });
  });
};

const pushEnter = async (curRow) => {
  if (CUR_COLUMN < 5) {
    return;
  }
  isAnimation = true;
  const curRowStr = [];
  curRow.forEach((element) => {
    curRowStr.push({ word: element.textContent, color: "#3A3A3C" });
  });

  const isCorrect = mainLogic.checkWord(curRowStr);
  await keyAnim.animationRow(curRow, curRowStr).then(() => {
    isAnimation = false;
  });

  // console.time("버튼 회전");
  // await keyAnim.animationRow(curRow);
  // console.timeEnd("버튼 회전");
  //.then(() => console.log("모든 btn 애니메이션 종료 후 실행 됨"));

  if (isCorrect) {
    viewElem.viewResult("Success.", "inline");
    isSuccess = true;
    isGameOver = true;
  }

  CUR_ROW++;
  CUR_COLUMN = 0;
  if (CUR_ROW > 6) {
    if (isSuccess) {
      return;
    }
    viewElem.viewResult("Fail..", "inline");
    isGameOver = true;
  }
};

const pushAlphabet = (curRow, event) => {
  const checkKey = /^[a-zA-Z]$/gim;
  if (checkKey.test(event.key)) {
    //animation 부분?!
    if (CUR_COLUMN > 4) {
      return;
    } else if (CUR_COLUMN < 0) {
      CUR_COLUMN = 0;
    }
    const curBtn = curRow[CUR_COLUMN];

    curBtn.animate(keyAnim.KEYFRAMES.s, 100);

    curBtn.textContent = event.key.toUpperCase();
    CUR_COLUMN++;
  }
};

const pushBackspace = (curRow) => {
  if (CUR_COLUMN > 5) {
    CUR_COLUMN = 5;
  } else if (CUR_COLUMN < 1) {
    CUR_COLUMN = 1;
  }
  const curBtn = curRow[CUR_COLUMN - 1];
  curBtn.innerHTML = "&nbsp";
  CUR_COLUMN--;
};
