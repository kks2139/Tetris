import React, { useEffect, useRef } from 'react';

function RankingList({rank, onRowClick}){
    const timerId = useRef(0);
    const topRef = useRef();

    const onClick = (e)=>{
        const nameDiv = e.currentTarget.querySelector('div.rank-name');
        onRowClick(nameDiv.textContent);
    }

    useEffect(()=>{
        setInterval(()=>{
            if(topRef.current){
                topRef.current.parentNode.classList.toggle("rank-top");
            }
        }, 1000);
        return ()=>clearInterval(timerId.current);
    }, []);

    return (
        <div className="rank-row" onClick={onClick}>
            <div className="rank-rank">{rank.rank}</div>
            <div className="rank-name">{rank.name}</div>
            <div className="rank-score">{`${rank.score} ( ${rank.level} )`}</div>
            <div className="rank-date">{rank.reg_dt}</div>
            {rank.link ? <div style={{margin:"0 auto"}}></div> : null}
            {rank.link ? <img src={rank.link} ref={topRef} style={{width:"25px"}}></img> : null}
        </div>
    );
}

export default RankingList;