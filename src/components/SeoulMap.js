import "../css/SeoulMap.css";
import { useRef } from "react";
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

  const cityRef = useRef();
  const nameRef = useRef();
  let seoulClicked = false;

  const clickCity = (e) => {
    let text = "";
    cityRef.current.classList.remove('selected')
    
    if (cityRef.current === e.target && seoulClicked === false) {
      seoulClicked = true;
      text = "서울은?";
    }
    else {
      seoulClicked = false;
      cityRef.current = e.target;
      text = cityRef.current.id + "는?";
      cityRef.current.classList.add('selected') 
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
        </g>
      </svg>
      <div ref={nameRef}> 지금 서울은? </div>
    </>
  );
}

export default SeoulMap;
