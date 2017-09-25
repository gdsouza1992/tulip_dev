const express = require('express');
const api = require('./api');
const router = express.Router();


module.exports = function attachApiRoutes(app) {
    app.use('/api', api);
};
