import React, { useContext } from 'react';
import {SessionContext} from '../../App';

function TopMenu({themeColor}){
    const context = useContext(SessionContext);
    const theme = themeColor === "dark" ? "dark-el" : "";
    return (
        <div className={`top-menu-bar ${theme}`}>
            <div className="top-menu-text">Welcome! "{context.session.id}"</div>
            <div className="pusher"></div>
            <div className="basic-btn-2" onClick={()=>{context.onLogout()}}>Logout</div>
            <div className="basic-btn-2" onClick={()=>{alert('menu')}}>Menu</div>
        </div>
    );

}

export default TopMenu;