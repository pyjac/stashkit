/**
 * Created by tthlex on 03/07/15.
 */

var crypto = require('crypto');

function generarteClientCredentials(secret_key){
    var HmacSHA = crypto.createHmac('sha1', secret_key).update()
}



module.exports = {
    generateClientCredentials:generarteClientCredentials
};
