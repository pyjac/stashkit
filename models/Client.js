/**
 * Created by tthlex on 26/06/15.
 */

var mongoose = require('../lib/database');
var MongooseSchema = mongoose.Schema;

var ClientSchema = new MongooseSchema({
    clientId:String,
    clientSecret:String,
    userId:String
});
module.exports = mongoose.model('Client', ClientSchema);