const pool = require("./mysql");

const store = async (name, price, stock, description, category_id) => {
    const sql = `
        INSERT INTO products 
        (name, price, stock, description, category_id) 
        VALUES (?, ?, ?, ?, ?)
    `;

    try {
        const [result] = await pool.query(sql, [name, price, stock, description, category_id]);
        return result;
    } catch (error) {
        throw error;
    }
}

const findAll = async () => {
    const sql = `
        SELECT p.id, p.name, p.description, p.price, p.stock, c.name AS categoria
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
    `;
    const [rows] = await pool.query(sql);
    return rows;
};


const findById = async (id) => {
    const sql = "SELECT * FROM products WHERE id = ?";
    try {
        const [rows] = await pool.query(sql, [id]);
        return rows[0];
    } catch (error) {
        throw error;
    }
}

const update = async (id, name, price, stock, description, category_id) => {
    const sql = `
        UPDATE products
        SET name = ?, price = ?, stock = ?, description = ?, category_id = ?
        WHERE id = ?
    `;
    const [result] = await pool.query(sql, [name, price, stock, description, category_id, id]);
    return result;
};


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