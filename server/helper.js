const crypto = require('crypto');

const helper = {
    encrypt : (str)=>{
        return crypto.createHash('sha512').update(str).digest('base64');
    },
    token : ()=>{
        return crypto.randomBytes(16).toString('base64');
    },
    logger : (req, res, next)=>{
        req.requestTime = new Date();
        console.log(`${req.url} : requested ${req.requestTime}`);
        next();
    },
    tokenPass : (req, res, next)=>{
        if(req.method === 'GET' && req.url === '/api/getToken'){
            res.send({token : req.csrfToken()});
        }else{
            next();
        }
    }
}

module.exports = helper;
