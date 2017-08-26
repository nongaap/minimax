'use strict';

/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
var cluster = require('cluster');
// count the machine's CPUs
var cpuCount = require('os').cpus().length;
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var api = require('./routes/routes');

if (cluster.isMaster) {
  // create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  // listen for dying workers
  cluster.on('exit', function (worker) {
    console.error('Worker died :(', worker.id);
    cluster.fork();
  });
} else {
  var app = express();

  app.set('port', process.env.PORT || 3000);

  var server = app.listen(app.get('port'), function () {
    console.log('listening on port ', app.get('port'));
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '../../public')));

  app.use(cookieParser());

  app.use(bodyParser.json());

  app.use('/api', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Method', 'GET, POST, HEAD, OPTIONS, PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization');
    next();
  });

  app.use('/api', api);

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../public', 'tictactoe.html'));
  });

  app.get('/fourbyfour', function (req, res) {
    res.sendFile(path.join(__dirname, '../../public', 'fourbyfour.html'));
  });

  app.all('*', function (req, res) {
    res.status(404).send('Nothing Here');
  });

  module.exports = server;
}