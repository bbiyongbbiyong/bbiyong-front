/* eslint-disable */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../css/message.css";

function MsgContent({check, title}) {
	let state = useSelector((state) => { return state; });
	let clickCity = state.clickCity;

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

				// 테스트용 api 호출 - 2가지 json 파일 url로 테스트
				// https://codingapple1.github.io/shop/data2.json	// 동대문구 클릭 시
				// https://codingapple1.github.io/shop/data3.json 	// 동작구 클릭 시
				// 초기 값 null이므로 조건 설정
				if (clickCity.index != null) { 
					const tmp = await axios.get("https://codingapple1.github.io/shop/data"+clickCity.index+".json");
					console.log(tmp.data); // clickCity 값 변경 시마다, 서로 다른 값 나옴 
				}
		}
		catch(e) {
			console.log(e);
			setError(e);
		}
		setLoading(false);
	};
  
    useEffect(() => {
      getTraffic();
    }, [clickCity]);
  
	if(Loading)
		return <div>Loading...</div>;
	if(Error)
		return <div>Error{" "+title[check]}</div>;
	if(!Msges)
		return null;  

  
	return (
		<>
		<h3>{title[check].name}</h3>
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