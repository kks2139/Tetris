import React, { useEffect, useState, useContext, useRef } from 'react';
import Panel from '../../component/Panel';
import { UT } from '../../util/util';
import {SessionContext} from '../../App';

function Setting({onBack}){
    const [keys, setKeys] = useState([]);
    const [theme, setTheme] = useState("");
    const ref_keybox = useRef();
    const ref_theme = useRef();
    const context = useContext(SessionContext);
    const selected = "key-btn-sel";

    const onClick = (e)=>{
        const targ = e.currentTarget;
        const node = targ.id.indexOf("theme") === -1 ? ref_keybox.current : ref_theme.current;
        const sel = node.querySelector(`.${selected}`);
        if(sel){
            sel.classList.toggle(selected);
            if(sel.id !== targ.id) targ.classList.toggle(selected);
        }else{
            targ.classList.toggle(selected);
        }
        // if(targ.id.indexOf("theme") === -1){
        //     if(sel){
        //         sel.classList.toggle(selected);
        //         if(sel.id !== targ.id) targ.classList.toggle(selected);
        //     }else{
        //         targ.classList.toggle(selected);
        //     }
        // }else{
        //     if(targ.id === "theme1"){
        //         setTheme("Light");
        //     }else{
        //         setTheme("Dark");
        //     }
        // }
    }
    const onKeyDown = (e)=>{
        const targ = ref_keybox.current.querySelector(`.${selected}`);
        if(targ && targ.classList.contains(selected)){
            const idx = Number(targ.id.split('key')[1]);
            setKeys(pre => {
                pre[idx] = e.key;
                return pre.slice();
            });
        }
    }
    const getKeyset = ()=>{
        const param = {
            url : "getKeySet",
            body : {name : context.session.id}
        };
        UT.request(param, (res)=>{
            const arr = res.result.length > 0 ? res.result[0].keyset.split('/') : ['w','s','a','d','j'];
            setKeys(arr);
        });
    }
    const saveKeyset = ()=>{
        UT.confirm("Do you want to save?", ()=>{
            const param = {
                url : "saveKeySet",
                body : {
                    name : context.session.id,
                    keyset : keys.join('/')
                }
            } 
            UT.request(param, (res)=>{
                UT.alert(res.errMsg || "Save complete!");
            });
        });
    }
    const saveTheme = ()=>{
        UT.confirm("Do you want to save?", ()=>{
            const param = {
                url : "saveTheme",
                body : {
                    name : context.session.id,
                    theme : theme
                }
            } 
            UT.request(param, (res)=>{
                UT.alert(res.errMsg || "Save complete!");
            });
        });
    }
    const restoreKeyset = ()=>{
        setKeys(['w','s','a','d','j']);
    }

    useEffect(()=>{
        getKeyset();
        document.addEventListener("keydown", onKeyDown);
        return ()=> document.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
        <>  
            <div className="setting-box">
                <Panel title="Key Setting" style={{height : "280px", marginBottom : "20px"}}>
                    <div className="keyset-box" ref={ref_keybox}>
                        <div>Rotate
                            <div className="key-btn" id="key0" onClick={onClick}>{keys[0]}</div>
                        </div>
                        <div>Move down
                            <div className="key-btn" id="key1" onClick={onClick}>{keys[1]}</div>
                        </div>
                        <div>Move left
                            <div className="key-btn" id="key2" onClick={onClick}>{keys[2]}</div>
                        </div>
                        <div>Move right
                            <div className="key-btn" id="key3" onClick={onClick}>{keys[3]}</div>
                        </div>
                        <div>Drop
                            <div className="key-btn" id="key4" onClick={onClick}>{keys[4]}</div>
                        </div>
                    </div>
                    <div className="setting-btn">
                        <div className="basic-btn-3" onClick={saveKeyset}>Save</div>
                        <div className="basic-btn-3" onClick={restoreKeyset}>Restore Default</div>
                    </div>
                </Panel>
                <Panel title="Theme Color" style={{height : "150px"}}>
                    <div className="x-center" ref={ref_theme} style={{display : "flex", width : "fit-content"}}>
                        <div className="basic-btn-3" id="theme1" onClick={onClick}>Light</div>
                        <div className="basic-btn-3" id="theme2" onClick={onClick}>Dark</div>
                    </div>
                    <div className="setting-btn">
                        <div className="basic-btn-3" onClick={saveTheme}>Save</div>
                    </div>
                </Panel>
            </div>
            <div className="label1" onClick={() => onBack()}>Back</div>
        </>
    );
}

export default Setting;