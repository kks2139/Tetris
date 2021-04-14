const express = require('express');     // express = nodeJS 서버관리 모듈
const app = express();                  // app 변수로 서버관리
const PORT = process.env.PORT || 4000;  // 포트설정

app.use(express.json());                // 앞단의 파라미터를 받게 해준다 (req.body.값이름)
app.use(express.urlencoded( {extended : false } ));

const doQuery = require('./config/db');

// 현재경로(server.js) 에서 node server.js 를 입력해 서버실행. 
app.listen(PORT, () => {                // 해당 포트번호로 서버실행
    console.log(`Server On : http://localhost:${PORT}/`);
});

app.get('/', (req, res) => { 
    res.send(`This is server root url. port:${PORT}`);
});

app.post('/api/login', (req, res)=>{
    doQuery('login', req.body).then( obj =>{
        if(obj.error){
            res.send("Error Occured.");
        }else{
            res.send(obj.rows);
        }
    });
});

app.post('/api/signin', (req, res)=>{
    doQuery('signin', req.body).then( obj =>{
        if(obj.error){
            res.send("Error Occured.");
        }else{
            res.send(obj.rows);
        }
    });
})

app.post('/api/getRankList', (req, res) => { 
    doQuery('getRankList', req.body).then( obj =>{
        if(obj.error){
            res.send("Error Occured.");
        }else{
            res.send(obj.rows);
        }
    });
});

app.post('/api/saveScore', (req, res) => { 
    doQuery('saveScore', req.body).then( obj =>{
        if(obj.error){
            res.send("Error Occured.");
        }else{
            res.send(obj.rows);
        }
    });
});

app.post('/api/getHistory', (req, res) => { 
    doQuery('getHistory', req.body).then( obj =>{
        if(obj.error){
            res.send("Error Occured.");
        }else{
            res.send(obj.rows);
        }
    });
});

