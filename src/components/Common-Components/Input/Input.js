import React from 'react'
import "../Input/input-styles.css"

function Input({type,placeholder,state,setState,required}) {
  return (
    <input className='custom-input' required={required} type={type} placeholder={placeholder} value={state} onChange={(e)=>{setState(e.target.value)}}/>
  )
}

export default Input
