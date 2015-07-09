/**
 * Created by larry Eliemenye
 */
var expect = require('chai').expect,
    should = require('chai').should(),
    asset = require('chai').assert;

describe('stashkit node module', function(){
    it('should export and instance of Stashkit', function(){
        var foo = 'hello';
        foo.should.be.a('string');
    })
});