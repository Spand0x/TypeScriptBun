import Database from "bun:sqlite";
import {type Book, type BookIssue, type Member} from "../types/dto.ts";

const db = new Database("library.db");

function createMembersTable() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS members (
            memberId INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL
        );
    `)
}


function createBooksTable() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS books (
        bookId INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        subject TEXT NOT NULL,
        author TEXT NOT NULL,
        language TEXT NOT NULL
        );
    `)
}

function createBookIssuesTable() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS book_issues (
        issueId INTEGER PRIMARY KEY AUTOINCREMENT,
        memberId INTEGER NOT NULL,
        bookId INTEGER UNIQUE NOT NULL,
        issueDate DATE NOT NULL,
        FOREIGN KEY (memberId) REFERENCES members(memberId),
        FOREIGN KEY (bookId) REFERENCES books(bookId)
        );
    `)
}

function createMember(name: string, email: string, phone: string, address: string): Member {
    return db.prepare(`
            INSERT INTO members (name, email, phone, address)
            VALUES (?, ?, ?, ?)
            RETURNING *
        `).get(name, email, phone, address) as Member;
}

function getAllMembers(): Member[] {
    return db.prepare(`SELECT * FROM members`).all() as Member[];
}

function getMemberById(memberId: number): Member {
    return db.prepare(`SELECT * FROM members WHERE memberId = ?`).get(memberId) as Member;
}

function createBook(title: string, subject: string, author: string, language: string): Book {
    return db.prepare(`
        INSERT INTO books (title, subject, author, language)
        VALUES (?, ?, ?, ?)
        RETURNING *
    `).get(title, subject, author, language) as Book;
}

function getAllBooks(): Book[] {
    return db.prepare(`SELECT * FROM books`).all() as Book[];
}

function getBookById(bookId: number): Book {
    return db.prepare(`SELECT * FROM books WHERE bookId = ?`).get(bookId) as Book;
}

function createBookIssue(memberId: number, bookId: number): BookIssue {
    const issueDate: string = new Date().toISOString();

    return db.prepare(`
        INSERT INTO book_issues (memberId, bookId, issueDate)
        VALUES (?, ?, ?)
        RETURNING *
    `).get(memberId, bookId, issueDate) as BookIssue;
}

function getAllIssuedBooks(): BookIssue[] {
    return db.prepare(`SELECT * FROM book_issues`).all() as BookIssue[];
}

function getBookIssueById(issueId: number): BookIssue | undefined {
    return db.prepare(`SELECT * FROM book_issues WHERE issueId = ?`).get(issueId) as BookIssue;
}

function getBookIssuesByMemberId(memberId: number): BookIssue[] {
    return db.prepare(`SELECT * FROM book_issues WHERE memberId = ?`).all(memberId) as BookIssue[];
}

function getBookIssuesByBookId(bookId: number): BookIssue[] {
    return db.prepare(`SELECT * FROM book_issues WHERE bookId = ?`).all(bookId) as BookIssue[];
}

function deleteBookIssue(issueId: number) {
    return db.prepare(`DELETE FROM book_issues WHERE issueId = ?`).run(issueId);
}

export default {
    createMembersTable,
    createBooksTable,
    createBookIssuesTable,
    createMember,
    getAllMembers,
    getMemberById,
    createBook,
    getAllBooks,
    getBookById,
    createBookIssue,
    getBookIssuesByMemberId,
    getBookIssuesByBookId,
    getAllIssuedBooks,
    deleteBookIssue
};
