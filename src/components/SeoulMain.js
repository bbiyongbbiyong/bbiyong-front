import React, { useState, useEffect } from 'react';

import axios from 'axios';

import '../css/message.css';
import accidentType from '../data/accidentType.js';
import { getMonth, getDay, getHours } from '../utils/dateUtil';

export default function SeoulMain() {
  const year = new Date().getFullYear();
  const month = getMonth();
  const day = getDay();
  const hours = getHours();

  // eslint-disable-next-line global-require
  const mapData = require('../data/mapData.json').data;

  const [Accident, setAccident] = useState(null);
  const [, setLoading] = useState(false);
  const [Error, setError] = useState(null);
  const [fade, setFade] = useState('');

  const getinfo = async () => {
    try {
      setError(null);
      setAccident(null);
      setLoading(true);
      const response = await axios.get('https://api.bbiyong-bbiyong.seoul.kr/accident/most');
      setAccident(response.data);
    } catch (e) {
      console.log('사고 유형 불러오기 실패');
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getinfo();
    setTimeout(() => {
      setFade('end');
    }, 100);
    return () => {
      setFade('');
    };
  }, []);

  if (Error) return <div>Error</div>;
  if (!Accident) return null;

  const city = mapData[Accident.data.locationId - 2].SIG_KOR_NM;
  const accidentName = accidentType[Accident.data.accidentType];

  return (
    <div className={`seoul-main start ${fade}`}>
      <p className="seoul-main-date">
        {year}년 {month}월 {day}일 {hours}시 기준
      </p>
      <p>
        지난 일주일 간<br />
        <span className="seoul-main-city">{city}</span>에서{' '}
        <span className="seoul-main-accident">{accidentName}</span>(이)가
        <br />
        가장 많이 발생했어요.
      </p>
      <p>
        {city}를 지나실 때는
        <br />
        {accidentName}에 주의하세요 :)
      </p>
    </div>
  );
}
