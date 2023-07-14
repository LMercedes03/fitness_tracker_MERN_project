import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <Container className="home d-flex flex-column align-items-center justify-content-center flex-wrap text-center">
        <h1 className="home-title">Your Daily Workout Partner</h1>
        <p className="home-text">
          Cardio? Resistance? Or both? Track your daily exercises and stay fit
          with us.
        </p>
      </Container>
    </div>
  );
};
export default Home;
