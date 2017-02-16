"use strict";

const chai = require('chai');
const expect = chai.expect;
const game = require('./game');

describe('availableMoves function test', function() {

  it("availableMoves function exists", function() {
    expect(game.availableMoves).to.not.be.undefined;
  });

  it('Returns empty array when there are no available moves', function() {
    expect(game.availableMoves(['X','X','X'],'')).to.eql([]);
  });

  it('Returns array of index values that are open', function() {
    expect(game.availableMoves(['X','','X'],'')).to.eql([1]);
  });

});

describe('addMove function test', function() {

  it("addBoard function exists", function() {
    expect(game.addMove).to.not.be.undefined;
  });

  it('Adds X to empty board', function() {
    expect(game.addMove(['','','','','','','','',''],0,'X')).to.eql(['X','','','','','','','','']);
  });

  it('Adds O to board', function() {
    expect(game.addMove(['X','','','','','','','',''],4,'O')).to.eql(['X','','','','O','','','','']);
  });

});

describe('minimaxScore function test', function() {

  it("minimaxScore function exists", function() {
    expect(game.minimaxScore).to.not.be.undefined;
  });

  it('Returns positive value when max winner wins', function() {
    expect(game.minimaxScore('Max','Max','Min',0)).to.equal(100);
  });

  it('Returns negative value when min winner wins', function() {
    expect(game.minimaxScore('Max','Max','Min',0)).to.equal(100);
  });

  it('Returns 0 value when no one wins', function() {
    expect(game.minimaxScore(undefined,'Max','Min',0)).to.equal(0);
  });

});


describe('winningCombo function test', function() {

  it("winningCombo function exists", function() {
    expect(game.winningCombo).to.not.be.undefined;
  });

  it('Returns false winner when no argument is passed in', function() {
    expect(game.winningCombo()).to.equal(false);
  });

  it('Returns false winner when no winning combinations passed in', function() {
    expect(game.winningCombo(['X','O','X','O','O','X','','','X'])).to.equal(false);
  });

   it('Returns false winner when no markers passed in', function() {
    expect(game.winningCombo(['X','O','X','O','O','X','','','X'], [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]])).to.equal(false);
  });

  it('Returns false winner when the board is empty', function() {
    expect(game.winningCombo(['','','','','','','','',''], [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]],['X','O'])).to.equal(false);
  });

  it('Returns false winner when the board is tied', function() {
    expect(game.winningCombo(['X','O','X','X','O','O','O','X','X'], [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]],['X','O'])).to.equal(false);
  });

  it('Returns winning combo when a winning X array is submitted', function() {
    expect(game.winningCombo(['X','O','X','O','O','X','','','X'], [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]],['X','O'])).to.eql([2,5,8]);
  });

  it('Returns winning combo when a winning O array is submitted', function() {
    expect(game.winningCombo(['X','X','O','X','O','','O','',''], [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]],['X','O'])).to.eql([2,4,6]);
  });

});

describe('gameManager function test', function() {

  it("gameManager function exists", function() {
    expect(game.gameManager).to.not.be.undefined;
  });

  it('Returns optimal move in tic tac toe game', function() {
    expect(game.gameManager(['X','','','','','','','',''], [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]],'O','X','', game.minimaxManager(game.minimax, [0, 7, -Infinity, Infinity]))).to.eql(['X','','','','O','','','','']);
  });

  it('Blocks opponent to prevent win', function() {
    expect(game.gameManager(['O','O','','X','','','','','X'], [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]],'X','O','', game.minimaxManager(game.minimax, [0, 7, -Infinity, Infinity]))).to.eql(['O','O','X','X','','','','','X']);
  });

  it('Wins game instead of blocking opponent', function() {
    expect(game.gameManager(['O','O','','X','X','','','','O'], [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]],'X','O','', game.minimaxManager(game.minimax, [0, 7, -Infinity, Infinity]))).to.eql(['O','O','','X','X','X','','','O']);
  });

});
