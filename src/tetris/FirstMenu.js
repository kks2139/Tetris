import React, {useEffect, useRef, useState} from 'react';
import RankingBox from './RankingBox';
import './Tetris.css';


function FirstMenu({onSelect, level = []}){
    const [menu1, setMenu1] = useState("start");
    const [menu2, setMenu2] = useState("Ranking");
    const [cls, setCls] = useState("label1");
    const [isClicked, setIsClicked] = useState(false);
    const timerId = useRef("0");
    const divRef = useRef();
    const [hideRank, setHideRank] = useState(true);
    const [hideMenu, setHideMenu] = useState(false);

    const clickStart = (e)=>{
        if(e.target.textContent === "select level") return;
        setMenu1("Select level");
        setCls("label2");
        setIsClicked(true);
        timerId.current = setInterval(()=>{
            const r1 = Math.random() * 1000 % 256;
            const r2 = Math.random() * 1000 % 256;
            const r3 = Math.random() * 1000 % 256;
            divRef.current.style.color = `rgb(${r1}, ${r2}, ${r3})`;
        },600);
    };

    const clickLevel = (e)=>{
        clearInterval(timerId.current);
        onSelect(e.target);
    }
    const clickRanking = ()=>{
        setHideMenu(true);
        setHideRank(false);
    }
    const onBack = ()=>{
        setHideMenu(false);
        setHideRank(true);
    }

    useEffect(()=>{
        return ()=>{
            clearInterval(timerId.current);
        };
    },[]);

    

    return(
        <>
            <div className="menu-box">
                <div className="title">TETRIS</div>
                <div hidden={hideMenu}>
                    <div style={{marginTop : "20vh"}}>
                        <div className={cls} onClick={clickStart} ref={divRef}>{menu1}</div>
                        <div className="label1" onClick={clickRanking} hidden={isClicked}>{menu2}</div>
                    </div>
                    <div className="level-box">
                        {level.map((val, idx)=>{
                            return <div className="label3" key={idx} hidden={!isClicked} onClick={clickLevel}>{val}</div>
                        })}
                    </div>
                </div>
                
                {hideRank ? null : <RankingBox onBack={onBack}></RankingBox>}

            </div>
        </>
    );
}

export default FirstMenu;