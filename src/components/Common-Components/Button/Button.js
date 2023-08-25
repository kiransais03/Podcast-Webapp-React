import React from 'react';
import "../Button/button-styles.css";


function Button({onClick,text}) {
  return (
    <div style={{width:"150px",}} onClick={onClick} className='custom-btn'>{text}</div>
  )
}

export default Button;