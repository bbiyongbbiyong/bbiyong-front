import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import closeButton from '../assets/closeButton.svg';
import TextInput from '../components/TextInput';
import { setMember } from '../redux/memberReducer';

import '../css/SigninModal.css';

const SigninModal = ({ closeSigninModal }) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickCloseButton = () => closeSigninModal();

  const handleID = (e) => {
    setId(e.target.value);
  };

  const handlePW = (e) => {
    setPw(e.target.value);
  };

  const signin = async () => {
    const loginDispatch = (member) => dispatch(setMember(member));
    const signinData = {
      id,
      pw,
    };
    try {
      const response = await axios.post('api url', signinData);
      loginDispatch(response.data);
      navigate('/notification');
    } catch (e) {
      if (e.response.status === 422) {
        setError('에러 메시지');
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
          {error && <p id="signin-error-message"> ID 또는 PW를 잘못 입력했음 </p>}
          <form onSubmit={onSubmit}>
            <TextInput label="ID" onChange={handleID} />

            <TextInput label="PW" onChange={handlePW} />
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
