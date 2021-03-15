import React, {useRef, useState} from 'react';
import './Tetris.css';

function FirstMenu({onSelect, level = []}){
    const [text1, setText1] = useState("start");
    const [cls, setCls] = useState("label1");
    const [isClicked, setIsClicked] = useState(false);
    const timerId = useRef("0");
    const divRef = useRef();

    const clickStart = (e)=>{
        if(e.target.textContent === "select level") return;
        setText1("Select level");
        setCls("label2");
        setIsClicked(true);
        timerId.current = setInterval(()=>{
            const r1 = Math.random() * 1000 % 256;
            const r2 = Math.random() * 1000 % 256;
            const r3 = Math.random() * 1000 % 256;
            divRef.current.style.color = `rgb(${r1}, ${r2}, ${r3})`;
        },600);
    };

    const clickLevel = (e)=>{
        clearInterval(timerId.current);
        onSelect(e.target);
    }

    return(
        <>
            <div className="menu-box">
                <div className="title">TETRIS</div>
                <div className={cls} onClick={clickStart} ref={divRef}>{text1}</div>
                <div className="level-box">{level.map((val, idx)=>{
                    return <div className="label3" key={idx} hidden={!isClicked} onClick={clickLevel}>{val}</div>
                })}</div>
            </div>
        </>
    );
}

export default FirstMenu;