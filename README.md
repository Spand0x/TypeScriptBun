# Library Management API

A REST API for managing library members, books, and book lending. Built with **Bun**, **Elysia**, and **SQLite** as part of a TypeScript training project.

## Features

- Register and look up library members
- View all books issued to a specific member
- Add and browse books (with supported language metadata)
- Issue books to members with business-rule validation:
  - Member and book must exist
  - A book can only be issued to one member at a time
  - A member can hold at most **3** books at once
- List all active book issues
- Return books by deleting an issue record

## Prerequisites

- [Bun](https://bun.sh/) (v1.0+)

## Getting Started

```bash
# Install dependencies
bun install

# Start the server (http://localhost:3000)
bun run start
```

On startup, the app creates the SQLite tables if they do not exist. Data is stored in `library.db` in the project root.

## Project Structure

```
src/
  main.ts              # Entry point — initializes DB tables and starts the server
  app.ts               # Elysia application instance
  register-routes.ts   # Loads all route controllers
  controllers/         # HTTP route handlers
  services/            # Business logic
  db/                  # SQLite access layer
  types/               # Shared DTOs and enums
```

## API Endpoints

### Members

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/members` | Register a new member |
| `GET` | `/members` | List all members |
| `GET` | `/members/:memberId` | Get a member by ID |
| `GET` | `/members/:memberId/issues` | List all books issued to a member |

**Register member** — `POST /members`

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "1234567890",
  "address": "123 Main St"
}
```

Validation: `name` (min 3 chars), valid `email`, `phone` (min 8 chars), `address` (min 5 chars).

**Member issues** — `GET /members/:memberId/issues`

Returns an array of issue records for the given member:

```json
[
  {
    "issueId": 1,
    "memberId": 1,
    "bookId": 3,
    "issueDate": "2026-05-22T10:00:00.000Z"
  }
]
```

---

### Books

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/books` | Add a new book |
| `GET` | `/books` | List all books |
| `GET` | `/books/:bookId` | Get a book by ID |

**Add book** — `POST /books`

```json
{
  "title": "Clean Code",
  "subject": "Software Engineering",
  "author": "Robert Martin",
  "language": "English"
}
```

Supported `language` values: `English`, `French`, `Arabic`, `German`, `Spanish`.

---

### Book Issues

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/issues` | Issue a book to a member |
| `GET` | `/issues` | List all active issues |
| `DELETE` | `/issues/:issueId` | Return a book / close an issue |

**Issue a book** — `POST /issues`

```json
{
  "memberId": 1,
  "bookId": 1
}
```

**Success response:**

```json
{
  "success": true,
  "message": "Book issued successfully",
  "issue": {
    "issueId": 1,
    "memberId": 1,
    "bookId": 1,
    "issueDate": "2026-05-22T10:00:00.000Z"
  }
}
```

**Error responses** (HTTP 400):

- Member not found
- Book not found
- Book is already issued to another member
- Member cannot issue more than 3 books

**List all issues** — `GET /issues`

Returns an array of all active issue records:

```json
[
  {
    "issueId": 1,
    "memberId": 1,
    "bookId": 3,
    "issueDate": "2026-05-22T10:00:00.000Z"
  }
]
```

**Return a book** — `DELETE /issues/:issueId`

Removes the issue record, making the book available again. Returns a plain-text message:

- `"Successfully deleted."` on success
- `"Something went wrong during the deletion process."` if the issue was not found

## Database Schema

| Table | Columns |
|-------|---------|
| `members` | `memberId`, `name`, `email`, `phone`, `address` |
| `books` | `bookId`, `title`, `subject`, `author`, `language` |
| `book_issues` | `issueId`, `memberId`, `bookId` (unique), `issueDate` |

`book_issues` references `members` and `books` via foreign keys. The unique constraint on `bookId` enforces that a book can only have one active issue at a time.

## Scripts

| Command | Description |
|---------|-------------|
| `bun run start` | Start the API server on port 3000 |
| `bun test` | Run tests |

## Tech Stack

- **Runtime:** Bun
- **Framework:** Elysia
- **Database:** SQLite (`bun:sqlite`)
- **Language:** TypeScript (strict mode)
