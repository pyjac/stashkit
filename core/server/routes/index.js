var express = require('express');
var router = express.Router();
var _ = require('lodash');
var os = require('os');

//index route
function consoleIndex(req, res, next) {
  res.render('pages/landing', { title: 'Express' });
};
function loginIndex(req, res, next) {
  res.render('pages/login');
};


function getSysInfo(req, res, next) {
  var info = {};
  info.system = {};
  for (var prop in os){
    if(typeof os[prop] === 'function'){
      info.system[prop] = os[prop].call();
    }
  }
  res.json(info);
};



//routes
router.route('/').get(consoleIndex);
router.route('/start').get(consoleIndex);
router.route('/login').get(loginIndex);
router.route('/user/:id').get();
router.route('/bucket/:id').get();
router.route('/system/').get(getSysInfo);



module.exports = function(app){
  app.use('/', router);
  return function(req, res, next){
    next();
  }
};
