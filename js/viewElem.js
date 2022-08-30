"use strict";

import * as initData from "./initGame.js";

//게임화면 초기화
export function drawBoard() {
  const BOARD_ROW = 6;
  const board = document.querySelector(".board");
  board.innerHTML = "";
  const makeRow = function (rowNumber) {
    return `
    <section class="row${rowNumber}">
        <button class="inputWord" disabled="disabled">&nbsp;</button>
        <button class="inputWord" disabled="disabled">&nbsp;</button>
        <button class="inputWord" disabled="disabled">&nbsp;</button>
        <button class="inputWord" disabled="disabled">&nbsp;</button>
        <button class="inputWord" disabled="disabled">&nbsp;</button>
      </section>
    `;
  };
  for (let index = 0; index < BOARD_ROW; index++) {
    board.innerHTML += makeRow(index + 1);
  }
}

//결과 화면 출력
export function viewResult(message, visible) {
  setTimeout(() => {
    document.querySelector("#pop_info_1").style.display = visible;
    document.querySelector(".result").textContent = message;
    document.querySelector(".wordle").textContent = `[ ${initData.TODAY_WORDLE} ]`;
  }, 500);
}

//게임화면 초기화
export function keyBoardDraw() {
  const BOARD_ROW = 3;
  const arrKey = [
    ["W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
  ];

  const board = document.querySelector(".keyboard");
  console.log(board);
  board.innerHTML = "";
  const makeRow = function (rowNumber) {
    let plusOne = "";
    if (rowNumber == 1) {
      plusOne = '<button class="inputKey">Q</button>';
    }
    let arrWord = "";
    for (const word of arrKey[rowNumber - 1]) {
      arrWord += `<button class="inputKey">${word}</button>`;
    }

    return `
    <section class="row${rowNumber}">
        ${plusOne}${arrWord}
      </section>
    `;
  };
  for (let index = 0; index < BOARD_ROW; index++) {
    board.innerHTML += makeRow(index + 1);
  }
}


