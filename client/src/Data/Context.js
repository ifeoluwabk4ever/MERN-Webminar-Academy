import React, { createContext } from 'react'

const GlobalState = createContext()

const DataProvider = ({ children }) => {
   const state = 'Hello World'
   return (
      <GlobalState.Provider value={state}>
         {children}
      </GlobalState.Provider>
   )
}

export default DataProvider
