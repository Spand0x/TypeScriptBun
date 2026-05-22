import db from "../db/index.ts";
import type {IssueMemberIdBookIdRequestBody, IssueBookResponseBody, Member, Book, BookIssue} from "../types/dto.ts";
import memberService from "./member.service.ts";
import bookService from "./book.service.ts";
import {status} from "elysia";

function issueBook(issueBookRequest: IssueMemberIdBookIdRequestBody): IssueBookResponseBody{
    validate(issueBookRequest)
    const result = db.createBookIssue(issueBookRequest.memberId, issueBookRequest.bookId)
    const response: IssueBookResponseBody = {
        success: true,
        message: "Book issued successfully",
        issue: {
            issueId: result.issueId,
            memberId: result.memberId,
            bookId: result.bookId,
            issueDate: result.issueDate
        }
    }
    return response;


}

function validate(issueBookRequest: IssueMemberIdBookIdRequestBody) {
    const member: Member = memberService.getMemberById(issueBookRequest.memberId);
    if (!member) {
        throw status(400, { success: false, error: "Member not found" });
    }
    const book: Book = bookService.getBookById(issueBookRequest.bookId);
    if (!book) {
        throw status(400, { success: false, error: "Book not found" });
    }
    let bookIssuesByBookId: BookIssue[] = db.getBookIssuesByBookId(book.bookId);
    if (bookIssuesByBookId.length > 0) {
        throw status(400, {
            success: false,
            message: "Book is already issued to another member"
        })
    }
    let bookIssuesByMemberId: BookIssue[] = db.getBookIssuesByMemberId(member.memberId);
    if (bookIssuesByMemberId.length >= 3) {
        throw status(400, {
            success: false,
            message: "Member cannot issue more than 3 books, Promise?"
        })
    }
}

export default {
    issueBook
}