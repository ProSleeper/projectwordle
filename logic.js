"use strict";
window.addEventListener("load", () => {
  init();
});

let CUR_ROW = 1; //현재 작성 가능한 ROW
let CUR_COLUMN = 0; //현재 작성 가능한 COLUMN
let TODAY_WORDLE = "TWICE"; //오늘의 단어, 서버에서 받아오는 걸로 처리하면 나름 괜찮을 듯
let isGameOver = false; //게임 실패 체크
let isSuccess = false; //게임 성공 체크

//초기화
function init() {

  //서버에서 단어를 다 받아온 다음에 게임을 시작하기 위해서 이렇게 했는데
  //아마 다 받아고 제대로 실행은 될거 같다. promise를 이용했으니.
  //다만 코드적인 것도 이상하고, 뭔가 이렇게 짜면 안될것 같은 느낌이 들었고
  //aws로 했는데 aws도 제대로 설정 못해서 22-08-18에 다시 해보자.
  updateWord()
  .then((response) => response.json())
  .then((data) => {
    TODAY_WORDLE = data.result.toUpperCase();
    drawBoard();
    setEventListeners();
  });
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
  const dq = (element) => document.querySelector(element);
  const body = dq("body");
  const board = dq(".board");
  body.addEventListener("keydown", (event) => {
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

    function pushEnter() {
      if (CUR_COLUMN < 5) {
        return;
      }

      if (checkWord(curRow)) {
        viewResult("Success.", "inline");
        isSuccess = true;
        isGameOver = true;
      }

      CUR_ROW++;
      CUR_COLUMN = 0;
      if (CUR_ROW > 6) {
        if (isSuccess) {
          return;
        }
        viewResult("Fail..", "inline");
        isGameOver = true;
      }
    }

    function pushAlphabet() {
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

  isPerfect = checkMatch(arrInputWord, arrTodayWord, curRow);
  checkExist(arrInputWord, arrTodayWord, curRow);
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
    document.querySelector(".result").textContent = message;
    document.querySelector(".wordle").textContent = `[ ${TODAY_WORDLE} ]`;
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
function updateWord() {
  return fetch("http://localhost:8080/wordle/wod/get-wordle");
}

// function updateWord() {
//   return fetch("http://localhost:8080/wordle/wod/get-wordle");
//   .then((response) => response.json())
//   .then((data) => {
//     TODAY_WORDLE = data.result.toUpperCase();
//     console.log(TODAY_WORDLE);
//   });
// }

//프로미스 방식
// var box2 = document.querySelector(".promise");
// var animA = box2.animate(KEYFRAMES.o, 1000);
// animA.finished
//   .then(function () {
//     var animB = box2.animate(KEYFRAMES.t, 1000);
//     return animB.finished;
//   })
//   .then(function () {
//     var animC = box2.animate(KEYFRAMES.r, 1000);
//     return animC.finished;
//   })
//   .then(function () {
//     box2.animate(KEYFRAMES.br, 1000);
//   });
