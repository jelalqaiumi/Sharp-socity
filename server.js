const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Database setup
const db = new sqlite3.Database('./bookings.db', (err) => {
  if (err) console.log(err.message);
  else console.log('✓ Ansluten till databasen');
});

// Hämta recensioner från Setmore (server-side för att undvika CORS)
const axios = require('axios');
const cheerio = require('cheerio');

app.get('/api/reviews', async (req, res) => {
  try {
    const targetUrl = 'https://sharpsocietyuf.setmore.com/';
    const resp = await axios.get(targetUrl);
    const html = resp.data;
    const $ = cheerio.load(html);

    // Försök hitta vanliga selectors för recensioner/testimonials
    const selectors = [
      '.review', '.testimonial', '.testimonials', '.review-item', '.testimonial-item', '.customer-review', '[data-testimonial]'
    ];

    const reviews = [];

    selectors.forEach(sel => {
      $(sel).each((i, el) => {
        if (reviews.length >= 20) return;
        const root = $(el);
        const text = root.text().replace(/\s{2,}/g, ' ').trim();
        if (!text) return;

        // Försök extrahera namn eller rating om möjligt
        const author = root.find('.author, .name, .testimonial-author').first().text().trim() || '';
        const rating = root.find('.rating, .stars').first().text().trim() || '';

        // Undvik dubbletter
        if (!reviews.some(r => r.text === text)) {
          reviews.push({ author, text, rating });
        }
      });
    });

    // Om inga recensioner hittades, försök söka i element med "review" i klassnamn
    if (reviews.length === 0) {
      $('[class*="review"], [class*="testimonial"], [data-testimonial]').each((i, el) => {
        if (reviews.length >= 20) return;
        const root = $(el);
        const text = root.text().replace(/\s{2,}/g, ' ').trim();
        if (!text) return;
        reviews.push({ author: '', text, rating: '' });
      });
    }

    // Trimma antalet recensioner
    res.json(reviews.slice(0, 20));
  } catch (err) {
    console.error('Fel vid hämtning av recensioner:', err.message || err);
    res.status(500).json({ error: 'Kunde inte hämta recensioner' });
  }
});

// Skapa tabeller
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      service TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      duration INTEGER NOT NULL,
      price REAL NOT NULL
    )
  `, (err) => {
    if (!err) {
      // Lägg till standardtjänster om tabellen är tom
      db.all('SELECT COUNT(*) as count FROM services', (err, rows) => {
        if (rows[0].count === 0) {
          const services = [
            ['Herrklippning', 30, 250],
            ['Herrklippning + Skägg', 45, 300],   
          ];

          services.forEach(service => {
            db.run(
              'INSERT INTO services (name, duration, price) VALUES (?, ?, ?)',
              service
            );
          });
        }
      });
    }
  });
});

// API Routes

// Hämta alla tjänster
app.get('/api/services', (req, res) => {
  db.all('SELECT * FROM services', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Hämta alla bokningar (för admin)
app.get('/api/bookings', (req, res) => {
  db.all('SELECT * FROM bookings ORDER BY date, time', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Hämta bokningar för ett specifikt datum
app.get('/api/bookings/:date', (req, res) => {
  const date = req.params.date;
  db.all(
    'SELECT * FROM bookings WHERE date = ? ORDER BY time',
    [date],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    }
  );
});

// Skapa ny bokning
app.post('/api/bookings', (req, res) => {
  const { name, email, phone, service, date, time, notes } = req.body;

  // Validering
  if (!name || !email || !phone || !service || !date || !time) {
    return res.status(400).json({ error: 'Alla fält är obligatoriska' });
  }

  // Kontrollera om tiden redan är bokad
  db.get(
    'SELECT * FROM bookings WHERE date = ? AND time = ?',
    [date, time],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (row) {
        return res.status(400).json({ error: 'Denna tid är redan bokad' });
      }

      // Skapa bokning
      db.run(
        'INSERT INTO bookings (name, email, phone, service, date, time, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, email, phone, service, date, time, notes || ''],
        (err) => {
          if (err) {
            res.status(500).json({ error: err.message });
          } else {
            res.json({ success: true, message: 'Bokning skapad!' });
          }
        }
      );
    }
  );
});

// Ta bort bokning (för admin)
app.delete('/api/bookings/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM bookings WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ success: true, message: 'Bokning raderad' });
    }
  });
});

// Uppdatera bokning (för admin)
app.put('/api/bookings/:id', (req, res) => {
  const id = req.params.id;
  const { name, email, phone, service, date, time, notes } = req.body;

  db.run(
    'UPDATE bookings SET name = ?, email = ?, phone = ?, service = ?, date = ?, time = ?, notes = ? WHERE id = ?',
    [name, email, phone, service, date, time, notes || '', id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ success: true, message: 'Bokning uppdaterad' });
      }
    }
  );
});

// Starta servern
app.listen(PORT, () => {
  console.log(`🚀 Servern körs på http://localhost:${PORT}`);
  console.log(`📅 Bokningssystemet är aktivt!`);
});
