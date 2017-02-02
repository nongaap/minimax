"use strict";

const chai = require('chai');
const expect = chai.expect;
const winningCombo = require('./winningCombo');

describe('winningCombo function test', function() {

  it("winningCombo function exists", function() {
    expect(winningCombo).to.not.be.undefined;
  });

  it('Returns false winner when no argument is passed in', function() {
    expect(winningCombo()).to.eql({winner: false, winningCombo: undefined, winnerMarker: undefined});
  });

  it('Returns false winner when no winning combinations passed in', function() {
    expect(winningCombo(['X','O','X','O','O','X','','','X'])).to.eql({winner: false, winningCombo: undefined, winnerMarker: undefined});
  });

   it('Returns false winner when no markers passed in', function() {
    expect(winningCombo(['X','O','X','O','O','X','','','X'], [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]])).to.eql({winner: false, winningCombo: undefined, winnerMarker: undefined});
  });

  it('Returns false winner when the board is empty', function() {
    expect(winningCombo(['','','','','','','','',''], [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]],['X','O'])).to.eql({winner: false, winningCombo: undefined, winnerMarker: undefined});
  });

  it('Returns false winner when the board is tied', function() {
    expect(winningCombo(['X','O','X','X','O','O','O','X','X'], [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]],['X','O'])).to.eql({winner: false, winningCombo: undefined, winnerMarker: undefined});
  });

  it('Returns winning combo when a winning X array is submitted', function() {
    expect(winningCombo(['X','O','X','O','O','X','','','X'], [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]],['X','O'])).to.eql({winner: true, winningCombo: [2,5,8], winnerMarker: 'X'});
  });

  it('Returns winning combo when a winning O array is submitted', function() {
    expect(winningCombo(['X','X','O','X','O','','O','',''], [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]],['X','O'])).to.eql({winner: true, winningCombo: [2,4,6], winnerMarker: 'O'});
  });

});
