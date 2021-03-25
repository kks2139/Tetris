import React, { useEffect, useState } from 'react';
import RankingList from './RankingList';

function RankingBox({onBack}){
    const [rankList, setRankList] = useState([]);

    const getRankList = ()=>{
        fetch('/api/getTest')
        .then(res => {
            return res.status === 200 ? res.json() : []; 
        })
        .then(res => {
            const sorted = res.sort((a, b)=> a.score - b.score);
            setRankList(sorted);
        })
        .catch(err => console.error(err));
    }
    
    useEffect(()=>{
        getRankList();
    }, []);
    
    return (
        <div className="rank-box">
            <div style={{height : "40vh"}}>
                {rankList.map((rank, idx) => {
                    if(idx === 0) rank.link = '/rank1.png';
                    return rank ? <RankingList rank={rank} key={rank.name}></RankingList> : null;
                })}
            </div>
            <div className="label1" onClick={() => onBack()}>Back</div>
        </div>
    );
}

export default RankingBox;