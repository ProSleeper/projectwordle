export var KEYFRAMES = {
  s: [{ transform: "scale(1)" }, { transform: "scale(1.4)" }, { transform: "scale(1)" }],
  r: [{ transform: "rotateX(0deg)" }, { transform: "rotateX(90deg)" }, { transform: "rotateX(0deg)" }],
};

export function AnimateBtn(btn) {
  return new Promise(() => btn.animate(KEYFRAMES.r, 500));
}

export async function animationRow(btnList) {
  for (const btn of btnList) {
    await rotateBtn(btn);
  }
}

export function rotateBtn(btn) {
  return new Promise((resolve) => {
    return resolve(btn.animate(KEYFRAMES.r, 400).finished);
  });
}

