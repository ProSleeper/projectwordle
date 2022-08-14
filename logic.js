function initGame() {
  drawBoard();
  setEventListeners();
}

function drawBoard() {
  const BOARD_ROW = 6;
  const board = document.querySelector(".board");
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
// let TODAY_WORDLE = ["C", "L", "O", "N", "E"];
let TODAY_WORDLE = ["K", "H", "A", "K", "I"];

function setEventListeners() {
  const body = document.querySelector("body");
  const board = document.querySelector(".board");
  body.addEventListener("keydown", (event) => {
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
    console.log(CUR_COLUMN);

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
      if (checkWord(curRow, CUR_COLUMN)) {
        CUR_ROW++;
        CUR_COLUMN = 0;
      }
    }
  });
}

//오늘의 단어는 CLONE

function checkWord(curRow, isFull) {
  if (isFull < 5) {
    return false;
  }

  let wordDigit = [0, 1, 2, 3, 4];
  let colorExist = "#B59F3B";
  let colorMatch = "#538D4E";
  let copyTodayWordle = TODAY_WORDLE.slice();

  //match
  for (let i = 0; i < wordDigit.length; i++) {
    if (copyTodayWordle[i] == curRow[i].textContent) {
      curRow[i].style.backgroundColor = colorMatch;
      wordDigit[i] = -1;
      copyTodayWordle[i] = "";
    }
  }
  copyTodayWordle.join().replaceAll(",", "");

  if (copyTodayWordle.join().replaceAll(",", "") == "") {
    console.log("정답!");
  }

  //exist
  for (let i = 0; i < wordDigit.length; i++) {
    for (let j = 0; j < copyTodayWordle.length; j++) {
      if (wordDigit[i] == -1) {
        break;
      }
      if (curRow[i].textContent == copyTodayWordle[j]) {
        curRow[i].style.backgroundColor = colorExist;
        copyTodayWordle[i] = "";
      }
    }
  }
  return true;
}

window.addEventListener("load", () => {
  initGame();
});
