import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginRoute, SignupRoute } from './routes/AuthRoutes';
import { CreateSoftwareRoute } from './routes/SoftwareRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginRoute />} />

        <Route path="/login" element={<LoginRoute />} />
        <Route path="/signup" element={<SignupRoute />} />
        <Route path="/create-software" element={<CreateSoftwareRoute />} />


      </Routes>
    </Router>
  );
};

export default App;
