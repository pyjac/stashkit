/**
 * Created by tthlex on 03/07/15.
 */

var crypto = require('crypto');
var mongoClient = require('mongodb').MongoClient;
function generarteClientCredentials(secret_key){
    var HmacSHA = crypto.createHmac('sha1', secret_key).update()
}

function getDBAdmin(){

}


module.exports = {
    generateClientCredentials:generarteClientCredentials,
    getDBadmin:getDBAdmin
};
