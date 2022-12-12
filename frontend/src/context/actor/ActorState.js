import React, { useReducer } from 'react';
import ActorContext from './ActorContext';
import ActorReducer from './ActorReducer';
import axios from 'axios';

import {
    ADD_ACTOR,
    DELETE_ACTOR,
    UPDATE_ACTOR,
    GET_ACTORS,
    ACTOR_ERROR,
    CLEAR_ACTORS,
    SET_CURRENT,
    CLEAR_CURRENT,
} from '../types';

const ActorState = (props) => {
  const initialState = {
    actors: null,
    current: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(ActorReducer, initialState);

  // get contacts
  const getActors = async (id) => {
    try {
      const res = await axios.get(`/api/movies/${id}/actors`);

      dispatch({
        type: GET_ACTORS,
        payload: res.data.actors,
      });
    } catch (err) {
      dispatch({
        type: ACTOR_ERROR,
        payload: err.response.data,
      });
    }
  };

  // Add Contact
  const addActor = async (actor, movieId) => {
    try {
      const res = await axios.post(`/api/movies/${movieId}/actors`, actor);

      dispatch({
        type: ADD_ACTOR,
        payload: res.data.actors,
      });
    } catch (err) {
      dispatch({
        type: ActorContext,
        payload: err.response.data,
      });
    }
  };
  // Delete Contact
  const deleteActor = async (id) => {
    try {
      const res = await axios.delete(`/api/actors/${id}`);
      dispatch({
        type: DELETE_ACTOR,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: ACTOR_ERROR,
        payload: err.response.data,
      });
    }
  };

  //update contact
  const updateActor = async (actor) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.patch(
        `/api/actors/${actor.id}`,
        actor,
        config
      );

      dispatch({
        type: UPDATE_ACTOR,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ActorContext,
        payload: err.response.data,
      });
    }
  };

  // Clear Contacts
  const clearActors = () => {
    dispatch({ type: CLEAR_ACTORS });
  };

  //set current contact
  const setCurrent = (actor) => {
    dispatch({ type: SET_CURRENT, payload: actor });
  };
  //clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };


  return (
    <ActorContext.Provider
      value={{
        actors: state.actors,
        current: state.current,
        error: state.error,
        addActor,
        deleteActor,
        updateActor,
        clearActors,
        getActors,
        setCurrent,
        clearCurrent,
      }}
    >
      {props.children}
    </ActorContext.Provider>
  );
};

export default ActorState;
