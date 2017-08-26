'use strict';

/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-disable func-names */
var chai = require('chai');
var fourbyfour = require('./fourbyfour');
var winningCombo = require('../game/game').winningCombo;

var expect = chai.expect;

describe('currentTurn function test', function () {
  it('currentTurn function exists', function () {
    expect(fourbyfour.currentTurn).to.not.be.undefined;
  });

  it('Empty board returns X', function () {
    expect(fourbyfour.currentTurn(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''])).to.equal('X');
  });

  it('Board returns X', function () {
    expect(fourbyfour.currentTurn(['X', '', '', '', '', '', 'O', '', '', '', '', 'X', 'O', '', '', ''])).to.equal('X');
  });

  it('Board returns O', function () {
    expect(fourbyfour.currentTurn(['X', '', '', '', '', '', '', '', '', '', 'O', 'X', '', '', '', ''])).to.equal('O');
  });
});

describe('gameProgress function test', function () {
  it('gameProgress function exists', function () {
    expect(fourbyfour.gameProgress).to.not.be.undefined;
  });

  it('Empty board returns 0', function () {
    expect(fourbyfour.gameProgress(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''])).to.equal(0);
  });

  it('Function returns total moves gven partial board', function () {
    expect(fourbyfour.gameProgress(['X', '', '', '', '', '', 'O', '', '', '', '', 'X', 'O', '', '', ''])).to.equal(4);
  });
});

describe('fourbyfourAI function test', function () {
  it('fourbyfourAI function exists', function () {
    expect(fourbyfour.fourbyfourAI).to.not.be.undefined;
  });

  it('Returns completed board when a completed board is passed in', function () {
    expect(fourbyfour.fourbyfourAI(['X', 'O', 'O', 'O', 'X', 'X', 'X', 'O', 'O', 'X', 'O', 'X', 'X', 'O', 'X', 'O'])).to.eql(['X', 'O', 'O', 'O', 'X', 'X', 'X', 'O', 'O', 'X', 'O', 'X', 'X', 'O', 'X', 'O']);
  });

  it('Returns board when a board with winning combination is passed in', function () {
    expect(fourbyfour.fourbyfourAI(['X', 'X', 'X', 'X', '', '', '', '', '', 'O', '', 'O', '', 'O', '', 'O'])).to.eql(['X', 'X', 'X', 'X', '', '', '', '', '', 'O', '', 'O', '', 'O', '', 'O']);
  });

  it('fourbyfourAI results in a tie when the function plays itself', function () {
    this.timeout(10000);
    var input = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

    for (var i = 0; i < 16; i += 1) {
      input = fourbyfour.fourbyfourAI(input);
    }

    var expected = true;
    var actual = !winningCombo(input, fourbyfour.winningCombinations, ['X', 'O']) && input.indexOf('') === -1;

    expect(actual).to.equal(expected);
  });
});