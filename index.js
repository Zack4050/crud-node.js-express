require('dotenv').config();

const express = require('express');
const app = express();

// Sesiones
const session = require('express-session');

//Formulario simple
app.use(express.urlencoded({ extended: false }));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const layouts = require('express-ejs-layouts');


const path = require('path');




app.use(express.static(path.join(__dirname,"public")));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "src/views"));

app.use(layouts);
app.set('layout', 'layouts/layout');

// Configuración de session
app.use(session({
    secret: process.env.PASS_AUTH, 
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.user = req.session ? req.session.user : null;
    next();
});

//app.use(express.urlencoded({ extended: true }));



const mainRouter = require('./src/routes/main.router');
app.use(mainRouter);





app.use('/categorias',require('./src/routes/categorias.router'));
app.use('/productos',require('./src/routes/productos.router'));
app.use('/contacto',require('./src/routes/contacto.router'));
app.use('/auth',require('./src/routes/auth.router'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));