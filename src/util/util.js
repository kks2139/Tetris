export const UT = {
    uuid : ()=>{
        var len = 0;
        const now = new Date();
        const d = now.toLocaleString().split('.');
        const t = now.toTimeString().split(':');

        len = d[1].trim().length; 
        d[1] = len === 1 ? '0' + d[1].trim() : d[1].trim(); 
        len = d[2].trim().length; 
        d[2] = len === 1 ? '0' + d[2].trim() : d[2].trim();

        return d[0] + d[1] + d[2] + '-' + t[0] + t[1] + now.getSeconds() + '-' + UT.rand(100);
    },

    rand : n => { // 0 ~ n 사이의 랜덤숫자 리턴
        if(isNaN(n)) return 0;
        else{
            const pos = Math.pow(10, Number(("" + n).length));
            return (Math.random() * pos % n).toFixed();
        }
    },

    request : ({url, body = {}}, callback)=>{
        if(!url) return;
        UT.showLoadMask(true);
        fetch("/api/" + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
        .then(res => {
            UT.showLoadMask(false);
            return res.status === 200 ? res.json() : {}
        })
        .then(res => {
            const result = {
                status : res.errno ? -1 : 200,
                result : res
            }
            if(callback && typeof callback === "function") callback(result);
        })
        .catch(e => {
            console.error(e);
        });
    },

    showLoadMask : (show)=>{
        const modalRoot = document.querySelector('#modal');
        if(show){
            if(document.querySelectorAll('div.modal-back').length !== 0) return;
            const maskBack = document.createElement('div');
            const mask = document.createElement('div');
            maskBack.classList.add('modal-back');
            mask.classList.add('mask');

            modalRoot.appendChild(maskBack);
            maskBack.appendChild(mask);

            for(var i=1; i<=8; i++){
                const dot = document.createElement('div');
                dot.classList.add('dot' + i);
                dot.classList.add('dotcol-' + i);
                mask.appendChild(dot);
            }

            window.modalIntervalId = setInterval(()=>{
                const dots = document.querySelectorAll('div.modal-back div[class*="dot"]');
                for(var i=0; i<dots.length; i++){
                    const color = dots[i].classList.item(1);
                    var num = Number(color.split('-')[1]);
                    num = num + 1 > 8 ? 1 : num + 1;
                    
                    dots[i].classList.remove(color);
                    dots[i].classList.add("dotcol-" + num);
                }
            }, 80);

        }else{
            clearInterval(window.modalIntervalId);
            modalRoot.removeChild(modalRoot.firstChild);
        }
    },

    alert : (msg)=>{
        const modalRoot = document.querySelector('#modal');
        if(document.querySelectorAll('div.modal-back').length !== 0) return;
        const back = document.createElement('div');
        const dialog = document.createElement('div'); // alert창
        const msgBox = document.createElement('div'); // 메시지박스
        const btnBox = document.createElement('div'); // 버튼박스
        const okBtn = document.createElement('div'); // 확인버튼
        
        back.classList.add('modal-back');
        dialog.classList.add('dialog');
        msgBox.classList.add('dialog-msg-box');
        btnBox.classList.add('dialog-btn-box');
        okBtn.classList.add('dialog-btn-ok');

        msgBox.textContent = msg;
        okBtn.textContent = "OK";
        okBtn.onclick = (e)=>{
            e.target.onclick = null;
            modalRoot.removeChild(modalRoot.firstChild);
        }

        modalRoot.appendChild(back);
        back.appendChild(dialog);
        dialog.appendChild(msgBox);
        dialog.appendChild(btnBox);
        btnBox.appendChild(okBtn);
    }
}