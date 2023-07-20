import React, { useEffect } from 'react';

import Router from './Router';
import './css/App.css';
import requestPermission from './utils/requestPermissionUtil';

function App() {
  useEffect(() => {
    requestPermission();
  }, []);
  return <Router />;
}

export default App;
