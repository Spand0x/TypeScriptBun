import {Elysia} from "elysia";
import db from "./Database/db.ts";

export const app: Elysia = new Elysia();

db.createMembersTable()
db.createBooksTable()
db.createBookIssuesTable()

app.listen(3000);