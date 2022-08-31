"use strict";

//서버에 요청해서 단어 받아오기
//당연하지만 서버가 켜져있어야하고, 요청을 처리 할 수 있어야 한다.
export function updateWord() {
  // return fetch("http://localhost:8080/wordle/wod/get-wordle");

  const URL = window.location.href;
  if (URL.indexOf("127") != -1 || URL.indexOf("localhost") != -1) {
    return fetch("http://127.0.0.1:5000/TodayWordle");
  }
  return fetch("https://www.loomdis.site/TodayWordle");
}
