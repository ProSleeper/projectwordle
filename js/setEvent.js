"use strict";

import * as viewElem from "./viewElem.js";
import * as keyAnim from "./animation.js";
import * as mainLogic from "./logic.js";

let CUR_ROW = 1; //현재 작성 가능한 ROW
let CUR_COLUMN = 0; //현재 작성 가능한 COLUMN
let isGameOver = false; //게임 실패 체크
let isSuccess = false; //게임 성공 체크

//다시하기 버튼 등록
export function registRestartBtn() {
  const restartBtn = document.querySelector(".btn_close");
  restartBtn.addEventListener("click", () => {
    restart();
  });
}

//게임 데이터 초기화
function restart() {
  document.querySelector("#pop_info_1").style.display = "none";
  CUR_ROW = 1;
  CUR_COLUMN = 0;
  isGameOver = false;
  isSuccess = false;
  //updateWord();
  viewElem.drawBoard();
}

//키 입력 이벤트 등록
export function registKeyEvent() {
  const dq = (element) => document.querySelector(element);
  const body = dq("body");
  const inputKey = dq(".keyboard");
  console.log(inputKey);
  const board = dq(".board");

  const keyEvent = (event) => {
    console.log(event);
    if (isGameOver) {
      return;
    }
    const curRow = board.querySelectorAll(`.row${CUR_ROW} button`);

    switch (event.key) {
      case "Backspace":
        pushBackspace();
        break;
      case "Enter":
        pushEnter();
        break;
      default:
        pushAlphabet();
        break;
    }

    function pushBackspace() {
      if (CUR_COLUMN > 5) {
        CUR_COLUMN = 5;
      } else if (CUR_COLUMN < 1) {
        CUR_COLUMN = 1;
      }
      const curBtn = curRow[CUR_COLUMN - 1];
      curBtn.innerHTML = "&nbsp";
      CUR_COLUMN--;
    }

    async function pushEnter() {
      if (CUR_COLUMN < 5) {
        return;
      }
      const curRowStr = [];
      curRow.forEach((element) => {
        curRowStr.push({ word: element.textContent, color: "#3A3A3C" });
      });

      const isCorrect = mainLogic.checkWord(curRowStr);
      await keyAnim.animationRow(curRow, curRowStr);

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
    }

    function pushAlphabet() {
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
    }
  };
  body.addEventListener("keydown", keyEvent);
  //inputKey.addEventListener("keydown", keyEvent);

  // js
  inputKey.addEventListener("click", function (e) {
    const ett = e.target.textContent;
    const eventKey = ett == "ENTER" ? "Enter" : ett == "BACK" ? "Backspace" : ett;

    // const pushKey = new KeyboardEvent("keydown", { key: eventKey });
    //console.log(pushKey);
    keyEvent({ key: eventKey });
  });
}


