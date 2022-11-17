import "./css/App.css";
import SeoulMap from "./components/SeoulMap";
import MetroInfo from "./components/MetroInfo";
import DisassterMSG from "./components/DisassterMsg";
import TrafficInfo from "./components/TrafficInfo";
import "./components/CheckBox";
import "./css/App.css"

function App() {
  return (
    <div>
      <div className="App">실시간 재난/교통 정보 모아보기 삐용삐용</div>
        <SeoulMap/>
        <div>
        <input type='checkbox'
        value='all'
        name='check'
        //onClick='getCheckboxAll(event)'
        /> 전체

      <input type='checkbox'
        value='metro_info'
        name='check'
        // onClick='getCheckboxValue(event)'
        /> 지하철정보

        <input type='checkbox' 
          value='traffic_info' 
          name='check'
         // onClick='getCheckboxValue(event)'
         /> 도로통제정보

        <input type='checkbox' 
          value='disasster_msg' 
          name='check'
          //onClick='getCheckboxValue(event)'
          /> 재난문자

    <div id='result'></div>
      <div className="mainContainer">
        <MetroInfo />
        <DisassterMSG />
        <TrafficInfo />
      </div>
        </div>
    </div>
  );
}

export default App;


