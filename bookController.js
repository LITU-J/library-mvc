const Book = require('../models/Book');

const bookController = {
    getAllBooks: (req, res) => {
        Book.getAll((err, books) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Database error");
            }
            res.render('index', { books, title: "Library Catalog" });
        });
    },

    showAddForm: (req, res) => {
        res.render('add', { title: "Add New Book", errors: null, formData: {} });
    },

    addBook: (req, res) => {
        const { title, author, isbn, quantity } = req.body;
        let errors = [];

        if (!title || title.trim() === "") errors.push("Title is required");
        if (!author || author.trim() === "") errors.push("Author is required");
        if (!isbn || isbn.trim() === "") errors.push("ISBN is required");

        if (errors.length > 0) {
            return res.render('add', { 
                title: "Add New Book", 
                errors: errors, 
                formData: req.body 
            });
        }

        const newBook = {
            title: title.trim(),
            author: author.trim(),
            isbn: isbn.trim(),
            quantity: quantity ? parseInt(quantity) : 1
        };

        Book.create(newBook, (err) => {
            if (err) {
                if (err.message.includes("UNIQUE constraint failed")) {
                    errors.push("ISBN already exists");
                    return res.render('add', { title: "Add New Book", errors, formData: req.body });
                }
                return res.status(500).send("Error adding book");
            }
            res.redirect('/');
        });
    },

    showEditForm: (req, res) => {
        const id = req.params.id;
        Book.getById(id, (err, book) => {
            if (err || !book) {
                return res.status(404).send("Book not found");
            }
            res.render('edit', { title: "Edit Book", book, errors: null });
        });
    },

    updateBook: (req, res) => {
        const id = req.params.id;
        const { title, author, isbn, quantity } = req.body;
        let errors = [];

        if (!title || title.trim() === "") errors.push("Title is required");
        if (!author || author.trim() === "") errors.push("Author is required");
        if (!isbn || isbn.trim() === "") errors.push("ISBN is required");

        if (errors.length > 0) {
            return res.render('edit', { 
                title: "Edit Book", 
                book: { id, title, author, isbn, quantity }, 
                errors 
            });
        }

        const updatedBook = {
            title: title.trim(),
            author: author.trim(),
            isbn: isbn.trim(),
            quantity: quantity ? parseInt(quantity) : 1
        };

        Book.update(id, updatedBook, (err) => {
            if (err) return res.status(500).send("Error updating book");
            res.redirect('/');
        });
    },

    deleteBook: (req, res) => {
        const id = req.params.id;
        Book.delete(id, (err) => {
            if (err) return res.status(500).send("Error deleting book");
            res.redirect('/');
        });
    }
};

module.exports = bookController;
