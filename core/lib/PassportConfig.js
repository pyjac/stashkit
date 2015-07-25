//TODO: 1. Install Connect Session
//TODO: 2. Configure passport local
//TODO: 3. Configure mongodb to store session ids
//TODO: 4. Store User Details in session so we can use that detail to log in to mongodb internally to fetch details that require auth
//TODO: 5. install angular-ui-router bower compoenent
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Admin = require('../../core/lib/database/Admin');


module.exports = function(app){

    passport.serializeUser(function(user, done) {
        done();
    });

    passport.deserializeUser(function(id, done) {
        done();
    });

    passport.use(new LocalStrategy(function(username, password, done){
        console.log(username, password, done);
        done();
    }))
};