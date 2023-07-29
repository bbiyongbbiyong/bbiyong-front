import React, { useState, useEffect } from 'react';

import '../css/message.css';
import { getMonth, getDay, getHours } from '../utils/dateUtil';

import Chart from './Chart';

export default function SeoulMain() {
  const year = new Date().getFullYear();
  const month = getMonth();
  const day = getDay();
  const hours = getHours();

  // eslint-disable-next-line global-require
  const [, setLoading] = useState(false);
  const [Error, setError] = useState(null);
  const [fade, setFade] = useState('');

  const getInfo = async () => {
    try {
      setError(null);
      setLoading(true);
    } catch (e) {
      console.log('사고 유형 불러오기 실패');
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getInfo();
    setTimeout(() => {
      setFade('end');
    }, 100);
    return () => {
      setFade('');
    };
  }, []);

  if (Error) return <div>Error</div>;

  return (
    <div className={`seoul-main start ${fade}`}>
      <p className="seoul-main-date">
        {year}년 {month}월 {day}일 {hours}시 기준
      </p>
      <Chart />
    </div>
  );
}
