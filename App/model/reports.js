const db = require('../lib/db');

const report = {};

report.getDataByDate = (startDate, endDate, callback) => {
    console.log(startDate, endDate);
    const sql = `SELECT *
        FROM reports
        WHERE TIMESTAMP BETWEEN
            EXTRACT(EPOCH FROM $1::timestamp) AND
            EXTRACT(EPOCH FROM $2::timestamp)`;
    db.execute(sql, [startDate, endDate], callback);
}

report.getReportData = (callback) => {
    const sql = `SELECT *
        FROM reports`;
    db.execute(sql, [], callback);
}

report.getReportByTimeBin = (timeInSecs, callback) => {
    const sql = `SELECT COUNT(*), SUM(bytes_used) AS sum_bytes_used, did_aww_snap, current_page, to_timestamp(floor(TIMESTAMP / $1::int8 ) * $1::int8) AS time_bin
        FROM reports
        GROUP BY time_bin, current_page, did_aww_snap
        ORDER BY time_bin`;
    db.execute(sql, [timeInSecs], callback);
}

report.getBytesToFailure = (callback) => {
    const sql = `SELECT ROUND(AVG(bytes_used), 0) as average ,MIN(bytes_used),MAX(bytes_used), current_page FROM reports WHERE id IN (
        SELECT prev_id
        FROM (
            SELECT id,
                lag(id) OVER (ORDER BY id) AS prev_id,
                did_aww_snap
            FROM reports
        ) AS t
        WHERE did_aww_snap = 'true'
    ) GROUP BY CURRENT_page`;
    db.execute(sql, [], callback);
}

module.exports = report;