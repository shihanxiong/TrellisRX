var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Connect to mongodb
var mongodb = require('mongodb').MongoClient;

var uri = "mongodb://pointbit:chickenandrice@pbcluster01-shard-00-00-lviwo.mongodb.net:27017,pbcluster01-shard-00-01-lviwo.mongodb.net:27017,pbcluster01-shard-00-02-lviwo.mongodb.net:27017/TrellisRx?ssl=true&replicaSet=PBCluster01-shard-0&authSource=admin";
mongodb.connect(uri, function(err, db) {
  if (err) {
    console.log('Unable to connect to the database server.');
    db.close();
  } else {
    console.log('Successfully connected to the database server.');
    db.close();
  }
});

var index = require('./routes/index');
var patients = require('./routes/patients');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/patients', patients);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
