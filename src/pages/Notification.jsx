import React, { useEffect, useState } from 'react';

import notification from '../assets/notification.svg';
import ToggleButton from '../components/ToggleButton';

import '../css/Notification.css';

const Notification = () => {
  const MIDDLE_CATEGORY = ['자연재난', '사회재난', '지하철정보', '도로통제정보'];
  const SUB_CATEGORY = [
    [
      '태풍',
      '건조',
      '산불',
      '산사태',
      '홍수',
      '호우',
      '폭염',
      '안개',
      '풍랑',
      '미세먼지',
      '대조기',
      '가뭄',
      '대설',
      '지진해일',
      '지진',
      '한파',
      '황사',
      '강풍',
      '기타 자연재난',
    ],
    [
      '교통통제',
      '화재',
      '붕괴',
      '폭발',
      '교통사고',
      '환경오염사고',
      '에너지',
      '통신',
      '교통',
      '금융',
      '의료',
      '수도',
      '전염병',
      '정전',
      '가스',
      '실종',
      '기타 사회재난',
    ],
    [
      '1호선',
      '2호선',
      '3호선',
      '4호선',
      '5호선',
      '6호선',
      '7호선',
      '8호선',
      '9호선',
      '기타 지하철',
    ],
    ['도로사고', '집회/행사', '도로공사', '기타 도로통제'],
  ];

  const [toggleStatus, setToggleStatus] = useState([true, true, true, true]);
  const notifyOn = toggleStatus.includes(true);

  const handleAllToggleStatus = (checked) => {
    if (checked) {
      setToggleStatus([true, true, true, true]);
    } else {
      setToggleStatus([false, false, false, false]);
    }
  };

  const reverseToggleStatus = (index) => {
    setToggleStatus(
      toggleStatus.map((toggleChecked, toggleIndex) => {
        return index === toggleIndex ? !toggleChecked : toggleChecked;
      }),
    );
  };

  const handleToggleStatus = (index) => {
    reverseToggleStatus(index);
  };

  const onClickSave = () => {
    const requestData = { notifyOn, toggleStatus };
    console.log(requestData);
  };

  return (
    <div id="notification-page-container">
      <div id="onoff-box">
        <img src={notification} width="40" />
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
          MIDDLE_CATEGORY.map((category, index) => (
            <ToggleButton
              key={index}
              label={category}
              onChange={handleToggleStatus}
              index={index}
              options={SUB_CATEGORY[index]}
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
