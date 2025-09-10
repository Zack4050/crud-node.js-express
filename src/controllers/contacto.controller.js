const nodemailer = require("nodemailer");

const index = (req, res) => {
    res.render("contacto");
}

const submitform = async (req, res) => {
    //const { nombre, email, mensaje } = req.body;
    console.log(req.body);

    
    const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
    });

    try {
        const info = await transporter.sendMail({
            from: `'"${req.body.nombre}" <${req.body.correo}>'`, // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Formulario de contacto", // Subject line
            text: req.body.mensaje, // plain‑text body
            html: `<pre>${req.body.correo}</pre>`, // HTML body
        });
    } catch (error) {
        console.log(error);
    } 

    res.send("Formulario enviado correctamente");
}

module.exports = {
    index,
    submitform
}