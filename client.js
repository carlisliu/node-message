var WebSocket = require('ws');
var ws = new WebSocket('ws://192.168.5.31:4080/message', null, {headers: {'X-Tingyun-Id': 'QPo-y6LCVc8|H7FQ8J9Za34#h_b_b8nrOhA;c=1;x=921c118f1af08'}});

ws.on('open', function open(arg, arg2) {
  console.log('client is open..')
  ws.send('{"tel": 12306, "message": "hi"}');
  console.log(ws._socket._httpMessage.res.headers)
  //console.log(arg2)
});

ws.on('message', function(data, flags) {
  console.log(data)
  //ws.send('12345')
  // flags.binary will be set if a binary data is received.
  // flags.masked will be set if the data was masked.
});