import React, { useState } from 'react';
import Join from './Join';
import Login from "./Login";
import './Welcome.css';

function Welcome(){
    
    const [isJoin, setIsJoin] = useState(false);

    return (
        <div className="welcome-page background-theme">
            {!isJoin ? <Login></Login> : null}
            {isJoin ? <Join></Join> : null}
        </div>
    );
}

export default Welcome;