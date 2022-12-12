import React, { useState, useContext, useEffect } from 'react';
import ActorContext from '../../context/actor/ActorContext';
import MovieContext from '../../context/movie/MovieContext';

const ActorForm = () => {
  const actorContext = useContext(ActorContext);
  const { addActor, current, clearCurrent, updateActor } = actorContext;
  const movieContext = useContext(MovieContext);
  useEffect(() => {
    if (current !== null) {
      setActor(current);
    } else {
      setActor({
        name: '',
        age: '',
        gender: '',
        movie_id:'',
      });
    }
  }, [actorContext, current]);

  const [actor, setActor] = useState({
    name: '',
    age: '',
    gender: '',
    movie_id: '',
  });
  const { name, age, gender, movie_id } = actor;

  const onChange = (e) =>
    setActor({
      ...actor,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addActor(actor, movie_id);
    } else {
      updateActor(actor);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Actor' : 'Add Actor'}
      </h2>
      <input
        type='text'
        placeholder='name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='email'
        name='age'
        value={age}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='phone'
        name='gender'
        value={gender}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='movie_id'
        name='movie_id'
        value={movie_id}
        onChange={onChange}
      />
      <div>
        <input
          type='submit'
          value={current ? 'Update Actor' : 'Add Actor'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ActorForm;
