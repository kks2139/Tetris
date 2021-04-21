import React from 'react';

function RankingHisList({item}){

    return (
        <div className="rank-his-row">
            <div style={{width : "150px", textAlign : "left"}}>{`${item.score} ( ${item.level} )`}</div>
            <div >{item.reg_dt}</div>
        </div>
    );
}

export default RankingHisList;