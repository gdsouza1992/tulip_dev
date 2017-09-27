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
            console.log(err);
        }
    });

    client.query(sql, params, (err, results) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            callback(null, results.rows);
        }

        client.end();
    });
};

module.exports = db;
