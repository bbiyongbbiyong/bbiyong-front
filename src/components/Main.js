import React, { useState, useEffect, } from "react";
import { useParams } from 'react-router-dom';
import MetroInfo from "./MetroInfo";
import DisassterMSG from "./DisassterMsg";
import TrafficInfo from "./TrafficInfo";
import CheckBox from "./CheckBox";

function Main(){
    return (
        <div>
            <h2>지금 서울은?</h2>
          <div>
              <CheckBox />
          </div>
          <div  className="mainContainer">
            <DisassterMSG />
            <MetroInfo />
            <TrafficInfo />
          </div>
        </div>
      );
}
export default Main;



