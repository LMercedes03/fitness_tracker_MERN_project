import React from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import './Nav.css';

const Nav = ({ pages }) => {
  const handleLogout = () => {
    auth.logout();
  };

  return (
    <div className="nav-container">
      <div className="logo">
        {/* <img /> Logo goes here */}
      </div>
      <div className="nav-links">
        {pages.map((page) => {
          if (
            (page.name === 'Login' || page.name === 'Sign Up') &&
            auth.loggedIn()
          ) {
            return null; // Hide login and signup links when user is logged in
          }
          return (
            <Link key={page.path} to={page.path}>
              {page.name} |
            </Link>
          );
        })}
        {auth.loggedIn() && (
          <Link to="#" onClick={handleLogout}>
            Logout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;