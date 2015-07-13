/**
 * Created by larry Eliemenye
 */

var Mongo = require('mongodb');
var Server = require('mongodb').Server;
var config = require('../../server/conf');
var db = new Mongo.Db(config.database['local'].name, new Server(config.database['local'].host, config.database['local'].port))

exports.CreateDatabaseWithAuth = function(object, callback){
    var dbName = options.dbName;
    var username = options.username;
    var password = options.password;
    var db = new Mongo.Db(dbName, new Server(config.database['local'].host, config.database['local'].port))
};

exports.getDatabases = function (callback){
    db.open(function(err, openDb){
        if(err){
            return callback(err, null);
        }
        var adminDB = openDb.admin();
        adminDB.listDatabases(function(err, databases){
            if(err){
                return callback(err, null);
            }
            return callback(databases);
        });
    })
};