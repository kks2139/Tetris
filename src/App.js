import React, { useEffect, useState } from 'react';
import './App.css';
import Tetris from './tetris/Tetris';
import { UT } from './util/util';
import Welcome from './welcome/Welcome';

export const SessionContext = React.createContext(null);

function App() {
  const [session, setSession] = useState({
    id : sessionStorage.getItem("user_id") || null,
    login : sessionStorage.getItem("login") || false
  });

  const onLoginSuccess = (id)=>{
    sessionStorage.setItem("user_id", id);
    sessionStorage.setItem("login", true);
    setSession({
      id,
      login : true
    });
  }

  const onLogout = ()=>{
    UT.confirm("Do you wnat to logout?", ()=>{
      sessionStorage.clear();
      setSession({id : null, login : false});
    });
  }

  return (
      <div className="no-drag">
          <SessionContext.Provider value={{session, onLogout}}>
              {session.login ? <Tetris></Tetris> : null}
              {session.login ? null : <Welcome onLoginSuccess={onLoginSuccess}></Welcome>}
          </SessionContext.Provider>
      </div>
  );
}

export default App;