import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import History from './pages/History';
import Exercise from './pages/Exercise';
import Login from './pages/Login';
import Cardio from './components/Cardio';
import Resistance from './components/Resistance';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/history" element={<History />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/exercise/cardio" element={<Cardio />} />
        <Route path="/exercise/resistance" element={<Resistance />} />
      </Switch>
    </Router >
  );
}

export default App;