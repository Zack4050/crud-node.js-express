const express = require("express");
const router = express.Router();
const controller = require("../controllers/categorias.controller");
const { isAuthenticated } = require("../middlewares/auth");

// Listar todas las categorías
router.get("/", isAuthenticated, controller.index);

// Mostrar formulario de creación
router.get("/create", isAuthenticated, controller.create);

// Guardar nueva categoría
router.post("/", isAuthenticated, controller.store);

// Mostrar una categoría con sus productos
router.get("/:id", isAuthenticated, controller.showProducts);

// Mostrar formulario de edición
router.get("/:id/edit", isAuthenticated, controller.edit);

// Actualizar categoría
router.put("/:id", isAuthenticated, controller.update);

// Eliminar categoría
router.delete("/:id", isAuthenticated, controller.destroy);

module.exports = router;
