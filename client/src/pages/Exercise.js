import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import cardioIcon from '../images/cardio.png';
import resistanceIcon from '../images/resistance.png';


const Exercise = () => {
  const loggedIn = Auth.loggedIn();
  const navigate = useNavigate();


  // If the user is not logged in, redirect to the login page
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div className="exercise">
        <h2 className='title'>Add Exercise</h2>
        <div>
          <button className='cardio-btn' onClick={() => navigate('/exercise/cardio')}>
            <img alt="cardio" src={cardioIcon} className="cardio-icon" />
            Cardio
          </button>
        </div>
        <div>
          <button className='resistance-btn' onClick={() => navigate('/exercise/resistance')}>
            <img alt="resistance" src={resistanceIcon} className="resistance-icon" />
            Resistance
          </button>
        </div>
      </div>
    </div>
  );
};

export default Exercise;