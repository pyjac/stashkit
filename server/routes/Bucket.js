/**
 * Created by tthlex on 25/06/15.
 */

var express = require('express');
var router = express.Router();
var Auth = require('../lib/OAuth');

function createBucket(req, res, next){

}
function deleteBucket(req, res, next){

}
function editBucket(req, res, next){

}
function getBucket(req, res, next){

}

/**
 *
 * CRUD Operation for Bucket Model
 * /userId/bucketId/
 *
 * */
router
    .route('/:userId/:bucketId')
    .all(Auth.ValidateToken)
    .get(getBucket)
    .post(createBucket)
    .delete(deleteBucket)
    .put(editBucket);

router.route('/:userId/:bucketId/permissions').get(addPermission);

module.exports = router;

