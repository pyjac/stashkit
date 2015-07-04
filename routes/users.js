var express = require('express');
var router = express.Router();
var UserModel = require('../models/User');
var _ = require('lodash');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


function getUser(req, res, next){
  res.send({message:'some content'});
}


router
    .route('/:userId')
    .get(getUser);

module.exports = router;
