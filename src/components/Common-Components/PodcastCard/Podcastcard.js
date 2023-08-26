import React from 'react';
import {Link } from "react-router-dom";
import "./podcastcard-styles.css";


const Podcastcard = ({id,title,displayimg}) => {
  return (
  <Link to={`/podcasts/${id}`}>
     <div className='podcast-card'>
        <img className='dispaly-image-card' src={displayimg} alt="imag"/>
        <p style={{textDecoration: "none"}} className='card-title'>{title}</p>
     </div>
 </Link>
  )
}

export default Podcastcard;
