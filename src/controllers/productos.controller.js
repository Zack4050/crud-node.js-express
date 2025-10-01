//Importamos el modelo
const model = require('../models/productos');
const Category = require("../models/Category");

// Mostrar formulario para crear producto
const create = async (req, res) => {
    try {
        const categorias = await Category.findAllWithCount(); // o solo findAll si quieres
        res.render("productos/create", { categorias });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener categorías");
    }
};

const store = async (req,res) => {
    const { name, price, stock, description , category_id} = req.body;

    try {
        // Llama al modelo con todos los atributos
        const result = await model.store(name, price, stock, description, category_id);
        res.redirect('/productos');
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error al crear el producto");
    }
}

const index = async (req,res) => {
    try {
        const productos = await model.findAll();
        res.render('productos/index', { productos });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error al crear el producto");
    }
}

const show = async (req,res) => {
    const { id } = req.params;
    try {
        const producto = await model.findById(id);
        if (!producto) {
            return res.status(404).send("Producto no encontrado");
        }
        res.render('productos/show', { producto });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error al crear el producto");
    }
}

const edit = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await model.findById(id);
        const categorias = await Category.findAllWithCount();
        if (!producto) {
            return res.status(404).send("Producto no encontrado");
        }
        res.render('productos/edit', { producto , categorias});
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error al cargar el formulario de edición");
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    const { name, price, stock, description , category_id } = req.body;
    try {
        await model.update(id, name, price, stock, description, category_id);
        res.redirect("/productos");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al actualizar el producto");
    }
};


const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await model.destroy(id);
        res.redirect('/productos');
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error al eliminar el producto");
    }
}

module.exports = { 
    create,
    store,
    index,
    show,
    edit,
    update,
    destroy,
}