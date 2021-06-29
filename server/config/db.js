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
    checkUser : `
        select name
          from user
         where name = ?
    `,
    signup : `
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
    select @rownum := @rownum + 1 'rank'
         , A.*
      from (
            select aa.name, max(aa.score) score, aa.level, aa.reg_dt
              from (
             select a.name
                  , a.score
                  , a.level
                  , a.reg_dt 
               from score a
         inner join user b
                 on a.name = b.name
           order by score desc
        ) aa
    group by aa.name
    order by aa.score desc
    ) A,
    (select @rownum := 0) R
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
      group by a.level
    `,
    getKeySet : `
        select a.keyset
         from setting a
   inner join user b
           on a.name = b.name
        where a.name = ?
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
    `,
    getTheme : `
        select a.theme
         from setting a
   inner join user b
           on a.name = b.name
        where a.name = ?
    `,
    saveTheme : `
        insert into setting(
            name,
            theme
        ) values (
            ?,
            ?
        )
        on duplicate key update
            name = ?,
            theme = ?
    `
};

const doQuery = async (sqlId, p)=>{
    var params = null, rows = null, error = false;
     
    switch(sqlId){
        case 'getUser': params = [p.id, p.pw];
            break;
        case 'checkUser': params = [p.id];
            break;
        case 'signup': params = [p.id, p.pw];
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
        case 'getTheme': params = [p.name];
            break;
        case 'saveTheme': params = [p.name, p.theme, p.name, p.theme];
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