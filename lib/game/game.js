'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* eslint-disable no-param-reassign */
/**
 * availableMoves
 * @param {Array} arr - Game board array
 * @param {string} openMarker - Open marker
 * @returns {Array} Array of index values of available moves on the board
 */

function availableMoves(arr, openMarker) {
  return arr.map(function (marker, index) {
    if (marker === openMarker) {
      return index;
    }
    return undefined;
  }).filter(function (marker) {
    return marker !== undefined;
  });
}

/**
 * addMove
 * @param {Array} board - Game board array
 * @param {number} position - Array index
 * @param {string} marker - Marker to insert in game board arry
 * @returns {Array} New game board array with added marker at specified index position
 */

function addMove(board, position, marker) {
  var newBoard = [];

  for (var i = 0; i < board.length; i += 1) {
    if (i === position) {
      newBoard.push(marker);
    } else {
      newBoard.push(board[i]);
    }
  }
  return newBoard;
}

/**
 * winningCombo
 * @param {Array} board - game board array
 * @param {Array} winningCombinations - winning combinations array
 * @param {Arry} markers - game markers array
 * @returns {boolean|Array} False if no winner and winning combination array if there is a winner
 */

function winningCombo(board, winningCombinations, markers) {
  var result = false;

  if (board === undefined || winningCombinations === undefined || markers === undefined) {
    return result;
  }

  var winnerMap = markers.map(function (marker) {
    return winningCombinations.find(function (combo) {
      return combo.every(function (element) {
        return board[element] === marker;
      });
    });
  }).filter(function (value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
  });

  if (winnerMap.length) {
    result = winnerMap[0];
  }

  return result;
}

/**
 * minimaxScore
 * @param {string} winner - Winner
 * @param {string} maxWinner - Max Winner
 * @param {string} minWinner - Min Winner
 * @param {number} depth - Depth of Minimax game
 * @returns {number} score
 */

function minimaxScore(winner, maxWinner, minWinner, depth) {
  if (winner === maxWinner) {
    return 100 - depth;
  } else if (winner === minWinner) {
    return depth - 100;
  }
  return 0;
}

/**
 * minimax
 * @param {Object} game - Game Object
 * @param {number} depth - Depth of game
 * @param {number} maxDepth - Max depth
 * @param {number} alpha - Best score. Min score max player will get. Initially negative infinity
 * @param {number} beta - Worst case for opponent. Max score min player will get. Start at infinity.
 * @returns {number} score
 */

function minimax(game, depth, maxDepth, alpha, beta) {
  if (!game.activeGame || depth === maxDepth) {
    return minimaxScore(game.winner, game.computerName, game.opponentName, depth);
  }

  depth += 1;

  var value = game.computerTurn ? -Infinity : Infinity;
  var move = null;
  var lowerBound = alpha;
  var upperBound = beta;

  for (var i = 0; i < game.openMoves.length; i += 1) {
    var potentialGame = game.newState(game, game.openMoves[i]);
    var score = minimax(potentialGame, depth, maxDepth, lowerBound, upperBound);

    if (game.computerTurn) {
      if (score > value) {
        value = score;
        move = game.openMoves[i];
      }

      lowerBound = Math.max(lowerBound, score);
    } else if (!game.computerTurn) {
      if (score < value) {
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

/**
 * aiManager
 * @param {function} aiCallback - Callback function
 * @param {Array} argumentsArr - Array of arguments
 * @returns {function} aiCallback function with state and curried arguments
 */

function aiManager(aiCallback, argumentsArr) {
  return function curriedAiCallback(state) {
    return aiCallback.apply(undefined, [state].concat(_toConsumableArray(argumentsArr)));
  };
}

/**
 * gameManager
 * @param {Array} boardArr - Game board array
 * @param {Array} winningCombinationsArr - winning combinations array
 * @param {string} computerMarker - computer's marker
 * @param {string} opponentMarker - opponent's marker
 * @param {string} openMarker - emptry marker
 * @param {Function} aiCallback - callback function
 * @returns {Array} Board array with optimal move added by game AI using max depth of 7 for analysis
 */

function gameManager(boardArr, winningCombinationsArr, computerMarker, opponentMarker, openMarker, aiCallback) {
  if (arguments.length < 5) {
    return false;
  }

  if (winningCombo(boardArr, winningCombinationsArr, [computerMarker, opponentMarker])) {
    return boardArr;
  }

  if (boardArr.indexOf(openMarker) < 0) {
    return boardArr;
  }

  function Game(boardArr2, winningCombinationsArr2, computerMarker2, opponentMarker2, openMarker2) {
    this.gameState = boardArr2;
    this.activeGame = true;
    this.computerTurn = true;
    this.opponentTurn = false;
    this.computerName = 'COMPUTER';
    this.opponentName = 'OPPONENT';
    this.activeTurn = 'COMPUTER';
    this.winner = undefined;
    this.optimalChoice = undefined;
    this.openMoves = availableMoves(boardArr2, openMarker2);
  }

  function newState(game, move) {
    var newGame = Object.assign(Object.create(Game.prototype), game, {
      computerTurn: !game.computerTurn,
      opponentTurn: !game.opponentTurn,
      activeTurn: !game.computerTurn ? game.computerName : game.opponentName
    });

    newGame.gameState = newGame.addMove(game.gameState, move, game.computerTurn ? game.computerMarker : game.opponentMarker);

    newGame.openMoves = newGame.availableMoves(newGame.gameState, newGame.openMarker);

    var winCombo = newGame.winningCombo(newGame.gameState, newGame.winningCombinations, newGame.gameMarkers);

    if (winCombo) {
      newGame.activeGame = false;
      newGame.winner = newGame.gameState[winCombo[0]] === newGame.computerMarker ? newGame.computerName : newGame.opponentName;
    }

    if (!winCombo && newGame.gameState.indexOf(newGame.openMarker) < 0) {
      newGame.activeGame = false;
      newGame.winner = 'TIE';
    }

    return newGame;
  }

  Game.prototype = {
    availableMoves: availableMoves,
    winningCombo: winningCombo,
    newState: newState,
    addMove: addMove,
    winningCombinations: winningCombinationsArr,
    computerMarker: computerMarker,
    opponentMarker: opponentMarker,
    openMarker: openMarker,
    gameMarkers: [computerMarker, opponentMarker]
  };

  var state = new Game(boardArr, winningCombinationsArr, computerMarker, opponentMarker, openMarker);

  aiCallback(state);

  return addMove(boardArr, state.optimalChoice, computerMarker);
}

module.exports = {
  availableMoves: availableMoves,
  addMove: addMove,
  winningCombo: winningCombo,
  minimaxScore: minimaxScore,
  minimax: minimax,
  aiManager: aiManager,
  gameManager: gameManager
};