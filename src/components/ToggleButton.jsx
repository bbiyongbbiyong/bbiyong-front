import React, { useState, useRef } from 'react';

import OptionButton from './OptionButton';
import '../css/ToggleButton.css';

const ToggleButton = ({ label, onChange, index, options }) => {
  const [checkedOption, setCheckedOption] = useState(options);
  const checked = checkedOption.length > 0;

  const toggleRef = useRef();

  const onChangeToggle = () => {
    if (toggleRef.current.checked) {
      setCheckedOption(options);
    } else {
      setCheckedOption([]);
    }
    onChange(index);
  };

  const onChangeOption = (optionChecked, optionIndex) => {
    if (optionChecked) {
      setCheckedOption([...checkedOption, options[optionIndex]]);
    } else {
      setCheckedOption(checkedOption.filter((option) => option !== options[optionIndex]));
      if (checkedOption.length === 1) {
        toggleRef.current.checked = false;
        onChangeToggle();
      }
    }
  };

  return (
    <>
      <div id="toggle-container">
        <p> {label} </p>
        <input
          type="checkbox"
          ref={toggleRef}
          onChange={onChangeToggle}
          id={label}
          checked={checked}
          hidden
        />
        <label htmlFor={label} className="toggleSwitch">
          <span className="toggleButton"></span>
        </label>
      </div>

      <div id="option-container">
        {options.map((option, optionIndex) => (
          <OptionButton
            key={optionIndex}
            option={option}
            index={optionIndex}
            onChange={onChangeOption}
            checked={checkedOption.includes(options[optionIndex])}
          />
        ))}
      </div>
    </>
  );
};

export default ToggleButton;
