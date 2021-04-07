import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

function LoadMask(){
    const timerId = useRef(0);
    const ref_mask = useRef();

    useEffect(()=>{
        timerId.current = setInterval(()=>{
            if(!ref_mask.current) return;
            const dots = ref_mask.current.children;
            for(var i=0; i<dots.length; i++){
                const color = dots[i].classList.item(1);
                var num = Number(color.split('-')[1]);
                num = num + 1 > 6 ? 1 : num + 1;
                
                dots[i].classList.remove(color);
                dots[i].classList.add("dotcol-" + num);
            }

        }, 90);
        return ()=> clearInterval(timerId.current);
    }, []);

    return (
        ReactDOM.createPortal(
            <div className="mask-back">
                <div className="mask" ref={ref_mask}>
                    <div className="dot1 dotcol-1"></div>
                    <div className="dot2 dotcol-2"></div>
                    <div className="dot3 dotcol-3"></div>
                    <div className="dot4 dotcol-4"></div>
                    <div className="dot5 dotcol-5"></div>
                    <div className="dot6 dotcol-6"></div>
                    <div className="dot6 dotcol-7"></div>
                    <div className="dot6 dotcol-8"></div>
                </div>
            </div>,
            document.getElementById("modal")
        )
    );
}

export default LoadMask;