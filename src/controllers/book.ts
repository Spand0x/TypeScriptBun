import {app} from "../app.ts"
import {type Book, type BookRequestBody, type IssueBook, type IssueBookResponseBody, Language} from "../types/dto.ts";
import {t} from "elysia";
import bookService from "../services/book.service.ts";

app
    .post("/books", ({body}: { body: BookRequestBody }): Book => {
            return bookService.createBook(body);
        },
        {
            body: t.Object({
                title: t.String({minLength: 2}),
                subject: t.String({minLength: 2}),
                author: t.String({minLength: 3}),
                language: t.Union([t.Literal(Language.English), t.Literal(Language.French), t.Literal(Language.Arabic), t.Literal(Language.German), t.Literal((Language.Spanish))])
            })
        })
    .get("/books", (): Book[] => {
        return bookService.getAllBooks();
    })
    .get("/books/:bookId",
        ({params}: { params: { bookId: number } }): Book => {
            const result = bookService.getBook(params.bookId);
            if (!result) {
                throw new Error("Book not found");
            }
            return result;
        }, {
            params: t.Object({
                bookId: t.Numeric()
            })
        })