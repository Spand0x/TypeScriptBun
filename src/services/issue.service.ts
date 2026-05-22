import db from "../db/index.ts";
import type {IssueMemberIdBookIdRequestBody, IssueBookResponseBody} from "../types/dto.ts";

function issueBook(issueBook: IssueMemberIdBookIdRequestBody): IssueBookResponseBody{
    const result = db.createBookIssue(issueBook.memberId, issueBook.bookId)
    console.log(result);


}

export default {
    issueBook
}