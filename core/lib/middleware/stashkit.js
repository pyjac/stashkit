var _ = require('lodash');
var multer = require('multer');
var Busboy = require('busboy');
var Stream = require('stream').Duplex;
var util = require('util');

/**
 *
 * This is Stream Wrapper Around GridFS. Think of it a stream interface to the GridFS Server
 *
 * */
function SKStream() {
    Stream.call(this)
}

util.inherits(SKStream, Stream); //support both read and write

SKStream.prototype._read = function(data){
    console.log(data);
};

/**
 *
 * Write data to gridfs
 *
 * */
SKStream.prototype._write = function(data){
    console.log(data);
};


var __sk = new SKStream();
__sk.on('writable', function(){
 console.log(SKStream);
});

/**
 *
 * middleware function to initialise a stashkit client
 * bonus: Populate the request object with an streamable interface to GridFS
 * Testabilty:
 * 1. check if a call to init returns a middle ware with the standard function signatures req, res, next
 *
 * */
exports.init = function (options) {
    return function (req, res, next) {
        next()
    };
};

/**
 *
 * middleware function to handle uploaded data
 * uploaded data are piped directly to gridFS
 *
 * */


exports.Uploader = function (req, res, next) {
    var busboy = new Busboy({headers: req.headers});
    var onUploadRead = function (fieldName, file, fileName, mimtype) {
        file.pipe(__sk);
    };
    var onUploadFinish = function(){
        console.log('')
    };
    busboy.on('file', onUploadRead);
    busboy.on('finish', onUploadFinish);
    req.pipe(busboy);
};