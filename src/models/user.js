const pool = require("./mysql");
const bcrypt = require("bcrypt");

// Crear usuario
const create = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    const [result] = await pool.query(sql, [username, hashedPassword]);
    return result;
};

// Buscar usuario por username
const findByUsername = async (username) => {
    const sql = "SELECT * FROM users WHERE username = ?";
    const [rows] = await pool.query(sql, [username]);
    return rows[0];
};

module.exports = { 
    create, 
    findByUsername 
};
