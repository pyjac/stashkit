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

exports.getBulidInfo = function(object){

};


/**
 *
 * Gets a list of All buckets for this User account
 *
 * */

exports.getBucketList = function(){

};


/**
 *
 * exports a function to get Database "Statis Sticks"
 *
 * */

exports.getDbStats = function(dbName, callback){
    var db;
    var onDbOpen = function(err, openDb){
        if(err) return callback(err, null);
        if(openDb) {
            openDb.stats(function(err, stats){
                if(err) return callback(err, null);
                openDb.close();
                return callback(null, stats);
            });

        };
    };

    db = new Mongo.Db(dbName, new Server(config.database['local'].host, config.database['local'].port));
    db.open(onDbOpen)
};


/**
 *
 * exports a function the open the database (for databases without auth protection)
 *
 * */

exports.openDatabase = function(dbName, callback){
    var db;
    var onDbOpen = function(err, openDb){
        if(err) return callback(err, null);
        if(openDb) {
            openDb.close();
            return callback(null, openDb)
        }
    };

    db = new Mongo.Db(dbName, new Server(config.database['local'].host, config.database['local'].port));
    db.open(onDbOpen)

}


/**
 *
 * exports a function to authenticate users with mongodb
 *
 * */

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
                if(result && !err) {
                    openDb.close();
                    return callback(null, result)
                }
            });
    };
    db.open(onDbOpen);
    //db.close();
};

/**
 *
 * Exports a function that gets a list of avaiable databases
 *
 * */
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
            openDb.close();
            return callback(null, databases);
        });
    };
    db.open(onDBOpen);
};