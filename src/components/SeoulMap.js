/* eslint-disable */
import "../css/SeoulMap.css";
import { useRef, useState } from "react";
import centerCoord from "./mapCoord";

function SeoulMap() {
  const mapData = require("./mapData.json").data;
  const cities = mapData.map((city, ind) => {
    return {
      properties: city,
      data: [],
      length: ind + 1,
    };
  });

  let [ clickSeoul, setClickSeoul ] = useState(true);
  let [ clickCityNum, setClickCityNum ] = useState(null);

  const cityRef = useRef();
  const nameRef = useRef();
  let seoulClicked = false;

  const clickCity = (e) => {
    // cityRef.current.classList.remove('selected')
    let text = "";
    if (cityRef.current.id === e.target.id && clickSeoul === false) {
      setClickSeoul(true);
      setClickCityNum(null);
      text = "서울은?";
    }
    else {
      seoulClicked = false;
      cityRef.current = e.target;
      setClickSeoul(false);
      cities.map((city, ind) => {
        if(cityRef.current.id === city.properties.SIG_KOR_NM)
          setClickCityNum(ind);
      })
      text = cityRef.current.id + "는?";
      // cityRef.current.classList.add('selected') ;
    }
    nameRef.current.innerHTML = `지금 ${text}`;
  };
  const fillCity = (target) => {
    const a = "rgba(255, 0, 0, ";
    const b = `${0.05 * target.length})`;
    return a + b;
  };

  const nameCity = (ind) => {
    return "translate(" + centerCoord[ind][0] + ", " + centerCoord[ind][1] + ")";
  }

  return (
    <>
      <svg width="300" height="300" viewBox="0 0 800 500">
        <g ref={cityRef}>
          {cities.map((city, ind) => (
            clickCityNum === ind && clickCityNum !== null ? null : 
            <>
              <path
                key={ind}
                id={city.properties.SIG_KOR_NM}
                d={city.properties.coord}    
                onClick={clickCity}
                fill={fillCity(city)}
              />
              <text transform={nameCity(ind)} textAnchor="middle" dy className="name">
                {city.properties.SIG_KOR_NM}
              </text>
            </>
          ))}
          {
            clickCityNum === null ? 
            <></> : 
            <>
            <path 
              id={cities[clickCityNum].properties.SIG_KOR_NM} 
              d={cities[clickCityNum].properties.coord} 
              onClick={clickCity} 
              fill={fillCity(cities[clickCityNum])} 
              className="selected" 
            /> 
            <text transform={"translate(" + centerCoord[clickCityNum][0] + ", " + centerCoord[clickCityNum][1] + ")"} textAnchor="middle" className="name">
              {cities[clickCityNum].properties.SIG_KOR_NM}
            </text>
            </>
          }
        </g>
      </svg>
      <div ref={nameRef}> 지금 서울은? </div>
    </>
  );
}

export default SeoulMap;
