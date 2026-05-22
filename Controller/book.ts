import {app} from "../main.ts"
import type {Book, BookRequestBody, IssueBook, IssueBookResponseBody} from "../Dto/dto.ts";
import {t} from "elysia";

app
    .post("/books", ({body}: { body: BookRequestBody }): Book => {
        //call db
    })
    .get("/books", (): Book[] => {
        return null;
    })
    .get("/books/:bookId",
        ({params}: { params: { bookId: number } }): Book[] => {
            return null;
        }, {
            params: t.Object({
                bookId: t.Numeric()
            })
        })
    .post("/issue", ({body}: { body: IssueBook }): IssueBookResponseBody => {
            return null;
        },
        {
            body: t.Object({
                    bookId: t.Numeric(),
                    memberId: t.Numeric()
                }
            )
        })
    .get("/issues", (): Book[] => {
        return null;
    })
    .delete("/issues/:issueId", ({params}: {params: { issueId: number }}) => {

    }, {
        params: t.Object({
            issueId: t.Numeric()
        })
    })