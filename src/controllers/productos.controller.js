const querystring = require('querystring');
const model = require('../models/productos');

const create = (req,res) => {
    res.render('productos/create');
}

const store = async (req,res) => {
    const { name, category_id, price, stock, description } = req.body;

    try {
        // Llama al modelo con todos los atributos
        const result = await model.store(name, category_id, price, stock, description);
        console.log(result);
        res.redirect('/productos');
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error al crear el producto");
    }
}




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
    create,
    store,
    
    index,
    show,
}