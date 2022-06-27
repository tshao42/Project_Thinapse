import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div>
      <div className="navBar">
        <ul>
            <a href="/">
              <img src="https://i.imgur.com/7QQ5G0J.png"  id="logo" alt="logo" />
            </a>
            <div class="NavItems">
            <NavLink to="/write" className="nav-Link-right"> Think now...</NavLink>
            </div>
            {isLoaded && sessionLinks}
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
