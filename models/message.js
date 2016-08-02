var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    tel: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: ''
    }
});

exports.Message = mongoose.model('Message', MessageSchema);