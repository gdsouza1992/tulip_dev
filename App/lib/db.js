const { Client } = require('pg');
const config = require('../config/index');

const db = {};

db.execute = (sql, params, callback) => {
    const client = new Client({
        user: config.db.user,
        host: config.db.host,
        password: config.db.password,
        database: config.db.database,
        port: config.db.port
    });

    client.connect((err) => {
        if (err) {
            logger.error(' ' + err);
        }
    });

    client.query(sql, params, (err, results) => {
        if (err) {
            console.log(err);
            // logger.error('query string', sql, 'params', params, ' err: ', err);
            callback(err);
        } else {
            callback(null, results.rows);
        }

        client.end();
    });
};

module.exports = db;
