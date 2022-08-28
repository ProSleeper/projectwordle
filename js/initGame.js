"use strict";

import * as requestWord from "./requestWord.js";
import * as viewElem from "./viewElem.js";
import * as eventModule from "./setEvent.js";

window.addEventListener("load", () => {
  init();
});


export let TODAY_WORDLE = "EDIYA"; //오늘의 단어, 서버에서 받아오는 걸로 처리하면 나름 괜찮을 듯

//초기화
export function init() {
  //서버에서 단어를 다 받아온 다음에 게임을 시작하기 위해서 이렇게 했는데
  //아마 다 받아고 제대로 실행은 될거 같다. promise를 이용했으니.
  //다만 코드적인 것도 이상하고, 뭔가 이렇게 짜면 안될것 같은 느낌이 들었고
  //aws로 했는데 aws도 제대로 설정 못해서 22-08-18에 다시 해보자.
  requestWord
    .updateWord()
    .then((response) => response.json())
    .then((data) => {
      TODAY_WORDLE = data.result.toUpperCase();
      console.log(TODAY_WORDLE);
    })
    .catch(() => {
      console.error("request Fail");
    })
    .finally(() => {
      viewElem.drawBoard();
      setEventListeners();
    });
}

//이벤트 리스너 등록
function setEventListeners() {
  eventModule.registKeyEvent();
  eventModule.registRestartBtn();
}
