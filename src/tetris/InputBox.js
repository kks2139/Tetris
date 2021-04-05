import React, { useRef, useState } from 'react';

function InputBox({info, onQuit, onConfirm}){
 
    const [name, setName] = useState("");
    const [pw, setPw] = useState("");
    const warnRef = useRef();
    const inputRef1 = useRef();
    const inputRef2 = useRef();

    const onChange = (e)=>{
        const targ = e.target;
        if(!targ.value || validate([targ.name])){
            if(targ.name === "name") setName(targ.value);
            else setPw(targ.value);
        }
    }
    const onClickConfirm = (e)=>{
        if(validate(["name", "pw"])){
            onConfirm({name, pw, score : info.score, level : info.lvl});
        }
    }

    const validate = (field)=>{
        var ret = true;
        for(var i=0; i<field.length; i++){
            const targ = field[i] === "name" ? inputRef1.current : inputRef2.current;
            if(targ.value.split(' ').length > 1){
                warnRef.current.textContent = "'Space' is not allowed.";
                ret = false;
                break;
            }
            if(!targ.value){
                warnRef.current.textContent = "Input your Name and Password.";
                targ.focus();
                ret = false;
                break;
            }
        }
        warnRef.current.style.visibility = ret ? "hidden" : "visible";
        return ret;
    }

    return(
        <div className="input-box">
            <div>{`Your Score : ${info.score} (${info.lvl})`}</div>
            <div className="input-row">
                <div className="input-text">Name :</div>
                <input name="name" onChange={onChange} value={name} ref={inputRef1} maxLength="15"></input>
            </div>
            <div className="input-row">
                <div className="input-text">Password :</div> 
                <input name="pw" type="password" onChange={onChange} value={pw} ref={inputRef2} maxLength="15"></input>
            </div>
            <div className="label3" onClick={onClickConfirm}>Confirm</div>
            <div className="label3" onClick={()=>{onQuit()}}>Quit</div>

            <div class="toast" ref={warnRef}></div>
        </div>
    );

}
export default InputBox;