import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import Row from './Row';

function getInitialState() {
  return {
    rows: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    turn: 'X',
    player: 'HUMAN',
    winner: undefined,
  };
}

function checkWin(rows) {
  const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  const flattened = rows.reduce((acc, row) => acc.concat(row), []);

  return combos.find(combo => (
    flattened[combo[0]] !== '' &&
    flattened[combo[0]] === flattened[combo[1]] &&
    flattened[combo[1]] === flattened[combo[2]]
  ));
}

function getCoords(current, next) {
  const coord = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
  let output;
  for (let i = 0; i < current.length; i += 1) {
    if (current[i] !== next[i]) {
      output = coord[i];
      break;
    }
  }
  return output;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = getInitialState();
  }

  handleClick(row, square) {
    let { turn, player, winner } = this.state;
    const { rows } = this.state;
    const squareInQuestion = rows[row][square];

    if (this.state.winner) return;
    if (squareInQuestion) return;
    if (player === 'COMPUTER') return;

    rows[row][square] = turn;
    const flatBoard = rows.reduce((acc, r) => acc.concat(r), []);
    turn = turn === 'X' ? 'O' : 'X';
    player = 'COMPUTER';
    winner = checkWin(rows);

    fetch('https://gentle-scrubland-19203.herokuapp.com/api', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `board=${JSON.stringify(flatBoard)}`
    })
      .then(response => response.json()).then((data) => {
        let nextMove = getCoords(flatBoard, data.board);
        if(nextMove) {
          rows[nextMove[0]][nextMove[1]] = turn;
          turn = turn === 'X' ? 'O' : 'X';
          player = 'HUMAN';
          winner = checkWin(rows);
          this.setState({
            rows,
            turn,
            player,
            winner,
          });
        }
        //console.log(getCoords(flatBoard, data.board));
      })
      .catch(err => console.log('err ', err));

    this.setState({
      rows,
      turn,
      player,
      winner,
    });
  }

  render() {
    const { rows, turn, winner } = this.state;
    const handleClick = this.handleClick;

    const rowElements = rows.map((letters, i) => (
      <Row key={i} row={i} letters={letters} handleClick={handleClick} />
    ));

    let infoDiv;
    if (winner) {
      const winTurn = turn === 'X' ? 'O' : 'X';
      infoDiv = (
        <div>
          <div>Player {winTurn} wins with squares {winner.join(', ')}!</div>
        </div>
      );
    } else {
      infoDiv = <div>Turn: {turn}</div>;
    }

    return (
      <div>
        {infoDiv}
        <div id="board">
          {rowElements}
        </div>
        <button id="reset" onClick={() => this.setState(getInitialState())}>Reset board</button>
      </div>
    );
  }
}

export default App;
