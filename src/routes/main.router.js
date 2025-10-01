
const express = require('express');
const router = express.Router();

const controller = require('../controllers/main.controller');
const { isAuthenticated } = require('../middlewares/auth');

router.get('/', controller.index);  
router.get('/privada', controller.private);

module.exports = router;