import React from 'react';

import '../css/OptionButton.css';

const OptionButton = ({ option, onChange, index, checked }) => {
  const onChangeOption = (e) => {
    onChange(e.target.checked, index);
  };

  return (
    <div id="sub-category-container">
      <input type="checkbox" onChange={onChangeOption} id={option} checked={checked} hidden />
      <label htmlFor={option} id="sub-category-label">
        <span> {option} </span>
      </label>
    </div>
  );
};

export default OptionButton;
