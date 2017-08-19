
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-disable func-names */
const chai = require('chai');
const tictactoe = require('./tictactoe');
const winningCombo = require('../game/game').winningCombo;

const expect = chai.expect;

describe('currentTurn function test', () => {
  it('currentTurn function exists', () => {
    expect(tictactoe.currentTurn).to.not.be.undefined;
  });

  it('Empty board returns X', () => {
    expect(tictactoe.currentTurn(['', '', '', '', '', '', '', '', ''])).to.equal('X');
  });

  it('Board returns X', () => {
    expect(tictactoe.currentTurn(['X', '', '', '', 'O', '', '', '', ''])).to.equal('X');
  });

  it('Board returns O', () => {
    expect(tictactoe.currentTurn(['X', '', '', '', '', '', '', '', ''])).to.equal('O');
  });

  it('Last move on board returns X', () => {
    expect(tictactoe.currentTurn(['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', ''])).to.equal('X');
  });
});

describe('tictactoeAI function test', () => {
  it('tictactoe function exists', () => {
    expect(tictactoe.tictactoeAI).to.not.be.undefined;
  });

  it('Returns completed board when a completed board is passed in', () => {
    expect(tictactoe.tictactoeAI(['X', 'O', 'X', 'O', 'O', 'X', 'X', 'X', 'O'])).to.eql(['X', 'O', 'X', 'O', 'O', 'X', 'X', 'X', 'O']);
  });

  it('Returns board when a board with winning combination is passed in', () => {
    expect(tictactoe.tictactoeAI(['X', 'X', 'X', 'O', 'O', '', '', '', ''])).to.eql(['X', 'X', 'X', 'O', 'O', '', '', '', '']);
  });

  it('tictactoeAI results in a tie when the function plays itself', function () {
    this.timeout(10000);
    let input = ['', '', '', '', '', '', '', '', ''];

    for (let i = 0; i < 9; i += 1) {
      input = tictactoe.tictactoeAI(input);
    }

    const expected = true;
    const actual = !winningCombo(input, tictactoe.winningCombinations, ['X', 'O']) && input.indexOf('') === -1;

    expect(actual).to.equal(expected);
  });
});