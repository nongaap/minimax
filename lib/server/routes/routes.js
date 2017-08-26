'use strict';

var express = require('express');
var api = require('../../api/api');

var router = express.Router();

router.post('/', api.tictactoe);

router.post('/fourbyfour', api.fourbyfour);

module.exports = router;