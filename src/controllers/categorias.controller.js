const Category = require('../models/Category');

// Mostrar todas las categorías con cantidad de productos
const index = async (req, res) => {
    try {
        const categorias = await Category.findAllWithCount();
        res.render("categorias/index", { categorias });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener las categorías");
    }
};

// Mostrar formulario para crear nueva categoría
const create = (req, res) => {
    res.render("categorias/create");
};

// Guardar nueva categoría
const store = async (req, res) => {
    const { name } = req.body;
    try {
        await Category.store(name);
        res.redirect("/categorias");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al crear la categoría");
    }
};

// Mostrar formulario para editar categoría
const edit = async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await Category.findById(id);
        if (!categoria) {
            return res.status(404).send("Categoría no encontrada");
        }
        res.render("categorias/edit", { categoria });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener la categoría");
    }
};

// Actualizar categoría
const update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        await Category.update(id, name);
        res.redirect("/categorias");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al actualizar la categoría");
    }
};

// Borrar categoría
const destroy = async (req, res) => {
    console.log("Llegó al controlador destroy con id:", req.params.id);
    const { id } = req.params;
    try {
        await Category.destroy(id);
        res.redirect("/categorias");
    } catch (error) {
        console.error(error);
        res.status(500).send("No se pudo eliminar la categoría");
    }
};



// Mostrar productos de una categoría
const showProducts = async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await Category.findById(id);
        if (!categoria) {
            return res.status(404).send("Categoría no encontrada");
        }

        const productos = await Category.findProducts(id);
        res.render("productosByCategory", { categoria, productos });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los productos de la categoría");
    }
};

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    destroy,
    showProducts,
};
