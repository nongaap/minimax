// @flow

const game = require('../game/game');

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function currentTurn(board: Array<string>): string {
  let x = 0;
  let o = 0;

  board.forEach((element: string) => {
    if (element === 'X') x += 1;
    if (element === 'O') o += 1;
  });

  return x === o ? 'X' : 'O';
}

function tictactoeAI(board: Array<string>, maxDepth: number = 7): Array<string> {
  const openMarker = '';
  if (board.indexOf('') === -1) return board;

  if (game.winningCombo(board, winningCombinations, ['X', 'O'])) return board;

  const computerMarker = currentTurn(board);
  const opponentMarker = computerMarker !== 'X' ? 'X' : 'O';

  return game.gameManager(
    board,
    winningCombinations,
    computerMarker,
    opponentMarker,
    openMarker,
    game.aiManager(game.minimax, [0, maxDepth, -Infinity, Infinity]),
  );
}

module.exports = { winningCombinations, currentTurn, tictactoeAI };
