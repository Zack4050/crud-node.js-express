const express = require('express');
const router = express.Router();

const querystring = require('querystring');

const controller = require('../controllers/productos.controller');

router.get('/', controller.index);

router.get('/:id', controller.show);

module.exports = router;