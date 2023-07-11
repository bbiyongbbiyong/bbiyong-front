import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import axios from 'axios';

import centerCoord from '../data/mapCoord';
import { changeClickCity } from '../redux/citySlice';

import '../css/SeoulMap.css';

function SeoulMap() {
  const dispatch = useDispatch();

  // eslint-disable-next-line global-require
  const mapData = require('../data/mapData.json').data;
  const [cities, setCities] = useState([]);

  const [clickSeoul, setClickSeoul] = useState(true);
  const [clickCityNum, setClickCityNum] = useState(null);

  const cityRef = useRef();
  const nameRef = useRef();

  useEffect(() => {
    async function fillCitiesData() {
      const location = await axios.get('https://api.bbiyong-bbiyong.seoul.kr/location');
      setCities(
        mapData.map((city) => {
          return {
            properties: city,
            length: location.data.data[city.SIG_ID],
          };
        }),
      );
    }
    fillCitiesData();
  }, []);

  const selectCity = (e, ind) => {
    let text = '';
    if (cityRef.current.id === e.target.id && !clickSeoul) {
      setClickSeoul(true);
      setClickCityNum(null);
      dispatch(changeClickCity([null, '서울', 'seoul', 1]));
      text = '서울은?';
    } else {
      setClickSeoul(false);
      setClickCityNum(ind);
      dispatch(
        changeClickCity([
          ind,
          e.target.id,
          cities[ind].properties.SIG_ENG_NM,
          cities[ind].properties.SIG_ID,
        ]),
      );
      cityRef.current = e.target;
      text = `${cityRef.current.id}는?`;
    }
    nameRef.current.innerHTML = `지금 ${text}`;
  };

  const fillCity = (target) => {
    switch (true) {
      case target.length < 4:
        return 'white';

      case target.length < 7:
        return '#FBF0EF';

      case target.length < 10:
        return '#FDE0E1';

      case target.length < 14:
        return '#F7A7A5';

      default:
        return '#F58987';
    }
  };

  const nameCity = (ind) => {
    return `translate(${centerCoord[ind][0]}, ${centerCoord[ind][1]})`;
  };

  return (
    <>
      <div id="map-container">
        <svg width="300" height="250" viewBox="0 0 800 600">
          <rect width={60} height={25} x={50} y={-10} stroke="black" fill="white" />{' '}
          <text x={125} y={8}>
            0~3
          </text>
          <rect width={60} height={25} x={50} y={25} stroke="black" fill="#FBF0EF" />{' '}
          <text x={125} y={43}>
            4~6
          </text>
          <rect width={60} height={25} x={50} y={60} stroke="black" fill="#FDE0E1" />{' '}
          <text x={125} y={78}>
            7~9
          </text>
          <rect width={60} height={25} x={50} y={95} stroke="black" fill="#F7A7A5" />{' '}
          <text x={125} y={113}>
            10~12
          </text>
          <rect width={60} height={25} x={50} y={130} stroke="black" fill="#F58987" />{' '}
          <text x={125} y={148}>
            13 이상
          </text>
          {cities.map((city, ind) => (
            <g key={ind} ref={cityRef}>
              <path
                key={ind}
                id={city.properties.SIG_KOR_NM}
                d={city.properties.coord}
                onClick={(e) => selectCity(e, ind)}
                fill={fillCity(city)}
              />
              <text transform={nameCity(ind)} textAnchor="middle" className="name">
                {city.properties.SIG_KOR_NM}
              </text>
            </g>
          ))}
          {clickCityNum !== null && (
            <>
              <path
                id={cities[clickCityNum].properties.SIG_KOR_NM}
                d={cities[clickCityNum].properties.coord}
                onClick={selectCity}
                fill={fillCity(cities[clickCityNum])}
                className="selected"
              />
              <text transform={nameCity(clickCityNum)} textAnchor="middle" className="name">
                {cities[clickCityNum].properties.SIG_KOR_NM}
              </text>
            </>
          )}
        </svg>
      </div>

      <h2 ref={nameRef}> 지금 서울은? </h2>
    </>
  );
}

export default SeoulMap;
