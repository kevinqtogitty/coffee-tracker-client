import { Auth, getAuth, User } from 'firebase/auth';
import React from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';

//Protected route only for people logged in
const AuthRoutes: React.FC = (): JSX.Element => {
  return auth.currentUser ? <Outlet /> : <Navigate to="/" />;
};

export { AuthRoutes };
