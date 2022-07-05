import React from 'react';
import { login } from '../../store/session'
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);


  const navOptionStyle={textDecoration: 'none',color:'#D3D9E9'};


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

  const setDemoUser=()=>{
    dispatch(login({credential:'demo@user.io', password: 'password'}));
  }
  return (
    <div>
      <div>
        <div className="navBar">
          <ul className="navBarItems">
              <Link to="/">
              <img src="https://i.imgur.com/ttHB3Or.png"  id="logo" alt="logo" />
              </Link>
              <div className="rightNav">
                {!sessionUser &&
                  <div onClick={()=>setDemoUser()} style= { navOptionStyle} id="fakeButton"> Try Writing!</div>
                }
                  {sessionUser &&
                    <NavLink to="/write" style={ navOptionStyle}> Write it!</NavLink>
                  }
                  {!sessionUser &&isLoaded
                  ? sessionLinks
                  :<></>
                  }
                <NavLink to="/about" style = {navOptionStyle}>About Us</NavLink>
                {sessionUser && isLoaded
                ?<div>
                  {sessionLinks}
                </div>
                :<></>
                }
              </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
