import React, { useState } from 'react';

function InputBox({score, onQuit, onConfirm}){
 
    const [name, setName] = useState("");
    const [pw, setPw] = useState("");

    const onChange = (e)=>{
        const targ = e.target;
        if(targ.name === "name") setName(targ.value);
        else setPw(targ.value);
    }

    return(
        <div className="input-box">
            <div>Your Record : {score}</div>
            <div className="input-row">
                <div className="input-text">Name :</div>
                <input name="name" onChange={onChange} value={name}></input>
            </div>
            <div className="input-row">
                <div className="input-text">Password :</div> 
                <input name="pw" onChange={onChange} value={pw}></input>
            </div>
            <div className="label3" onClick={()=>{onQuit()}}>Quit</div>
            <div className="label3" onClick={()=>{onConfirm()}}>Confirm</div>
        </div>
    );

}
export default InputBox;