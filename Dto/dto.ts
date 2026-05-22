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

enum Language {
    English = "English",
    French = "French",
    Arabic = "Arabic",
    German = "German",
    Spanish = "Spanish"
}
