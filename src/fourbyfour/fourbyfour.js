"use strict";

const game = require('../game/game');

const winningCombinations = [
		[0, 1, 2, 3],
		[4, 5, 6, 7],
		[8, 9, 10, 11],
		[12, 13, 14, 15],
		[0, 4, 8, 12],
		[1, 5, 9, 13],
		[2, 6, 10, 14],
		[3, 7, 11, 15],
		[0, 5, 10, 15],
		[3, 6, 9, 12]
	];

function currentTurn(board) {
	let x = 0;
	let o = 0;

	board.forEach(element => {
		if(element === 'X') x++
		if(element === 'O') o++
	});

	return x === o ? 'X' : 'O'
}

function gameProgress(board) {
	let count = 0;

	board.forEach(element => {
		if(element !== '') count++
	});

	return count
}

function fourbyfourAI(board, maxDepth = 7){
	let openMarker = '';
	if(board.indexOf('') === -1) return board;

	if(game.winningCombo(board, winningCombinations,['X','O'])) return board;

	let computerMarker = currentTurn(board)
	let opponentMarker = computerMarker !== 'X' ? 'X' : 'O'

	if(gameProgress(board) < 7) return game.gameManager(board, winningCombinations,computerMarker,opponentMarker, openMarker, game.aiManager(game.minimax, [0, 4, -Infinity, Infinity]));

	return game.gameManager(board, winningCombinations,computerMarker,opponentMarker, openMarker, game.aiManager(game.minimax, [0, maxDepth, -Infinity, Infinity]));
}


module.exports = {winningCombinations, currentTurn, gameProgress, fourbyfourAI}