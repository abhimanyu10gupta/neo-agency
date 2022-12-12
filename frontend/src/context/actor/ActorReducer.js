import {
    ADD_ACTOR,
    DELETE_ACTOR,
    UPDATE_ACTOR,
    GET_ACTORS,
    CLEAR_ACTORS,
    ACTOR_ERROR,
    SET_CURRENT,
    CLEAR_CURRENT,
  } from '../types';
  
  export default (state, action) => {
    switch (action.type) {
      case GET_ACTORS:
        console.log(action.payload)
        return {
          ...state,
          actors: action.payload,
          loading: false,
        };
      case ADD_ACTOR:
        return {
          ...state,
          actors: [action.payload, ...state.actors],
          loading: false,
        };
      case DELETE_ACTOR:
        return {
          ...state,
          actors: state.actors.filter(
            (actor) => actor.id !== action.payload
          ),
          loading: false,
        };
      case CLEAR_ACTORS:
        return {
          ...state,
          actors: null,
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
      case UPDATE_ACTOR:
        return {
          ...state,
          actors: state.actors.map((actor) =>
            actor._id === action.payload.id ? action.payload : actor
          ),
          loading: false,
        };
      case ACTOR_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  