import db from "./db/index.ts";
import {app} from "./app.ts";
import "./register-routes.ts";

db.createMembersTable()
db.createBooksTable()
db.createBookIssuesTable()

app.listen(3000);

console.log("Server is running on http://localhost:3000")
