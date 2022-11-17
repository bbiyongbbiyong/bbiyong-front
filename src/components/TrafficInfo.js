import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../css/component.css"

function DisassterMsg(){
    const [Msges,setMsges]=useState(null);
    const [Loading,setLoading]=useState(false);
    const [Error, setError] = useState(null);

    const getTraffic = async()=>{
        try{
            setError(null);
            setMsges(null);
            setLoading(true);
           
            const response = await axios.get("https://jsonplaceholder.typicode.com/users");
            setMsges(response.data);
        }
        catch(e){setError(e);}
        setLoading(false);
    };

    useEffect(()=>{
        getTraffic();
      },[]);

      if (Loading) return <div>Loading...</div>;
      if (Error) return <div>Error(Traffic Info)</div>;
      if (!Msges) return null;  


      return(

        <div>
            <h3>도로 통제 정보</h3>
            <div className="get_metro">
                {Msges.map(msg=>
                <ul className="" key={msg.id}>
                    [{msg.username}] 
                </ul>)}
            </div>
            <button onClick={getTraffic}>지도 클릭하면 다시</button>
        </div>
    )
}


export default DisassterMsg;