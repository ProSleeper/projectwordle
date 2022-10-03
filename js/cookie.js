import { gameForm, statForm } from "./cookieForm.js";

//로컬 스토리지 사용법
//





function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const setLocalStorage = (name, solution) => {
  window.localStorage.setItem(name, JSON.stringify(gameForm(solution)));
};

const getLocalStorage = (name) => {
  return JSON.parse(window.localStorage.getItem(name))
};

function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    // 필요한 경우, 옵션 기본값을 설정할 수도 있습니다.
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

const deleteCookie = (name) => {
  setCookie(name, "", {
    "max-age": -1,
  });
};
/*
  //예시

  //쿠키 생성
  setCookie("user", "John", { secure: true, "max-age": 3600 });

  // 주어진 이름의 쿠키를 반환하는데,
  // 조건에 맞는 쿠키가 없다면 undefined를 반환합니다.
  getCookie("user");

  deleteCookie("name");
*/

export { setCookie, getCookie, deleteCookie, setLocalStorage, getLocalStorage };

// [
//   {
//     boardState: ["clone", "never", "maven", "clone", "", ""],
//     evaluations: [
//       ["absent", "present", "absent", "absent", "correct"],
//       ["absent", "correct", "present", "present", "absent"],
//       ["absent", "present", "present", "present", "absent"],
//       ["absent", "present", "absent", "absent", "correct"],
//       null,
//       null,
//     ],
//     rowIndex: 4, //현재 입력 가능 줄 번호
//     solution: "leave",
//     gameStatus: "IN_PROGRESS",// "Fail", "WIN"
//     lastPlayedTs: 1664632439113, //마지막 플레이 시간 유닉스 타임 밀리초
//     lastCompletedTs: null, //정답 맞춘 시간
//     restoringFromLocalStorage: null,
//     hardMode: false,
//   },
// ];

// 이건 누적 정보를 보여주는 쿠키인듯
// [
//   {
//     currentStreak: 1,
//     maxStreak: 1,
//     guesses: {
//       1: 0,
//       2: 0,
//       3: 0,
//       4: 1,
//       5: 0,
//       6: 0,
//       fail: 0,
//     },
//     winPercentage: 100,
//     gamesPlayed: 1,
//     gamesWon: 1,
//     averageGuesses: 4,
//   },
// ];
