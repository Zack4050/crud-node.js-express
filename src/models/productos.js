const pool = require("./mysql");

const store = async (name, category_id, price, stock, description) => {
    const sql = `
        INSERT INTO products 
        (name, category_id, price, stock, description) 
        VALUES (?, ?, ?, ?, ?)
    `;

    try {
        const [result] = await pool.query(sql, [name, category_id, price, stock, description]);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    store, 
    };