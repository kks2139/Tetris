import React, { useEffect, useRef, useState } from 'react';
import { UT } from '../util/util';

function Join({onJoinEnd}){
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pwConf, setPwConf] = useState("");
    const [warnMsg, setWarnMsg] = useState("");
    const ref_box = useRef();
    const ref_warn = useRef();
    
    const onChange = (e)=>{
        const inputs = ref_box.current.querySelectorAll(`input[class=warn-input]`);
        if(inputs.length > 0){
            for(var i=0 ;i<inputs.length; i++){
                inputs[i].classList.remove("warn-input");
            }
            ref_warn.current.style.visibility = "hidden";
        }
        const {value, name} = e.target;
        if(name === "id"){
            setId(value);
        }else if(name === "pw"){
            setPw(value);
        }else{
            setPwConf(value)
        }
    }
    const onClick = (e)=>{
        if(e.target.dataset.name === "signIn"){
            goSignIn();
        }else{
            onJoinEnd();
        }
    }
    const onKeyDown = (e)=>{
        if(e.keyCode === 13) goSignIn();
    }
    const goSignIn = ()=>{
        const empty = !(id.trim()) ? "id" : !(pw.trim()) ? "pw" : !(pwConf.trim()) ? "pw_conf" : "";
        if(empty){
            const input = ref_box.current.querySelector(`input[name=${empty}]`);
            input.classList.add("warn-input");
            
            const field = empty === "id" ? "User Name" : empty === "pw" ? "Password" : "Password Confirm";
            ref_warn.current.style.visibility = "visible";
            setWarnMsg(`${field} is empty.`);
            return;
        }
        if(pw !== pwConf){
            const inputs = ref_box.current.querySelectorAll(`input[name*='pw']`);
            for(var i=0 ;i<inputs.length; i++){
                inputs[i].classList.add("warn-input");
            }
            ref_warn.current.style.visibility = "visible";
            setWarnMsg("Passwords are not same.");
            return;
        }

        UT.confirm("Would you like to register?", ()=>{
            const param = {
                url : "signin",
                body : {id, pw}
            };
            UT.request(param, ({result})=>{
                if(result.length === 0){
                    UT.alert(`${id} is not exist.`);
                }else{
                    UT.alert("You are registed.", ()=>{
                        onJoinEnd();
                    });
                }
            });
        });
    }

    useEffect(()=>{
        const input = ref_box.current.querySelector('input[name=id]');
        input.focus();
    }, []);

    const style = {
        top : "-60px"
    }

    return (
        <div className="login-box ani-vanish" ref={ref_box}>
            <div className="welcome-title">TETRIS</div>
            <div className="login-text text-theme">Join to play</div>
            <div className="input-login" style={style}>
                <input name="id" onChange={onChange} onKeyDown={onKeyDown} placeholder="User Name"></input>
            </div>
            <div className="input-login" style={style}>
                <input name="pw" onChange={onChange} onKeyDown={onKeyDown} placeholder="Password" type="password"></input>
            </div>
            <div className="input-login" style={style}>
                <input name="pw_conf" onChange={onChange} onKeyDown={onKeyDown} placeholder="Password Confirm" type="password"></input>
            </div>
            <div className="login-button" data-name="signIn" onClick={onClick}  style={style}>Sing in</div>

            <div className="warn-msg" ref={ref_warn} style={{top : "-55px"}}>{warnMsg}</div>

            <div className="signin-text" style={{top : "-45px"}}>
                <span data-name="sign" onClick={onClick}>Back</span>
            </div>
        </div>
    );
}

export default Join;