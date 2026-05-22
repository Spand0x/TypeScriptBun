import db from "../Database/db.ts";
import type {Book, BookRequestBody} from "../Dto/dto.ts";


function createBook(book: BookRequestBody): Book {
    const result = db.createBook(book.title, book.subject, book.author, book.language);
    console.log(result);
    return result;
}

function getBook(bookId: number): Book {
}

function getAllBooks(): Book[] {

}

export default {
    createBook,
    getBook,
    getAllBooks,
}