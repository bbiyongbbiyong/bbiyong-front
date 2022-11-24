import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../css/message.css"


function DisassterMsg(){
    const [Msges,setMsges]=useState(null);
    const [Loading,setLoading]=useState(false);
    const [Error, setError] = useState(null);

    const getDisasster = async()=>{
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
        getDisasster();
      },[]);

      if (Loading) return <div>Loading...</div>;
      if (Error) return <div>Error(Disasster Message)</div>;
      if (!Msges) return null;  


      return(
        <div>
            <h3>재난 문자</h3>
            <div  className="msgBox">
                {Msges.map(msg=>
                <ul className="dissMsg" key={msg.id}>
                    [{msg.username}]
                </ul>)}
            </div>
            <button onClick={getDisasster}>지도 클릭하면 다시</button>
        </div>
    )
}


export default DisassterMsg;