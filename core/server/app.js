var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Passport = require('passport');
var nunjucks = require('nunjucks');
var consolidate = require('consolidate');
var database = require('../lib/database.js');
var stashkit = require('../lib/middleware/stashkit');
var session = require('express-session');

var router = require('./routes/index');
var ACL = require('../lib/middleware/acl');
var PassportConfig = require('../../core/lib/PassportConfig');
var app = express();

// view engine setup
var templatePath = path.join(__dirname, '../server/views');
app.engine('html', consolidate.nunjucks);
app.set('views', templatePath);
app.set('view engine', 'html');

nunjucks.configure(templatePath,{
    autoescape:true,
    express:app,
    tags:{
        blockStart:'{%',
        blockEnd:'%}',
        variableStart:'{{',
        variableEnd:'}}',
        commentStart:'{#',
        commentEnd:'#}'
    }
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret:"kitty-catty",
    resave:false,
    saveUninitialized:false
}));
app.use(express.static(path.join(__dirname, '../../content/public')));
app.use(Passport.initialize());
app.use(Passport.session());
app.use(stashkit.init({
    client_id:'client_id001',
    client_secret:'client_secret001'
}));

//route auths
PassportConfig(app);

//router middleware
app.use(router(app));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
