import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Auth from '../utils/auth';
import { createCardio } from '../utils/apiCaller';

const Cardio = () => {
  const [cardioForm, setCardioForm] = useState({
    name: '',
    distance: '',
    duration: '',
    date: '',
  });
  const [startDate, setStartDate] = useState(new Date());
  const [message, setMessage] = useState('');
  const loggedIn = Auth.loggedIn();

  const handleCardioChange = (event) => {
    const { name, value } = event.target;
    setCardioForm({ ...cardioForm, [name]: value });
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    handleCardioChange({
      target: { name: 'date', value: date },
    });
  };

  const validateForm = (form) => {
    return form.name && form.distance && form.duration && form.date;
  };

  const handleCardioSubmit = async (event) => {
    event.preventDefault();

    //get token
    const token = loggedIn ? Auth.getToken() : null;
    if (!token) return false;

    // get user id
    const userId = Auth.getUserId();

    // cardio submit
    if (validateForm(cardioForm)) {
      try {
        // add userid to cardio form
        cardioForm.userId = userId;

        const response = await createCardio(cardioForm, token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        setMessage('Cardio successfully added!');
        setTimeout(() => {
          setMessage('');
        }, 3000);
      } catch (err) {
        console.error(err);
      }
    }

    // clear form input
    setCardioForm({
      name: '',
      distance: '',
      duration: '',
      date: '',
    });
  };

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="cardio">
      <div className="cario-column">
        <h2 className="title">Add Exercise</h2>
        <form
          className="cardio-form"
          onSubmit={handleCardioSubmit}
        >
          <div className="d-flex justify-content-center">
          </div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Running"
            value={cardioForm.name}
            onChange={handleCardioChange}
          />
          <label>Distance (miles):</label>
          <input
            type="number"
            name="distance"
            id="distance"
            placeholder="0"
            value={cardioForm.distance}
            onChange={handleCardioChange}
          />
          <label>Duration (minutes):</label>
          <input
            type="number"
            name="duration"
            id="duration"
            placeholder="0"
            value={cardioForm.duration}
            onChange={handleCardioChange}
          />
          <label>Date:</label>
          <DatePicker
            selected={startDate}
            value={cardioForm.date}
            onChange={handleDateChange}
            placeholderText="mm/dd/yyyy"
          />
          <button
            className="submit-btn cardio-submit-btn"
            type="submit"
            disabled={!validateForm(cardioForm)}
          >
            Add
          </button>
        </form>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Cardio;