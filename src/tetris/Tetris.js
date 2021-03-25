import React, { useEffect, useState } from 'react';
import FirstMenu from './FirstMenu';
import PopupMenu from './PopupMenu';
import MainBody from './MainBody';

function Tetris(){
    const [hidePop, setHidePop] = useState(true);
    const [hideMenu, setHideMenu] = useState(false);
    const [hideBody, setHideBody] = useState(true);
    
    const [bodySize, setBodySize] = useState(32);
    const [pause, setPause] = useState(false);
    const level = ["Easy", "Normal", "Hard", "Extreme"];
    const [currLevel, setCurrLevel] = useState("");

    useEffect(()=>{
        const onKeyDown = (e)=>{
            if(e.key === "Escape") setHidePop(pre => !pre);
        }
        document.addEventListener("keydown", onKeyDown);
        return ()=> document.removeEventListener("keydown", onKeyDown);
    }, []);

    const levelSelected = ({textContent})=>{
        setHideMenu(true);
        setHideBody(false);
        setCurrLevel(textContent);
    }
    const popupClicked = ({id})=>{
        setHidePop(true);
        if(id === "btn1"){
            setHideMenu(false);
            setHideBody(true);
        }
    }
    const onBackToMenu = ()=>{
        setHideMenu(false);
        setHideBody(true);
    }
    const onRestart = (lvl)=>{
        setHideBody(true);
        setTimeout(()=>{setHideBody(false);}, 100);
    }
    const clickRanking = ()=>{
        // alert('랭킹 보여주자');

    }
    return(
        <div className="frame">
            
            {hidePop ? null : <PopupMenu onButtonClick={popupClicked}></PopupMenu>}
            {hideMenu ? null : <FirstMenu onSelect={levelSelected} clickRanking={clickRanking} level={level}></FirstMenu>}
            {hideBody ? null : <MainBody size={bodySize} pause={pause} level={currLevel} onRestart={onRestart} onBackToMenu={onBackToMenu}></MainBody>}

        </div>
    );
}

export default Tetris;
