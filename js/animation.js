"use strict";

export var KEYFRAMES = {
  s: [{ transform: "scale(1)" }, { transform: "scale(1.4)" }, { transform: "scale(1)" }],
  preR: [{ transform: "rotateX(0deg)" }, { transform: "rotateX(90deg)" }],
  postR: [{ transform: "rotateX(90deg)" }, { transform: "rotateX(0deg)" }],
};

export const AnimateBtn = (btn) => {
  return new Promise(() => btn.animate(KEYFRAMES.r, 500));
};

//개별 버튼 회전
export const animationRow = async (btnList, changeBg) => {
  let bgLength = 0;
  //debugger;
  for (const btn of btnList) {
    await preRotateBtn(btn);
    btn.style.backgroundColor = changeBg[bgLength++].color;
    await PostRotateBtn(btn);
  }
};

export const preRotateBtn = (btn) => {
  return new Promise((resolve) => {
    return resolve(btn.animate(KEYFRAMES.preR, { duration: 200, fill: "forwards" }).finished);
  });
};

export const PostRotateBtn = (btn) => {
  return new Promise((resolve) => {
    return resolve(btn.animate(KEYFRAMES.postR, { duration: 200, fill: "forwards" }).finished);
  });
};
