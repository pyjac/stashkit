/**
 * Created by larry Eliemenye
 */

var Mongo = require('mongodb');
var Server = require('mongodb').Server;
var config = require('../../server/conf');
var db = new Mongo.Db(config.database['local'].name, new Server(config.database['local'].host, config.database['local'].port))

exports.createDatabaseWithAuth = function(object, callback){
    var dbName = options.dbName;
    var username = options.username;
    var password = options.password;
    var db = new Mongo.Db(dbName, new Server(config.database['local'].host, config.database['local'].port))
};

exports.authenticate = function(credentials, callback){
    var onDbOpen = function(err, openDb){
        var adminDb;
        if(err){
            return callback(err, null);
        }
        adminDb = openDb.admin();
        adminDb.authenticate(
            credentials.admin_username,
            credentials.admin_password,
            function(err, result){
                if(err) return callback(err, null);
                if(result && !err) return callback(null, result);
            });
    };
    db.open(onDbOpen);
    //db.close();
};

exports.getDatabases = function (callback){
    var onDBOpen = function(err, openDb){
        var adminDB;
        if(err){
            return callback(err, null);
        }
        adminDB = openDb.admin();
        adminDB.listDatabases(function(err, databases){
            if(err){
                return callback(err, null);
            }
            return callback(null, databases);
        });
    };
    db.open(onDBOpen);
    //db.close();
};