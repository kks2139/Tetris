import React, { useEffect, useRef } from 'react';

function RankingList({rank}){
    const timerId = useRef(0);
    const topRef = useRef();

    useEffect(()=>{
        setInterval(()=>{
            if(topRef.current){
                topRef.current.parentNode.classList.toggle("rank-top");
            }
        }, 1000);
        return ()=>clearInterval(timerId.current);
    }, []);

    return (
        <div className="rank-row">
            <div className="rank-rank">{rank.rank}</div>
            <div className="rank-name">{rank.name}</div>
            <div className="rank-score">{rank.score}</div>
            {rank.link ? <div style={{margin:"0 auto"}}></div> : null}
            {rank.link ? <img src={rank.link} ref={topRef} style={{width:"25px"}}></img> : null}
        </div>
    );
}

export default RankingList;