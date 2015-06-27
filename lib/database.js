/**
 * Created by tthlex on 26/06/15.
 */

var mongoose = require('mongoose');
var config = require('../config');
var connectionString = config.database.url + ":" + config.database.port + "/" + config.database.name;
var db;

mongoose.connect(connectionString);
db = mongoose.connection;

db.on('error', function (error) {
    console.log('Error connecting Mongo DB: ' + error.message);
});

mongoose.set('debug', true);
module.exports = mongoose;