//이거 참고해서 내 애니메이션 코드 부분도 바꾸면 될듯.
//애니메이션을 이해한다기보다 비동기 코드를 제대로 처리하는 방법을 배우는 거라서 필수적으로 하면 더더욱 좋을 것 같다.

var KEYFRAMES = {
  o: [{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }],
  t: [{ transform: "translateX(0)" }, { transform: "translateX(200px)" }, { transform: "translateX(0)" }],
  r: [{ transform: "rotate(0deg)" }, { transform: "rotate(200deg)" }, { transform: "rotate(0deg)" }],
  bb: [{ background: "#4598b6" }, { background: "#444444" }, { background: "#4598b6" }],
  br: [{ background: "#b64598" }, { background: "#444444" }, { background: "#b64598" }],
};


//콜백방식
var box = document.querySelector(".callback");
var anim1 = box.animate(KEYFRAMES.o, 1000);
anim1.onfinish = function () {
  var anim2 = box.animate(KEYFRAMES.t, 1000);
  anim2.onfinish = function () {
    var anim3 = box.animate(KEYFRAMES.r, 1000);
    anim3.onfinish = function () {
      box.animate(KEYFRAMES.bb, 1000);
    };
  };
};


//프로미스 방식
var box2 = document.querySelector(".promise");
var animA = box2.animate(KEYFRAMES.o, 1000);
animA.finished
  .then(function () {
    var animB = box2.animate(KEYFRAMES.t, 1000);
    return animB.finished;
  })
  .then(function () {
    var animC = box2.animate(KEYFRAMES.r, 1000);
    return animC.finished;
  })
  .then(function () {
    box2.animate(KEYFRAMES.br, 1000);
  });
