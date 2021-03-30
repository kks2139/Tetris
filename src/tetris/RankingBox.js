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
            const sorted = res.sort((a, b)=> b.score - a.score);
            setRankList(sorted);
        })
        .catch(err => console.error(err));
    }
    
    useEffect(()=>{
        getRankList();
    }, []);
    
    return (
        <>
            <div className="rank-header">
                <div>Rank</div>
                <div className="rank-name">Name</div>
                <div>Score</div>
                <div style={{margin:"0 auto"}}></div>
                <div>Title</div>
            </div>
            <div className="rank-box">
                <div style={{height : "45vh"}}>
                    {rankList.map((rank, idx) => {
                        if(idx === 0) rank.link = '/rank1.png';
                        rank.rank = idx + 1;
                        return rank ? <RankingList rank={rank} key={rank.name}></RankingList> : null;
                    })}
                </div>
            </div>
            <div className="label1" onClick={() => onBack()}>Back</div>
        </>
    );
}

export default RankingBox;