import React, { useEffect, useRef, useState, useContext } from 'react';
import FirstMenu from './FirstMenu';
import PopupMenu from './PopupMenu';
import MainBody from './MainBody';
import InputBox from './InputBox';
import TopMenu from './TopMenu';
import FootNotice from './FootNotice';
import {UT} from '../util/util';
import {SessionContext} from '../App';

function Tetris(){
    const context = useContext(SessionContext);
    const [hidePop, setHidePop] = useState(true);
    const [hideMenu, setHideMenu] = useState(false);
    const [hideBody, setHideBody] = useState(true);
    const [hideInput, setHideInput] = useState(true);

    const [bodySize, setBodySize] = useState(30);
    const level = ["Easy", "Normal", "Hard", "Extreme"];
    const [currLevel, setCurrLevel] = useState("");

    const ref_cont = useRef();

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
    const onGameOver = ({score, level})=>{ // game over 되었을때
        setTimeout(()=>{
            UT.confirm("Would you like to record your score?", ()=>{
                const param = {
                    url : "saveScore",
                    body : {
                        name : context.session.id,
                        score,
                        level,
                        id : UT.uuid()    
                    }
                };
                UT.request(param, (res)=>{
                    if(res.errMsg){
                        UT.alert(res.errMsg, moveBtns);
                    }else{
                        UT.alert("Your score has been Recoded !", moveBtns);
                    }
                });
            }, ()=>{
                moveBtns();      
            });
        }, 1500);
    }
    const moveBtns = ()=>{
        var btns = ref_cont.current.querySelectorAll('div.mainbody-side-btn');
        for(var i=0; i<btns.length; i++){
            btns[i].classList.add('mainbody-side-btn-move');
            btns[i].style.marginTop = (15 * i) + "px";
        }
    }
    
    return(
        <div className="frame">
            <TopMenu></TopMenu>
            {hidePop ? null : <PopupMenu onButtonClick={popupClicked}></PopupMenu>}
            {hideMenu ? null : <FirstMenu onSelect={levelSelected} level={level} onRefresh={onRefresh}></FirstMenu>}
            {hideBody ? null : 
                <div ref={ref_cont} style={{margin : "0 auto"}}>
                    <MainBody size={bodySize} level={currLevel} onGameOver={onGameOver}></MainBody>
                    <div className="label3 mainbody-side-btn" onClick={()=>{onRestart(currLevel)}}>Restart</div>
                    <div className="label3 mainbody-side-btn" onClick={()=>{onBackToMenu()}}>To menu</div>
                </div>
            }
            <FootNotice></FootNotice>
        </div>
    );
}

export default Tetris;
