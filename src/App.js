import React, { useState } from 'react';
import './App.css';
import Tetris from './tetris/Tetris';
import Welcome from './welcome/Welcome';

export const SessionContext = React.createContext(null);

function App() {
    const [Session, setSession] = useState({id : null, login : false});

    const onLoginSuccess = (id)=>{
      setSession({
        id,
        login : true
      });
    }

    return (
        <div className="dark no-drag">
            <SessionContext.Provider value={Session}>
                {Session.login ? <Tetris></Tetris> : null}
                {Session.login ? null : <Welcome onLoginSuccess={onLoginSuccess}></Welcome>}
            </SessionContext.Provider>
        </div>
);
}

export default App;