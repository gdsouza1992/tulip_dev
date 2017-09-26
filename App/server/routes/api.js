const express = require('express');
const router = express.Router();
const Report = require('../../model/reports');

const utils = require('../../lib/utils');
const _ = require('lodash');


router.get('/', (req, res) => {
    res.json(
        { apiUrls: [
                "/getDataByDate",
                "/getReportData",
                "/getReportByTimeBin",
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
                // console.log(results)
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
            // console.log(results)
            res.json(results);
        };
    });
})

router.get('/getMetricsByPage', (req, res) => {
    Report.getMetricsByPage((err, results) => {
        if(err){
            console.log(err);
            res.json({message: "Error in getting /getMetricsByPage"});
        }
        else {
            console.log(results);
            var data = _.chain(results)
                .groupBy("did_aww_snap")
                .value()

            var totalTrue = data.true.reduce((sum, pageData) => {
               return sum + pageData.value;
            }, 0);
            var trueValues = data.true;
            var metrics = _.map(trueValues, (truthValue) => {
                truthValue.value = parseFloat(((truthValue.value / totalTrue ) * 100 ).toFixed(2));
                delete truthValue.did_aww_snap;
                return truthValue
            });
            res.json(metrics);
        }
    })
})

router.get('/getReportByTimeBin', (req, res) => {
    //Default to hourly
    const timeBin = req.query.secs || ( 3600 );
    const currentPage = req.query.currentPage || "/analytics";
    Report.getReportByTimeBin(timeBin, currentPage, (err, results) => {
        if(err) {
            console.log(err);
            res.json({message: "Error in getting /getReportByTimeBin"})
        }
        else {
            //Group data by time Key
            var data = _.chain(results)
                .groupBy("time_bin")
                .value()

            var chartData = _.map(data, (hourly, timestamp) => {
                	var g = {}
                	g.time_bin = timestamp;
                	_.forEach(hourly, (pageData) => {
                		g["page_"+pageData.current_page] = pageData.count
                	})
                	return g;
                })

            // console.log(chartData)
            res.json(chartData);
        };
    })
});

router.get('/getBytesByTimeBin', (req, res) => {
    //Default to hourly
    const timeBin = req.query.secs || ( 3600 );
    const currentPage = req.query.currentPage || "/analytics";
    Report.getBytesByTimeBin(timeBin, currentPage, (err, results) => {
        if(err) {
            console.log(err);
            res.json({message: "Error in getting /getBytesByTimeBin"})
        }
        else {
            //Group data by time Key
            var data = _.chain(results)
                .groupBy("time_bin")
                .value()

            // var chartData = _.map(data, (hourly, timestamp) => {
            //     	var g = {}
            //     	g.time_bin = timestamp;
            //     	_.forEach(hourly, (pageData) => {
            //     		g["page_"+pageData.current_page] = parseInt(pageData.bytes_used)
            //             g["count_page_"+pageData.current_page] = parseInt(pageData.count)
            //     	})
            //     	return g;
            //     })

            // console.log(chartData)
            res.json(data);
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
