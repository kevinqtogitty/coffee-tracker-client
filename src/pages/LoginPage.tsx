import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/forms/UserLoginForm';
import { auth } from '../firebase/config';

interface Props {
  currentUserLoggedIn: boolean;
}

const LoginPage: React.FC<Props> = ({ currentUserLoggedIn }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUserLoggedIn) {
      navigate('/home');
    } else {
      navigate('/');
    }
  }, [currentUserLoggedIn]);

  return (
    <section className="login-page">
      <Form />
    </section>
  );
};

export default LoginPage;
