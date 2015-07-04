/**
 * Created by tthlex on 02/07/15.
 */

var express = require('express');
var router = express.Router();
var ClientModel = require('../models/Client');
var Oauth2Server = require('../lib/oauthServer');
var helpers = require('../lib/helpers');
var _ = require('lodash');

function createClient(req, res, next){
    var Client = new ClientModel();
    var clientCred = helpers.generateClientCredentials();
    Client = _.merge(Client, clientCred);
    Client.save(function(err, Data){
        if(err) return res.json(500, err);
        return res.json(Data);
    })
}

function getClientCredentials(req, res, next){
    var body = req.body, params = req.params, headers = req.headers;
    res.json({message:'should client credentials'});
}

//check if user is logged in before agreeing execute methods on this route
//only a logged in user can generate client credentials
router
    .route('/client')
    .post(createClient)
    .get(getClientCredentials);

router
    .route('/client/login')
    .post(Oauth2Server.token);


module.exports = router;