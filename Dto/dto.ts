export interface MemberRegisterRequestBody {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface Member {
    memberId: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface Book {
    bookId: number;
    title: string;
    subject: string;
    author: string;
    language: Language
}

export interface BookRequestBody {
    title: string;
    subject: string;
    author: string;
    language: Language;
}

export interface IssueBook {
    memberId: number;
    bookId: number;
}

export interface IssueBookResponseBody {
    success: boolean;
    message?: string;
    error?: string;
    issue?: Issue;
}

interface Issue {
    issueId: number;
    memberId: number;
    bookId: number;
    issueDate: string;
}

export interface BookIssue {
    issueId: number;
    memberId: number;
    bookId: number;
    issueDate: string;
}

enum Language {
    English = "English",
    French = "French",
    Arabic = "Arabic",
    German = "German",
    Spanish = "Spanish"
}
