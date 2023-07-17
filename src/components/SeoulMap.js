import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import notification from '../assets/notification.svg';
import centerCoord from '../data/mapCoord';
import { changeClickCity } from '../redux/citySlice';

import '../css/SeoulMap.css';

function SeoulMap() {
  const currentCity = useSelector((state) => state.city);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // eslint-disable-next-line global-require
  const mapData = require('../data/mapData.json').data;
  const [cities, setCities] = useState([]);
  const [currentCityIndex, setCurrentCityIndex] = useState(currentCity.index);

  const selectCity = (e, ind) => {
    if (currentCity.ind === e.target.id || ind === undefined) {
      setCurrentCityIndex(null);
      dispatch(changeClickCity([null, '서울', 'seoul', 1]));
    } else {
      setCurrentCityIndex(ind);
      dispatch(
        changeClickCity([
          ind,
          e.target.id,
          cities[ind].properties.SIG_ENG_NM,
          cities[ind].properties.SIG_ID,
        ]),
      );
    }
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

  const onClickNotification = () => {
    navigate('/notify');
  };

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
          <image
            href={notification}
            height="80"
            width="80"
            x={700}
            y={-40}
            onClick={onClickNotification}
          />
          <text x={710} y={50} fill="#6F6F6F">
            알림 설정
          </text>
          {cities.map((city, ind) => (
            <g key={ind}>
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
          {cities.length !== 0 && currentCityIndex !== null && (
            <>
              <path
                id={cities[currentCityIndex].properties.SIG_KOR_NM}
                d={cities[currentCityIndex].properties.coord}
                onClick={selectCity}
                fill={fillCity(cities[currentCityIndex])}
                className="selected"
              />
              <text transform={nameCity(currentCityIndex)} textAnchor="middle" className="name">
                {cities[currentCityIndex].properties.SIG_KOR_NM}
              </text>
            </>
          )}
        </svg>
      </div>

      <h2>
        지금 {currentCity.cityName_KOR}
        {currentCity.cityName_KOR === '서울' ? '은' : '는'}?
      </h2>
    </>
  );
}

export default SeoulMap;
