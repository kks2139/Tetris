import React, { useRef } from 'react';

function PopupMenu({onButtonClick}){
    const divRef = useRef(); 
    const onClick = (e)=>{
        onButtonClick(e.target);
    }

    return(
        <>
            <div className="modal-back"></div>
            <div className="popup-box" ref={divRef}>
                <div id="btn1" className="label3" onClick={onClick}>To Menu</div>
                <div id="btn2" className="label3" onClick={onClick}>Cancel</div>
            </div>
        </>
    );
}

export default PopupMenu;