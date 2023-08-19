import React from 'react';
import "../Button/button-styles.css";


function Button({onClick,text}) {
  return (
    <div onClick={onClick} className='custom-btn'>{text}</div>
  )
}

export default Button;