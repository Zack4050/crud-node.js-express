const express = require('express');
const router = express.Router();

const controller = require('../controllers/contacto.controller');

router.get('/', controller.index);  
router.post('/', controller.submitform);

module.exports = router;