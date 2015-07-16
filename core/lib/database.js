
/**
 * Created by tthlex on 26/06/15.
 */

var mongoose = require('mongoose');
var config = require('../server/conf');
var connectionString = "mongodb://" + config.database['local'].host + ":" + config.database['local'].port + "/" + config.database['local'].name;
var Server = require('mongodb').Server;
var DB = require('mongodb').Db;
var GridStore = require('mongodb').GridStore;
var ObjectId = require('mongodb').ObjectId;


mongoose.connect(connectionString);
dbcon = mongoose.connection;

dbcon.on('error', function (error) {
    console.log('Error connecting Mongo DB: ' + error.message);
});
mongoose.set('debug', true);
exports.database = mongoose;

