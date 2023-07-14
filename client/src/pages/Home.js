import React from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../utils/auth';
import Container from 'react-bootstrap/Container';

const Home = () => {
  const navigate = useNavigate();
  const loggedIn = auth.loggedIn();

  return (
    <div className="homepage">
      <Container className="home">
        <h1 className="home-title">Your Daily Workout Companion</h1>
        <p className="home-text">
          Track your daily exercises and stay fit
          with us.
        </p>
        {loggedIn ?
          (<button className="home-btn" onClick={() => navigate('/exercise')}>Add Exercise</button>) :
          (<button className="home-btn" onClick={() => navigate('/signup')}>Get Started</button>)}
      </Container>
    </div>
  );
};
export default Home;
