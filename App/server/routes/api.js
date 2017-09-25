const express = require('express');
const router = express.Router();
const Report = require('../../model/reports');

const utils = require('../../lib/utils');

router.get('/', (req, res) => {
    res.json(
        { apiUrls: [
                "/getDataByDate",
                "/getReportData",
                "/bytesToFailure"
            ]
        }
    );
});

router.get('/getDataByDate', (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    if(startDate !== 'undefined' && endDate !== 'undefined'){
        Report.getDataByDate(startDate, endDate, (err, results) => {
            if(err) {
                console.log(err);
                res.json({message: "Error in getting /getDataByDate"})
            }
            else {
                console.log(results)
                res.json(results);
            };
        });
    }
});

router.get('/getReportData', (req, res) => {
    Report.getReportData((err, results) => {
        if(err) {
            console.log(err);
            res.json({message: "Error in getting /getReportData"})
        }
        else {
            console.log(results)
            res.json(results);
        };
    });
})



router.get('/getReportByTimeBin', (req, res) => {
    //Default to hourly
    const timeBin = req.query.secs || 3600;
    Report.getReportByTimeBin(timeBin, (err, results) => {
        if(err) {
            console.log(err);
            res.json({message: "Error in getting /getReportByTimeBin"})
        }
        else {
            console.log(results)
            res.json(results);
        };
    })
});

router.get('/bytesToFailure', (req, res) => {
    Report.getBytesToFailure((err, results) => {
        if(err) {
            console.log(err);
            res.json({message: "Error in getting /bytesToFailure"})
        }
        else {
            console.log(results)
            res.json(results);
        };
    });
});

module.exports = router;
