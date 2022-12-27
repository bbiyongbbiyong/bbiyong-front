/* eslint-disable */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../css/message.css";

function MsgContent({title, checkCount}) {
	let state = useSelector((state) => { return state; });
	let clickCity = state.clickCity;
	
	const [Msges, setMsges] = useState(null);
	const [Loading, setLoading] = useState(false);
	const [Error, setError] = useState(null);
	const [fade, setFade] = useState("")

	const accidentTap = [
    { tap: "공사", color: "#3E90EA" },
    { tap: "집회/행사", color: "#A9CFF8" },
    { tap: "사고", color: "#D9EBFF" },
    { tap: "기타", color: "#D9D9D9" },
  ];
	const getDisasterInfo = async() => {
		try {
				setError(null);
				setMsges(null);
				setLoading(true);
				
				let apiPath = (title.path === "metro") ? `https://api.bbiyong-bbiyong.seoul.kr//${title.path}/view` : `https://api.bbiyong-bbiyong.seoul.kr/${title.path}/${clickCity.cityID}`;
				const response = await axios.get(apiPath);
				
				setMsges(response.data.data);
		}
		catch(e) {
			console.log(e);
			setError(e);
		}
		setLoading(false);
	};
	
    useEffect(() => {
		getDisasterInfo();
		setTimeout(() => { setFade("end") }, 100)
		return () => { setFade("") }
    }, [clickCity, checkCount]);


	const fillMsg = (target) => {
		if(title.path === "emerMsg") return "rgb(255, 155, 155)";
		else if (title.path === "metro") return "rgb(245, 245, 155)";
		else 
			switch(target.accidentType){
				case "A01":
				case "A02":
				case "A03":
				case "A05":
				case "A06":
				case "A07":
				case "A08":
				case "A09":
					return "#D9EBFF";
					
				case "A04":
					return "#3E90EA"
				
				case "A10":
					return "#A9CFF8"	

				default:
					return "#D9D9D9";
			}
	}

	const sizeMsgBox = () => {
		if(checkCount < 2) {
			return "38vh";
		}

		return "100px";
	}
	
	if(Error) return <div>Error{" "+title}</div>;
	if(!Msges) return null;  

	let display = "";
	if(Msges.length === 0)
		display = "dis-msg-none";	

	return (
		<>
			<div id="title-box">
				<h3>{title.name}</h3>
				{title.path === "accident" && 
					<div id="accident-tap"> 
						{accidentTap.map((e, ind) => 
						<> 
							<div className="tap-circle" style={{"backgroundColor": `${e.color}`}}/>
							<p className="tap-text">{e.tap}&nbsp;</p>
							{ind < 3 && <p className="tap-text"> | </p>}
						</>)}
					</div>
				}
			</div>

			<div className={"msg-box start "+fade} style={{"height":sizeMsgBox()}}>
				{(display === "dis-msg-none") ? <div className={"dis-msg "+display}>최근 수신된 정보가 없습니다</div> :
					Msges.map((msg, i) => 
					<>
						<ul key={i} className="dis-msg" style={{"backgroundColor": fillMsg(msg)}}>
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