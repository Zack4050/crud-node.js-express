const fs = require("fs");
const path = require("path");

//Simulacion de base de datos
let categorias = [];

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
    categorias = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "../../categorias.json"), "utf-8")
    );

    const {id} = req.params;
    const categoria = categorias.find( (categoria) => categoria.id == id);

    if(!categoria) {
        return res.status(404).send("Categoria no encontrada");
    }

    res.render("categorias/edit", {categoria} );
}

//Funcion para actualizar una categoria
const update = (req, res) => {
    categorias = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "../../categorias.json"), "utf-8")
    );

    const {id} = req.params;
    const {nombre} = req.body;

    const categoria = categorias.find( (categoria) => categoria.id == id);

    if(!categoria) {
        return res.status(404).send("Categoria no encontrada");
    }
    categoria.nombre = nombre;

    fs.writeFileSync(
        path.resolve(__dirname, "../../categorias.json"),
        JSON.stringify(categorias)
    );

    res.redirect("/categorias");
}

//Funcion para eliminar una categoria
const destroy = (req, res) => {
    categorias = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "../../categorias.json"), "utf-8")
    );

    const {id} = req.params;
    const index = categorias.findIndex( (categoria) => categoria.id == id);

    if(index === -1) {
        return res.status(404).send("Categoria no encontrada");
    }    

    //A partir del indice, elimina 1 elemento
    categorias.splice(index, 1);

    fs.writeFileSync(
        path.resolve(__dirname, "../../categorias.json"), 
        JSON.stringify(categorias)
    );

    res.redirect("/categorias");
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