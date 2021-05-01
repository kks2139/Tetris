import React, { useEffect, useState } from 'react';
import './App.css';
import Tetris from './pages/tetris/Tetris';
import { UT } from './util/util';
import Welcome from './pages/welcome/Welcome';

export const SessionContext = React.createContext(null);

function App() {
  const [session, setSession] = useState({
    id : sessionStorage.getItem("user_id") || null,
    login : sessionStorage.getItem("login") || false
  });
  const [themeColor, setThemeColor] = useState("");

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
      document.querySelector('#root').classList.remove('dark');
      sessionStorage.clear();
      setSession({id : null, login : false});
    });
  }

  const onChangeTheme = (theme)=>{
    if(theme === "dark"){
      document.querySelector('#root').classList.add(theme);
      document.styleSheets[2].rules[11].style.backgroundColor = "var(--theme-black2)";
    }else{
      document.querySelector('#root').classList.remove("dark");
      document.styleSheets[2].rules[11].style.backgroundColor = "white";

    }
    setThemeColor(theme);
  }

  return (
      <div className="no-drag" style={{height:"100vh"}}>
          <SessionContext.Provider value={{session, onLogout, themeColor, onChangeTheme}}>
              {session.login ? <Tetris></Tetris> : null}
              {session.login ? null : <Welcome onLoginSuccess={onLoginSuccess}></Welcome>}
          </SessionContext.Provider>
      </div>
  );
}

export default App;