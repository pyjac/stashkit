/**
 * Created by tthlex on 25/06/15.
 */

var express = require('express');
var router = express.Router();
var Auth = require('../lib/OAuth');
var Admin = require('../../lib/database/Admin');

function createBucket(req, res, next){
    var body = req.body//, params = req.params, headers = req.headers;
    var data = {
        db_user:body.db_user,
        db_name:body.db_name
    };

    Admin.getBucketList(data, function(err, list){
        if(err) return res.json(err)
        return res.json(list);
    });
}
function deleteBucket(req, res, next){

}
function editBucket(req, res, next){

}
function getBucket(req, res, next){
    var body = req.body//, params = req.params, headers = req.headers;
    var data = {
        db_user:body.db_user,
        db_name:body.db_name
    };

    Admin.getBucketList(data, function(err, list){
        if(err) return res.json(err)
        return res.json(list);
    });
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

