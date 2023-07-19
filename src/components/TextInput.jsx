import React from 'react';
import '../css/TextInput.css';

const TextInput = ({ label, placeholder, onChange }) => {
  return (
    <div id="input-container">
      <p>{label}</p>
      <input placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

TextInput.defaultProps = {
  placeholder: '',
};

export default TextInput;
