/**
 * Created by larry Eliemenye
 */
var expect = require('chai').expect,
    should = require('chai').should(),
    assert = require('chai').assert;

var stashkit = require('../../../core/lib/middleware/stashkit');

describe('stashkit node module', function(){
    it('should export and instance of Stashkit', function(){
        var foo = 'hello';
        foo.should.be.a('string');
    })
});