import React, { useState, useContext, useEffect } from 'react';
import MovieContext from '../../context/movie/MovieContext';

const MovieForm = () => {
  const movieContext = useContext(MovieContext);
  const { addMovie, current, clearCurrent, updateMovie } = movieContext;

  useEffect(() => {
    if (current !== null) {
      setMovie(current);
    } else {
      setMovie({
        title: '',
        releaseDate: '',
      });
    }
  }, [movieContext, current]);

  const [movie, setMovie] = useState({
    title: '',
    releaseDate: '',
  });

  const { title, releaseDate } = movie ;

  const onChange = (e) =>
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addMovie(movie);
    } else {
      updateMovie(movie);
    }
      clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Movie' : 'Add Movie'}
      </h2>
      <input
        type='text'
        placeholder='title'
        name='title'
        value={title}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='release-date'
        name='releaseDate'
        value={releaseDate}
        onChange={onChange}
      />
      <div>
        <input
          type='submit'
          value={current ? 'Update Movie' : 'Add Movie'}
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

export default MovieForm;
