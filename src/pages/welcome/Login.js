import React, { useEffect, useRef, useState } from 'react';
import { UT } from '../../util/util';

function Login({onClickSignIn, onLogin}){
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [warnMsg, setWarnMsg] = useState("");
    const ref_box = useRef();
    const ref_warn = useRef();

    const onChange = (e)=>{
        const input = ref_box.current.querySelector(`input[class=warn-input]`);
        if(input){
            input.classList.remove("warn-input");
            ref_warn.current.style.visibility = "hidden";
        }
        if(e.target.name === "id"){
            setId(e.target.value);
        }else{
            setPw(e.target.value);
        }
    }
    const onClick = (e)=>{
        if(e.target.dataset.name === "login"){
            goLogin();
        }else{
            onClickSignIn();
        }
    }
    const onKeyDown = (e)=>{
        if(e.keyCode === 13) goLogin();
    }
    const goLogin = ()=>{
        const empty = !(id.trim()) ? "id" : !(pw.trim()) ? "pw" : "";
        if(empty){
            const input = ref_box.current.querySelector(`input[name=${empty}]`);
            input.classList.add("warn-input");
            
            const field = empty === "id" ? "User Name" : "Password";
            ref_warn.current.style.visibility = "visible";
            setWarnMsg(`${field} is empty.`);
            return;
        }
        const param = {
            url : "login",
            body : {id, pw}
        };
        UT.request(param, ({result})=>{
            if(result.length === 0){
                UT.alert(`Check User Name or Password again.`);
            }else{
                onLogin(id);
            }
        });
    }

    useEffect(()=>{
        const input = ref_box.current.querySelector('input[name=id]');
        input.focus();
    }, []);

    return (
        <div className="login-box" ref={ref_box}>
            <div className="welcome-title">TETRIS</div>
            <div className="login-text text-theme">Login to play</div>
            <div className="input-login">
                <input name="id" onChange={onChange} onKeyDown={onKeyDown} placeholder="User Name"></input>
            </div>
            <div className="input-login">
                <input name="pw" onChange={onChange} onKeyDown={onKeyDown} placeholder="Password" type="password"></input>
            </div>
            <div className="login-button" data-name="login" onClick={onClick}>Login</div>

            <div className="warn-msg" ref={ref_warn}>{warnMsg}</div>

            <div className="signin-text">
                <span style={{color : "var(--inactive-color)", fontSize : "15px", marginRight : "8px"}}>New here?</span>
                <span data-name="sign" onClick={onClick}>Sing up</span>
            </div>
        </div>
    );
}

export default Login;