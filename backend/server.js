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

// Új elemek hozzáadása (POST)
// Csatorna
app.post('/csatornak/:nev/:kategoria/:leiras', (req, res) => {
    const { nev, kategoria, leiras } = req.params;
    const sql = 'INSERT INTO csatorna SET kategoria = ?, leiras = ?, csatorna_nev = ?';
    db.query(sql, [kategoria, leiras, nev], (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.json({ nev, kategoria, leiras });
    });
});

// Szereplő
app.post('/szereplok/:id/:nev/:szul_datum/:nemzetiseg/:foglalkozas', (req, res) => {
    const { id, nev, szul_datum, nemzetiseg, foglalkozas } = req.params;
    const sql = 'INSERT INTO szereplo SET szereplo_nev = ?, szul_datum = ?, nemzetiseg = ?, foglalkozas = ?';
    db.query(sql, [nev, szul_datum, nemzetiseg, foglalkozas, id], (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.json({ id, nev, szul_datum, nemzetiseg, foglalkozas });
    });
});

// Műsor
app.post('/musorok/:cim/:ismerteto/:epizod', (req, res) => {
    const { cim, ismerteto, epizod } = req.params;
    const sql = 'INSERT INTO musor SET ismerteto = ?, musor_cim = ?, epizod = ?';
    db.query(sql, [ismerteto, cim, epizod], (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.json({ cim, ismerteto, epizod });
    });
});

// Közvetítés
app.post('/kozvetitesek/:nev/:cim/:epizod/:idopont', (req, res) => {
    const { nev, cim, epizod, idopont } = req.params;
    const sql = 'INSERT INTO kozvetites SET idopont = ?, csatorna_nev = ?, musor_cim = ?, epizod = ?';
    db.query(sql, [idopont, nev, cim, epizod], (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.json({ nev, cim, epizod, idopont });
    });
});

// Lekérdezések bizonyos csatornákon leadott műsorok epizódjainak kiválasztásához
app.get('/musorok/:csatorna_nev', (req, res) => {
    const { csatorna_nev } = req.params;
    const sql = `
        SELECT DISTINCT m.musor_cim
        FROM musor m
        JOIN kozvetites k ON m.musor_cim = k.musor_cim AND m.epizod = k.epizod
        WHERE k.csatorna_nev = ?
    `;
    db.query(sql, [csatorna_nev], (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json(results);
    });
});
  
app.get('/epizodok/:musor_cim', (req, res) => {
    const { musor_cim } = req.params;
    const sql = `
      SELECT DISTINCT m.epizod
      FROM musor m
      LEFT JOIN kozvetites k
      ON m.musor_cim = k.musor_cim AND m.epizod = k.epizod
      WHERE m.musor_cim = ?
    `;
    db.query(sql, [musor_cim], (err, results) => {
        if (err) {
        return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
});

// Módosítás (PUT)
// Csatorna
app.put('/csatornak/:nev/:kategoria/:leiras', (req, res) => {
    const { nev, kategoria, leiras } = req.params;
    const sql = 'UPDATE csatorna SET kategoria = ?, leiras = ? WHERE csatorna_nev = ?';
    db.query(sql, [kategoria, leiras, nev], (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.json({ nev, kategoria, leiras });
    });
});

// Szereplő
app.put('/szereplok/:id/:nev/:szul_datum/:nemzetiseg/:foglalkozas', (req, res) => {
    const { id, nev, szul_datum, nemzetiseg, foglalkozas } = req.params;
    const sql = 'UPDATE szereplo SET szereplo_nev = ?, szul_datum = ?, nemzetiseg = ?, foglalkozas = ? WHERE id = ?';
    db.query(sql, [nev, szul_datum, nemzetiseg, foglalkozas, id], (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.json({ id, nev, szul_datum, nemzetiseg, foglalkozas });
    });
});

// Műsor
app.put('/musorok/:cim/:ismerteto/:epizod', (req, res) => {
    const { cim, ismerteto, epizod } = req.params;
    const sql = 'UPDATE musor SET ismerteto = ? WHERE musor_cim = ? AND epizod = ?';
    db.query(sql, [ismerteto, cim, epizod], (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.json({ cim, ismerteto, epizod });
    });
});

// Közvetítés
app.put('/kozvetitesek/:nev/:cim/:epizod/:idopont', (req, res) => {
    const { nev, cim, epizod, idopont } = req.params;
    const sql = 'UPDATE kozvetites SET idopont = ? WHERE csatorna_nev = ? AND musor_cim = ? AND epizod = ?';
    db.query(sql, [idopont, nev, cim, epizod], (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.json({ nev, cim, epizod, idopont });
    });
});

// Törlés (DELETE)
app.delete('/csatornak/:nev', (req, res) => {
    const { nev } = req.params;
    const sql = 'DELETE FROM csatorna WHERE csatorna_nev = ?';
    db.query(sql, [nev], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
});

app.delete('/musorok/:cim/:epizod', (req, res) => {
    const { cim, epizod } = req.params;
    const sql = 'DELETE FROM musor WHERE musor_cim = ? AND epizod = ?';
    db.query(sql, [cim, epizod], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
});

app.delete('/szereplok/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM szereplo WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
});

app.delete('/kozvetitesek/:nev/:cim/:epizod/:idopont', (req, res) => {
    const { nev, cim, epizod, idopont } = req.params;
    const sql = 'DELETE FROM kozvetites WHERE csatorna_nev = ? AND musor_cim = ? AND epizod = ? AND idopont = ?';
    db.query(sql, [nev, cim, epizod, idopont], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
});

// Szerver indítása
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
