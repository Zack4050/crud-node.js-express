const User = require("../models/user");
const bcrypt = require("bcrypt");

// Mostrar formulario de login
const loginForm = (req, res) => {
    res.render("auth/login"); // vista login.ejs
};

// Procesar login
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findByUsername(username);
        if (!user) return res.status(400).send("Usuario no encontrado");

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send("Contraseña incorrecta");

        // Guardar sesión
        req.session.user = { id: user.id, username: user.username };
        res.redirect("/"); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al iniciar sesión");
    }
};

// Logout
const logout = (req, res) => {
    req.session.destroy();
    res.redirect("/auth/login");
};



const registerForm = (req, res) => res.render("auth/register");

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        await User.create(username, password);
        res.redirect("/auth/login");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al registrar usuario");
    }
};

module.exports = { loginForm, login, logout, registerForm, register };

