import React, { useRef, useState, useContext, useEffect } from 'react';
import FirstMenu from './FirstMenu';
import MainBody from './MainBody';
import TopMenu from './TopMenu';
import FootNotice from './FootNotice';
import {UT} from '../../util/util';
import {SessionContext} from '../../App';

function Tetris(){
    const context = useContext(SessionContext);
    const [hideMenu, setHideMenu] = useState(false);
    const [hideBody, setHideBody] = useState(true);

    const [bodySize, setBodySize] = useState(30);
    const level = ["Easy", "Normal", "Hard", "Extreme"];
    const [currLevel, setCurrLevel] = useState("");
    const [keys, setKeys] = useState([]);
    const ref_cont = useRef();

    const levelSelected = ({textContent})=>{
        setCurrLevel(textContent);
        const param = {
            url : "getKeySet",
            body : {name : context.session.id}
        };
        UT.request(param, (res)=>{
            const arr = res.result.length > 0 ? res.result[0].keyset.split('/') : ['w','s','a','d','j'];
            setKeys(arr);
            setHideMenu(true);
            setHideBody(false);
        });
    }
    const onBackToMenu = ()=>{
        setHideMenu(false);
        setHideBody(true);
    }
    const onRefresh = ()=>{
        setHideMenu(true);
        setTimeout(()=>{setHideMenu(false)}, 50);
    }
    const onRestart = ()=>{
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
    
    useEffect(()=>{
        const param = {
            url : "getTheme",
            body : {name : context.session.id}
        };
        UT.request(param, (res)=>{
            const rs = res.result[0];
            if(rs){
                context.onChangeTheme(rs.theme);
            }
        });
    }, []);

    return(
        <div className="frame">
            <TopMenu themeColor={context.themeColor}></TopMenu>
            {hideMenu ? null : <FirstMenu onSelect={levelSelected} level={level} onRefresh={onRefresh}></FirstMenu>}
            {hideBody ? null : 
                <div ref={ref_cont} style={{margin : "0 auto"}}>
                    <MainBody size={bodySize} level={currLevel} onGameOver={onGameOver} keyset={keys}></MainBody>
                    <div className="label3 mainbody-side-btn" onClick={()=>{onRestart(currLevel)}}>Restart</div>
                    <div className="label3 mainbody-side-btn" onClick={()=>{onBackToMenu()}}>To menu</div>
                </div>
            }
            <FootNotice></FootNotice>
        </div>
    );
}

export default Tetris;
