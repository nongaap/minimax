'use strict';

var game = require('../game/game');

var winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

function currentTurn(board) {
  var x = 0;
  var o = 0;

  board.forEach(function (element) {
    if (element === 'X') x += 1;
    if (element === 'O') o += 1;
  });

  return x === o ? 'X' : 'O';
}

function tictactoeAI(board) {
  var maxDepth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 7;

  var openMarker = '';
  if (board.indexOf('') === -1) return board;

  if (game.winningCombo(board, winningCombinations, ['X', 'O'])) return board;

  var computerMarker = currentTurn(board);
  var opponentMarker = computerMarker !== 'X' ? 'X' : 'O';

  return game.gameManager(board, winningCombinations, computerMarker, opponentMarker, openMarker, game.aiManager(game.minimax, [0, maxDepth, -Infinity, Infinity]));
}

module.exports = { winningCombinations: winningCombinations, currentTurn: currentTurn, tictactoeAI: tictactoeAI };