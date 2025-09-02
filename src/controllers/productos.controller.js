const querystring = require('querystring');

const index = (req,res) => {

    const query = querystring.stringify(req.query);

    fetch('https://fakestoreapi.com/products?'+ query)
    .then(response => response.json())
    .then((productos) => res.render('productos', {productos}));
}

const show = (req,res) => {
    fetch('https://fakestoreapi.com/products/'+ req.params.id)
    .then(response => response.json())
    .then(data => res.json(data));
}

module.exports = { 
    index,
    show,
}