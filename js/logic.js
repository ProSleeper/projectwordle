"use strict";

import * as initData from "./initGame.js";

//입력한 글자 검사.
export function checkWord(curRowStr) {
  let arrTodayWord = [...initData.TODAY_WORDLE];
  let isPerfect = false;
  isPerfect = checkMatch(curRowStr, arrTodayWord);
  checkExist(curRowStr, arrTodayWord);
  return isPerfect;
}

//자리와 글자 모두 일치 검사
export function checkMatch(input, today) {
  let MATCH_BG_COLOR = "#538D4E";
  let isAnswer = true;
  //match
  for (let i = 0; i < input.length; i++) {
    if (today[i] == input[i].word) {
      input[i].word = "";
      input[i].color = MATCH_BG_COLOR;
      today[i] = "";
      continue;
    }
    isAnswer = false;
  }

  return isAnswer;
}

//자리 일치 검사
export function checkExist(input, today) {
  let EXIST_BG_COLOR = "#B59F3B";
  //match
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < today.length; j++) {
      if (input[i].word == "") {
        break;
      }

      if (input[i].word == today[j]) {
        input[i].word = "";
        input[i].color = EXIST_BG_COLOR;
        today[j] = "";
        break;
      }
    }
  }
}
