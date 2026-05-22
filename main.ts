import {app} from "./app.ts";
import "./Controller/member.ts";
import "./Controller/book.ts";
import db from "./Database/db.ts";

db.createMembersTable()
db.createBooksTable()
db.createBookIssuesTable()

app.listen(3000);
console.log("Server running on http://localhost:3000");