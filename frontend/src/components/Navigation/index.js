import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);


  const navOptionStyle={textDecoration: 'none',color:'#2774AE'}


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login" style={navOptionStyle}>Log In</NavLink>
        <NavLink to="/signup" style={navOptionStyle}>Sign Up</NavLink>
      </>
    );
  }
  return (
    <div>
      <div className="navBar">
        <ul class="navBarItems">
            <a href="/">
              <img src="https://i.imgur.com/7QQ5G0J.png"  id="logo" alt="logo" />
            </a>
            <div class="rightNav">
              <NavLink to="/write" style={ navOptionStyle}> Think now...</NavLink>
              {isLoaded && sessionLinks}
            </div>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
