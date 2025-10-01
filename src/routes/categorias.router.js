const express = require("express");
const router = express.Router();
const controller = require("../controllers/categorias.controller");

// Listar todas las categorías
router.get("/", controller.index);

// Mostrar formulario de creación
router.get("/create", controller.create);

// Guardar nueva categoría
router.post("/", controller.store);

// Mostrar una categoría con sus productos
router.get("/:id", controller.showProducts);

// Mostrar formulario de edición
router.get("/:id/edit", controller.edit);

// Actualizar categoría
router.put("/:id", controller.update);

// Eliminar categoría
router.delete("/:id", controller.destroy);

module.exports = router;
