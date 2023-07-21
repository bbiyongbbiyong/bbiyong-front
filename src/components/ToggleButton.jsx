import React, { useEffect, useState } from 'react';

import OptionButton from './OptionButton';
import '../css/ToggleButton.css';

const ToggleButton = ({ label, onChange, index, options }) => {
  const [checkedOption, setCheckedOption] = useState(options);
  const checked = checkedOption.length > 0;

  const onChangeToggle = (e) => {
    if (e.target.checked) {
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
    }
  };

  useEffect(() => {
    if (!checked) onChange(index);
  }, [checked]);

  return (
    <>
      <div id="toggle-container">
        <p> {label} </p>
        <input type="checkbox" onChange={onChangeToggle} id={label} checked={checked} hidden />
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
