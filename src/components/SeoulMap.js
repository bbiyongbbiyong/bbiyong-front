import "../css/SeoulMap.css";
import { useRef } from "react";

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

  const clickCity = (e) => {
    let text = "";
    if (cityRef.current === e.target) text = "서울은?";
    else {
      cityRef.current = e.target;
      text = cityRef.current.id + "는?";
    }

    nameRef.current.innerHTML = `지금 ${text}`;
  };

  const fillCity = (target) => {
    const a = "rgba(255, 0, 0, ";
    const b = `${0.05 * target.length})`;
    return a + b;
  };

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
              {/* <text x={ind} y={ind * 20 + 50}>
                {city.name}
              </text> */}
            </>
          ))}
        </g>
      </svg>
      <div ref={nameRef}> 지금 서울은? </div>
    </>
  );
}

export default SeoulMap;
