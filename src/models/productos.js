const pool = require("./mysql");

const store = async (name, price, stock, description) => {
    const sql = `
        INSERT INTO products 
        (name, price, stock, description) 
        VALUES (?, ?, ?, ?)
    `;

    try {
        const [result] = await pool.query(sql, [name, price, stock, description]);
        return result;
    } catch (error) {
        throw error;
    }
}

const findAll = async () => {
    const sql = "SELECT * FROM products";   
    try {
        const [rows] = await pool.query(sql);
        return rows;
    } catch (error) {
        throw error;
    }   
}

const findById = async (id) => {
    const sql = "SELECT * FROM products WHERE id = ?";
    try {
        const [rows] = await pool.query(sql, [id]);
        return rows[0];
    } catch (error) {
        throw error;
    }
}

const update = async (id, name, price, stock, description) => {
    const sql = `
        UPDATE products
        SET name = ?, price = ?, stock = ?, description = ?
        WHERE id = ?
    `;
    try {
        const [result] = await pool.query(sql, [name, price, stock, description, id]);
        return result;
    } catch (error) {
        throw error;
    }
}

const destroy = async (id) => {
    const sql = "DELETE FROM products WHERE id = ?";
    try {
        const [result] = await pool.query(sql, [id]);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    store, 
    findAll,
    findById,
    update,
    destroy,
    };