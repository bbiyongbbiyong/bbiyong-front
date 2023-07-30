import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { getMessaging, getToken } from 'firebase/messaging';

import notification from '../assets/notification.svg';
import ToggleButton from '../components/ToggleButton';
import { firebaseVapidKey } from '../data/firebaseConfig';

import '../css/Notification.css';

const Notification = () => {
  const messaging = getMessaging();
  const [notificationStatus, setNotificationStatus] = useState(new Map());

  const [toggleStatus, setToggleStatus] = useState([]);
  const [notifyOn, setNotifyOn] = useState(false);

  const navigate = useNavigate();

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
      memberId: 0,
      notifyOn,
      notificationList: [...notificationStatus].reduce((object, [key, value]) => {
        object[key] = value;
        return object;
      }, {}),
    };

    try {
      axios.post('https://api.bbiyong-bbiyong.seoul.kr/notification/save/topic', requestData);
      navigate('/');
    } catch (e) {
      alert('설정 저장 중 에러가 발생했습니다! 잠시 후 다시 시도해주세요');
    }
  };

  useEffect(() => {
    if (toggleStatus.filter((status) => status).length > 0) {
      setNotifyOn(true);
    } else {
      setNotifyOn(false);
    }
  }, [toggleStatus]);

  useEffect(() => {
    getToken(messaging, {
      vapidKey: firebaseVapidKey,
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log(currentToken);
          // TODO: 서버에 토큰 전송
        } else {
          console.log('FCM 토큰이 없습니다.');
        }
      })
      .catch((error) => {
        console.log('FCM 토큰 가져오기 오류 : ', error);
      });
    const getNotificationList = async () => {
      const response = await axios.get(
        'https://api.bbiyong-bbiyong.seoul.kr/notification/0/get/topic',
      );

      setNotificationStatus(
        Object.keys(response.data.data.notificationList).reduce((map, key) => {
          map.set(key, response.data.data.notificationList[key]);
          return map;
        }, new Map()),
      );

      if (response.data.data.notifyOn) {
        setToggleStatus(
          Object.values(response.data.data.notificationList).reduce((status, middleCategory) => {
            const hasTrue = Object.values(middleCategory).includes(true);
            status.push(hasTrue);
            return status;
          }, []),
        );
      }
    };

    getNotificationList();
  }, []);

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
        {notifyOn && notificationStatus.size ? (
          Array.from(notificationStatus.keys()).map((middleCategory, index) => (
            <ToggleButton
              key={index}
              label={middleCategory}
              onChange={handleToggleStatus}
              index={index}
              options={notificationStatus.get(middleCategory)}
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
