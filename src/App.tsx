import { Auth, getAuth, onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate
} from 'react-router-dom';
import Form from './components/Form';
import { app } from './firebase/config';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { AuthRoutes } from './utils/AuthRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route element={<HomePage />} path="/home" />
        </Route>
        <Route element={<LoginPage />} path="/" />
      </Routes>
    </Router>
  );
}

export default App;
