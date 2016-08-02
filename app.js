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
var service = require('./services');

app.use(function(req, res) {
    res.send({
        msg: "ws protocal only."
    });
});

wss.on('connection', function connection(ws) {
    var location = url.parse(ws.upgradeReq.url, true);

    if (location != API_PATH) {
        return ws.send('Not found Service.');
    }

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        if (message && message.tel && message.message) {
            service.saveMessage(message).then(function(msg) {
                ws.send({
                    status: 'success',
                    message: 'saved'
                });
            }).catch(function(e) {
                ws.send({
                    status: 'error',
                    message: e.message || 'save failed.'
                });
            })
        } else {
            ws.send('invalid parameter.');
        }
    });

    ws.send('connected');
});

server.on('request', app);
server.listen(port, function() {
    console.log('Listening on ' + server.address().port)
});