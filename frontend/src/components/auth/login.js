import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/AlertContext';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


export const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  let navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { login, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert } = alertContext;
  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields.', 'danger');
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <div>
    {/*<div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form> */}
      <button onClick={() => loginWithRedirect()}>Log In With Auth0</button>
    </div>
  );
};

export default Login;
