import React, { useState } from 'react';

import '../css/ToggleButton.css';

const ToggleButton = ({ label, onChange, index }) => {
  const [checked, setChecked] = useState(true);

  const onChangeToggle = () => {
    setChecked(!checked);
    onChange(index);
  };

  return (
    <div id="toggle-container">
      <p> {label} </p>
      <input type="checkbox" onChange={onChangeToggle} id={label} checked={checked} hidden />
      <label htmlFor={label} className="toggleSwitch">
        <span className="toggleButton"></span>
      </label>
    </div>
  );
};

export default ToggleButton;
