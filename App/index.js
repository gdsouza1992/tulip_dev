var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var attachApiRoutes = require('./server/routes');
var app = express();
var port = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger('combined'));

//To prevent errors from Cross Origin Resource Sharing
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Use the router configuration
attachApiRoutes(app);

app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
