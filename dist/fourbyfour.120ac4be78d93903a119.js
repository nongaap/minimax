webpackJsonp([1],{

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/puangmalai/Desktop/minimax/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/puangmalai/Desktop/minimax/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

var _react = __webpack_require__(14);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(34);

var _Fourbyfour = __webpack_require__(191);

var _Fourbyfour2 = _interopRequireDefault(_Fourbyfour);

var _application = __webpack_require__(85);

var _application2 = _interopRequireDefault(_application);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(_Fourbyfour2.default, null), document.getElementById('root'));

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/puangmalai/Desktop/minimax/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "indexFourbyfour.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/puangmalai/Desktop/minimax/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/puangmalai/Desktop/minimax/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isomorphicFetch = __webpack_require__(83);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _react = __webpack_require__(14);

var _react2 = _interopRequireDefault(_react);

var _Row = __webpack_require__(84);

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getInitialState() {
  return {
    rows: [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
    turn: 'X',
    player: 'HUMAN',
    enableO: false,
    gameStarted: false,
    winner: undefined
  };
}

function checkWin(rows) {
  var combos = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], [0, 5, 10, 15], [3, 6, 9, 12]];

  var flattened = rows.reduce(function (acc, row) {
    return acc.concat(row);
  }, []);

  return combos.find(function (combo) {
    return flattened[combo[0]] !== '' && flattened[combo[0]] === flattened[combo[1]] && flattened[combo[1]] === flattened[combo[2]] && flattened[combo[2]] === flattened[combo[3]];
  });
}

function getCoords(current, next) {
  var coord = [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [3, 0], [3, 1], [3, 2], [3, 3]];
  var output = void 0;
  for (var i = 0; i < current.length; i += 1) {
    if (current[i] !== next[i]) {
      output = coord[i];
      break;
    }
  }
  return output;
}

var Fourbyfour = function (_Component) {
  _inherits(Fourbyfour, _Component);

  function Fourbyfour(props) {
    _classCallCheck(this, Fourbyfour);

    var _this = _possibleConstructorReturn(this, (Fourbyfour.__proto__ || Object.getPrototypeOf(Fourbyfour)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.oPlayerClick = _this.oPlayerClick.bind(_this);
    _this.state = getInitialState();
    return _this;
  }

  _createClass(Fourbyfour, [{
    key: 'oPlayerClick',
    value: function oPlayerClick() {
      var _this2 = this;

      var _state = this.state,
          turn = _state.turn,
          player = _state.player,
          gameStarted = _state.gameStarted,
          enableO = _state.enableO;
      var rows = this.state.rows;

      var flatBoard = rows.reduce(function (acc, r) {
        return acc.concat(r);
      }, []);
      if (gameStarted) return;
      if (enableO) return;
      enableO = true;
      gameStarted = true;
      player = 'COMPUTER';
      this.setState({
        enableO: enableO,
        gameStarted: gameStarted,
        player: player
      });

      (0, _isomorphicFetch2.default)('/api/fourbyfour', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'board=' + JSON.stringify(flatBoard)
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        var nextMove = getCoords(flatBoard, data.board);
        if (nextMove) {
          rows[nextMove[0]][nextMove[1]] = turn;
          turn = turn === 'X' ? 'O' : 'X';
          player = 'HUMAN';
          _this2.setState({
            rows: rows,
            turn: turn,
            player: player
          });
        }
      }).catch(function (err) {
        return console.log('err ', err);
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(row, square) {
      var _this3 = this;

      var _state2 = this.state,
          turn = _state2.turn,
          player = _state2.player,
          gameStarted = _state2.gameStarted,
          winner = _state2.winner;
      var rows = this.state.rows;

      var squareInQuestion = rows[row][square];
      gameStarted = true;
      if (this.state.winner) return;
      if (squareInQuestion) return;
      if (player === 'COMPUTER') return;

      rows[row][square] = turn;
      var flatBoard = rows.reduce(function (acc, r) {
        return acc.concat(r);
      }, []);
      turn = turn === 'X' ? 'O' : 'X';
      player = 'COMPUTER';
      winner = checkWin(rows);

      (0, _isomorphicFetch2.default)('/api/fourbyfour', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'board=' + JSON.stringify(flatBoard)
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        var nextMove = getCoords(flatBoard, data.board);
        if (nextMove) {
          rows[nextMove[0]][nextMove[1]] = turn;
          turn = turn === 'X' ? 'O' : 'X';
          player = 'HUMAN';
          winner = checkWin(rows);
          _this3.setState({
            rows: rows,
            turn: turn,
            player: player,
            winner: winner
          });
        }
      }).catch(function (err) {
        return console.log('err ', err);
      });

      this.setState({
        rows: rows,
        turn: turn,
        gameStarted: gameStarted,
        player: player,
        winner: winner
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _state3 = this.state,
          rows = _state3.rows,
          enableO = _state3.enableO,
          turn = _state3.turn,
          winner = _state3.winner;

      var handleClick = this.handleClick;

      var rowElements = rows.map(function (letters, i) {
        return _react2.default.createElement(_Row2.default, { key: i, row: i, letters: letters, handleClick: handleClick });
      });

      var infoDiv = void 0;
      if (winner) {
        var winTurn = turn === 'X' ? 'O' : 'X';
        infoDiv = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            null,
            'Player ',
            winTurn,
            ' wins with squares ',
            winner.join(', '),
            '!'
          )
        );
      } else {
        infoDiv = _react2.default.createElement(
          'div',
          null,
          'Current Turn: ',
          turn,
          ' (Playing as ',
          enableO ? 'O' : 'X',
          ')'
        );
      }

      return _react2.default.createElement(
        'div',
        null,
        infoDiv,
        _react2.default.createElement(
          'div',
          { id: 'boardFour' },
          rowElements
        ),
        _react2.default.createElement(
          'div',
          { className: 'button-area' },
          _react2.default.createElement(
            'a',
            { href: '#', id: 'reset', onClick: function onClick() {
                return _this4.setState(getInitialState());
              } },
            'Reset board'
          ),
          _react2.default.createElement(
            'a',
            { href: '#', id: 'oplayer', onClick: function onClick() {
                return _this4.oPlayerClick();
              } },
            'Play as O'
          )
        )
      );
    }
  }]);

  return Fourbyfour;
}(_react.Component);

exports.default = Fourbyfour;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/puangmalai/Desktop/minimax/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "Fourbyfour.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ })

},[190]);