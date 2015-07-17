/**
 * Created by tthlex on 17/07/15.
 */
var expect = require('chai').expect,
    should = require('chai').should(),
    assert = require('chai').assert;

var Mongo = require('mongodb');
var Server = require('mongodb').Server;
var config = require('../../../../core/server/conf');
var db;

describe('Admin Module', function(){
    beforeEach(function(){
        db = new Mongo.Db(config.database['local'].name, new Server(config.database['local'].host, config.database['local'].port));
    });

    afterEach(function(){
        db.close();
    });

    it('should throw an error message when connecting with invalid db connection', function(done){
        db = new Mongo.Db("NoneExisitingDB", new Server("wronghost", 808080));
        db.open(function(err, result){
            assert.isObject(err);
            assert.isUndefined(result);
            done()
        })
    });

    it('should be able to connect to database', function(done){
        db.open(function(err, result){
            assert.isNull(err);
            assert.isObject(result);
            return done();
        })
    })
});