const utils = {};

utils.pgDate = (ds) => {
    var day=new Date(ds.replace(' ','T')+'Z');
    return day.toUTCString();
}

module.exports = utils;
