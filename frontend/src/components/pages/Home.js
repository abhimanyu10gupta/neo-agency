import React, { useContext, useEffect, Fragment } from 'react';
import Movies from '../movies/Movies'
import MovieForm from '../movies/MovieForm';
import Actors from '../actors/Actors'
import ActorForm from '../actors/ActorForm';
import AuthContext from '../../context/auth/AuthContext';

export const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    // <div className='grid-2'>
    //   <div>
    //     <MovieForm />
    //   </div>
    //   <div>
    //     <Movies />
    //   </div>
    // </div>
    <Fragment>
      Movies
      <Movies />
      <MovieForm />
      <Actors/>
      <ActorForm />
    </Fragment>
  );
};

export default Home;
