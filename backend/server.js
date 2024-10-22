// Webes keretrendszer, route-olásokhoz
const express = require('express');
const mysql = require('mysql2');
// Front-enddel való kommunikációhóz
const cors = require('cors');
// Bejövő lekérésék kezeléséhez
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL kapcsolat konfigurációja
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',    
    password: 'root', 
    database: 'musorujsag'      
});

// Adatbázissal való kapcsolódás
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Úl elemek hozzáadása (POST)
app.post('/items', (req, res) => {
    const { name, description } = req.body;
    const sql = 'INSERT INTO items (name, description) VALUES (?, ?)';
    db.query(sql, [name, description], (err, results) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(201).json({ id: results.insertId, name, description });
    });
});

// Táblak olvasása
app.get('/csatornak', (req, res) => {
    const sql = 'SELECT * FROM csatorna';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
});

app.get('/musorok', (req, res) => {
    const sql = 'SELECT * FROM musor';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
});

app.get('/szereplok', (req, res) => {
    const sql = 'SELECT * FROM szereplo';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
});

app.get('/kozvetitesek', (req, res) => {
    const sql = 'SELECT * FROM kozvetites';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
});

// Módosítás (PUT)
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const sql = 'UPDATE items SET name = ?, description = ? WHERE id = ?';
    db.query(sql, [name, description, id], (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.json({ id, name, description });
    });
});

// Törlés (DELETE)
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM items WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.json({ message: 'Item deleted' });
    });
});

// Szerver indítása
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
