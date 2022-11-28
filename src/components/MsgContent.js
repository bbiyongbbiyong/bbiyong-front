/* eslint-disable */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../css/message.css";

function MsgContent({check}) {
	let state = useSelector((state) => { return state; });
	let clickCity = state.clickCity;
	
	let title = ["재난문자", "지하철정보", "도로통제정보"];

	const [Msges, setMsges] = useState(null);
	const [Loading, setLoading] = useState(false);
	const [Error, setError] = useState(null);

	const getTraffic = async() => {
		try {
				setError(null);
				setMsges(null);
				setLoading(true);
				// 서버 임시 api 호출
				const response = await axios.get("https://jsonplaceholder.typicode.com/users");
				setMsges(response.data);
		}
		catch(e) {
			console.log("error발생")
			setError(e);
		}
		setLoading(false);
	};
  
    useEffect(() => {
      getTraffic();
    }, []);
  
	if(Loading)
		return <div>Loading...</div>;
	if(Error)
		return <div>Error{" "+title[check]}</div>;
	if(!Msges)
		return null;  

  
	return (
		<>
		<h3>{title[check]}</h3>
		<div className="msgBox">
			{
				Msges.map((msg, i) => 
					<ul key={i} className={"disMsg disMsg"+check}>
						[{clickCity.cityName_KOR}]<br/>
						{msg.username}입니다. 유의하세요! 
						{/* 받아온 데이터 */}
					</ul>
				)
			}
		</div>
		</>
	)
  }

  export default MsgContent;