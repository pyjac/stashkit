var express = require('express');
var router = express.Router();
var _ = require('lodash');
var os = require('os');

//index route
function consoleIndex(req, res, next) {
  res.render('index', { title: 'Express' });
};

function getSysInfo(req, res, next) {
  var info = {};
  info.system = {};

  for (var prop in os){
    if(typeof os[prop] === 'function'){
      info.system[prop] = os[prop].call();
    }
  }
  res.render('system', info);
};



//user route
router.route('/').get(consoleIndex);
router.route('/user/:id').get();
router.route('/bucket/:id').get();
router.route('/system/').get(getSysInfo);



module.exports = function(app){
  app.use('/', router);
  return function(req, res, next){
    next();
  }
};
