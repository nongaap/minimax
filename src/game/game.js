"use strict";

/*
availableMoves function accepts board(array) and marker and returns array with index values of available moves on the board for that marker.
*/

function availableMoves(arr, openMarker){ 
	return arr.map((marker,index) => {
		if(marker === openMarker) {
			return index;
		}
	}).filter(marker => {
		return marker !== undefined;
	})
}

/*
addMove function accepts board(array), index, and marker, and returns new array with added element.
*/

function addMove(board, position, marker){
	var newBoard = [];

	for (let i = 0; i < board.length; i++){
		if(i === position) {
			newBoard.push(marker);
		} else {
			newBoard.push(board[i]);
		}
	}
	return newBoard;
}

/*
winningCombo function accepts a board array, winning combinations array, and game markers array as parameters.
Returns false if no winner and returns winning combination array if there is a winner.
*/

function winningCombo(board, winningCombinations, markers){
	var result = false;

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
		result = winnerMap[0];
	}

	return result;
}

/*
minimaxScore function accepts winner (string), maxWinner (string), minWinner(string), and depth of minimax game.
Returns score
*/

function minimaxScore(winner, maxWinner, minWinner, depth) {
	if (winner === maxWinner) {
		return 100 - depth;
	} else if (winner === minWinner) {
		return depth - 100;
	} else {
		return 0;
	}
}

/*
minimax function accepts game object, depth, max depth and alpha and beta bounds (Alpha Beta pruning).
Returns score and changes game object's choice to optimal index move
*/


/*
Alpha - best score by any means. anything less than this can be pruned. Min score Max player will get. initially negative infinity.
Beta - Worst case for opponent. Anything higher won't be used by opponent. Max score Min player will get. initially infinity
Beta < Alpha => current position will not result of best play and can be pruned
*/

function minimax(game, depth, maxDepth, alpha, beta) {
	if(!game.activeGame || depth === maxDepth) 
		{ return minimaxScore(game.winner, game.computerName, game.opponentName, depth); 
	}
	
	depth += 1;

	var value = game.computerTurn ? -Infinity : Infinity;
	var move = null;
	var lowerBound = alpha;
	var upperBound = beta;

	for(var i = 0; i < game.openMoves.length; i++) {		
		var potentialGame = game.newState(game, game.openMoves[i]);
		var score = minimax(potentialGame, depth, maxDepth, lowerBound, upperBound);

		if(game.computerTurn) {
			
			if(score > value) {
					value = score;
					move = game.openMoves[i];
			}			
			
			lowerBound = Math.max(lowerBound, score);
			
		} else if (!game.computerTurn) {

			if(score < value) {
				value = score;
				move = game.openMoves[i];
			}
			
			upperBound = Math.min(upperBound, score);
		
		}

		if (upperBound < lowerBound) {
			break;
		}

	}

	game.optimalChoice = move;

	return value;
}

/*
gameManager function accepts game board arry, winning combinations array, computer's marker, opponent's marker, and 'empty' marker.
Returns board array with optimal move added by game AI
*/

function gameManager(boardArr, winningCombinationsArr, computerMarker, opponentMarker, openMarker){
	
	if(arguments.length < 5) { return false}
	
	if(winningCombo(boardArr, winningCombinationsArr, [computerMarker,opponentMarker])) {
		return boardArr
	}

	if(boardArr.indexOf(openMarker) < 0) {
		return boardArr
	}

	function Game (boardArr, winningCombinationsArr, computerMarker, opponentMarker, openMarker) {
    this.gameState = boardArr;
		this.activeGame = true;
		this.computerTurn = true;
		this.opponentTurn = false;
		this.computerName = 'COMPUTER';
		this.opponentName = 'OPPONENT';
		this.activeTurn = 'COMPUTER'
		this.winner = undefined;
		this.optimalChoice = undefined;
		this.openMoves = availableMoves(boardArr, openMarker);
	}

	Game.prototype = {
		availableMoves: availableMoves,
		winningCombo: winningCombo,
		minimax: minimax,
		newState: newState,
		addMove: addMove,
		winningCombinations: winningCombinationsArr,
		computerMarker: computerMarker,
		opponentMarker: opponentMarker,
		openMarker: openMarker,
		gameMarkers: [computerMarker,opponentMarker]
	}

	function newState(game, move) {
		var newGame = Object.assign(Object.create(Game.prototype),game, {computerTurn: !game.computerTurn, opponentTurn: !game.opponentTurn, activeTurn: !game.computerTurn ? game.computerName : game.opponentName});

		newGame.gameState = newGame.addMove(game.gameState, move, game.computerTurn ? game.computerMarker : game.opponentMarker);

		newGame.openMoves = newGame.availableMoves(newGame.gameState, newGame.openMarker);

		var winCombo = newGame.winningCombo(newGame.gameState,newGame.winningCombinations,newGame.gameMarkers);

		if(winCombo) {
			newGame.activeGame = false;
			newGame.winner = newGame.gameState[winCombo[0]] === newGame.computerMarker ? newGame.computerName : newGame.opponentName;
		}

		if(newGame.gameState.indexOf(newGame.openMarker) < 0) {
			newGame.activeGame = false;
			newGame.winner = 'TIE'
		}

		return newGame
	}


	var state = new Game(boardArr, winningCombinationsArr, computerMarker, opponentMarker, openMarker)

	 minimax(state, 0, 7, -Infinity, Infinity);
		
	return addMove(boardArr, state.optimalChoice, computerMarker);

}


module.exports = {availableMoves, addMove, winningCombo, minimaxScore, minimax,gameManager};
