# Luento3 — Express + SQLite

Pieni Node/Express-API, joka tallettaa käyttäjiä SQLite-tietokantaan.

## Vaatimukset
- Node.js (LTS) ja npm
- (Valinnainen) SQLite CLI tarkistuksia varten

## Asennus & ajo
```bash
npm install
node server2.js         # tai lisää package.json:iin "start": "node server2.js" ja aja: npm start
Palvelin käynnistyy: http://localhost:3000
Ensikäynnistyksessä luodaan database.db ja taulu users.

Tietokantarakenne
sql
Copy code
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);
API-endpointit
GET /users
Palauttaa kaikki käyttäjät.

bash
Copy code
curl http://localhost:3000/users
POST /users
Lisää käyttäjän (JSON-runko).

bash
Copy code
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Esa","email":"esa@example.com"}'
Onnistuminen: 201 Created + palauttaa { id, name, email }

Jos email on jo olemassa: 400 (UNIQUE-rikkomus)

(Jos lisätty:)
PUT /users/:id — päivittää nimen & emailin
DELETE /users/:id — poistaa käyttäjän

Vianetsintä (pikavinkit)
Cannot find module 'sqlite3' → suorita npm install sqlite3 samassa kansiossa missä server2.js on.

PowerShell estää npm.ps1 → käytä npm.cmd install ... tai muuta ExecutionPolicyä.

SQLite CLI: sqlite3 database.db → .tables, SELECT * FROM users;
