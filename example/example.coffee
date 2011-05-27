require './lib/spec'
should = require 'should'


describe 'The best thing evar!', ->
  it "should not fuck up", ->
    200.should.equal(200)

  it "Should fuck up", ->
    200.should.equal(300)
    
  it "should not fuck up", ->
    200.should.equal(200)
        
describe 'The second best thing', ->
  it 'should error', ->
    ' '.should.not.be.ok

