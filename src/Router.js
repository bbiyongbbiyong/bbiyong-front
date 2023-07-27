import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Container from './components/Container';
import Home from './pages/Home';
import Notification from './pages/Notification';
import Signup from './pages/Signup';

const Router = () => {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notify" element={<Notification />} />
          <Route path="/join" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default Router;
