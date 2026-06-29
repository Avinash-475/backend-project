import { DatabaseSync } from 'node:sqlite'

const db = new DatabaseSync('./todo.db')

db.exec(`
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
)
`)

db.exec(`
CREATE TABLE IF NOT EXISTS todos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    task TEXT,
    completed BOOLEAN DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES users(id)
)
`)

// ADD THESE LINES
console.log("USERS:");
console.log(db.prepare("SELECT * FROM users").all());

console.log("TODOS:");
console.log(db.prepare("SELECT * FROM todos").all());

export default db;