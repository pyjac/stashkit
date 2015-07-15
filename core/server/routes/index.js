var express = require('express');
var router = express.Router();
var _ = require('lodash');
var os = require('os');
var skUploader = require('../../lib/middleware/stashkit').Uploader;
var Admin = require('../../lib/database/Admin');
var GridInterface = require('../../lib/database/GridInterface');

//index route
function consoleIndex(req, res, next) {
  res.render('pages/landing', { title: 'Express' });
};


function loginIndex(req, res, next) {
  Admin.getDatabases(function(err, databases){
    res.render('pages/login', {data:databases});
  });

};

/**
 *
 * TODO: You should fetch Database System Information, BuildInfo and
 * TODO: Selected Database stats then send it to the browser
 *
 * */
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
  Admin.getDatabases(function(err, databases){
    res.json({data:databases});
  });
}


/**
 *
 * 1. Get all credentials from client
 * 2. Try to login with Auth,
 * 3. if it fail, try to open the database with the name specified, if that fails return error connecting to database
 *
 *
 * */

function loginPost(req, res, next){
  //request data from client
  var credentials = req.body;

  //success callback for auth call
  var onGetDbStats = function(DBList, err, stats){
    if(err) return res.render('pages/login',{error:err, data:DBList});
    return res.redirect(301, '/admin-console/dashboard');
  };

  //callback for open database call
  var onOpenDatabase = function(DbList, err, DBObject){
    if(err){
      res.render('pages/login',{ error:err, data:DbList });
    }else if(DBObject){
      Admin.getDbStats(credentials.selected_db, onGetDbStats.bind(null, DbList));
    }
  };

  //callback for getDbListCall
  var onGetDatabaseList = function(err, databases){
    if(err){
      res.render('pages/login',{ error:err})
    }
    //try to openDb without auth
    Admin.openDatabase(credentials.selected_db, onOpenDatabase.bind(null, databases));
  };

  //callback for auth call
  var onLoginSuccess = function(err, authResult){
    //if auth for some reasons fail
    if(err){
      Admin.getDatabases(onGetDatabaseList);
    } else if(authResult){
      Admin.getDbStats(credentials.selected_db, onLoginSuccess);
    }
  };

  //Now try to authenticate with credentials
  Admin.authenticate(credentials, onLoginSuccess);
}

//routes
router.route('/').get(checkForFirstUser, consoleIndex);
router.route('/start').get(setupIndex).post(createSetup);
router.route('/admin/database').get(getDatabases);
router.route('/uploaddemo').get(uploadForm);
router.route('/stash').post(skUploader);
router.route('/login').get(loginIndex).post(loginPost);
router.route('/user/:id').get();
router.route('/bucket/:id').get();
router.route('/system/').get(getSysInfo);
router.route('/admin-console/dashboard').get(dashboardIndex);



module.exports = function(app){
  app.use('/', router);
  return function(req, res, next){
    next();
  }
};
