import React from 'react';

import '../css/Container.css';

const Container = ({ children }) => {
  return <div id="main-container"> {children} </div>;
};

export default Container;
