import "./css/App.css";
import Main from "./components/Main"
import "./css/App.css"

function App() {
  return (
    <div>
      <div className="App">삐용삐용</div>
        <div>
        <h2>지금 서울은?</h2>


    <div id='result'></div>
      <div className="mainContainer">
        <Main />
      </div>
        </div>
    </div>
  );
}

export default App;


