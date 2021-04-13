import React, { useState } from 'react';
import Join from './Join';
import Login from "./Login";
import './Welcome.css';

function Welcome(){
    const [isJoin, setIsJoin] = useState(false);

    const clickSignIn = ()=>{
        setIsJoin(true);
    }
    const joinEnd = ()=>{
        setIsJoin(false);
    }

    return (
        <div className="welcome-page background-theme">
            {!isJoin ? <Login onClickSignIn={clickSignIn}></Login> : null}
            {isJoin ? <Join onJoinEnd={joinEnd}></Join> : null}
        </div>
    );
}

export default Welcome;