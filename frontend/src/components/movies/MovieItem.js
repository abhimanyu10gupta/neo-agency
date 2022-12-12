import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import MovieContext from '../../context/movie/MovieContext';
import ActorContext from '../../context/actor/ActorContext';
const MovieItem = ({ movie }) => {
  const movieContext = useContext(MovieContext);
  const actorContext = useContext(ActorContext);
  const { actors, getActors } = actorContext;

  const { deleteMovie, setCurrent, clearCurrent } = movieContext;
  if(movie === undefined) {
    return null;
  }
  const { id, title, releaseDate } = movie;

  const onDelete = () => {
    deleteMovie(id);
    clearCurrent();
  };
  const onEdit = () => {
    setCurrent(movie);
  }

  const getActorsForMovie= () => {
    setCurrent(movie);
    getActors(id);
  }

  return (
    <tr key={id}>
        <td>{id}</td>
        <td>{title}</td>
        <td>{releaseDate}</td>
        <td><button onClick={onDelete}>Delete</button></td>
        <td><button onClick={onEdit}>Edit </button></td>
        <td><button onClick={getActorsForMovie}> Actors</button></td>
    </tr>
  );
};

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieItem;
