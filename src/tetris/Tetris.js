import React, { useEffect, useState } from 'react';
import FirstMenu from './FirstMenu';
import PopupMenu from './PopupMenu';
import MainBody from './MainBody';
import InputBox from './InputBox';

function Tetris(){
    const [hidePop, setHidePop] = useState(true);
    const [hideMenu, setHideMenu] = useState(false);
    const [hideBody, setHideBody] = useState(true);
    const [hideInput, setHideInput] = useState(true);
    const [recordDone, setRecordDone] = useState(false);
    const [score, setScore] = useState(0);

    const [bodySize, setBodySize] = useState(32);
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
    const onRefresh = ()=>{
        setHideMenu(true);
        setTimeout(()=>{setHideMenu(false)}, 50);
    }
    const onRestart = (lvl)=>{
        setHideBody(true);
        setTimeout(()=>{setHideBody(false)}, 50);
    }
    const clickRanking = ()=>{
        // alert('랭킹 보여주자');

    }
    const onRecord = (score)=>{ // game over 되었을때
        setHideInput(false);
        setScore(score);
    }
    const onQuit = ()=>{
        setHideInput(true);
    }
    const onConfirm = ({name, pw, score})=>{
        
    }
    return(
        <div className="frame">
            {hidePop ? null : <PopupMenu onButtonClick={popupClicked}></PopupMenu>}
            {hideMenu ? null : <FirstMenu onSelect={levelSelected} clickRanking={clickRanking} level={level} onRefresh={onRefresh}></FirstMenu>}
            {hideBody ? null : <MainBody size={bodySize} level={currLevel} onRecord={onRecord} onRestart={onRestart} onBackToMenu={onBackToMenu} recordDone={recordDone}></MainBody>}
            {hideInput ? null : <InputBox score={score} onQuit={onQuit} onConfirm={onConfirm}></InputBox>}
        </div>
    );
}

export default Tetris;
