import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import closeButton from '../assets/closeButton.svg';
import TextInput from '../components/TextInput';
import { setMember } from '../redux/memberReducer';
import { setToken } from '../utils/tokenUtil';

import '../css/SigninModal.css';

const SigninModal = ({ closeSigninModal }) => {
  const [accountId, setAccountId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickCloseButton = () => closeSigninModal();

  const handleID = (e) => {
    setAccountId(e.target.value);
  };

  const handlePW = (e) => {
    setPassword(e.target.value);
  };

  const signin = async () => {
    const loginDispatch = (member) => dispatch(setMember(member));
    const signinData = {
      accountId,
      password,
    };
    try {
      const response = await axios.post('https://api.bbiyong-bbiyong.seoul.kr/login', signinData);
      setToken(response.data.data);
      loginDispatch(signinData);
      navigate('/notify');
    } catch (e) {
      if (e.response.status === 500) {
        // 상태코드 수정 예정 (500 -> 409)
        setError(e.response.data.message);
      } else {
        alert('로그인 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요');
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signin();
  };

  return (
    <div
      id="signin-modal-container"
      onClick={(e) => {
        if (e.target.id === 'signin-modal-container') {
          e.stopPropagation();
          onClickCloseButton();
        }
      }}
    >
      <div id="signin-modal">
        <button id="signin-modal-close" onClick={onClickCloseButton}>
          <img src={closeButton} alt="" />
        </button>

        <div id="signin-content">
          <h4> Login </h4>
          <p id="signin-message"> 로그인이 필요한 서비스입니다. </p>
          {error && <p id="signin-error-message"> {error} </p>}
          <form onSubmit={onSubmit}>
            <TextInput label="ID" onChange={handleID} />

            <TextInput label="PW" type="password" onChange={handlePW} />
            <div id="join-submit-button-container">
              <a href="/join"> 회원가입 </a>
              <button> 확인 </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninModal;
