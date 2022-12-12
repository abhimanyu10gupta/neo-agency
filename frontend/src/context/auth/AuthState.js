import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    error: null,
  };

  const { user, getAccessTokenSilently } = useAuth0();


  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load user
  const loadUser = async () => {
    const domain = "fullstack-udacity.au.auth0.com";
    try{
      const accessToken = await getAccessTokenSilently()
        dispatch({
          type: LOGIN_SUCCESS,
          payload: accessToken,
        });
      
    } catch (error) {
      console.log('error')
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg,
      });
    }
    // if (localStorage.token) {
    //   setAuthToken(localStorage.token);
    // }
    // try {
    //   const res = await axios.get('/api/auth');

    //   dispatch({ type: USER_LOADED, payload: res.data });
    // } catch (err) {
    //   dispatch({ type: AUTH_ERROR });
    // }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

  // Login user
  const login = async (formData) => {
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };
    const domain = "fullstack-udacity.au.auth0.com";

    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
      })

      console.log('success')

        dispatch({
          type: LOGIN_SUCCESS,
          payload: accessToken,
        });
        loadUser();
      
    } catch (error) {
      console.log('error')
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

  // Logout
  const logout_app = () => {
    dispatch({ type: LOGOUT });
  };

  // Clear Errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout_app,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
