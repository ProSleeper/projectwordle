//게임화면 초기화
function testDraw() {
  const BOARD_ROW = 3;

  const board = document.querySelector(".keyboard");
  console.log(board);
  board.innerHTML = "";
  const makeRow = function (rowNumber) {
    let plusOne = "";
    if (rowNumber == 1) {
      plusOne = '<button class="inputKey">&nbsp;q</button>';
    }
    return `
    <section class="row${rowNumber}">
        ${plusOne}
        <button class="inputKey">A</button>
        <button class="inputKey">B</button>
        <button class="inputKey">C</button>
        <button class="inputKey">D</button>
        <button class="inputKey">E</button>
        <button class="inputKey">F</button>
        <button class="inputKey">H</button>
        <button class="inputKey">G</button>
        <button class="inputKey">Z</button>
      </section>
    `;
  };
  for (let index = 0; index < BOARD_ROW; index++) {
    board.innerHTML += makeRow(index + 1);
    console.log("실행");
  }
}

testDraw();
