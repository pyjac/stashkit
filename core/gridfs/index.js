/**
 * Created by larry Eliemenye
 */
var util = require('util');
var Writable = require("stream").Writable;

function Stash(){
    Writable.call(this);
}
util.inherits(Stash, Writable);
