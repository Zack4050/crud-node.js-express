const model = require('../models/categorias-mysql');

const crear = (req,res) => {
    res.render('categories/crear');
}

const store = async (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    try {
        await model.store(name);
        console.log("Categoría creada");
        res.redirect('/productos');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al crear la categoría");
    }
};


module.exports = { 
    crear,
    store, 
};
