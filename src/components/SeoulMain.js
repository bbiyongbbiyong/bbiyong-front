import { useState, useEffect } from "react";
import axios from "axios";
import "../css/message.css";
import accidentType from "./accidentType.js";


export default function SeoulMain() {
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let hours = (today.getHours() >= 12) ? (today.getHours() === 12) ?
    "오후 " + today.getHours() : "오후 " + (today.getHours()-12) : 
    "오전 " + today.getHours();

   
    const mapData = require("./mapData.json").data;
    
    const [Accident, setAccident] = useState(null);
	const [Loading, setLoading] = useState(false);
	const [Error, setError] = useState(null);

    const getinfo = async() => {
		try {
				setError(null);
				setAccident(null);
				setLoading(true);
				const response = await axios.get("https://api.bbiyong-bbiyong.seoul.kr/accident/most");
				setAccident(response.data);
		}
		catch(e) {
			console.log("사고 유형 불러오기 실패")
			setError(e);
		}
		setLoading(false);
	};

    useEffect(() => {
		getinfo();
    }, []);
    
      if(Loading)
          return <div>Loading...</div>;
      if(Error)
          return <div>Error</div>;
      if(!Accident)
          return null;  
    let city = mapData[Accident.data.locationId-2].SIG_KOR_NM;
    let accidentName = accidentType[Accident.data.accidentType];
   
    return (
        <div className="seoul-main">
            <p className="seoul-main-date">{year}년 {month}월 {day}일 {hours}시 기준</p>
            <p>지난 일주일 간<br/>
            <span className="seoul-main-city">{city}</span>에서 <span className="seoul-main-accident">{accidentName}</span>(이)가<br/>
            가장 많이 발생했어요.</p>
            <p>{city}를 지나실 때는<br/>
            {accidentName}에 주의하세요 :)</p>
        </div>
    );
    

}