import "../css/SeoulMap.css";
import { useRef, useState } from "react";
import centerCoord from "./mapCoord";
import { useDispatch } from "react-redux";
import { changeClickCity } from "../redux/citySlice.js";

function SeoulMap() {
  let dispatch = useDispatch();

  const mapData = require("./mapData.json").data;
  const cities = mapData.map((city, ind) => {
    return {
      properties: city,
      data: [],
      length: ind + 1,
    };
  });

  const[clickSeoul, setClickSeoul] = useState(true);
  const[clickCityNum, setClickCityNum] = useState(null);

  const cityRef = useRef();
  const nameRef = useRef();

  const clickCity = (e, ind) => {
    let text = "";
    if (cityRef.current.id === e.target.id && !clickSeoul) {
      setClickSeoul(true);
      setClickCityNum(null);
      dispatch(changeClickCity([null, "서울"]))
      text = "서울은?";
    }
    else {
      setClickSeoul(false);
      setClickCityNum(ind);
      dispatch(changeClickCity([ind, e.target.id]));
      cityRef.current = e.target;
      text = cityRef.current.id + "는?";
    }
    nameRef.current.innerHTML = `지금 ${text}`;
  };

  const fillCity = (target) => {
    return `rgba(255, 0, 0, ${0.05 * target.length})`;
  };

  const nameCity = (ind) => {
    return "translate(" + centerCoord[ind][0] + ", " + centerCoord[ind][1] + ")";
  }

  return (
    <>
      <div id="map-container">
      <svg width="300" height="300" viewBox="0 0 800 500">
        {cities.map((city, ind) => (
          <g key={ind} ref={cityRef}>
            <path
              key={ind}
              id={city.properties.SIG_KOR_NM}
              d={city.properties.coord}
              onClick={(e) => clickCity(e, ind)}
              fill={fillCity(city)}
            />
            <text transform={nameCity(ind)} textAnchor="middle" className="name">
              {city.properties.SIG_KOR_NM}
            </text>
          </g>
        ))}
        
        {clickCityNum !== null &&
          <>
            <path
              id={cities[clickCityNum].properties.SIG_KOR_NM}
              d={cities[clickCityNum].properties.coord}
              onClick={clickCity}
              fill={fillCity(cities[clickCityNum])}
              className="selected" 
            /> 
            <text transform={nameCity(clickCityNum)} textAnchor="middle" className="name">
              {cities[clickCityNum].properties.SIG_KOR_NM}
            </text>
          </>
        }
      </svg>
      </div>
    
      <div ref={nameRef}> 지금 서울은? </div>
    </>
  );
}

export default SeoulMap;
