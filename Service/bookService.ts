import db from "../Database/db.ts";
import type {Book, BookRequestBody} from "../Dto/dto.ts";


function createBook(book: BookRequestBody): Book {
    return db.createBook(book.title, book.subject, book.author, book.language);
}

function getBook(bookId: number): Book {
    return db.getBookById(bookId);
}

function getAllBooks(): Book[] {
    return db.getAllBooks();
}

export default {
    createBook,
    getBook,
    getAllBooks,
}