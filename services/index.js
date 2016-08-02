var Message = require('../models').Message;

exports.saveMessage = function(message) {
    var msg = new Message();
    msg.tel = message.tel;
    msg.message = message.message;
    return msg.save();
}