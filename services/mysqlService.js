const mysql = require('mysql');

const poolConection =  mysql.createPool(Koa.config.mysqlused.db);

async function poolQuery(query, args) {
    try {
        return await executeQuery(poolConection, query, args);        
    } catch (error) {
        return error;
    }
}

async function executeQuery(poolCreate, query, args) {
    console.log(`executeQuery == ${query} args = ${args}`);
    return new Promise((resolve, reject) => {
      try {
        poolCreate.getConnection((err, tempCont) => {
          if (err) {
            reject(err);
            return;
          }
          tempCont.query(query, args, (errs, results) => {
            tempCont.release();
            if (errs) {
              reject(errs);
              return;
            }
            console.debug(results);
            resolve(results);
          });
        });
      } catch (error) {
        reject(error);
      }
    });
}

module.exports = {
    poolQuery
}