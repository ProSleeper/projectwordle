function initGame() {
  drawBoard();
  setEventListeners();
  
}

function drawBoard() {
  fetch("http://localhost:8080/struts1/bbs.do?method=restApi")
  .then((response) => response.json())
  .then((data) => {TODAY_WORDLE = [...data.result]; console.log(TODAY_WORDLE)});
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
// let TODAY_WORDLE = ["C", "L", "O", "N", "E"];
let TODAY_WORDLE = ["P", "O", "K", "E", "R"];
let isAnim = false;
let isGameOver = false;
let isSuccess = false;

function setEventListeners() {
  const body = document.querySelector("body");
  const board = document.querySelector(".board");
  const popUpClose = document.querySelector('.btn_close');
  
  popUpClose.addEventListener('click', () => {
    document.querySelector('#pop_info_1').style.display = 'none';
    CUR_ROW = 1;
    CUR_COLUMN = 0;
    // let TODAY_WORDLE = ["C", "L", "O", "N", "E"];
    isAnim = false;
    isGameOver = false;
    drawBoard();


  })
  body.addEventListener("keydown", (event) => {
    if(isAnim){
      return;
    }
    if(isGameOver){
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
        if(!isAnim){
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
  
          ).onfinish = (() => {isAnim = false;})
  
        }
        return;
      }
      if(!isAnim){
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
        ).onfinish = () => {isAnim = false;};
      };
      CUR_ROW++;
      CUR_COLUMN = 0;
      if(CUR_ROW > 6){
        if(isSuccess){
          return;
        }
        setTimeout(() => {
          document.querySelector('#pop_info_1').style.display = 'inline';
          document.querySelector('.dsc').textContent = "실패했습니다..";
        }, 1000);
        
        isGameOver = true;
      }
    }
    }
  });
}

//오늘의 단어는 CLONE

function checkWord(curRow) {
  let colorExist = "#B59F3B";
  let colorMatch = "#538D4E";
  let copyTodayWordle = TODAY_WORDLE.slice();

  //match
  for (let i = 0; i < curRow.length; i++) {
    if (copyTodayWordle[i] == curRow[i].textContent) {
      curRow[i].style.backgroundColor = colorMatch;
      copyTodayWordle[i] = "";
    }
  }
  copyTodayWordle.join().replaceAll(",", "");

  if (copyTodayWordle.join().replaceAll(",", "") == "") {
    setTimeout(() => {
      document.querySelector('#pop_info_1').style.display = 'inline';
      document.querySelector('.dsc').textContent = "성공했습니다!!";
    }, 1000);
    
    isSuccess = true;
  }

  //exist
  for (let i = 0; i < curRow.length; i++) {
    for (let j = 0; j < copyTodayWordle.length; j++) {

      if (curRow[i].textContent == copyTodayWordle[j]) {
        curRow[i].style.backgroundColor = colorExist;
        copyTodayWordle[j] = "";
        break;
      }
    }
  }

  return true;
}

window.addEventListener("load", () => {
  initGame();
});
