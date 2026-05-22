import {app} from "../app.ts";
import type {Book, IssueMemberIdBookIdRequestBody, IssueBookResponseBody, BookIssue} from "../types/dto.ts";
import issueService from "../services/issue.service.ts";
import { t } from "elysia";

app
    .post("/issues", ({body}: { body: IssueMemberIdBookIdRequestBody }): IssueBookResponseBody => {

            return issueService.issueBook(body)
        },
        {
            body: t.Object({
                    bookId: t.Numeric(),
                    memberId: t.Numeric()
                }
            )
        })
    .get("/issues", (): BookIssue[] => {
        return issueService.getAllIssuedBooks();
    })
    .delete("/issues/:issueId", ({params}: { params: { issueId: number } }) => {
        return issueService.deleteIssuedBook(params.issueId);

    }, {
        params: t.Object({
            issueId: t.Numeric()
        })
    })