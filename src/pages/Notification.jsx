import React, { useState } from 'react';

import notification from '../assets/notification.svg';
import ToggleButton from '../components/ToggleButton';

import '../css/Notification.css';

const Notification = () => {
  const TEST_DATA = {
    naturalDisaster: {
      typhoon: true,
      fineDust: false,
      dry: false,
      springTide: false,
      forestFires: false,
      drought: false,
      landslide: false,
      heavySnow: false,
      flood: false,
      tsunami: false,
      downpour: false,
      earthquake: false,
      heatWave: false,
      coldWave: false,
      fog: false,
      yellowDust: false,
      windWave: false,
      gale: false,
      naturalEtc: false,
    },
    socialDisaster: {
      trafficControl: false,
      medical: false,
      fireAlert: true,
      waterAlert: false,
      collapse: false,
      epidemic: false,
      explosion: false,
      blackout: false,
      trafficAccident: false,
      gas: false,
      envPollution: false,
      missing: false,
      energy: false,
      traffic: false,
      communication: false,
      socialEtc: false,
    },
    subwayInformation: {
      line1: false,
      line2: true,
      line3: false,
      line4: false,
      line5: false,
      line6: false,
      line7: false,
      line8: false,
      line9: false,
      incheonLine1: false,
      incheonLine2: false,
      westcoastLine1: false,
      geongangLine: false,
      airportLine: false,
      bundangLine: false,
      dxLine: false,
      uiLine: false,
      yonginLine: false,
      ulrtLine: false,
      gimpoLine: false,
      sillimLine: false,
      geongchunLine: false,
      gyoungiLine: false,
      lineEtc: false,
    },
    roadControlInformation: {
      roadAccident: false,
      roadWorks: false,
      rallyEvent: false,
      roadEtc: true,
    },
  };
  const [notificationStatus, setNotificationStatus] = useState(new Map(Object.entries(TEST_DATA)));

  const [toggleStatus, setToggleStatus] = useState([true, true, true, true]);
  const notifyOn = toggleStatus.includes(true);

  const handleAllToggleStatus = (checked) => {
    if (checked) {
      setToggleStatus([true, true, true, true]);
    } else {
      setToggleStatus([false, false, false, false]);
    }
  };

  const handleToggleStatus = (index) => {
    setToggleStatus(
      toggleStatus.map((toggleChecked, toggleIndex) => {
        return index === toggleIndex ? !toggleChecked : toggleChecked;
      }),
    );
  };

  const updateNotificationStatus = (middleCategory, subOptionStatus) => {
    setNotificationStatus(new Map(notificationStatus.set(middleCategory, subOptionStatus)));
  };

  const onClickSave = () => {
    const requestData = {
      notifyOn,
      notificationList: [...notificationStatus].reduce((object, [key, value]) => {
        object[key] = value;
        return object;
      }, {}),
    };
    console.log(requestData);
  };

  return (
    <div id="notification-page-container">
      <div id="onoff-box">
        <img src={notification} width="30" />
        <p> 알림설정 </p>
        <input
          type="checkbox"
          onChange={(e) => {
            handleAllToggleStatus(e.target.checked);
          }}
          id="알림설정"
          checked={notifyOn}
          hidden
        />
        <label htmlFor="알림설정" className="toggleSwitch">
          <span className="toggleButton"></span>
        </label>
      </div>

      <div id="notification-content-box">
        {notifyOn ? (
          Object.keys(TEST_DATA).map((middleCategory, index) => (
            <ToggleButton
              key={index}
              label={middleCategory}
              onChange={handleToggleStatus}
              index={index}
              options={TEST_DATA[middleCategory]}
              lifting={updateNotificationStatus}
            />
          ))
        ) : (
          <div id="notify-none"> 현재 수신 받는 알림이 없습니다</div>
        )}
      </div>

      <div id="setting-submit-container">
        <button id="setting-submit-button" onClick={onClickSave}>
          저장
        </button>
      </div>
    </div>
  );
};

export default Notification;
