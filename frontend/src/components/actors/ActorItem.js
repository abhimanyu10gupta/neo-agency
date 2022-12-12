import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import ActorContext from '../../context/actor/ActorContext';

const ActorItem = ({ actor }) => {
  const actorContext = useContext(ActorContext);

  const { deleteActor, setCurrent, clearCurrent } = actorContext;
  if(actor === undefined) {
    return null;
  }
  const { id, name, age, gender, movie_id} = actor;
  const onDelete = () => {
    deleteActor(id);
    clearCurrent();
  };
  const onEdit = () => {
    setCurrent(actor);
  }

  return (
    <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{age}</td>
        <td>{gender}</td>
        <td>{movie_id}</td>
        <td><button onClick={onDelete}>Delete</button></td>
        <td><button onClick={onEdit}>Edit </button></td>
    </tr>
  );
};

ActorItem.propTypes = {
  actor: PropTypes.object.isRequired,
};

export default ActorItem;
