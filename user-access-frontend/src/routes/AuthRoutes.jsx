import React from 'react';
import LoginForm from '../pages/LoginForm';
import SignupForm from '../pages/SignupForm';

const LoginRoute = () => {
  return (
    <LoginForm />
  );
};

const SignupRoute = () => {
  return (
    <SignupForm />
  );
};

export { LoginRoute, SignupRoute };