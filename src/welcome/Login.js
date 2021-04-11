import React, { useEffect, useRef, useState } from 'react';
import { UT } from '../util/util';

function Login(){
    const [id, setId] = useState(null);
    const [pw, setPw] = useState(null);
    const ref_box = useRef();

    const onChange = (e)=>{
        if(e.target.name === "id"){
            setId(e.target.value);
        }else{
            setPw(e.target.value);
        }
    }
    const onClick = (e)=>{
        if(e.target.dataset.name === "login"){
            const param = {
                url : "login",
                body : {id, pw}
            };
            UT.request(param, (res)=>{
                console.log(res);
            });
        }else{
        }
    }

    useEffect(()=>{
        const input = ref_box.current.querySelector('input[name=id]');
        input.focus();
    }, []);

    return (
        <div>
            <div className="title text-theme">TETRIS</div>
            <div className="login-box" ref={ref_box}>
                <div className="login-text text-theme">Login to play</div>
                <div className="input-login">
                    <input name="id" onChange={onChange} placeholder="Username"></input>
                </div>
                <div className="input-login">
                    <input name="pw" onChange={onChange} placeholder="Password"></input>
                </div>
                <div className="login-button" data-name="login" onClick={onClick}>Login</div>
                <div className="signin-text text-theme" data-name="sign" onClick={onClick}>Sing in</div>
            </div>
        </div>
    );
}

export default Login;