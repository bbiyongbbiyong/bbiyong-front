import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const currentMember = useSelector((state) => state.member);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentMember.signed) {
      alert('로그인 후 이용 가능한 서비스입니다.');
      navigate('/');
    }
  }, []);

  return <div>알림 설정 페이지</div>;
};

export default Notification;
