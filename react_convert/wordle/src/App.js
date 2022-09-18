import logo from "./logo.svg";
import "./App.css";
import "./style.css";

const Button = () => {
  return (
    <section className="">
      <button className="inputWord" disabled="disabled">
        &nbsp;
      </button>
      <button className="inputWord" disabled="disabled">
        &nbsp;
      </button>
      <button className="inputWord" disabled="disabled">
        &nbsp;
      </button>
      <button className="inputWord" disabled="disabled">
        &nbsp;
      </button>
      <button className="inputWord" disabled="disabled">
        &nbsp;
      </button>
    </section>
  );
};

function DrawBoard() {
  const BOARD_ROW = 6;
  let arrayRow = [];

  for (let index = 0; index < BOARD_ROW; index++) {
    arrayRow.push(<Button key={index} />);
  }
  return arrayRow;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DrawBoard />
        {/* <Button /> */}
      </header>
    </div>
  );
}

export default App;
