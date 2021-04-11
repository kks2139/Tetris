import React, { useContext, useEffect, useRef, useState } from 'react';
import RankingList from './RankingList';
import RankingHisList from './RankingHisList';
import {UT} from '../util/util';

function RankingBox({onBack}){
    const [rankList, setRankList] = useState([]);
    const [rankHisList, setRankHisList] = useState([]);
    const [userName, setUserName] = useState("");
    const wrapperRef = useRef();

    const getRankList = ()=>{
        UT.request({url : "getRankList"}, (res)=>{
            const sorted = res.result.sort((a, b)=> b.score - a.score);
            setRankList(sorted);
        });
    }
    const getRankHistory = (name)=>{
        const param = {
            url : "getHistory",
            body : {name}
        };
        UT.request(param, (res)=>{
            wrapperRef.current.style.left = "0";
            wrapperRef.current.style.transform = "translateX(0)";
            setRankHisList(res.result.slice());
            setUserName(name);
        });
    }
    const clickCancel = ()=>{
        wrapperRef.current.style.left = "50%";
        wrapperRef.current.style.transform = "translateX(-50%)";
        setRankHisList([]);
    }

    useEffect(()=>{
        getRankList();
    }, []);
    
    return (
        <>
            <div style={{display : "flex"}}>
                <div style={{display : "flex", position : "relative", left : "50%", transform : "translateX(-50%)"}}>
                    <div className="rank-wrapper" ref={wrapperRef}>
                        <div className="rank-header">
                            <div>Rank</div>
                            <div className="rank-name">Name</div>
                            <div className="rank-score">Score</div>
                            <div className="rank-date">Date</div>
                            <div style={{margin:"0 auto"}}></div>
                            <div>Title</div>
                        </div>
                        <div className="rank-box">
                            <div style={{height : "45vh"}}>
                                {rankList.map((rank, idx) => {
                                    if(idx === 0) rank.link = '/rank1.png';
                                    rank.rank = idx + 1;
                                    return <RankingList rank={rank} key={rank.name} onRowClick={getRankHistory}></RankingList>;
                                })}
                            </div>
                        </div>
                    </div>
                    {rankHisList.length > 0 ? 
                    <div style={{marginLeft : "20px"}}>
                        <div className="rank-his-header">
                            <div style={{margin : "0 auto"}}>{`${userName}`}</div>
                            <div className="btn-x" onClick={clickCancel}>X</div>
                        </div>
                        <div className="rank-his-box">
                                {rankHisList.map((row, idx)=>{
                                    return <RankingHisList item={row} key={idx}></RankingHisList>
                                })}
                        </div>
                    </div>
                    : null}
                </div>
            </div>
            <div className="label1" onClick={() => onBack()}>Back</div>
        </>
    );
}

export default RankingBox;