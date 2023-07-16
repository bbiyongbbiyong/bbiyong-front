import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Notification from './pages/Notification';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notify" element={<Notification />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
