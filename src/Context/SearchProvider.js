import React, { useState } from "react";
import Searchcontext from "./Searchcontext";


const SearchProvider = (props)=>{
    let [search,setSearch]=useState("");

    return <Searchcontext.Provider value={{ search:search, setSearch:setSearch, }}>
             {props.children}
           </Searchcontext.Provider>
}

export default SearchProvider;