/* eslint-disable */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../css/message.css";

function MsgContent({title}) {
	let state = useSelector((state) => { return state; });
	let clickCity = state.clickCity;

	const [Msges, setMsges] = useState(null);
	const [Loading, setLoading] = useState(false);
	const [Error, setError] = useState(null);

	const getDisasterInfo = async() => {
		try {
				setError(null);
				setMsges(null);
				setLoading(true);
				// 서버 임시 api 호출
				const response = await axios.get("https://jsonplaceholder.typicode.com/users");
				setMsges(response.data);
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
		<div className="msgBox">
			{
				Msges.map((msg, i) => 
					<ul key={i} className={"disMsg disMsg"+title.id}>
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