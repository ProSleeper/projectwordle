// async function encryptData(age) {
//   let start = new Date().getTime();
//   while (new Date().getTime() < start + 1000);
//   return `${age}세 은행원`;
// }
// console.log("start");
// encryptData(20).then((value) => console.log(value));
// encryptData(37).then((value) => console.log(value));
// encryptData(59).then((value) => console.log(value));
// //console.log(encryptData(20));
// //console.log(encryptData(37));
// //console.log(encryptData(59));
// console.log("end");

let temp = null;

const fetchTest = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject("에러에러");
      resolve("성공성공!!");
    }, 2000);
   })
}

//여기가 계속 temp가 null인게 이해가 안가네~~
fetchTest()
  .then(returnValue => { temp = returnValue; })
  .then(console.log(temp))
  .catch(() => console.log("에러에러~~"));


// console.log(temp);