var mongoose = require('mongoose');
var config = require('../config');

//without safe mode
//mongoose.connect(config.db.url);
//mongoose.connection.on('error', function(e){console.log(e); process.exit(1);});

mongoose.connect(config.db.url, {
    db: {
        native_parser: true
    },
    user: config.db.username,
    pass: config.db.password
}, function(err) {
    if (err) {
        console.error('connect to %s error: ', config.db.url, err.message);
        process.exit(1);
    }
});

// models
require('./message');

exports.Message = mongoose.model('Message');