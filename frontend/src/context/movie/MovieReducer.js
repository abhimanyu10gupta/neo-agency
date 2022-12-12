import {
    ADD_MOVIE,
    DELETE_MOVIE,
    UPDATE_MOVIE,
    MOVIE_ERROR,
    GET_MOVIES,
    CLEAR_MOVIES,
    SET_CURRENT,
    CLEAR_CURRENT,
    MOVIE_LOADING
  } from '../types';
  
  export default (state, action) => {
    switch (action.type) {
        case MOVIE_LOADING:
            console.log('loading hit')
            return {
                ...state,
                loading: action.payload
            }
      case GET_MOVIES:
        console.log(action.payload)
        return {
          ...state,
          movies: action.payload,
          loading: false,
        };
      case ADD_MOVIE:
        return {
          ...state,
          movies: [action.payload, ...state.movies],
          loading: false,
        };
      case DELETE_MOVIE:
        return {
          ...state,
          movies: state.movies.filter(
            (movie) => movie.id !== action.payload
          ),
          loading: false,
        };
      case CLEAR_MOVIES:
        return {
          ...state,
          movies: null,
          error: null,
          current: null,
        };
      case SET_CURRENT:
        return {
          ...state,
          current: action.payload,
        };
      case CLEAR_CURRENT:
        return {
          ...state,
          current: null,
        };
      case UPDATE_MOVIE:
        return {
          ...state,
          movies: state.movies.map((movie) =>
            movie.id === action.payload.id ? action.payload : movie
          ),
          loading: false,
        };
      case MOVIE_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  