/**
 * Created by tthlex on 25/06/15.
 */
var oauth2Server = require('oauth2orize');
var ClientModel = require('../server/models/Client');
var server = oauth2Server.createServer();
var Passport = require('passport');

var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
var BasicStrategy = require('passport-http').BasicStrategy;

function clientSerializerFn(client, done){
    return done(null, client.id);
}

function clientDeserializerFn(clientId, done){
    ClientModel.findOne({clientId:clientId}, function(err, Client){
        if(err) return done(err);
        return done(null, Client);
    })
}

server.serializeClient(clientSerializerFn);
server.deserializeClient(clientDeserializerFn);

Passport.use(new BasicStrategy(function(clientId, clientSecret, done){
    ClientModel.findOne({clientId:clientId}, function(err, Client){
        if(err) return done(err);
        if(!Client) return done(null, false);
        if(clientSecret !== Client.clientSecret) return done(null, false)
        return done(null, Client);
    })
}));

Passport.use(
    new ClientPasswordStrategy(
        function(clientId, clientSecret, done){
            ClientModel.findOne({clientId:clientId}, function(err, Client){
                if(err) return done(err);
                if(!Client) return done(null, false);
                if(clientSecret !== Client.clientSecret) return done(null, false)
                return done(null, Client);
            })
}));





exports.server = oauth2Server.createServer();
exports.token = [
    Passport.authenticate(['basic', 'oauth2-client-password'],{session:false}),
    server.token(),
    server.errorHandler()
];