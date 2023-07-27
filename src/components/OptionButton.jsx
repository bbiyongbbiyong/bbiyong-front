import React from 'react';

import { getSubOptionName } from '../utils/categoryUtil';

import '../css/OptionButton.css';

const OptionButton = ({ label, onChange, checked }) => {
  const onChangeOption = (e) => {
    onChange(e.target.checked, label);
  };

  return (
    <div id="sub-category-container">
      <input type="checkbox" onChange={onChangeOption} id={label} checked={checked} hidden />
      <label htmlFor={label} id="sub-category-label">
        <span> {getSubOptionName(label)} </span>
      </label>
    </div>
  );
};

export default OptionButton;
