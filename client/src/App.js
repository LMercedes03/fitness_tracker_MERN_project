import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import History from './pages/History';
import Exercise from './pages/Exercise';
import Login from './pages/Login';
import Cardio from './components/Cardio';
import Resistance from './components/Resistance';
import Signup from './pages/Signup';
import SingleExercise from './components/SingleExercise';

const App = () => {

  const pages = [
    { name: 'Home', path: '/' },
    { name: 'History', path: '/history' },
    { name: 'Exercise', path: '/exercise' },
    { name: 'Login', path: '/login' },
    { name: 'Sign Up', path: '/signup' },
  ];

  return (
    <div className="App">
      <Nav pages={pages} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/history" element={<History />} />
        <Route path="/history/:type/:id" element={<SingleExercise />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/exercise/cardio" element={<Cardio />} />
        <Route path="/exercise/resistance" element={<Resistance />} />
      </Routes>
    </div>
  );
};

export default App;
