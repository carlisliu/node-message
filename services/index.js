var Message = require('../models').Message;

exports.saveMessage = function(message) {
    return new Promise(function(resolve, reject) {
        var msg = new Message();
        msg.tel = message.tel;
        msg.message = message.message;
        msg.save(function(err) {
            if (err) {
                return reject(err);
            }
            resolve(msg);
        });
    });
}