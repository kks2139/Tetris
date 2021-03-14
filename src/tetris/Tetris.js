import React, { useEffect, useRef, useState } from 'react';
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
        document.addEventListener("keydown", (e)=>{
            if(e.key === "Escape"){
                setHidePop(pre => !pre);
            }
        });
    }, []);

    const levelSelected = ({textContent})=>{
        setHideMenu(true);
        setCurrLevel(textContent);
        setHideBody(false);

    }
    const popupClicked = ({id})=>{
        setHidePop(true);
        if(id === "btn1"){
            alert(id);
        }else{
            alert(id);
        }
    }


    return(
        <div className="frame">
            <PopupMenu popupHide={hidePop} onButtonClick={popupClicked}></PopupMenu>
            <FirstMenu menuHide={hideMenu} onSelect={levelSelected} level={level}></FirstMenu>
            <MainBody bodyHide={hideBody} size={bodySize} pause={pause} level={currLevel}></MainBody>
        </div>
    );
}

export default Tetris;