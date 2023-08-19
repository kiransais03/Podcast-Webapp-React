import React from 'react';
import './header-styles.css'
import { Link, useLocation } from 'react-router-dom';

function Header() {
  let location = useLocation();
  let currentpath = location.pathname;

  return (
    <div className='navbar'>
      <div className='gradient'></div>
      <div className='links'>
      <Link to="/signup" className={currentpath==="/signup" ?"active":"none"}>Signup</Link>
      <Link to="/podcasts" className={currentpath==="/podcasts" ?"active":"none"}>Podcasts</Link>
      <Link to="/start-a-podcast" className={currentpath==="/start-a-podcast" ?"active":"none"}>Start A Podcast</Link>
      <Link to="/profile" className={currentpath==="/profile" ?"active":"none"}>Profile</Link>
      </div>
    </div>
  )
}

export default Header;
