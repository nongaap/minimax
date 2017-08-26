'use strict';

/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
var chai = require('chai');
var api = require('./api');

var expect = chai.expect;

describe('api tictactoe function test', function () {
  var mockObject = {
    body: {
      board: '["X","X","O","O","O","X","X","O",""]'
    }
  };

  var resMockObject = {
    value: '',
    json: function json(obj) {
      resMockObject.value = obj;
    }
  };

  it('tictactoe function exists', function () {
    expect(api.tictactoe).to.not.be.undefined;
  });

  it('tictactoe function accepts request and returns completed board', function () {
    api.tictactoe(mockObject, resMockObject);
    expect(resMockObject.value).to.eql({ board: ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X'] });
  });
});

describe('api fourbyfour function test', function () {
  var mockObject = {
    body: {
      board: '["X","O","O","O","X","X","X","O","O","X","O","X","X","O","X",""]'
    }
  };

  var resMockObject = {
    value: '',
    json: function json(obj) {
      resMockObject.value = obj;
    }
  };

  it('fourbyfour function exists', function () {
    expect(api.fourbyfour).to.not.be.undefined;
  });

  it('fourbyfour function accepts request and returns completed board', function () {
    api.fourbyfour(mockObject, resMockObject);
    expect(resMockObject.value).to.eql({
      board: ['X', 'O', 'O', 'O', 'X', 'X', 'X', 'O', 'O', 'X', 'O', 'X', 'X', 'O', 'X', 'O']
    });
  });
});