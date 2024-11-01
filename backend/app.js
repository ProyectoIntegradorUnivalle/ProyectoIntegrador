// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

app.use(express.json());

let verificationCodes = {}; // Almacenar los códigos de verificación temporalmente

// Ruta para enviar el código de verificación
app.post('/send-code', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'El correo electrónico es requerido' });
    }

    const code = crypto.randomBytes(3).toString('hex'); // Generar un código aleatorio
    verificationCodes[email] = code;

    // Configurar el transporte de nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tu-email@gmail.com',
            pass: 'tu-contraseña'
        }
    });

    const mailOptions = {
        from: 'tu-email@gmail.com',
        to: email,
        subject: 'Código de verificación',
        text: `Tu código de verificación es: ${code}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: error.toString() });
        }
        res.status(200).json({ message: 'Código enviado' });
    });
});

// Ruta para verificar el código y actualizar la contraseña
app.post('/verify-code', (req, res) => {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    if (verificationCodes[email] === code) {
        // Aquí deberías actualizar la contraseña en tu base de datos
        const query = 'UPDATE Usuarios SET password = ? WHERE email = ?';
        db.query(query, [newPassword, email], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            // Eliminar el código de verificación después de usarlo
            delete verificationCodes[email];
            res.status(200).json({ message: 'Contraseña actualizada' });
        });
    } else {
        res.status(400).json({ error: 'Código de verificación incorrecto' });
    }
});

// Ruta para crear un nuevo usuario
app.post('/register', (req, res) => {
    console.log(req.body); // Para depuración

    const { id_usuario, nombre, email, password, telefono, tipo_usuario } = req.body;

    if (!id_usuario || !nombre || !email || !password || !telefono || !tipo_usuario) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const query = 'INSERT INTO Usuarios (id_usuario, nombre, email, password, telefono, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [id_usuario, nombre, email, password, telefono, tipo_usuario], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Usuario creado exitosamente', userId: results.insertId });
    });
});

// Ruta para iniciar sesión con usuario y contraseña
app.post('/login', (req, res) => {
    console.log(req.body); // Para depuración
    const { id_usuario, password } = req.body;

    if (!id_usuario || !password) {
        return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
    }

    const query = 'SELECT * FROM Usuarios WHERE id_usuario = ? AND password = ?';
    db.query(query, [id_usuario, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
            res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});