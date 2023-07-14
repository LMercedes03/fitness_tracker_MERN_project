import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { getMe } from '../utils/apiCaller';
import Auth from '../utils/auth';
import { formatDate } from '../utils/dateFormat';


const History = () => {
  const [userData, setUserData] = useState({});
  const [exerciseData, setExerciseData] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(6);

  const loggedIn = Auth.loggedIn();
  let currentDate;

  // everytime loggedIn/userdata changes, the getuserdata runs
  useEffect(() => {
    let isMounted = true; // Flag to track component mount status
  
    const getUserData = async () => {
      try {
        //get token
        const token = loggedIn ? Auth.getToken() : null;
        if (!token) return false;
  
        const response = await getMe(token);
  
        if (!response.ok) {
          throw new Error('something went wrong!');
        }
  
        const user = await response.json();
        console.log('User data:', user);
  
        // combine cardio and resistance data together
        if (user.cardios && user.resistances) {
          const cardios = user.cardios;
          const resistances = user.resistances;
          const exercise = cardios.concat(resistances);
  
          // sort exercise data by date
          exercise.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
  
          //format date in exercise data
          exercise.forEach(item => {
            item.date = formatDate(item.date);
          });
  
          // Update state only if the component is still mounted
          if (isMounted) {
            // Update the states
            setUserData(user);
            setExerciseData(exercise);
          }
        } else {
          console.log('Cardio and Resistance data not found.');
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    getUserData();
  
    // Cleanup function
    return () => {
      isMounted = false; // Set the flag to false when the component is unmounted
    };
  }, [loggedIn]);

  function showMoreItems() {
    setDisplayedItems(displayedItems + 6);
  }


  // If the user is not logged in, redirect to the login page
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='history'>
      <div className="d-flex flex-column align-items-center">
        <h2 className='title'>History</h2>
        {exerciseData.length ?
          (<div className='history-data'>
            {/* map the exercise data  */}
            {exerciseData.slice(0, displayedItems).map((exercise) => {
              let dateToDisplay;
              if (exercise.date !== currentDate) {
                currentDate = exercise.date;
                dateToDisplay = exercise.date;
              }
              return (
                <div className='history' key={exercise._id}>
                  <div className='date d-flex align-items-center'>{dateToDisplay}</div>
                  <Link className='text-decoration-none' to={`/history/${exercise.type}/${exercise._id}`}>
                    {exercise.type === 'cardio' ? (
                      <div className="history-card cardio-title d-flex">
                        <div>
                          <p className='history-name'>{exercise.name}</p>
                          <p className='history-index'>{exercise.distance} miles </p>
                        </div>
                      </div>) : (
                      <div className="history-card resistance-title d-flex">
                        <div >
                          <p className='history-name'>{exercise.name}</p>
                          <p className='history-index'>{exercise.weight} pounds </p>
                        </div>
                      </div>)}
                  </Link>
                </div>
              );
            })}
            {/* show more items  */}
            {exerciseData.length > displayedItems ?
              (<div className='d-flex justify-content-center'>
                <button className='show-btn' onClick={showMoreItems}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                  Show More
                </button>
              </div>)
              : null}
          </div>)
          :
          (<div>
            <h3 className='history-text'>No exercise data yet...</h3>
            <Link to="/exercise"><button className='home-btn'>Add Exercise</button></Link>
          </div>
          )}
      </div >
    </div >
  );
};

export default History;