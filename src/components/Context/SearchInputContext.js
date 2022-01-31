import { createContext, useState, useContext, useMemo } from "react";

export const SearchInputContext = createContext();

 const SearchContextProvider = (props)=>{
    const [input,setInput] =useState("sign");

    return (
        <SearchInputContext.Provider value={{input}}>
            {props.children}
        </SearchInputContext.Provider>
    )
}
export default SearchContextProvider;