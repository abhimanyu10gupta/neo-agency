import React, { Fragment, useContext, useEffect, useState } from 'react';
import MovieContext from '../../context/movie/MovieContext';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from '../layout/Spinner';
import MovieItem from '../movies/MovieItem'

const Movies = () => {
  const moviesContext = useContext(MovieContext);
  const{isLoading} = useAuth0();
  const { movies, getMovies, loading, setLoading } = moviesContext;

  useEffect(() => {
    setLoading(true);
    getMovies();
    setLoading(false);
   // eslint-disable-next-line
  }, []);

  if (!movies) return null;

  if (movies !== null && movies.length === 0 && !isLoading) {
    return <h4>Please add a movie</h4>;
  }

  // const movieItems = movies.map((movie) => <MovieItem key={movie.id} movie={movie} />)

  return (
    <table>
      <tbody>
      {movies !== null && !loading ? (movies.map((movie) => {if (movie !== undefined) {  return <MovieItem movie={movie}/>; } } )) : (<Fragment> LOL </Fragment>)}
{/*       
      // {movies !== null && !loading ?(
      //   movies.map((movie) => (
      //       <MovieItem key= {movie.id} movie={movie} /> 
      //   ))
      // )
      //  : (
      //   <Fragment>LOL</Fragment>
      // )} */}
      </tbody>
    </table>
  );
};

export default Movies;
