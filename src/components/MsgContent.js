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
				
				let apiPath = (title.path === "metro") ? `http://3.34.204.213:8080/${title.path}/view` : `http://3.34.204.213:8080/${title.path}/${clickCity.cityID}`;
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