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
        fetch("/api/" + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
        .then(res => res.status === 200 ? res.json() : {})
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
    }
}
