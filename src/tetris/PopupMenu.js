import React, { useEffect, useRef } from 'react';

function PopupMenu({popupHide, onButtonClick}){
    const divRef = useRef(); 
    const timerId = useRef(0);
    const onClick = (e)=>{
        onButtonClick(e.target);
    }

    useEffect(()=>{
        if(popupHide){
            if(timerId.current) {
                clearInterval(timerId.current);
                timerId.current = 0;
            }
        }else{
            if(timerId.current) return;
            timerId.current = setInterval(()=>{
                const r1 = Math.random() * 1000 % 256;
                const r2 = Math.random() * 1000 % 256;
                const r3 = Math.random() * 1000 % 256;
                divRef.current.style.border = `10px solid rgb(${r1}, ${r2}, ${r3})`;
            },700);

        }
    }, [popupHide]);

    return(
        <>
            <div className="modal-back" hidden={popupHide}></div>
            <div className="popup-box" hidden={popupHide} ref={divRef}>
                <div id="btn1" className="label3" onClick={onClick}>Restart</div>
                <div id="btn2" className="label3" onClick={onClick}>Quit</div>
            </div>
        </>
    );
}

export default PopupMenu;