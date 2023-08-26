import React from 'react';
import '../Header/header-styles.css'
import { Link, useLocation } from 'react-router-dom';

function Genresheader() {
  let location = useLocation();
  let currentpath = location.pathname;

  return (
    <div className='navbar'>
      <div className='gradient'></div>
      <div className='links'>
      <Link to="/podcasts" className={currentpath==="/podcasts" ?"active":"none"}>All</Link>
      <Link to="/podcasts/drama" className={currentpath==="/podcasts/drama" ?"active":"none"}>Drama</Link>
      <Link to="/podcasts/crime" className={currentpath==="/podcasts/crime" ?"active":"none"}>Crime</Link>
      <Link to="/podcasts/history" className={currentpath==="/podcasts/history" ?"active":"none"}>History</Link>
      <Link to="/podcasts/news" className={currentpath==="/podcasts/news" ?"active":"none"}>News</Link>
      <Link to="/podcasts/politics" className={currentpath==="/podcasts/politics" ?"active":"none"}>Politics</Link>
      <Link to="/podcasts/culture" className={currentpath==="/podcasts/culture" ?"active":"none"}>Culture</Link>
      <Link to="/podcasts/lifestories" className={currentpath==="/podcasts/lifestories" ?"active":"none"}>Life Stories</Link>
      </div>
    </div>
  )
}

export default Genresheader;
