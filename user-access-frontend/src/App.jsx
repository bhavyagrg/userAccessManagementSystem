import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginRoute, SignupRoute } from './routes/AuthRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginRoute />} />

        <Route path="/login" element={<LoginRoute />} />
        <Route path="/signup" element={<SignupRoute />} />

      </Routes>
    </Router>
  );
};

export default App;
