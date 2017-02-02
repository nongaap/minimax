"use strict";

/*
winningCombo function accepts a board array, winning combinations array, and markers array as parameters and returns a results object.
Results object returns if there's a winner (true/false), winning combination (array), and winning marker (string)
*/

function winningCombo(board, winningCombinations, markers){
	var result = {
		winner: false,
		winningCombo: undefined,
		winnerMarker: undefined
	}

	if (board === undefined || winningCombinations === undefined || markers === undefined) return result;

	var winnerMap = markers.map(marker => 
		winningCombinations.find(combo =>
			combo.every(element => 
				board[element] === marker
			)
		)
	).filter(value =>
		typeof value === 'object'
	)

	if (winnerMap.length) {
		result.winner = true;
		result.winningCombo = winnerMap[0];
		result.winnerMarker = board[winnerMap[0][0]];
	}

	return result;

}

module.exports = winningCombo;
