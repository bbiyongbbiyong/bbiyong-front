import React, { useState, useEffect } from "react";
import axios from 'axios';


function MetroInfo(){
    const [Msges,setMsges]=useState(null);
    const [Loading,setLoading]=useState(false);
    const [Error, setError] = useState(null);

    const getMetro = async()=>{
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
        getMetro();
      },[]);

      if (Loading) return <div>Loading...</div>;
      if (Error) return <div>Error(Metro Info)</div>;
      if (!Msges) return null;  


      return(
        <div>
            <h3>지하철 지연정보</h3>
            <div className="get_metro">
                {Msges.map(msg=>
                <ul key={msg.id}>
                    [{msg.username}]
                </ul>)}
            </div>
            <button onClick={getMetro}>지도 클릭하면 다시</button>
        </div>
    )
}


export default MetroInfo;