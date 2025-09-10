const db = require('./sqlite');

const create = (name, callback) => {
    const sql = `INSERT INTO categories (name) VALUES (?)`;

    db.run(sql, [name], function (error) {
        if (error) {
            return callback(error);
        }
        callback(null, this.lastID);
    });
}

const findAll = (callback) => {
    const sql = `SELECT * FROM categories`;

    db.all(sql, (error, rows) => {
        if (error) {
            return callback(error);
        }
        callback(null, rows);
    });
}

const findById = (id, callback) => {
    const sql = `SELECT * FROM categories WHERE id = ?`;

    db.get(sql, [id], (error, row) => {
        if (error) {
            return callback(error);
        }
        callback(null, row);
    });
}

module.exports = {
    create,
    findAll,
    findById,
}