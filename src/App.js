import React, { useState, useEffect } from 'react';
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
      setThemeColor("");
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

  useEffect(()=>{
    UT.request({url : "getToken", method : "GET"}, (res)=>{
      document.querySelector('meta[name=_csrf]').content = res.data.token;
    });
  }, []);

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