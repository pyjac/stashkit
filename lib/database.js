/**
 * Created by tthlex on 26/06/15.
 */

var mongoose = require('mongoose');
var config = require('../../StashKit/server/conf');
var connectionString = "mongodb://" + config.database['local'].host + ":" + config.database['local'].port + "/" + config.database['local'].name;
var db;

mongoose.connect(connectionString);
db = mongoose.connection;

db.on('error', function (error) {
    console.log('Error connecting Mongo DB: ' + error.message);
});

mongoose.set('debug', true);
module.exports = mongoose;