async function encryptData(age) {
  let start = new Date().getTime();
  while (new Date().getTime() < start + 1000);
  return `${age}세 은행원`;
}
console.log("start");
encryptData(20).then((value) => console.log(value));
encryptData(37).then((value) => console.log(value));
encryptData(59).then((value) => console.log(value));
//console.log(encryptData(20));
//console.log(encryptData(37));
//console.log(encryptData(59));
console.log("end");