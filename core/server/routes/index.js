var express = require('express');
var router = express.Router();
var _ = require('lodash');
var os = require('os');
var skUploader = require('../../lib/middleware/stashkit').Uploader;
var Admin = require('../../lib/database/Admin');

//index route
function consoleIndex(req, res, next) {
  res.render('pages/landing', { title: 'Express' });
};


function loginIndex(req, res, next) {
  Admin.getDatabases(function(databases){
    res.render('pages/login', databases);
  });

};

function dashboardIndex(req, res, next) {
  res.render('pages/dashboard');
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


function handleStorage(req, res, next){
  console.log('hit upload route');
  next();
}

function uploadForm(req, res, next){
  res.render('pages/demo');
}


function checkForFirstUser(req, res, next){
  getDBUser(function(err, Users){
    console.log(err, Users);
    next()
  });
}

function setupIndex(req, res, next){
  res.render('pages/setup');
}

function createSetup(req, res, next){

}

function getDatabases(req, res, next){
  Admin.getDatabases(function(databases){
    res.json(databases);
  });

}

//routes
router.route('/').get(checkForFirstUser, consoleIndex);
router.route('/start')
    .get(setupIndex)
    .post(createSetup);
router.route('/admin/database').get(getDatabases);
router.route('/uploaddemo').get(uploadForm);
router.route('/stash').post(skUploader);
router.route('/login').get(loginIndex);
router.route('/user/:id').get();
router.route('/bucket/:id').get();
router.route('/system/').get(getSysInfo);
router.route('/dashboard/').get(dashboardIndex);



module.exports = function(app){
  app.use('/', router);
  return function(req, res, next){
    next();
  }
};
