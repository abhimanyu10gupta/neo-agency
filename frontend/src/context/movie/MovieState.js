import React, { useReducer } from 'react';
import MovieContext from './MovieContext';
import MovieReducer from './MovieReducer';
import axios from 'axios';

import {
  SET_CURRENT,
  CLEAR_CURRENT,
  ADD_MOVIE,
  DELETE_MOVIE,
  UPDATE_MOVIE,
  MOVIE_ERROR,
  GET_MOVIES,
  CLEAR_MOVIES
} from '../types';

// const instance = axios.create({
//     baseURL: 'https://localhost:5000/',
//     timeout: 1000,
//     headers: {'X-Custom-Header': 'foobar'}
//   });

axios.defaults.baseURL = 'http://127.0.0.1:5000/';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const MovieState = (props) => {
  const initialState = {
    movies: null,
    current: null,
    error: null,
    loading: false,
  };


  const [state, dispatch] = useReducer(MovieReducer, initialState);

  const setLoading = (status)=>dispatch({type:'MOVIE_LOADING', payload: status})
  // get contacts
  const getMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/movies');

      dispatch({
        type: GET_MOVIES,
        payload: res.data.movies,
      });
    } catch (err) {
      dispatch({
        type: MOVIE_ERROR,
        payload: err.data.message,
      });
    }
  };

  // Add Contact
  const addMovie = async (movie) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/movies', movie);
      dispatch({
        type: ADD_MOVIE,
        payload: res.movies,
      });
    } catch (err) {
      dispatch({
        type: MOVIE_ERROR,
        payload: err.message,
      });
    }
  };
  // Delete Contact
  const deleteMovie = async (id) => {
    try {
      const res = await axios.delete(`/api/movies/${id}`);
      dispatch({
        type: DELETE_MOVIE,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: MOVIE_ERROR,
        payload: err.response.data,
      });
    }
  };

  //update contact
  const updateMovie = async (movie) => {
    try {
      const res = await axios.patch(
        `/api/movies/${movie.id}`,
        movie,
      );

      dispatch({
        type: UPDATE_MOVIE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: MOVIE_ERROR,
        payload: err.response.data,
      });
    }
  };

  // Clear Contacts
  const clearMovies = () => {
    dispatch({ type: CLEAR_MOVIES });
  };

  //set current contact
  const setCurrent = (movie) => {
    dispatch({ type: SET_CURRENT, payload: movie });
  };
  //clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

//   //filter contacts
//   const filterContacts = (text) => {
//     dispatch({ type: FILTER_CONTACTS, payload: text });
//   };
//   //clear filter
//   const clearFilter = () => {
//     dispatch({ type: CLEAR_FILTER });
//   };

  return (
    <MovieContext.Provider
      value={{
        movies: state.movies,
        current: state.current,
        error: state.error,
        loading: state.loading,
        addMovie,
        deleteMovie,
        updateMovie,
        getMovies,
        clearMovies,
        setCurrent,
        clearCurrent,
        setLoading,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieState;
