const express = require('express');
const router = express.Router();

const querystring = require('querystring');

const controller = require('../controllers/productos.controller');
const { isAuthenticated } = require('../middlewares/auth');

router.get('/create', isAuthenticated, controller.create);
router.post('/', controller.store);

router.get('/', isAuthenticated, controller.index);
router.get('/:id', controller.show);

router.get('/:id/edit', controller.edit);
router.put('/:id', controller.update);

router.delete('/:id', controller.destroy);

module.exports = router;