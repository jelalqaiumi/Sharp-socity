# Sharp Society - Bokningssystem för frisörsalong

En modern hemsida med komplett bokningssystem för frisörsalanger.

## Funktioner

✂️ **Kundsida:**
- Boka tid för olika tjänster
- Se lediga tider för varje datum
- Automatisk validering av bokningar
- Snygg och responsiv design

👨‍💼 **Administratörsvy:**
- Se alla bokningar för ett specifikt datum
- Ta bort felaktiga bokningar
- Hantera tjänster och priser

## Installation och start

### 1. Installera dependenser
```bash
npm install
```

### 2. Starta servern
```bash
npm start
```

Servern körs på `http://localhost:3000`

## Användning

### Kundbokningar
1. Öppna hemsidan på `http://localhost:3000`
2. Gå till "Boka tid"
3. Fyll i dina uppgifter
4. Välj tjänst, datum och tid
5. Bekräfta bokningen

### Administratörsvy
1. Scroll ned till "Administratörsvy"
2. Välj ett datum
3. Klicka "Visa bokningar" för att se alla bokningar för den dagen
4. Ta bort bokningar vid behov

## Tjänster

Systemet innehåller följande tjänster som standard:
- Herrklippning (30 min) - 200 kr
- Damklippning (45 min) - 300 kr
- Barns klippning (20 min) - 150 kr
- Tvätt + massage (30 min) - 150 kr
- Färgning (60 min) - 400 kr
- Balayage (90 min) - 600 kr
- Slingor (60 min) - 350 kr

Du kan lägga till eller ändra tjänster genom att redigera databasen eller via API.

## Teknologi

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Databas:** SQLite3

## API Endpoints

- `GET /api/services` - Hämta alla tjänster
- `GET /api/bookings` - Hämta alla bokningar
- `GET /api/bookings/:date` - Hämta bokningar för ett specifikt datum
- `POST /api/bookings` - Skapa ny bokning
- `PUT /api/bookings/:id` - Uppdatera bokning
- `DELETE /api/bookings/:id` - Ta bort bokning

## Struktur

```
sharp-socity/
├── server.js           # Express-server
├── package.json        # Dependenser
├── bookings.db        # SQLite-databas (skapas automatiskt)
└── public/
    ├── index.html     # Hemsida
    ├── style.css      # Stilmallar
    └── script.js      # JavaScript-funktionalitet
```

## Anpassning

Du kan enkelt anpassa:
- **Färger:** Ändra CSS-variabler i `style.css`
- **Tjänster:** Redigera `server.js` eller använd ett databas-verktyg
- **Öppettider:** Ändra tidsintervallen i `script.js` funktionen `generateTimeSlots()`
- **Salong namn:** Uppdatera "Sharp Society" överallt

Lycka till med din frisörsalong! 💇‍♀️✂️
=======
# Sharp-socity
>>>>>>> be5d44032dcc9846f82f469be3e2cfd7d47a67f7
