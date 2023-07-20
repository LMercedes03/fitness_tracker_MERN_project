// get logged in user's info

export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
};

export const createCardio = (cardioData, token) => {
  return fetch('/api/cardio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cardioData),
  });
};

export const createResistance = (resistanceData, token) => {
  return fetch('/api/resistance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(resistanceData),
  });
};

export const getCardioById = (cardioId, token) => {
  return fetch(`'/api/cardio/:id/${cardioId}`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const getResistanceById = (resistanceId, token) => {
  return fetch(`/api/resistance/:id/${resistanceId}`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCardio = (cardioId, token) => {
  return fetch(`/api/cardio/:id/${cardioId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const deleteResistance = (resistanceId, token) => {
  return fetch(`/api/resistance/:id/${resistanceId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
