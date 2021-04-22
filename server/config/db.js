const mysql = require('mysql2/promise'); // mysql Promise 사용

const db = mysql.createPool({
    host : 'secret',
    port : 'secret',
    user : 'secret',
    password : 'secret',
    database : 'secret'
});

const sqlMap = {
    getUser : `
        select name
          from user
         where name = ?
           and pw = ? 
    `,
    signin : `
        insert into user 
        (
            name,
            pw
        ) values (
            ?,
            ?
        )
    `,
    getRankList : `
        select a.name, max(a.score) score, a.level, a.reg_dt 
          from score a
    inner join user b
            on a.name = b.name
        where b.name like ?
          and a.level like ?
        group by name
    `,
    saveScore : `
        insert into score 
        (
            name,
            score,
            level,
            id,
            reg_dt
        ) values (
            ?,
            ?,
            ?,
            ?,
            date_format(now(), '%Y-%m-%d %H:%i:%s')
        )
    `,
    getHistory : `
        select * 
          from score
         where name = ?
      order by reg_dt desc
    `,
    getTopRanker : `
        select a.name
             , a.level
             , Max(a.score) as max_score 
         from score a
         inner join user b
            on a.name = b.name
    `,
    getKeySet : `
        select a.keyset
         from setting a
   inner join user b
           on a.name = b.name
    `,
    saveKeySet : `
        insert into setting(
            name,
            keyset
        ) values (
            ?,
            ?
        )
        on duplicate key update
            name = ?,
            keyset = ?
    `
};

const doQuery = async (sqlId, p)=>{
    var params = null, rows = null, error = false;
     
    switch(sqlId){
        case 'getUser': params = [p.id, p.pw];
            break;
        case 'signin': params = [p.id, p.pw];
            break;
        case 'getRankList': params = [p.name ? `%${p.name}%` : '%', p.level ? `${p.level}` : '%'];
            break;
        case 'saveScore': params = [p.name, p.score, p.level, p.id];
            break;
        case 'getHistory': params = [p.name];
            break;
        case 'getTopRanker': params = [];
            break;
        case 'getKeySet': params = [p.name];
            break;
        case 'saveKeySet': params = [p.name, p.keyset, p.name, p.keyset];
            break;
    }

    const conn = await db.getConnection(async c => c);
    try{
        await conn.beginTransaction(); // 트랜잭션 시작

        const[rows] = await conn.query(sqlMap[sqlId], params);

        await conn.commit();
        conn.release();
        return {rows, error}; // Promise 반환이니까 doQuery 호출한곳에서 then으로 받아준다
    }catch(ex){
        console.log("DB error --> " + ex);
        error = true;
        await conn.rollback(); // 에러 시 롤백
        conn.release();
        return {rows, error};
    }
};

module.exports = doQuery;