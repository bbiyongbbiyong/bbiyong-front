import React, { useState } from 'react';

import notification from '../assets/notification.svg';
import ToggleButton from '../components/ToggleButton';

import '../css/Notification.css';

const Notification = () => {
  const MIDDLE_CATEGORY = ['자연재난', '사회재난', '지하철정보', '도로통제정보'];

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
    <>
      <div>
        <img src={notification} width="30" />
        <div id="toggle-container">
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
      </div>

      {notifyOn ? (
        MIDDLE_CATEGORY.map((category, index) => (
          <ToggleButton key={index} label={category} onChange={handleToggleStatus} index={index} />
        ))
      ) : (
        <div> 현재 수신 받는 알림이 없습니다</div>
      )}

      <button onClick={onClickSave}> 저장 </button>
    </>
  );
};

export default Notification;
