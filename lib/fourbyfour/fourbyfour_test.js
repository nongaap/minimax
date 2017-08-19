
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-disable func-names */
const chai = require('chai');
const fourbyfour = require('./fourbyfour');
const winningCombo = require('../game/game').winningCombo;

const expect = chai.expect;

describe('currentTurn function test', () => {
  it('currentTurn function exists', () => {
    expect(fourbyfour.currentTurn).to.not.be.undefined;
  });

  it('Empty board returns X', () => {
    expect(fourbyfour.currentTurn(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''])).to.equal('X');
  });

  it('Board returns X', () => {
    expect(fourbyfour.currentTurn(['X', '', '', '', '', '', 'O', '', '', '', '', 'X', 'O', '', '', ''])).to.equal('X');
  });

  it('Board returns O', () => {
    expect(fourbyfour.currentTurn(['X', '', '', '', '', '', '', '', '', '', 'O', 'X', '', '', '', ''])).to.equal('O');
  });
});

describe('gameProgress function test', () => {
  it('gameProgress function exists', () => {
    expect(fourbyfour.gameProgress).to.not.be.undefined;
  });

  it('Empty board returns 0', () => {
    expect(fourbyfour.gameProgress(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''])).to.equal(0);
  });

  it('Function returns total moves gven partial board', () => {
    expect(fourbyfour.gameProgress(['X', '', '', '', '', '', 'O', '', '', '', '', 'X', 'O', '', '', ''])).to.equal(4);
  });
});

describe('fourbyfourAI function test', () => {
  it('fourbyfourAI function exists', () => {
    expect(fourbyfour.fourbyfourAI).to.not.be.undefined;
  });

  it('Returns completed board when a completed board is passed in', () => {
    expect(fourbyfour.fourbyfourAI(['X', 'O', 'O', 'O', 'X', 'X', 'X', 'O', 'O', 'X', 'O', 'X', 'X', 'O', 'X', 'O'])).to.eql(['X', 'O', 'O', 'O', 'X', 'X', 'X', 'O', 'O', 'X', 'O', 'X', 'X', 'O', 'X', 'O']);
  });

  it('Returns board when a board with winning combination is passed in', () => {
    expect(fourbyfour.fourbyfourAI(['X', 'X', 'X', 'X', '', '', '', '', '', 'O', '', 'O', '', 'O', '', 'O'])).to.eql(['X', 'X', 'X', 'X', '', '', '', '', '', 'O', '', 'O', '', 'O', '', 'O']);
  });

  it('fourbyfourAI results in a tie when the function plays itself', function () {
    this.timeout(10000);
    let input = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

    for (let i = 0; i < 16; i += 1) {
      input = fourbyfour.fourbyfourAI(input);
    }

    const expected = true;
    const actual = !winningCombo(input, fourbyfour.winningCombinations, ['X', 'O']) && input.indexOf('') === -1;

    expect(actual).to.equal(expected);
  });
});