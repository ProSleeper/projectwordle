//기본 상태 쿠키

const gameForm = (solution) => {
  return {
    boardState: ["", "", "", "", "", ""], //여기 입력한 단어가 들어감
    evaluations: [
      //absent 틀림, present 글자만 맞음, correct 글자와 자리 모두 맞음
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    rowIndex: 0, //현재 입력 가능 줄 번호
    solution: solution,
    gameStatus: "IN_PROGRESS", // "FAIL", "WIN", "IN_PROGRESS"
    lastPlayedTs: null, //마지막 플레이 시간 유닉스 타임 밀리초
    lastCompletedTs: null, //정답 맞춘 시간
    restoringFromLocalStorage: null,
    hardMode: false,
  };
};

// 누적 정보 쿠키
const statForm = () => {
  return {
    currentStreak: 0, //현재 연속 맞춘 횟수
    maxStreak: 0, //최대 연속 맞춘 횟수
    guesses: {
      //시도 별 맞춘 횟수
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      fail: 0,
    },
    winPercentage: 0, // 이김/시도 승률
    gamesPlayed: 0, //플레이 횟수
    gamesWon: 0, //이긴 횟수
    averageGuesses: 0, //평균적으로 맞춘 횟수
  };
};

//기타 정보 쿠키
// {
//   "game": {
//     "id": 471,
//     "dayOffset": 470,
//     "boardState": [
//       "",
//       "",
//       "",
//       "",
//       "",
//       ""
//     ],
//     "currentRowIndex": 0,
//     "status": "IN_PROGRESS",
//     "timestamps": {
//       "lastPlayed": null,
//       "lastCompleted": null
//     }
//   },
//   "settings": {
//     "hardMode": false,
//     "darkMode": true,
//     "colorblindMode": false
//   },
//   "stats": {
//     "currentStreak": 0,
//     "maxStreak": 0,
//     "guesses": {
//       "1": 0,
//       "2": 0,
//       "3": 0,
//       "4": 0,
//       "5": 0,
//       "6": 0,
//       "fail": 0
//     },
//     "winPercentage": 0,
//     "gamesPlayed": 0,
//     "gamesWon": 0,
//     "averageGuesses": 0
//   },
//   "timestamp": 1664636670
// }

export { gameForm, statForm };
