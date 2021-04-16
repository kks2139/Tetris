import React, { useContext, useState } from 'react';
import {SessionContext} from '../App';

function TopMenu(){
    const context = useContext(SessionContext);
    return (
        <div className="top-menu-bar">
            <div className="top-menu-text">[ {context.session.id} ] 님 환영합니다.</div>
            <div className="pusher"></div>
            <div className="basic-btn-2" onClick={()=>{context.onLogout()}}>Logout</div>
            <div className="basic-btn-2" onClick={()=>{alert('menu')}}>Menu</div>
        </div>
    );

}

export default TopMenu;