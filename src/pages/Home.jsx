import React from 'react';

import Logo from '../assets/serviceLogo.svg';
import CheckBox from '../components/CheckBox';
import SeoulMap from '../components/SeoulMap';

import '../css/Home.css';

const Home = () => {
  return (
    <div>
      <div id="title-container">
        <img src={Logo} id="logo" />
        <h4 id="service-title">
          실시간 재난/교통 정보 모아보기&nbsp;
          <span>삐용삐용</span>
        </h4>
      </div>

      <SeoulMap />
      <CheckBox />
    </div>
  );
};

export default Home;
