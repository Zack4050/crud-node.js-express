const pool = require("./mysql");

// Crear una nueva categoría
const store = async (name) => {
    const sql = `
        INSERT INTO categories (name)
        VALUES (?)
    `;
    try {
        const [result] = await pool.query(sql, [name]);
        return result;
    } catch (error) {
        throw error;
    }
};

// Obtener todas las categorías con cantidad de productos
const findAllWithCount = async () => {
    const sql = `
        SELECT 
            c.id,
            c.name,
            COUNT(p.id) AS cantidad_productos
        FROM categories c
        LEFT JOIN products p ON p.category_id = c.id
        GROUP BY c.id, c.name
    `;
    try {
        const [rows] = await pool.query(sql);
        return rows;
    } catch (error) {
        throw error;
    }
};

// Obtener una categoría por ID
const findById = async (id) => {
    const sql = "SELECT * FROM categories WHERE id = ?";
    try {
        const [rows] = await pool.query(sql, [id]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

// Listar productos de una categoría
const findProducts = async (id) => {
    const sql = `
        SELECT p.id, p.name, p.description, p.price, p.stock
        FROM products p
        WHERE p.category_id = ?
    `;
    const [rows] = await pool.query(sql, [id]);
    return rows;
};

// Actualizar el nombre de una categoría
const update = async (id, name) => {
    const sql = `
        UPDATE categories
        SET name = ?
        WHERE id = ?
    `;
    try {
        const [result] = await pool.query(sql, [name, id]);
        return result;
    } catch (error) {
        throw error;
    }
};

// Borrar una categoría
const destroy = async (id) => {
    const sql = "DELETE FROM categories WHERE id = ?";
    try {
        const [result] = await pool.query(sql, [id]);
        return result;
    } catch (error) {
        throw error;
    }
};

// Exportar funciones
module.exports = {
    store,
    findAllWithCount,
    findById,
    update,
    destroy,
    findProducts
};
