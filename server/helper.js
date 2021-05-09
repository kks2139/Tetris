const crypto = require('crypto');

const helper = {
    encrypt : (str)=>{
        return crypto.createHash('sha512').update(str).digest('base64');
    },
    token : ()=>{
        return crypto.randomBytes(16).toString('base64');
    }
}

module.exports = helper;