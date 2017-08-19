
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const chai = require('chai');
const game = require('./game');

const expect = chai.expect;

describe('availableMoves function test', () => {
  it('availableMoves function exists', () => {
    expect(game.availableMoves).to.not.be.undefined;
  });

  it('Returns empty array when there are no available moves', () => {
    expect(game.availableMoves(['X', 'X', 'X'], '')).to.eql([]);
  });

  it('Returns array of index values that are open', () => {
    expect(game.availableMoves(['X', '', 'X'], '')).to.eql([1]);
  });

  it('Returns array of 2 index values that are open', () => {
    expect(game.availableMoves(['X', '', ''], '')).to.eql([1, 2]);
  });
});

describe('addMove function test', () => {
  it('addBoard function exists', () => {
    expect(game.addMove).to.not.be.undefined;
  });

  it('Adds X to empty board', () => {
    expect(game.addMove(['', '', '', '', '', '', '', '', ''], 0, 'X')).to.eql(['X', '', '', '', '', '', '', '', '']);
  });

  it('Adds O to board', () => {
    expect(game.addMove(['X', '', '', '', '', '', '', '', ''], 4, 'O')).to.eql(['X', '', '', '', 'O', '', '', '', '']);
  });
});

describe('minimaxScore function test', () => {
  it('minimaxScore function exists', () => {
    expect(game.minimaxScore).to.not.be.undefined;
  });

  it('Returns positive value when max winner wins', () => {
    expect(game.minimaxScore('Max', 'Max', 'Min', 0)).to.equal(100);
  });

  it('Returns negative value when min winner wins', () => {
    expect(game.minimaxScore('Max', 'Max', 'Min', 0)).to.equal(100);
  });

  it('Returns 0 value when no one wins', () => {
    expect(game.minimaxScore(undefined, 'Max', 'Min', 0)).to.equal(0);
  });
});

describe('winningCombo function test', () => {
  it('winningCombo function exists', () => {
    expect(game.winningCombo).to.not.be.undefined;
  });

  it('Returns false winner when no argument is passed in', () => {
    expect(game.winningCombo()).to.equal(false);
  });

  it('Returns false winner when no winning combinations passed in', () => {
    expect(game.winningCombo(['X', 'O', 'X', 'O', 'O', 'X', '', '', 'X'])).to.equal(false);
  });

  it('Returns false winner when no markers passed in', () => {
    expect(game.winningCombo(['X', 'O', 'X', 'O', 'O', 'X', '', '', 'X'], [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]])).to.equal(false);
  });

  it('Returns false winner when the board is empty', () => {
    expect(game.winningCombo(['', '', '', '', '', '', '', '', ''], [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]], ['X', 'O'])).to.equal(false);
  });

  it('Returns false winner when the board is tied', () => {
    expect(game.winningCombo(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'], [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]], ['X', 'O'])).to.equal(false);
  });

  it('Returns winning combo when a winning X array is submitted', () => {
    expect(game.winningCombo(['X', 'O', 'X', 'O', 'O', 'X', '', '', 'X'], [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]], ['X', 'O'])).to.eql([2, 5, 8]);
  });

  it('Returns winning combo when a winning O array is submitted', () => {
    expect(game.winningCombo(['X', 'X', 'O', 'X', 'O', '', 'O', '', ''], [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]], ['X', 'O'])).to.eql([2, 4, 6]);
  });
});

describe('gameManager function test', () => {
  it('gameManager function exists', () => {
    expect(game.gameManager).to.not.be.undefined;
  });

  it('Returns optimal move in tic tac toe game', () => {
    expect(game.gameManager(['X', '', '', '', '', '', '', '', ''], [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]], 'O', 'X', '', game.aiManager(game.minimax, [0, 7, -Infinity, Infinity]))).to.eql(['X', '', '', '', 'O', '', '', '', '']);
  });

  it('Blocks opponent to prevent win', () => {
    expect(game.gameManager(['O', 'O', '', 'X', '', '', '', '', 'X'], [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]], 'X', 'O', '', game.aiManager(game.minimax, [0, 7, -Infinity, Infinity]))).to.eql(['O', 'O', 'X', 'X', '', '', '', '', 'X']);
  });

  it('Blocks opponent to prevent win', () => {
    expect(game.gameManager(['X', 'O', '', '', 'O', 'X', 'X', 'X', 'O'], [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]], 'O', 'X', '', game.aiManager(game.minimax, [0, 7, -Infinity, Infinity]))).to.eql(['X', 'O', '', 'O', 'O', 'X', 'X', 'X', 'O']);
  });

  it('Wins game instead of blocking opponent', () => {
    expect(game.gameManager(['O', 'O', '', 'X', 'X', '', '', '', 'O'], [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]], 'X', 'O', '', game.aiManager(game.minimax, [0, 7, -Infinity, Infinity]))).to.eql(['O', 'O', '', 'X', 'X', 'X', '', '', 'O']);
  });
});