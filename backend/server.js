// Webes keretrendszer, route-olásokhoz
const express = require('express');
const mysql = require('mysql2');
// Front-enddel való kommunikációhóz
const cors = require('cors');
// Bejövő lekérésék kezeléséhez
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

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

// Autentikáció (egyszerű, nincs tokenizáció, hashelés és miegymás)
app.post('/login', (req, res) => {
    const { email, password } = req.body; // Extract from request body

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const sql = 'SELECT admin_nev FROM admin WHERE email = ? AND jelszo = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }

        if (results.length > 0) {
            const adminName = results[0].admin_nev;

            res.cookie('username', adminName, {
                path: '/',
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                httpOnly: false,
                sameSite: 'lax'
            });

            return res.status(200).json({ adminName });
        } else {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
    });
});

app.get('/admin/auth', (req, res) => {
    const username = req.cookies.username;
    
    if (!username) {
        return res.status(401).json({ 
            authenticated: false,
            message: 'Not authenticated' 
        });
    }
    
    return res.status(200).json({ 
        authenticated: true,
        username 
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
    const sql = `
        SELECT 
            m.musor_cim, 
            m.epizod, 
            m.ismerteto, 
            s.szereplo_nev
        FROM musor m
        LEFT JOIN musor_szereploi ms 
            ON m.musor_cim = ms.musor_cim AND m.epizod = ms.epizod
        LEFT JOIN szereplo s
            ON ms.szereplo_id = s.id;
    `;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        const musorok = results.reduce((container, row) => {
            const key = `${row.musor_cim}|${row.epizod}`;
            if (!container[key]) {
                container[key] = {
                    musor_cim: row.musor_cim,
                    epizod: row.epizod,
                    ismerteto: row.ismerteto,
                    szereplok: [] 
                };
            }
            if (row.szereplo_nev) {
                container[key].szereplok.push(row.szereplo_nev); 
            }
            return container;
        }, {});

        const response = Object.values(musorok).map(item => ({
            ...item,
            szereplok: item.szereplok.join(', ')
        }));

        res.json(response);
    });
});

app.get('/szereplok', (req, res) => {
    const sql = 'SELECT * FROM szereplo ORDER BY szereplo_nev ASC';
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

// Lekérdezések bizonyos csatornákon leadott műsorok epizódjainak kiválasztásához
app.get('/unique_musorok', (req, res) => {
    const sql = `SELECT DISTINCT musor_cim FROM musor`;
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json(results);
    });
});
  
app.get('/unique_episodes/:csatorna_nev/:musor_cim', (req, res) => {
    const { csatorna_nev, musor_cim } = req.params; 
    const sql = `
    SELECT DISTINCT m.epizod
    FROM musor m
    LEFT JOIN kozvetites k
        ON m.musor_cim = k.musor_cim
        AND m.epizod = k.epizod
        AND k.csatorna_nev = ?  -- Kiválasztjuk az adott csatornát
    WHERE m.musor_cim = ?
        AND k.epizod IS NULL;  -- Csak azok az epizódok kerülnek kiválasztásra, amelyek még nincsenek hozzárendelve az adott csatornához
    `;
    db.query(sql, [csatorna_nev, musor_cim], (err, results) => { // Paraméterek a csatorna név és műsor címének
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
});

// Statisztikák
// Melyik szereplő szerepelt a legtöbb különböző műsorban egy adott csatornán
app.get('/stats/musorok/getChannelStars', (req, res) => {
    const sql = `
        SELECT 
            k.csatorna_nev,
            sz.szereplo_nev,
            COUNT(DISTINCT m.musor_cim) AS musorok_szama
        FROM szereplo sz
        JOIN musor_szereploi msz ON sz.id = msz.szereplo_id
        JOIN musor m ON msz.musor_cim = m.musor_cim AND msz.epizod = m.epizod
        JOIN kozvetites k ON m.musor_cim = k.musor_cim AND m.epizod = k.epizod
        GROUP BY k.csatorna_nev, sz.szereplo_nev
        ORDER BY musorok_szama DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    })
})

// Műsoronként megszámolja, hogy hány különböző szereplő szerepelt benne
app.get('/stats/musorok/getShowCastCount', (req, res) => {
    const sql = `
        SELECT m.musor_cim, m.epizod, 
            COUNT(DISTINCT ms.szereplo_id) AS szereplok_szama
        FROM musor m
        JOIN musor_szereploi ms
            ON m.musor_cim = ms.musor_cim AND m.epizod = ms.epizod
        GROUP BY m.musor_cim, m.epizod
        ORDER BY szereplok_szama DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    })
})

// Legnépszerűbb epizódok (részlekérdezéssel)
app.get('/stats/musorok/getShowByTopBroadcastCount', (req, res) => {
    const sql = `
        SELECT m.musor_cim, m.epizod, COUNT(*) as kozvetitesek_szama
        FROM musor m
        JOIN kozvetites k ON m.musor_cim = k.musor_cim AND m.epizod = k.epizod
        GROUP BY m.musor_cim, m.epizod
        HAVING COUNT(*) > (
            SELECT AVG(kozvetites_db)
            FROM (
                SELECT COUNT(*) as kozvetites_db
                FROM kozvetites 
                GROUP BY musor_cim, epizod
            ) as atlag_kozvetitesek
        )
        ORDER BY kozvetitesek_szama DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    })
})

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
    // Így lehetnek bennük szimbólumok is
    const decodedCim = decodeURIComponent(cim);
    const decodedIsmerteto = decodeURIComponent(ismerteto);
    const sql = 'INSERT INTO musor SET ismerteto = ?, musor_cim = ?, epizod = ?';
    db.query(sql, [decodedIsmerteto, decodedCim, epizod], (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.json({ decodedCim, decodedIsmerteto, epizod });
    });
});

// Közvetítés
app.post('/kozvetitesek/:nev/:cim/:epizod/:idopont', (req, res) => {
    const { nev, cim, epizod, idopont } = req.params;
    const decodedCim = decodeURIComponent(cim);
    const sql = 'INSERT INTO kozvetites SET idopont = ?, csatorna_nev = ?, musor_cim = ?, epizod = ?';
    db.query(sql, [idopont, nev, decodedCim, epizod], (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.json({ nev, decodedCim, epizod, idopont });
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
app.put('/musorok/:cim/:ismerteto/:epizod/:szereplok', (req, res) => {
    const { cim, ismerteto, epizod, szereplok } = req.params;
    const decodedCim = decodeURIComponent(cim);
    const updateMusorSql = 'UPDATE musor SET ismerteto = ? WHERE musor_cim = ? AND epizod = ?';

    db.query(updateMusorSql, [ismerteto, decodedCim, epizod], (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        if (szereplok && szereplok.length > 0) {
            const deleteSzereplokSql = 'DELETE FROM musor_szereploi WHERE musor_cim = ? AND epizod = ?';

            db.query(deleteSzereplokSql, [decodedCim, epizod], (err) => {
                if (err) {
                    return res.status(400).json({ message: err.message });
                }

                const szereplokArray = szereplok.split(',');
                const szereplokData = szereplokArray.map((szereploId) => [szereploId.trim(), decodedCim, epizod]);

                const insertSzereplokSql = 'INSERT INTO musor_szereploi (szereplo_id, musor_cim, epizod) VALUES ?';

                db.query(insertSzereplokSql, [szereplokData], (err) => {
                    if (err) {
                        return res.status(400).json({ message: err.message });
                    }
                    res.json({ decodedCim, ismerteto, epizod, szereplok: szereplokArray });
                });
            });
        } else {
            res.json({ decodedCim, ismerteto, epizod });
        }
    });
});

// Közvetítés
app.put('/kozvetitesek/:nev/:cim/:epizod/:idopont', (req, res) => {
    const { nev, cim, epizod, idopont } = req.params;
    const decodedCim = decodeURIComponent(cim);
    const sql = 'UPDATE kozvetites SET idopont = ? WHERE csatorna_nev = ? AND musor_cim = ? AND epizod = ?';
    db.query(sql, [idopont, nev, decodedCim, epizod], (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.json({ nev, decodedCim, epizod, idopont });
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
    const decodedCim = decodeURIComponent(cim);
    const sql = 'DELETE FROM musor WHERE musor_cim = ? AND epizod = ?';
    db.query(sql, [decodedCim, epizod], (err, results) => {
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
