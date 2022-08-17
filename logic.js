"use strict";
window.addEventListener("load", () => {
  init();
});

let CUR_ROW = 1;            //현재 작성 가능한 ROW
let CUR_COLUMN = 0;         //현재 작성 가능한 COLUMN
let TODAY_WORDLE = "TWICE"; //오늘의 단어, 서버에서 받아오는 걸로 처리하면 나름 괜찮을 듯
let isGameOver = false;     //게임 실패 체크
let isSuccess = false;      //게임 성공 체크

//초기화
function init() {
  //updateWord();
  drawBoard();
  setEventListeners();
}

//게임화면 초기화
function drawBoard() {
  const BOARD_ROW = 6;
  const board = document.querySelector(".board");
  board.innerHTML = "";
  const makeRow = function (rowNumber) {
    return `
    <section class="row${rowNumber}">
        <button disabled="disabled">&nbsp;</button>
        <button disabled="disabled">&nbsp;</button>
        <button disabled="disabled">&nbsp;</button>
        <button disabled="disabled">&nbsp;</button>
        <button disabled="disabled">&nbsp;</button>
      </section>
    `;
  };
  for (let index = 0; index < BOARD_ROW; index++) {
    board.innerHTML += makeRow(index + 1);
  }
}

//이벤트 리스너 등록
function setEventListeners() {
  registKeyEvent();
  registRestartBtn();
}

//다시하기 버튼 등록
function registRestartBtn() {
  const restartBtn = document.querySelector(".btn_close");
  restartBtn.addEventListener("click", () => {
    restart();
  });
}

//키 입력 이벤트 등록
function registKeyEvent() {
  const body = document.querySelector("body");
  const board = document.querySelector(".board");
  body.addEventListener("keydown", (event) => {
    if (isGameOver) {
      return;
    }
    const curRow = board.querySelectorAll(`.row${CUR_ROW} button`);
    if (event.key == "Backspace") {
      if (CUR_COLUMN > 5) {
        CUR_COLUMN = 5;
      } else if (CUR_COLUMN < 1) {
        CUR_COLUMN = 1;
      }
      const curBtn = curRow[CUR_COLUMN - 1];
      curBtn.innerHTML = "&nbsp";
      CUR_COLUMN--;
    }

    const checkKey = /^[a-zA-Z]$/gim;
    if (checkKey.test(event.key)) {
      if (CUR_COLUMN > 4) {
        return;
      } else if (CUR_COLUMN < 0) {
        CUR_COLUMN = 0;
      }
      const curBtn = curRow[CUR_COLUMN];
      curBtn.textContent = event.key.toUpperCase();
      CUR_COLUMN++;
    }

    if (event.key == "Enter") {
      console.log(CUR_COLUMN);
      if (CUR_COLUMN < 5) {
        return;
      }

      if (checkWord(curRow)) {
        viewResult("성공했습니다.", "inline")
        isSuccess = true;
        isGameOver = true;
      }

      CUR_ROW++;
      CUR_COLUMN = 0;
      if (CUR_ROW > 6) {
        if (isSuccess) {
          return;
        }
        viewResult("실패했습니다..", "inline")
        isGameOver = true;
      }
    }
  });
}

//입력한 글자 검사.
function checkWord(curRow) {
  let arrTodayWord = [...TODAY_WORDLE];
  let arrInputWord = [];
  let isPerfect = false;
  curRow.forEach((element) => {
    arrInputWord.push(element.textContent);
  });

  isPerfect = checkMatch(arrInputWord , arrTodayWord, curRow);
  checkExist(arrInputWord , arrTodayWord, curRow);
  return isPerfect;
}

//자리와 글자 모두 일치 검사
function checkMatch(input, today, cur) {
  let MATCH_BG_COLOR = "#538D4E";
  let isAnswer = true;
  //match
  for (let i = 0; i < input.length; i++) {
    if (today[i] == input[i]) {
      cur[i].style.backgroundColor = MATCH_BG_COLOR;
      today[i] = "";
      input[i] = "";
      continue;
    }
    isAnswer = false;
  }

  return isAnswer;
}

//자리 일치 검사
function checkExist(input, today, cur) {
  let EXIST_BG_COLOR = "#B59F3B";
  //match
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < today.length; j++) {
      if (input[i] == "") {
        break;
      }

      if (input[i] == today[j]) {
        cur[i].style.backgroundColor = EXIST_BG_COLOR;
        today[j] = "";
        input[i] = "";
        break;
      }
    }
  }
}

//결과 화면 출력
function viewResult(message, visible) {
  setTimeout(() => {
    document.querySelector("#pop_info_1").style.display = visible;
    document.querySelector(".dsc").textContent = message;
  }, 500);
}

//게임 데이터 초기화
function restart() {
  document.querySelector("#pop_info_1").style.display = "none";
  CUR_ROW = 1;
  CUR_COLUMN = 0;
  isGameOver = false;
  isSuccess = false;
  //updateWord();
  drawBoard();
}

//서버에 요청해서 단어 받아오기
//당연하지만 서버가 켜져있어야하고, 요청을 처리 할 수 있어야 한다.
// function updateWord() {
//   fetch("http://localhost:8080/struts1/bbs.do?method=restApi")
//     .then((response) => response.json())
//     .then((data) => {
//       TODAY_WORDLE = data.result.toUpperCase();
//       console.log(TODAY_WORDLE);
//     });
// }
