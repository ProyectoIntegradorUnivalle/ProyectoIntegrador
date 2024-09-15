// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');


app.use(express.json());

app.use(cors());
app.use(cors({
    origin: 'http://localhost:4200'
}));

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola nueva bassssse');
});


//Ruta para obtener usuarios
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Ruta para agregar un nuevo usuario
app.post('/usuarios', (req, res) => {
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

//ruta para iniciar sesion con usuario y contraseña
app.post('/login', (req, res) => {
    console.log(req.body); // Para depuración
    const { id_usuario, password } = req.body;

    if (!id_usuario || !password) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const query = 'SELECT * FROM Usuarios WHERE id_usuario = ? AND password = ?';
    db.query(query, [id_usuario, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }
        res.status(201).json({ message: 'Inicio de sesión exitoso', usuario: results[0] });
    });
}); 

// Configura el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
