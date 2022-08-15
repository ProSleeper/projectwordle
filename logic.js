function initGame() {
  updateWord();
  drawBoard();
  setEventListeners();
}

function updateWord() {
  // fetch("http://localhost:8080/struts1/bbs.do?method=restApi")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     TODAY_WORDLE = data.result.toUpperCase();
  //     console.log(TODAY_WORDLE);
  //   });
}

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

let CUR_ROW = 1;
let CUR_COLUMN = 0;
let TODAY_WORDLE = "NEVER";
let isAnim = false;
let isGameOver = false;
let isSuccess = false;

function setEventListeners() {
  const body = document.querySelector("body");
  const board = document.querySelector(".board");
  const popUpClose = document.querySelector(".btn_close");

  popUpClose.addEventListener("click", () => {
    document.querySelector("#pop_info_1").style.display = "none";
    CUR_ROW = 1;
    CUR_COLUMN = 0;
    isAnim = false;
    isGameOver = false;
    updateWord();
    drawBoard();
  });
  body.addEventListener("keydown", (event) => {
    if (isAnim) {
      return;
    }
    if (isGameOver) {
      return;
    }
    const xRow = board.querySelector(`.row${CUR_ROW}`);
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
      curBtn.animate(
        {
          transform: [
            "scale(1.2)", // 시작 값
            "scale(1)", // 종료 값
          ],
        },
        {
          duration: 300, // 밀리초 지정
          fill: "forwards", // 종료 시 속성을 지님
          easing: "ease", // 가속도 종류
        }
      );
      CUR_COLUMN++;
    }

    if (event.key == "Enter") {
      if (CUR_COLUMN < 5) {
        if (!isAnim) {
          isAnim = true;
          xRow.animate(
            {
              transform: [
                "translate(10px, 0)", // 시작 값
                "translate(-10px, 0)", // 종료 값
                "translate(10px, 0)", // 종료 값
                "translate(-10px, 0)", // 종료 값
                "translate(10px, 0)", // 종료 값
                "translate(0px, 0)", // 종료 값
              ],
            },
            {
              duration: 500, // 밀리초 지정
              fill: "forwards", // 종료 시 속성을 지님
              easing: "ease-in-out", // 가속도 종류
            }
          ).onfinish = () => {
            isAnim = false;
          };
        }
        return;
      }
      if (!isAnim) {
        isAnim = true;
        xRow.animate(
          {
            transform: [
              "rotateX(0deg)", // 시작 값
              "rotateX(90deg)",
            ],
          },
          {
            duration: 500, // 밀리초 지정
            fill: "forwards", // 종료 시 속성을 지님
            easing: "ease-out", // 가속도 종류
          }
        ).onfinish = () => {
          checkWord(curRow);
          xRow.animate(
            {
              transform: [
                "rotateX(90deg)", // 시작 값
                "rotateX(0deg)",
              ],
            },
            {
              duration: 500, // 밀리초 지정
              fill: "forwards", // 종료 시 속성을 지님
              easing: "ease-out", // 가속도 종류
            }
          ).onfinish = () => {
            isAnim = false;
          };
        };
        CUR_ROW++;
        CUR_COLUMN = 0;
        if (CUR_ROW > 6) {
          if (isSuccess) {
            return;
          }
          setTimeout(() => {
            document.querySelector("#pop_info_1").style.display = "inline";
            document.querySelector(".dsc").textContent = "실패했습니다..";
          }, 1000);

          isGameOver = true;
        }
      }
    }
  });
}

function checkWord(curRow) {
  let EXIST_BG_COLOR = "#B59F3B";
  let MATCH_BG_COLOR = "#538D4E";
  let arrTodayWord = [...TODAY_WORDLE];
  let arrInputWord = [];
  let isCorrectAnswer = true;

  curRow.forEach((element) => {
    arrInputWord.push(element.textContent);
  });

  //match
  for (let i = 0; i < arrInputWord.length; i++) {
    if (arrTodayWord[i] == arrInputWord[i]) {
      curRow[i].style.backgroundColor = MATCH_BG_COLOR;
      arrTodayWord[i] = "";
      arrInputWord[i] = "";
      continue;
    }
    isCorrectAnswer = false;
  }

  //exist
  for (let i = 0; i < arrInputWord.length; i++) {
    for (let j = 0; j < arrTodayWord.length; j++) {
      if (arrInputWord[i] == "") {
        break;
      }

      if (arrInputWord[i] == arrTodayWord[j]) {
        curRow[i].style.backgroundColor = EXIST_BG_COLOR;
        arrTodayWord[j] = "";
        arrInputWord[i] = "";
        break;
      }
    }

    //correctAnswer
    if (isCorrectAnswer) {
      return true;
    }
    return false;
  }
}

//애니메이션부터 수정하면 될듯.
function blankAnimation(params) {}

function blankAnimation(params) {}

function blankAnimation(params) {}

window.addEventListener("load", () => {
  initGame();
});
