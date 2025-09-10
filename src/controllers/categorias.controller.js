//Importamos el modelo
const model  = require("../models/Category");

//Funcion para mostrar el formulario
const create = (req, res) => {
    res.render("categorias/create");
}

//Funcion para guardar una nueva categoria
const store = (req, res) => {
    const {name} = req.body;
    
    model.create(name, (error, id) => {
        if (error) {
            //return console.error(error);
            return res.status(500).send("Error al crear la categoria");
        }
        console.log(id);
        res.redirect("/categorias");
    });
}

//Funcion para mostrar y leer todas las categorias
const index = (req, res) => {
    model.findAll( (error, categorias) => {
        if (error) {
            return res.status(500).send("Error al leer las categorias");
        }
        res.render("categorias/index", {categorias} );
    });
}

//Funcion para mostrar una categoria
const show = (req, res) => {
    const {id} = req.params;

    model.findById(id, (error, categoria) => {
        if (error) {
            return res.status(500).send("Error al leer la categoria");
        }
        if (!categoria) {
            return res.status(404).send("Categoria no encontrada");
        }
        res.render("categorias/show", {categoria} );
    });
}

//Funcion para mostrar el formulario de edicion
const edit = (req, res) => {
    const {id} = req.params;
    model.findById(id, (error, categoria) => {
        if (error) {
            return res.status(500).send("Error al leer la categoria");
        }
        if (!categoria) {
            return res.status(404).send("Categoria no encontrada");
        }
        res.render("categorias/edit", {categoria} );
    });
}

//Funcion para actualizar una categoria
const update = (req, res) => {
    const {id} = req.params;
    const {name} = req.body;

    model.update(id, name, (error, changes) => {
        if (error) {
            return res.status(500).send("Error al actualizar la categoria");
        }
        if (changes === 0) {
            return res.status(404).send("Categoria no encontrada");
        }
        res.redirect("/categorias");
    });
}

//Funcion para eliminar una categoria
const destroy = (req, res) => {
    const {id} = req.params;
    model.destroy(id, (error, changes) => {
        if (error) {
            return res.status(500).send("Error al eliminar la categoria");
        }
        if (changes === 0) {
            return res.status(404).send("Categoria no encontrada");
        }
        res.redirect("/categorias");
    });
}


module.exports = {
    create,
    store,
    index,
    show,
    edit,
    update,
    destroy
}