import db from "../db/index.ts";
import type {Book, BookRequestBody} from "../types/dto.ts";


function createBook(book: BookRequestBody): Book {
    return db.createBook(book.title, book.subject, book.author, book.language);
}

function getBookById(bookId: number): Book {
    return db.getBookById(bookId);
}

function getAllBooks(): Book[] {
    return db.getAllBooks();
}

export default {
    createBook,
    getBookById,
    getAllBooks,
}
