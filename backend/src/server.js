// backend/src/server.js
const express = require('express');
const db = require('./db');
const app = express();

app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});