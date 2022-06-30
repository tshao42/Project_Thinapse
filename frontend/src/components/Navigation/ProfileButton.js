import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="avatarContainer">
      <Link to={`/users/${user.id}`} >
        <img src={`${user.avatarUrl}` } onClick={()=>openMenu()} className='userAvatar' alt='useravatar' id='nav-bar-avatar'/>
      </Link>
        <span id='usernamedisplay' className="fakeNavContainer">{user.username}</span>
      <span onClick={(e)=>logout(e)} className='fakeNavContainer' id='log-out'>Log Out</span>
    </div>
  );
}

export default ProfileButton;
