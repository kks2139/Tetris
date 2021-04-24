import React, { useEffect, useRef, useState} from 'react';
import RankingBox from './RankingBox';
import Setting from './Setting';
import SearchBar from '../../component/SearchBar';
import ComboBox from '../../component/ComboBox';
import './Tetris.css';


function FirstMenu({onSelect, level = [], onRefresh}){
    const [isClicked, setIsClicked] = useState(false);
    const timerId = useRef("0");
    const divRef = useRef();
    const ref_title = useRef();
    const [hideRank, setHideRank] = useState(true);
    const [hideOpt, setHideOpt] = useState(true);
    const [userNm, setUserNm] = useState({name : ""});
    const [comboVal, setComboVal] = useState("");

    const clickStart = (e)=>{
        setIsClicked(true);
        timerId.current = setInterval(()=>{
            if(!divRef.current) return;
            const r1 = Math.random() * 1000 % 256;
            const r2 = Math.random() * 1000 % 256;
            const r3 = Math.random() * 1000 % 256;
            divRef.current.style.color = `rgb(${r1}, ${r2}, ${r3})`;
        },500);
    };

    const clickLevel = (e)=>{
        if(e.target.textContent === "Back") onRefresh();
        else onSelect(e.target);
    }
    const clickRanking = ()=>{
        setHideRank(false);
        ref_title.current.classList.toggle("title-min");
    }
    const clickOption = ()=>{
        setHideOpt(false);
        ref_title.current.classList.toggle("title-min");
    }
    const onBack = ()=>{
        setHideRank(true);
        setHideOpt(true);
        ref_title.current.classList.toggle("title-min");
    }
    const onSearch = (userNm)=>{
        setUserNm({name : userNm});
    }
    const onSelected = (sel)=>{
        setComboVal(sel);
    }

    useEffect(()=>{
        return ()=>{clearInterval(timerId.current)};
    },[]);

    const st = {
        display : "flex",
        position : "relative",
        left : "50%",
        transform : "translateX(-50%)",
        width : "fit-content"
    };
    return(
        <>
            <div className="menu-box">
                <div className="title" ref={ref_title}>TETRIS</div>
                {!hideRank || !hideOpt? null :
                 <div>
                    <div style={{marginTop : "15vh"}}>
                        <div className="label2" hidden={!isClicked} ref={divRef}>Select level</div>
                        <div className="label1" onClick={clickStart} hidden={isClicked}>Start</div>
                        <div className="label1" onClick={clickRanking} hidden={isClicked}>Ranking</div>
                        <div className="label1" onClick={clickOption} hidden={isClicked}>Setting</div>
                    </div>
                    {isClicked ? <div className="level-box">
                        {level.map((val, idx)=>{
                            return <div className="label3" key={idx} onClick={clickLevel}>{val}</div>
                        })}
                        <div className="label3" onClick={clickLevel}>Back</div>
                    </div> : null}
                </div>}
                
                {hideRank ? null : 
                    <>
                        <div style={st}>
                            <SearchBar onSearch={onSearch} style={{marginRight : "5px"}}></SearchBar>
                            <ComboBox items={level} onSelected={onSelected}></ComboBox>
                        </div>
                        <RankingBox onBack={onBack} searchText={userNm} filterValue={comboVal}></RankingBox>
                    </>
                }

                {hideOpt ? null : <Setting onBack={onBack}></Setting>}

            </div>
        </>
    );
}

export default FirstMenu;