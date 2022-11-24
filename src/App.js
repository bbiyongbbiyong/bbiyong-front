import Main from "./components/Main"
import SeoulMap from "./components/SeoulMap";
import "./css/App.css"

function App() {
  return (
    <div>
      <div className="App">실시간 재난/교통 정보 모아보기 삐용삐용</div>
        <SeoulMap/>
        <div>
          <div className="mainContainer">
           <Main />
          </div>
        </div>
    </div>
  );
}

export default App;


