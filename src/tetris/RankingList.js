import React from 'react';

function RankingList({rank}){

    return (
        <div className="rank-row">
            <div className="rank-name">{rank.name}</div>
            <div className="rank-score">{rank.score}</div>
            {rank.link ? <div style={{margin:"0 auto"}}></div> : null}
            {rank.link ? <img src={rank.link} style={{width:"25px"}}></img> : null}
        </div>
    );
}

export default RankingList;