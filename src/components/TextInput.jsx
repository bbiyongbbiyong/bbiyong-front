import React from 'react';
import '../css/TextInput.css';

const TextInput = ({ label, placeholder, type, pattern, onChange }) => {
  return (
    <div id="input-container">
      <p>{label}</p>
      <input placeholder={placeholder} type={type} pattern={pattern} onChange={onChange} />
    </div>
  );
};

TextInput.defaultProps = {
  placeholder: '',
  type: '',
  pattern: null,
};

export default TextInput;
