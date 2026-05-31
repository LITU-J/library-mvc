const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../db/library.db');
const db = new sqlite3.Database(dbPath);

db.run(`
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        isbn TEXT UNIQUE NOT NULL,
        quantity INTEGER DEFAULT 1
    )
`);

const Book = {
    create: (book, callback) => {
        const { title, author, isbn, quantity } = book;
        const sql = `INSERT INTO books (title, author, isbn, quantity) VALUES (?, ?, ?, ?)`;
        db.run(sql, [title, author, isbn, quantity], function(err) {
            callback(err, this?.lastID);
        });
    },

    getAll: (callback) => {
        const sql = `SELECT * FROM books ORDER BY id DESC`;
        db.all(sql, [], callback);
    },

    getById: (id, callback) => {
        const sql = `SELECT * FROM books WHERE id = ?`;
        db.get(sql, [id], callback);
    },

    update: (id, book, callback) => {
        const { title, author, isbn, quantity } = book;
        const sql = `UPDATE books SET title = ?, author = ?, isbn = ?, quantity = ? WHERE id = ?`;
        db.run(sql, [title, author, isbn, quantity, id], callback);
    },

    delete: (id, callback) => {
        const sql = `DELETE FROM books WHERE id = ?`;
        db.run(sql, [id], callback);
    }
};

module.exports = Book;
