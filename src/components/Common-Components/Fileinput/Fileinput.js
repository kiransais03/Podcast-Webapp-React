import React, { useState } from 'react';
import "./fileinput-styles.css"

const Fileinput = ({accept,id,filehandlingfunc,text}) => {

    let [filesSelected,setFilesSelected] = useState(false);

    function onChangefunc(e) {
        // console.log(e.target);
       setFilesSelected(e.target?.files[0]?.name);
       filehandlingfunc(e.target.files);
    }

  return (<>
    <label className='custom-input' id="fileinput-label" htmlFor={id}>{filesSelected ? <span>{filesSelected} <button>Remove File</button></span>: text }</label>
    <input type="file" accept={accept} id={id} onChange={onChangefunc} style={{display:"none",}} disabled={filesSelected}/>
  </>
  )
}

export default Fileinput
