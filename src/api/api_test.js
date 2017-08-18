/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const chai = require('chai');
const api = require('./api');

const expect = chai.expect;

describe('api tictactoe function test', () => {
  const mockObject = {
    body: {
      board: '["X","X","O","O","O","X","X","O",""]',
    },
  };

  const resMockObject = {
    value: '',
    json(obj) {
      resMockObject.value = obj;
    },
  };

  it('tictactoe function exists', () => {
    expect(api.tictactoe).to.not.be.undefined;
  });

  it('tictactoe function accepts request and returns completed board', () => {
    api.tictactoe(mockObject, resMockObject);
    expect(resMockObject.value).to.eql({ board: ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X'] });
  });
});

describe('api fourbyfour function test', () => {
  const mockObject = {
    body: {
      board: '["X","O","O","O","X","X","X","O","O","X","O","X","X","O","X",""]',
    },
  };

  const resMockObject = {
    value: '',
    json(obj) {
      resMockObject.value = obj;
    },
  };

  it('fourbyfour function exists', () => {
    expect(api.fourbyfour).to.not.be.undefined;
  });

  it('fourbyfour function accepts request and returns completed board', () => {
    api.fourbyfour(mockObject, resMockObject);
    expect(resMockObject.value).to.eql({
      board: ['X', 'O', 'O', 'O', 'X', 'X', 'X', 'O', 'O', 'X', 'O', 'X', 'X', 'O', 'X', 'O'],
    });
  });
});
