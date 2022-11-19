import React, { useState, useEffect } from "react";
import MetroInfo from "./MetroInfo";
import DisassterMSG from "./DisassterMsg";
import TrafficInfo from "./TrafficInfo";
import CheckBox from "./CheckBox";

function Main(){
  //체크된 컴포넌트들 관리
  // const [chkMsg,setChkMsg] = useState([]);


    return (
        <div>
            <div>  
              <CheckBox />
            
        <div id='result'></div>
          <div  className="mainContainer">
            <DisassterMSG />
            <MetroInfo />
            <TrafficInfo />
          </div>
            </div>
        </div>
      );
}
export default Main;



