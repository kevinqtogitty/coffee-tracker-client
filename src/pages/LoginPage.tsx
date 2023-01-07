import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/forms/UserLoginForm';
import { auth } from '../firebase/config';

interface Props {
  currentUser: boolean;
}

const LoginPage: React.FC<Props> = ({ currentUser }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate('/home');
    } else {
      navigate('/');
    }
  }, [currentUser]);

  return (
    <section className="login-page">
      <Form />
    </section>
  );
};

export default LoginPage;
