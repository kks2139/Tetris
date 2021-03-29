import React, { useEffect, useRef, useState } from 'react'

// 블록 생성
function makeBlock(body, idx, size, lvl, fallRef, moveDownFunc, blockCount){
    const block = {
        b1 : [[1,0], [1,0], [1,0], [1,0]], // ㅡ
        b2 : [[1,0], [1,0], [1,1]], // ㄱ
        b3 : [[1,1], [1,0], [1,0]], // 반대 ㄱ
        b4 : [[1,0], [1,1], [0,1]], // ㄹ
        b5 : [[0,1], [1,1], [1,0]], // 반대 ㄹ
        b6 : [[1,1], [1,1]], // ㅁ
        b7 : [[0,1], [1,1], [0,1]] // ㅗ
    };

    const len = block["b" + idx].length;
    
    const frame = document.createElement('div');
    frame.style.width = (len * size) + "px";
    frame.style.height = (2 * size) + "px";
    frame.style.position = "relative";
    frame.style.left = (3 * size) + "px";
    frame.style.transformOrigin = idx === 6 ? `${size}px ${size}px` : `${size + size/2}px ${size/2}px`;
    frame.classList.add("active");

    for(var i=0; i<2; i++){
        const row = document.createElement('div');
        row.style.width = (len * size) + "px";
        row.style.height = size + "px";
        row.style.display = "flex";
        frame.appendChild(row);
    }

    for(var i=0; i<block["b" + idx].length; i++){
        for(var k=0; k<2; k++){
            const val = block["b" + idx][i][k];
            const div = document.createElement('div');

            div.style.cssText = `width:${size}px; height:${size}px;`;
            if(val === 1) div.classList.add("block-color" + idx);

            if(k === 0){
                frame.children[0].appendChild(div);
            }else{
                frame.children[1].appendChild(div);
            }
        }
    }
    body.current.appendChild(frame);

    // 하나 쌓일때마다 size x 2 씩 아래로 밀려서 블록이 생성된다... 원인을 모르겠어서 임시처방
    if(blockCount > 0){
        frame.style.top = `-${size * 2 * blockCount}px`
    }

    // 난이도별 타이머 간격
    const speed = lvl === "Easy" ? 1000 : lvl === "Normal" ? 600 : lvl === "Hard" ? 300 : 150;   
    fallRef.current = setInterval(moveDownFunc, speed);
}

function isUnderCelling(body, size){
    if(body.getClientRects().length == 0) return false;
    const {top : bodyTop, left : bodyLeft} = body.getClientRects()[0];
    const deadBlocks = document.querySelectorAll('div.non-active');
    const half = size / 2;

    const borderL = bodyLeft + size * 2; 
    const borderR = bodyLeft + size * 8;

    for(var i=0; i<deadBlocks.length; i++){
        const {rect : deadBits} = getBlockRectAll(deadBlocks[i]);
        for(var k=0; k<deadBits.length; k++){
            if(deadBits[k].top + half > bodyTop && deadBits[k].top + half < bodyTop + size &&
                deadBits[k].left + half > borderL && deadBits[k].left + half < borderR){
                return true;
            }
        }
    }
}

// 현재 블록의 가장 밖같쪽 top, left 반환
function getBlockRect(block){
    if(!block) return;
    const bit = block.querySelectorAll('[class*="block-color"]');
    const temp1 = [], temp2 = [];
    
    bit.forEach((b)=>{ 
        temp1.push(b);
        temp2.push(b); 
    });
    temp1.sort((a, b) => a.getClientRects()[0].top - b.getClientRects()[0].top);
    temp2.sort((a, b) => a.getClientRects()[0].left - b.getClientRects()[0].left);

    const top = temp1.pop().getClientRects()[0].top;
    const minLeft = temp2[0].getClientRects()[0].left;
    const maxLeft = temp2.pop().getClientRects()[0].left;
    const bodyInfo = document.querySelector('#body').getClientRects()[0];

    return {top, minLeft, maxLeft, bodyInfo};
}

// 벽에 닿았는지 체크
function isTouched(rotate, block, size, key){
    const w = 10 * size;
    const h = 20 * size;

    const {top, minLeft, maxLeft, bodyInfo} = getBlockRect(block);

    if(rotate){ // 회전시 삐져나온부분 체크
        const bw = 7; // body 의 border width
        const leftSide = bodyInfo.left + bw - minLeft;
        const rightSide = maxLeft + size - (bodyInfo.left + bw + w);
        const downSide = top - (bodyInfo.top + bw + h);

        // 튀어나온만큼 안쪽으로 밀어넣을건데 그랬을때 또 다른 블록들과 겹치는지 확인하고 겹치면 회전을 원복한다
        var move = 0;
        const deg = Number(block.style.transform.split('(')[1].split('deg')[0]);
        if(leftSide > 0){
            move = Math.floor(leftSide / size) === 0 ? size : Math.floor(leftSide / size) * size;
            for(var i=1; i<=move/size; i++){
                if(collision(false, block, size * (move/size), 'd')){
                    block.style.transform = `rotate(${deg - 90}deg)`;
                    return;
                }
            }
            block.style.left = (Number(block.style.left.split('px')[0]) + move) + "px";
        }
        if(rightSide > 0){
            move = Math.floor(rightSide / size) === 0 ? size : Math.floor(rightSide / size) * size;
            for(var i=1; i<=move/size; i++){
                if(collision(false, block, size * (move/size), 'a')){
                    block.style.transform = `rotate(${deg - 90}deg)`;
                    return;
                }
            }
            block.style.left = (Number(block.style.left.split('px')[0]) - move) + "px";
        }
        if(downSide > 0){
            move = Math.floor(downSide / size) === 0 ? size : Math.floor(downSide / size) * size;
            for(var i=1; i<=move/size; i++){
                if(collision(false, block, size * (move/size), 's')){
                    block.style.transform = `rotate(${deg - 90}deg)`;
                    return;
                }
            }
            block.style.top = (Number(block.style.top.split('px')[0]) - move) + "px";
        }
    }else{ // 이동시 벽너머로 삐져나갈 것인지 체크
        switch(key){
            case 's': 
                if(top - bodyInfo.top + size > h) return true;
                else break;
            case 'a': 
                if(minLeft - bodyInfo.left - size < 0) return true;
                else break;
            case 'd': 
                if(maxLeft - bodyInfo.left + size > w) return true;
                else break;
        }
        return false;
    }
}

// 블록 모든 부분의 좌표정보 반환
function getBlockRectAll(block){
    const bit = block.querySelectorAll('[class*="block-color"]');
    const rect = [], bitObj = [];

    for(var i=0; i<bit.length; i++){
        rect.push(bit[i].getClientRects()[0]);
        bitObj.push(bit[i]);
    }
    return {rect, bitObj};
}

function checkCollision(bitInfo, bodyInfo, startX, startY, endX, endY, size){
    if(bitInfo.left > startX && bitInfo.left < endX && 
        bitInfo.top > startY && bitInfo.top < endY &&
        bitInfo.left > bodyInfo.left && bitInfo.left < bodyInfo.left + size * 10 &&
        bitInfo.top > bodyInfo.top && bitInfo.top < bodyInfo.top + size * 20){
            return true;
        }
}

// 다른 블록들과 충돌 체크
function collision(rotate, block, size, key){
    const bodyInfo = document.querySelector('#body').getClientRects()[0];
    const deadBlocks = document.querySelectorAll('div.non-active');
    const {rect : currBits, bitObj : cb} = getBlockRectAll(block);
    var result = false; //rotate ? 0 : false;

    for(var i=0; i<deadBlocks.length; i++){
        const {rect : deadBits, bitObj : db} = getBlockRectAll(deadBlocks[i]);

        for(var k=0; k<currBits.length; k++){
            for(var j=0; j<deadBits.length; j++){
                if(rotate){
                    const blockX = Number(block.style.left.split('px')[0]);
                    const blockY = Number(block.style.top.split('px')[0]);
                    const orginBit = {
                        left : currBits[k].left + size / 2,
                        top : currBits[k].top + size / 2
                    };
                    const bitInfo = {...orginBit};
                    var startX = deadBits[j].left - 0;
                    var startY = deadBits[j].top - 0;
                    var endX = startX + size + 0;
                    var endY = startY + size + 0;
                    
                    result = checkCollision(bitInfo, bodyInfo, startX, startY, endX, endY, size);
                    if(result) return true;
                }else{
                    const halfPlus = size + size / 2;
                    const half = size / 2;
                    switch(key){
                        case 's':
                            if(Math.abs(currBits[k].left - deadBits[j].left) <= 2 && 
                                currBits[k].top + halfPlus > deadBits[j].top && currBits[k].top + halfPlus < deadBits[j].top + size) {
                                    return true;
                                }
                            else break;
                        case 'a':
                            if(Math.abs(currBits[k].top - deadBits[j].top) <= 2 && 
                                currBits[k].left - half > deadBits[j].left && currBits[k].left - half < deadBits[j].left + size) {
                                    return true;
                                }
                            else break;
                        case 'd':
                            if(Math.abs(currBits[k].top - deadBits[j].top) <= 2 && 
                                currBits[k].left + halfPlus > deadBits[j].left && currBits[k].left + halfPlus < deadBits[j].left + size) return true;
                    }
                }
            }
        }
    }
    return result;
}

function checkFullLayer(body, size){
    const deadBlocks = document.querySelectorAll('div.non-active');
    const half = size / 2;
    const fullLayer = [];
    
    for(var h=1; h<=20; h ++){ // 위에서부터 아래로 내려가면서 가로로 10개 다 찼는지 확인
        var cnt = 0; // 차있는 블록 갯수
        const layer = body.getClientRects()[0].top + size * h; 
        for(var i=0; i<deadBlocks.length; i++){
            const {rect : deadBits} = getBlockRectAll(deadBlocks[i]);
            
            for(var k=0; k<deadBits.length; k++){
                if(deadBits[k].top + half > layer && deadBits[k].top + half < layer + size){
                   cnt++ 
                }
            }
        }
        if(cnt === 10) fullLayer.push(h);
    }
    return fullLayer;
}

function removeLayer(layer, body, size){
    const deadBlocks = document.querySelectorAll('div.non-active');
    const half = size / 2;
    const ly = body.getClientRects()[0].top + size * layer;  

    for(var i=0; i<deadBlocks.length; i++){
        const {rect : deadBits, bitObj} = getBlockRectAll(deadBlocks[i]);
        
        for(var k=0; k<deadBits.length; k++){
            // 가득찬 층 제거
            if(deadBits[k].top + half > ly && deadBits[k].top + half < ly + size){
                bitObj[k].classList.forEach( cls => bitObj[k].classList.remove(cls));
                bitObj[k].classList.add("removed");
            }

            // 제거된줄 윗부분 bit들 아래로 한칸씩내림
            if(deadBits[k].top + half < ly){
                const blockDeg = bitObj[k].parentNode.parentNode.style.transform;
                const deg = blockDeg.split('(').length > 1 ? Number(blockDeg.split('(')[1].split('deg')[0]) : 0
                const top = bitObj[k].style.top.split('px').length > 1 ? Number(bitObj[k].style.top.split('px')[0]) : 0;
                const left = bitObj[k].style.left.split('px').length > 1 ? Number(bitObj[k].style.left.split('px')[0]) : 0;

                bitObj[k].style.position = "relative";
                const kind = (deg / 90) % 4;
                switch(kind){
                    case 0:
                        bitObj[k].style.top = top + size + "px";
                        break;
                    case 1:
                        bitObj[k].style.left = left + size + "px";
                        break;
                    case 2:
                        bitObj[k].style.top = top - size + "px";
                        break;
                    case 3:
                        bitObj[k].style.left = left - size + "px";
                }
            }
        }
    }
}

function MainBody({size = 10, level = "Easy", onBackToMenu, onRestart, onRecord, recordDone}){
    const body = useRef();
    const idx = Math.floor(Math.random() * 10 % 7 + 1);
    const [blockCount, setBlockCount] = useState(0);
    const [score, setScore] = useState(0);
    const [comboStack, setComboStack] = useState(0);
    const fallRef = useRef('');
    const overRef = useRef();
    const labelRef = useRef();
    

    const combo_timerId = useRef('');  // timer id
    const combo_limit = useRef(3); // 제한시간
    const combo_div = useRef(); // div element

    const moveDownFunc = ()=>{
        const curr = document.querySelector('div.active');
        if(isTouched(false, curr, size, "s") || collision(false, curr, size, "s")){ // 아랫쪽 박스 경계선 닿거나, 다른블록과 닿으면 비활성 처리
            clearInterval(fallRef.current);
            fallRef.current = '';
            curr.classList.remove('active');
            curr.classList.add('non-active');
            var currCombo = 1;

            const fullLayer = checkFullLayer(body.current, size);
            for(var i=0; i<fullLayer.length; i++){ // 꽉찬줄 제거
                removeLayer(fullLayer[i], body.current, size);
            }
            // 2초 이내에 또 없애면 콤보증가 (콤보스택만큼 점수에 곱하기)
            if(fullLayer.length > 0){
                if(combo_limit.current > 0) {
                    clearInterval(combo_timerId.current);
                    combo_limit.current = 3;
                }
                combo_timerId.current = setInterval(()=>{
                    if(combo_limit.current == 3) combo_div.current.style.opacity = 0.9;
                    combo_limit.current--;    
                    
                    if(combo_limit.current == 1) combo_div.current.style.opacity = 0;
                    if(combo_limit.current == 0){ // 제한시간 초과시 콤보값 초기화
                        clearInterval(combo_timerId.current);
                        combo_limit.current = 3;
                        setComboStack(0);
                    }
                }, 1000);
                setComboStack(n => {
                    currCombo = n + 1;
                    console.log(currCombo);
                    return n + 1;
                });
            }
            console.log("ee " + currCombo);
            setScore(n => n + fullLayer.length * 10 * currCombo); // 한줄당 10점 (x콤보)
            setBlockCount(n => n + 1); // makeBlock 실행
        }else{
            curr.style.top = Number(curr.style.top.split('px')[0]) + size + "px";
        }
    };

    const backToMenuClick = (e)=>{
        onBackToMenu();
    }
    const restartClick = (e)=>{
        onRestart(level);
    }
    const recordClick = (e)=>{
        if(labelRef.current.classList.contains("label-disabled")) return;
        onRecord(score);
    }

    useEffect(()=>{
        if(recordDone) labelRef.current.classList.add("label-disabled");
    }, [recordDone]);

    useEffect(()=>{
        // 꼭대기의 중앙부분 찼는지 확인
        if(isUnderCelling(body.current, size)){
            // alert("Game Over");

            body.current.style.filter = "blur(6px)";
            overRef.current.hidden = false;
            setTimeout(()=> overRef.current.style.opacity = 1, 50);

        }else{
            //if(bodyHide) clearBlocks(body.current);
            makeBlock(body, idx, size, level, fallRef, moveDownFunc, blockCount);
        }
    }, [blockCount]);

    useEffect(()=>{
        const onKeyDown = (e)=>{
            const curr = document.querySelector('div.active');
            if(!curr) return;
            if(isTouched(false, curr, size, e.key) || collision(false, curr, size, e.key)) return;

            var {top, left, transform} = curr.style;
            top = Number(top.split('px')[0]);
            left = Number(left.split('px')[0]);
            transform = transform.split('(').length > 1 ? Number(transform.split('(')[1].split('deg')[0]) : 0;
            
            switch(e.key){
                //case 'w': curr.style.top = (top - size) + "px"; break;
                case 's': curr.style.top = (top + size) + "px"; break;
                case 'a': curr.style.left = (left - size) + "px"; break;
                case 'd': curr.style.left = (left + size) + "px"; break;
                case 'w':
                     curr.style.transform = `rotate(${transform + 90}deg)`;
                     const deg = Number(curr.style.transform.split('(')[1].split('deg')[0]);
                     if(collision(true, curr, size)) {
                         curr.style.transform = `rotate(${deg - 90}deg)`;
                    }else{
                        isTouched(true, curr, size);
                        // if(curr.classList.contains('block-color1')){
                        //     isTouched(true, curr, size); // 'ㅡ' 모양은 한번 더 체크한다
                        // }
                    }
                    break;
                case 'j':
                    var moveDown = top + size;
                    while(!isTouched(false, curr, size, "s") && !collision(false, curr, size, "s")){
                        curr.style.top = moveDown + "px";
                        moveDown += size;
                    }
            }
        }
        document.addEventListener("keydown", onKeyDown);
        return ()=>{ // hide = true 되서 컴포넌트 제거되기 직전에 document 이벤트 해지시킴
            document.removeEventListener("keydown", onKeyDown); 
            clearInterval(fallRef.current);
        };
    },[]);

    // 가로-10 세로-20 은 고정값
    const bodySize = {
        width: 10 * size + "px",
        height: 20 * size + "px"
    };

    return(
        <div style={{margin: "auto"}}>
            <div style={{height : "40px"}}>
                <div style={{display : "flex"}}>
                    <div className="score">Score : {score}</div>
                    <div style={{margin : "0 auto"}}></div>
                    <div className="score">Level : {level}</div>
                </div>

                {/* <div className="combo" ref={combo_div}>
                        <div className="combo-number">{comboStack}</div> 
                        Combo!
                    </div>  */}

                {comboStack > 0 ? 
                    <div className="combo" ref={combo_div}>
                        <div className="combo-number">{comboStack}</div> 
                        Combo!
                    </div> 
                : null}
            </div>
            <div className="game-over" ref={overRef} hidden={true}>
                Game Over
                <div class="label3" style={{margin : "20px auto"}} onClick={restartClick}>Restart</div>
                <div class="label3" style={{margin : "20px auto"}} onClick={backToMenuClick}>Back to menu</div>
                <div class="label3" style={{margin : "20px auto"}} onClick={recordClick} ref={labelRef}>Record</div>
            </div>
            <div id="body" className="body-frame" ref={body} style={bodySize}></div>
        </div>
    );
}

export default MainBody;