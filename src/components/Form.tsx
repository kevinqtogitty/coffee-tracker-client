import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { useForm } from 'react-hook-form';
import {
  createANewUserWithEmailAndPassword,
  signInUser
} from '../firebase/auth';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Form: React.FC = () => {
  return (
    <Tabs.Root className="tabs-root" defaultValue="sign-in">
      <Tabs.List className="tabs-list" aria-label="Sign up or sign in form">
        <Tabs.Trigger className="tabs-trigger" value="sign-in">
          Sign In
        </Tabs.Trigger>
        <Tabs.Trigger className="tabs-trigger" value="sign-up">
          Sign Up
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="sign-in">
        <SignInForm />
      </Tabs.Content>
      <Tabs.Content value="sign-up">
        <SignUpForm />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default Form;

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const createAccount = (data: any) => {
    createANewUserWithEmailAndPassword(
      data.email,
      data.password,
      data.firstName,
      data.lastName
    );
  };

  return (
    <form
      className="sign-up-form"
      onSubmit={handleSubmit((data) => createAccount(data))}
    >
      <div className="form-input-label-container">
        <label htmlFor="firstName">First name:</label>
        <input
          type="text"
          {...register('firstName', {
            required: 'This is required',
            maxLength: {
              value: 30,
              message: 'Max length is 30 chars'
            }
          })}
        />
        <span className="form-error-span">{errors.firstName?.message}</span>
      </div>
      <div className="form-input-label-container">
        <label htmlFor="lastName">Last name:</label>
        <input
          type="text"
          {...register('lastName', {
            required: 'This is required',
            maxLength: {
              value: 50,
              message: 'Max length is 50 chars'
            }
          })}
        />
      </div>
      <span className="form-error-span">{errors.lastName?.message}</span>

      <div className="form-input-label-container">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          {...register('email', { required: 'This is required' })}
        />
      </div>
      <span className="form-error-span">{errors.email?.message}</span>

      <div className="form-input-label-container">
        <label htmlFor="password">Password:</label>
        <input
          type="paswword"
          {...register('password', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length is 4' }
          })}
        />
        <span className="form-error-span">{errors.password?.message}</span>
      </div>
      <div className="form-input-label-container">
        <label htmlFor="confirm-password">Confirm password:</label>
        <input
          type="password"
          {...register('confirmPassword', { required: 'This is required' })}
        />
        <span className="form-error-span">
          {errors.confirmPassword?.message}
        </span>
      </div>
      <button className="submit-button" type="submit">
        Create account
      </button>
    </form>
  );
};

const SignInForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const auth = getAuth();
  const navigate = useNavigate();
  const signIn = async (data: { email: string; password: string }) => {
    try {
      await signInUser(data.email, data.password);
      if (auth.currentUser) {
        navigate('/home');
      }
    } catch (error) {
      navigate('/');
    }
  };

  return (
    <form
      className="sign-in-form"
      onSubmit={handleSubmit((data) => signIn(data))}
    >
      <div className="form-input-label-container">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          {...register('email', { required: 'This is required' })}
        />
        <span className="form-error-span">{errors.email?.message}</span>
      </div>
      <div className="form-input-label-container">
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          {...register('password', { required: 'This is required' })}
        />
      </div>
      <span className="form-error-span">{errors.password?.message}</span>
      <button className="submit-button">Sign in</button>
    </form>
  );
};
