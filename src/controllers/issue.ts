import {app} from "../app.ts";
import type {Book, IssueMemberIdBookIdRequestBody, IssueBookResponseBody} from "../types/dto.ts";
import issueService from "../services/issue.service.ts";
import { t } from "elysia";

app
    .post("/issue", ({body}: { body: IssueMemberIdBookIdRequestBody }): IssueBookResponseBody => {

            return issueService.issueBook(body)
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
    .delete("/issues/:issueId", ({params}: { params: { issueId: number } }) => {

    }, {
        params: t.Object({
            issueId: t.Numeric()
        })
    })