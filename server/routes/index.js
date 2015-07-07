var express = require('express');
var router = express.Router();

//index route
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/console', function(req, res, next) {
  res.render('index', { title: 'Heys' });
});


//user route
router.route('/user/:id').get();
router.route('/bucket/:id').get();



module.exports = function(app){
  app.use('/', router);
  return function(req, res, next){
    next();
  }
};
