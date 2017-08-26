'use strict';

var game = require('../game/game');

var winningCombinations = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], [0, 5, 10, 15], [3, 6, 9, 12]];

function currentTurn(board) {
  var x = 0;
  var o = 0;

  board.forEach(function (element) {
    if (element === 'X') x += 1;
    if (element === 'O') o += 1;
  });

  return x === o ? 'X' : 'O';
}

function gameProgress(board) {
  var count = 0;

  board.forEach(function (element) {
    if (element !== '') count += 1;
  });

  return count;
}

function fourbyfourAI(board) {
  var maxDepth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 7;

  var openMarker = '';
  if (board.indexOf('') === -1) return board;

  if (game.winningCombo(board, winningCombinations, ['X', 'O'])) return board;

  var computerMarker = currentTurn(board);
  var opponentMarker = computerMarker !== 'X' ? 'X' : 'O';

  if (gameProgress(board) < 7) {
    return game.gameManager(board, winningCombinations, computerMarker, opponentMarker, openMarker, game.aiManager(game.minimax, [0, 4, -Infinity, Infinity]));
  }

  return game.gameManager(board, winningCombinations, computerMarker, opponentMarker, openMarker, game.aiManager(game.minimax, [0, maxDepth, -Infinity, Infinity]));
}

module.exports = { winningCombinations: winningCombinations, currentTurn: currentTurn, gameProgress: gameProgress, fourbyfourAI: fourbyfourAI };