import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

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
          <button className='cardio-btn d-flex flex-column  align-items-center justify-content-center' onClick={() => navigate('/exercise/cardio')}>
            Cardio
          </button>
        </div>
        <div>
          <button className='resistance-btn d-flex flex-column  align-items-center justify-content-center' onClick={() => navigate('/exercise/resistance')}>
            Resistance
          </button>
        </div>
      </div>
    </div>
  );
};

export default Exercise;