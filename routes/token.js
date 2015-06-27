/**
 * Created by tthlex on 25/06/15.
 */

var express = require('express');
var router = express.Router();
var Auth = require('../lib/OAuth');

function requestToken(req, res, next) {
    res.json({})
}
function authorizeClient(req, res, next) {
    res.json({})
}


router
    .route('/auth/token')
    .get(requestToken);

router
    .route('/auth/oauthorize')
    .post(authorizeClient);

module.exports = router;