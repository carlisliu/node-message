var server = require('http').createServer();
var url = require('url');
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
  server: server
});
var express = require('express');
var app = express();
var port = 4080;
var API_PATH = '/message';

app.use(function(req, res) {
  res.send({
    msg: "hello"
  });
});

wss.on('connection', function connection(ws) {
  var location = url.parse(ws.upgradeReq.url, true);

  if (location != API_PATH) {
    return ws.send('Not found Service.');
  }

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('connected');
});

server.on('request', app);
server.listen(port, function() {
  console.log('Listening on ' + server.address().port)
});