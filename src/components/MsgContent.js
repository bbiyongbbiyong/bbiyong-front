/* eslint-disable */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../css/message.css";
import { click } from "@testing-library/user-event/dist/click";

function MsgContent({title}) {
	let state = useSelector((state) => { return state; });
	let clickCity = state.clickCity;
	
	let tempData = {"status":200,"message":"성공","data":[{"text":"내일(17)일 14시부터 도심집회가 예정되어 있습니다.\n\n1, 2호선 시청역, 5호선 광화문역, 4, 6호선 삼각지역 주변이 다소 혼잡할 수 있으니 해당역 일대를 방문하실 고객님께서는 이 점 참고하여 열차를 이용해 주시기 바랍니다.","startDate":"2022.12.15 20:12"},{"text":"오늘 08시부터 4호선 삼각지역에서 전국장애인차별철폐연대의 장애인 권리예산 확보를 위한 지하철 타기가 예정되어 있습니다.\n\n이에 따라 4호선 열차운행에 지연이 발생할 수 있으며, 상황에 따라 해당역을 무정차 통과할 수 있습니다. \n","startDate":"2022.12.15 13:49"}]}
	
	const [Msges, setMsges] = useState(null);
	const [Loading, setLoading] = useState(false);
	const [Error, setError] = useState(null);
	const getDisasterInfo = async() => {
		try {
				setError(null);
				setMsges(null);
				setLoading(true);
				
				let apiPath = (title.path === "metro") ? `http://3.34.204.213:8080/${title.path}/view` : `http://3.34.204.213:8080/${title.path}/${clickCity.cityID}`;
				// let apiPath = `http://3.34.204.213:8080/accident/most`
				const response = await axios.get(apiPath);
				// console.log(response.data)
				
				(title.path === "metro") ? setMsges(tempData.data) : setMsges(response.data.data);
				console.log(response.data.data)
				// setMsges(response.data.data);
				// setMsges(response.data);
		}
		catch(e) {
			console.log(e);
			setError(e);
		}
		setLoading(false);
	};
	
    useEffect(() => {
		getDisasterInfo();
    }, [clickCity]);
  
	if(Loading)
		return <div>Loading...</div>;
	if(Error)
		return <div>Error{" "+title}</div>;
	if(!Msges)
		return null;  

  
	return (
		<>
		<h3>{title.name}</h3>
		<div className="msg-box">
			{
				Msges.map((msg, i) => 
				<>
					<ul key={i} className={"dis-msg dis-msg"+title.id}>
						{msg.message}
						{msg.text}
						{msg.accidentInfo}
					</ul>
					<div className="dis-date">{msg.startDate}</div>
				</>
				)
			}
		</div>
		</>
	)
  }

  export default MsgContent;