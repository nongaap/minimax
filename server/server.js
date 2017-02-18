const cluster = require('cluster');

if (cluster.isMaster) {

  // count the machine's CPUs
  const cpuCount = require('os').cpus().length;

  // create a worker for each CPU
  for (let i = 0; i < cpuCount; i += 1) {
      cluster.fork();
  }

  // listen for dying workers
  cluster.on('exit', function (worker) {

    console.log('Worker died :(', worker.id);
    cluster.fork();

    });

} else {

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const api = require('./routes/routes');

const app = express();

app.set('port', (process.env.PORT || 3000));

const server = app.listen(app.get('port'), function() {
  console.log('listening on port ',app.get('port'));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'../public')));

app.use(cookieParser());

app.use(bodyParser.json());

app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Method', 'GET, POST, HEAD, OPTIONS, PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization');
  next();
});

app.use('/api', api);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'../public','tictactoe.html'));
});

app.get('/fourbyfour', function (req, res) {
  res.sendFile(path.join(__dirname,'../public','fourbyfour.html'));
});

app.all('*', function (req, res) {
  res.status(404).send('Nothing Here');
});

module.exports = server;
}