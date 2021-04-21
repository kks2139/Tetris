import React, { useEffect, useState } from 'react';
import { UT } from '../../util/util';

function FootNotice(){
    const [topList, setTopList] = useState([]);
    
    useEffect(()=>{
        const param = {
            url : "getTopRanker"
        }
        UT.request(param, (res)=>{
            setTopList(res.result.slice());
        });
    }, []);
    
    return (
        <div className="footer">
            <div className="footer-noti-text">Notice</div>
            <div className="ani-move-left" style={{whiteSpace: "nowrap"}}>
                <span style={{marginRight : "12px"}}>Current Top Rankers</span>  
                {topList.map((top, idx)=>{
                    const style = {
                        marginRight : "10px",
                        color : top.level === "Extreme" ? "red" : top.level === "Hard" ? "#002bff" : top.level === "Normal" ? "green" : "gray"
                    }
                    return (
                        <span style={style} key={idx}>
                            {` ${top.level} : ${top.name}`}
                        </span>
                    );
                })}!
            </div>
        </div>
    );
}

export default FootNotice;