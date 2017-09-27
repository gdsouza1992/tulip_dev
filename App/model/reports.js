const db = require('../lib/db');

const report = {};

report.getDataByDate = (startDate, endDate, callback) => {
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

report.getMetricsByPage = (callback) => {
    const sql = `SELECT COUNT(*)::INTEGER as value, did_aww_snap, current_page as name FROM reports GROUP BY did_aww_snap, current_page`
    db.execute(sql, [], callback);
}

report.getReportByTimeBin = (timeInSecs, currentPage, callback) => {

    const sql = `SELECT COUNT(*)::INTEGER, current_page, to_timestamp(floor(TIMESTAMP / $1::int8 ) * $1::int8) AS time_bin
        FROM reports WHERE did_aww_snap = true
        GROUP BY time_bin, current_page
        ORDER BY time_bin`;
    db.execute(sql, [timeInSecs], callback);
}

report.getBytesByTimeBin = (timeInSecs, currentPage, callback) => {
    const sql = `SELECT (SUM(bytes_used) / 1000000000)  as bytes_used, current_page, to_timestamp(floor(TIMESTAMP / $1::int8 ) * $1::int8) AS time_bin
        FROM reports
        GROUP BY time_bin, current_page
        ORDER BY time_bin`;
    db.execute(sql, [timeInSecs], callback);
}

report.getBytesToFailure = (callback) => {
    const sql = `SELECT ROUND(AVG(bytes_used) / 1000000, 0) as average ,MIN(bytes_used/1000000),MAX(bytes_used/1000000), current_page FROM reports WHERE id IN (
        SELECT prev_id
        FROM (
            SELECT id,
                lag(id) OVER (ORDER BY id) AS prev_id,
                did_aww_snap
            FROM reports
        ) AS t
        WHERE did_aww_snap = 'true'
    ) GROUP BY current_page ORDER BY current_page`;
    db.execute(sql, [], callback);
}


module.exports = report;
