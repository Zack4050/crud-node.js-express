const express = require('express');
const router = express.Router();

const querystring = require('querystring');

const controller = require('../controllers/productos.controller');

const controlleralt = require('../controllers/category.controller');

router.get('/create', controller.create);
router.post('/', controller.store);

router.get('/crear', controlleralt.crear);
router.post('/', controlleralt.store);

router.get('/', controller.index);

router.get('/:id', controller.show);

module.exports = router;