const db = require('./sqlite');

// Crear una nueva categoria
const create = (name, callback) => {
    const sql = `INSERT INTO categories (name) VALUES (?)`;

    db.run(sql, [name], function (error) {
        if (error) {
            return callback(error);
        }
        callback(null, this.lastID);
    });
}

// Leer todas las categorias
const findAll = (callback) => {
    const sql = `SELECT * FROM categories`;
    db.all(sql, (error, rows) => {
        if (error) {
            return callback(error);
        }
        callback(null, rows);
    });
}

// Buscar una categoria por su ID
const findById = (id, callback) => {
    const sql = `SELECT * FROM categories WHERE id = ?`;

    db.get(sql, [id], (error, row) => {
        if (error) {
            return callback(error);
        }
        callback(null, row);
    });
}

// Actualizar una categoria por su ID
const update = (id, name, callback) => {
    const sql = `UPDATE categories SET name = ? WHERE id = ?`;
    db.run(sql, [name, id], function (error) {
        if (error) {
            return callback(error);
        }
        callback(null, this.changes);
    });
}

const destroy = (id, callback) => {
    const sql = `DELETE FROM categories WHERE id = ?`;
    db.run(sql, [id], function (error) {
        if (error) {
            return callback(error);
        }
        callback(null, this.changes);
    });
}

// Exportar las funciones CRUD
module.exports = {
    create,
    findAll,
    findById,
    update,
    destroy,
}