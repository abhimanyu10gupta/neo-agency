import './App.css';
import Navbar from './components/layout/navbar';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Login from './components/auth/login';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

import React, { Fragment } from 'react';
import Home from './components/pages/Home';
import ActorState from './context/actor/ActorState';
import MovieState from './context/movie/MovieState';

import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';



function App() {
  return (
    <BrowserRouter>
      <AuthState>
        <MovieState>
          <ActorState>
            <AlertState>
            <Navbar/>
              <Alerts/>
                <Fragment>
                <Routes>
                  {/* <Route exact path={'/'} element={<Home />} /> */}
                  {/* <Route exact path={'/about'} element={<About />} /> */}
                  {/* <Route path="/" element={<GuestLayout /> }/>  */}
                  <Route exact path={'/login'} element={<Login />} />
                  <Route
                    path='/'
                    element={
                      <PrivateRoute>
                        <Home />
                      </PrivateRoute>
                    }
                  />
                </Routes>
                  {/* <Navbar />
                  <Alerts /> */}
                  {/* <div className='container'> */}
                  {/* <RouterProvider router={router} /> */}
                  {/* </div> */}
                </Fragment>
            </AlertState>
          </ActorState>
        </MovieState>
      </AuthState>
      </BrowserRouter>
    );
}

export default App;
