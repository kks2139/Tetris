import React, { useContext } from 'react';
import {SessionContext} from '../App';

function TopMenu(){
    const context = useContext(SessionContext);

    return (
        <div className="top-menu-bar">
            <div className="top-menu-text">Welcome! "{context.session.id}"</div>
            <div className="pusher"></div>
            <div className="basic-btn-2" onClick={()=>{context.onLogout()}}>Logout</div>
            <div className="basic-btn-2" onClick={()=>{alert('menu')}}>Menu</div>
        </div>
    );

}

export default TopMenu;