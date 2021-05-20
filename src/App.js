import React, { useState, useEffect, useRef } from 'react';
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
  const isDev = useRef(window.location.href.indexOf('localhost') > -1).current;

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
      getToken();
    });
  }

  const onChangeTheme = (theme)=>{
    const css1 = isDev ? document.styleSheets[2].rules[11] : document.styleSheets[0].rules[83]; 
    if(theme === "dark"){
      document.querySelector('#root').classList.add(theme);
      css1.style.backgroundColor = "var(--theme-black2)";
    }else{
      document.querySelector('#root').classList.remove("dark");
      css1.style.backgroundColor = "white";
    }
    setThemeColor(theme);
  }

  const getToken = ()=>{
    UT.request({url : "getToken", method : "GET"}, (res)=>{
      sessionStorage.setItem('_csrf', res.data.token);
    });
  }

  useEffect(()=>{
    getToken();
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