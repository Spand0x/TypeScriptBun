import Database from "bun:sqlite";
import type { Member, Book, BookIssue } from "../Dto/dto";
const db = new Database("library.db");

function createMembersTable() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS members (
            memberId INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL,
        )
    `)
}

function createBooksTable() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS books (
        bookId INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        subject TEXT NOT NULL,
        author TEXT NOT NULL
        language TEXT NOT NULL
        )
    `)
}

function createBookIssuesTable() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS book_issues (
        issueId INTEGER PRIMARY KEY AUTOINCREMENT,
        memberId INTEGER NOT NULL,
        bookId INTEGER NOT NULL,
        issueData DATE NOT NULL
        FOREIGN KEY (memberId) REFERENCES members(memberId),
        FOREIGN KEY (bookId) REFERENCES books(bookId)
        )
    `);


    function createMember(name: string, email: string, phone: string, address: string): void {
        db.prepare(`
            INSERT INTO members (name, email, phone, address)
            VALUES (?, ?, ?, ?)
        `).run(name, email, phone, address);
    }

    function getAllMembers(): Member[] {
        return db.prepare(`SELECT * FROM members`).all() as Member[];
    }

    function getMemberById(memberId: number): Member | undefined {
        return db.prepare(`SELECT * FROM members WHERE memberId = ?`).get(memberId) as Member;
    }

    function createBook(title: string, subject: string, author: string, language: string) {
        db.prepare(`
            INSERT INTO books (title, subject, author, language)
            VALUES (?, ?, ?, ?)
        `).run(title, subject, author, language);
    }

    function getAllBooks(): Book[] {
        return db.prepare(`SELECT * FROM books`).getAll() as Book[];
    }

    function getBookById(bookId: number): Book | undefined {
        return db.prepare(`SELECT * FROM books WHERE bookId = ?`).get(bookId) as Book;
    }

    function createBookIssue(memberId: number, bookId: number, issueDate: string): void {
        db.prepare(`
            INSERT INTO book_issues (memberId, bookId, issueDate)
            VALUES (?, ?, ?)
        `).run(memberId, bookId, issueDate);
    }

    function getAllIssuedBooks(): BookIssue[] {
        return db.prepare(`SELECT * FROM book_issues`).getAll() as BookIssue[];
    }

    function getBookIssueById(issueId: number): BookIssue | undefined {
        return db.prepare(`SELECT * FROM book_issues WHERE issueId = ?`).get(issueId) as BookIssue;
    }

    function getBookIssuesByMember(memberId: number): BookIssue[] {
        return db.prepare(`SELECT * FROM book_issues WHERE memberId = ?`).getAll(memberId) as BookIssue[];
    }

    function deleteBookIssue(issueId: number): BookIssue | undefined {
        return db.prepare(`DELETE FROM book_issues WHERE issueId = ?`).run(issueId);
    }
}