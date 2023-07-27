import React, { useState, useRef, useEffect } from 'react';

import { getMiddlecategoryName } from '../utils/categoryUtil';

import OptionButton from './OptionButton';
import '../css/ToggleButton.css';

const ToggleButton = ({ label, onChange, index, options, lifting }) => {
  const SUB_OPTIONS = Object.keys(options);

  const [checkedOption, setCheckedOption] = useState(
    SUB_OPTIONS.filter((option) => options[option]),
  );
  const checked = checkedOption.length > 0;

  const toggleRef = useRef();

  const onChangeToggle = () => {
    if (toggleRef.current.checked) {
      setCheckedOption(SUB_OPTIONS);
    } else {
      setCheckedOption([]);
    }
    onChange(index);
  };

  const onChangeOption = (optionChecked, optionName) => {
    if (optionChecked) {
      setCheckedOption([...checkedOption, optionName]);
    } else {
      setCheckedOption(checkedOption.filter((option) => option !== optionName));
      if (checkedOption.length === 1) {
        toggleRef.current.checked = false;
        onChangeToggle();
      }
    }
  };

  useEffect(() => {
    const subOptionStatus = SUB_OPTIONS.reduce((status, optionName) => {
      status[optionName] = checkedOption.includes(optionName);
      return status;
    }, {});
    lifting(label, subOptionStatus);
  }, [checkedOption]);

  useEffect(() => {
    return () => {
      const subOptionStatus = SUB_OPTIONS.reduce((status, optionName) => {
        status[optionName] = false;
        return status;
      }, {});
      lifting(label, subOptionStatus);
    };
  }, []);

  return (
    <>
      <div id="toggle-container">
        <p> {getMiddlecategoryName(label)} </p>
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
        {SUB_OPTIONS.map((subOption, subOptionIndex) => (
          <OptionButton
            key={subOptionIndex}
            label={subOption}
            onChange={onChangeOption}
            checked={checkedOption.includes(subOption)}
          />
        ))}
      </div>
    </>
  );
};

export default ToggleButton;
