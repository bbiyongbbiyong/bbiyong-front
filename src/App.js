import CheckBox from "./components/CheckBox"
import SeoulMap from "./components/SeoulMap";
import "./css/App.css"

function App() {
  return (
    <div>
      <h4 id="service-title">
        실시간 재난/교통 정보 모아보기&nbsp;
        <span>삐용삐용</span>
      </h4>
      <SeoulMap />
      <CheckBox /> 
    </div>
  );
}

export default App;


