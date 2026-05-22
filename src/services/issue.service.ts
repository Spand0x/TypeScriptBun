import db from "../db/index.ts";
import type {IssueBook} from "../types/dto.ts";

function issueBook(issueBook: IssueBook){
    return db.createBookIssue(issueBook.memberId, issueBook.bookId)

}

export default {
    issueBook
}