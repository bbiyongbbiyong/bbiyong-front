import React, { useState } from 'react';

import logo from '../assets/serviceLogo.svg';
import '../css/Signup.css';
import TextInput from '../components/TextInput';

const Signup = () => {
  const [id, setId] = useState();
  const [pw, setPw] = useState();
  const [confirmPw, setConfirmPw] = useState();

  const [isIdValid, setIsIdValid] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);

  const isSignupValid = isIdValid && isPwValid && isPasswordMatched;

  const handleID = (e) => {
    setId(e.target.value);
    setIsIdValid(!e.target.validity.patternMismatch);
  };

  const handlePW = (e) => {
    setPw(e.target.value);
    setIsPwValid(!e.target.validity.patternMismatch);
  };

  const handleConfirmPW = (e) => {
    setConfirmPw(e.target.value);
    setIsPasswordMatched(e.target.value === pw);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`${id} / ${pw}로 회원가입 시도`);
  };

  return (
    <div id="signup-container">
      <div id="signup-text">
        <h1> 회원가입</h1>
        <p> 회원가입 후 백그라운드 알림 기능을 설정하세요! </p>
      </div>

      <form id="signup-input-container" onSubmit={onSubmit}>
        <h5> 아이디 </h5>
        <TextInput
          label="ID"
          placeholder="6~12자리 영문, 숫자 사용"
          pattern="[a-z\d]{6,12}"
          onChange={handleID}
        />

        <h5> 비밀번호 </h5>
        <TextInput
          label="PW"
          placeholder="6~12자리 영문, 숫자 사용"
          type="password"
          pattern="[a-z\d]{6,12}"
          onChange={handlePW}
        />

        <h5> 비밀번호 확인 </h5>
        {confirmPw && !isPasswordMatched && <p> 비밀번호가 일치하지 않습니다</p>}
        <TextInput
          label="PW"
          placeholder="6~12자리 영문, 숫자 사용"
          type="password"
          onChange={handleConfirmPW}
        />
        <div id="submit-button-container">
          <button disabled={!isSignupValid}> 확인 </button>
        </div>
      </form>

      <div id="logo-container">
        <img src={logo} />
      </div>
    </div>
  );
};

export default Signup;
