import React, { useState } from 'react';

import closeButton from '../assets/closeButton.svg';
import TextInput from '../components/TextInput';

import '../css/SigninModal.css';

const SigninModal = ({ closeSigninModal }) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const onClickCloseButton = () => closeSigninModal();

  const handleID = (e) => {
    setId(e.target.value);
  };

  const handlePW = (e) => {
    setPw(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`${id} / ${pw}로 로그인 시도`);
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
          <form onSubmit={onSubmit}>
            <TextInput label="ID" onChange={handleID} />
            <TextInput label="PW" onChange={handlePW} />
            <div id="submit-button-container">
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
