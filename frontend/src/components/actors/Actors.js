import React, { Fragment, useContext, useEffect } from 'react';
import ActorContext from '../../context/actor/ActorContext';
import MovieContext from '../../context/movie/MovieContext';
import ActorItem from './ActorItem';
import ActorForm from './ActorForm';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spinner';

const Actors = () => {
  const actorContext = useContext(ActorContext);
  const movieContext = useContext(MovieContext);
  const { actors, getActors, loading } = actorContext;
  const {movies, current} = movieContext;


  useEffect(() => {
    // getActors();
    // eslint-disable-next-line
  }, []);
  if (!actors) return null;
console.log(current);
console.log(actors)
  if (actors !== null && actors.length === 0 && !loading) {
    return <h4>Please add an Actor</h4>;
  }


  // if (contacts !== null && contacts.length === 0 && !loading) {
  //   return <h4>Please add a contact</h4>;
  // }

 return (
    <table>
      <tbody>
      {actors !== null && !loading ? (actors.map((actor) => {if (actor !== undefined) {  return <ActorItem actor={actor}/>; } } )) : (<Fragment> LOL </Fragment>)}
      </tbody>
    </table>
  );

};

export default Actors;
