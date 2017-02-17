"use strict";

const chai = require('chai');
const expect = chai.expect;
const tictactoe = require('./tictactoe');
const winningCombo = require('../game/game').winningCombo

describe('currentTurn function test', function() {

  it("currentTurn function exists", function() {
    expect(tictactoe.currentTurn).to.not.be.undefined;
  });

  it('Empty board returns X', function() {
    expect(tictactoe.currentTurn(['','','','','','','','',''])).to.equal('X');
  });

  it('Board returns X', function() {
    expect(tictactoe.currentTurn(['X','','','','O','','','',''])).to.equal('X');
  });

  it('Board returns O', function() {
    expect(tictactoe.currentTurn(['X','','','','','','','',''])).to.equal('O');
  });

  it('Last move on board returns X', function() {
    expect(tictactoe.currentTurn(['X','X','O','O','O','X','X','O',''])).to.equal('X');
  });  

});

describe('tictactoeAI function test', function() {

  it("tictactoe function exists", function() {
    expect(tictactoe.tictactoeAI).to.not.be.undefined;
  });

  it('Returns completed board when a completed board is passed in', function() {
    expect(tictactoe.tictactoeAI([ 'X', 'O', 'X', 'O', 'O', 'X', 'X', 'X', 'O' ])).to.eql([ 'X', 'O', 'X', 'O', 'O', 'X', 'X', 'X', 'O' ]);
  });

  it('Returns board when a board with winning combination is passed in', function() {
    expect(tictactoe.tictactoeAI([ 'X', 'X', 'X', 'O', 'O', '', '', '', '' ])).to.eql([ 'X', 'X', 'X', 'O', 'O', '', '', '', '' ]);
  });

  it("tictactoeAI results in a tie when the function plays itself", function() {
    var input = ['','','','','','','','',''];

    for(var i = 0; i < 9; i++) {
      input = tictactoe.tictactoeAI(input);
    }

    var expected = true;
    var actual = !winningCombo(input,tictactoe.winningCombinations,['X','O']) && input.indexOf('') === -1;
  
    expect(actual).to.equal(expected);
  });

});
