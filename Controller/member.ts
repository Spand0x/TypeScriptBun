import {t} from "elysia";
import type {MemberRegisterRequestBody, Member} from "../Dto/dto.ts";
import {app} from "../main.ts";

app
    .post('/members',
        ({body}: { body: MemberRegisterRequestBody }): Member => {
            console.log(body);
            //call db
            // return body;
            return body
        },
        {
            body: t.Object({
                name: t.String({minLength: 3}),
                email: t.String({format: "email"}),
                phone: t.String({minLength: 8}),
                address: t.String({minLength: 5}),
            }),
        }
    )
    .get("/members",
        (): Member[] => {
            //return all db
            return null;
        })
    .get("/members/:memberId",
        ({ params }: { params: { memberId: number } }) => {
            //get db
            // if (!member) {
                throw new Error("Member not found");
            // }
        },
        {
            params: t.Object({
                memberId: t.Numeric()
            }),
        })
    .get("/members/:memberId/issues", ({params}: { params: { memberId: number } }) => {

        },
        {
            params: t.Object({
                memberId: t.Numeric()
            })
        })

