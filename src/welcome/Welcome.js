import React, { useState } from 'react';
import Join from './Join';
import Login from "./Login";
import './Welcome.css';

function Welcome({onLoginSuccess}){
    const [isJoin, setIsJoin] = useState(false);

    const clickSignIn = ()=>{
        setIsJoin(true);
    }
    const joinEnd = ()=>{
        setIsJoin(false);
    }
    const onLogin = (id)=>{
        onLoginSuccess(id);
    }

    return (
        <div className="background-theme">
            {!isJoin ? <Login onClickSignIn={clickSignIn} onLogin={onLogin}></Login> : null}
            {isJoin ? <Join onJoinEnd={joinEnd}></Join> : null}
        </div>
    );
}

export default Welcome;