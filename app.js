var tingyun = require('tingyun');
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
    var path = location.pathname;
    if (path != API_PATH) {
        return ws.send('Not found Service.');
    }

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        var args = [].slice.call(arguments, 0);
        var segment = args[args.length - 2];
        var action = args[args.length - 1];
        try {
            message = JSON.parse(message);
        } catch (e) {
            return ws.send(serialize({
                status: 'error',
                message: e.message || 'invalid JSON parameter.'
            }));
        }

        if (message && message.tel && message.message) {
            service.saveMessage(message).then(function(msg) {
                
                tingyun.blocked(block.bind(null, 40));

                function block(n) {
                    function fibonacci(n) {
                        if (n < 2) {
                            return 1;
                        }
                        return fibonacci(n - 2) + fibonacci(n - 1);
                    }
                    fibonacci(n);
                }
                console.log('blocked');
            }).then(function(msg) {
                //console.log(segment, action);
                if (segment && segment.end) {
                    segment.end();
                }
                if (action && action.end) {
                    action.end();
                }
                ws.send(serialize({
                    status: 'success',
                    message: 'saved'
                }));
            }).catch(function(e) {
                ws.send(serialize({
                    status: 'error',
                    message: e.message || 'save failed.'
                }));
            });
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

function serialize(obj) {
    if (obj) {
        return JSON.stringify(obj);
    }
    return '';
}