const express = require('express');
const router = express.Router();

const querystring = require('querystring');

router.get('/', (req,res) => {

    const query = querystring.stringify(req.query);

    fetch('https://fakestoreapi.com/products?'+ query)
    .then(response => response.json())
    .then(data => res.json(data));
});

router.get('/:id', (req,res) => {
    fetch('https://fakestoreapi.com/products/'+ req.params.id)
    .then(response => response.json())
    .then(data => res.json(data));
});

module.exports = router;