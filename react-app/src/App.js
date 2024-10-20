// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/signin';
import SignUp from './components/signup';
import HomePage from './components/homepage';
import UploadFilePage from './components/uploadfilepage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Default route */}
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/uploadfilepage" element={<UploadFilePage />} /> {/* File upload page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

