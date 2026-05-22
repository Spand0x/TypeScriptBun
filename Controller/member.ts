import {t} from "elysia";
import type {MemberRegisterRequestBody, Member} from "../Dto/dto.ts";
import {app} from "../main.ts";
import { createMember, getAllMembers, getMemberById } from "../Service/memberService.ts";

app
    .post('/members',
        ({body}: { body: MemberRegisterRequestBody }): Member => {
            return createMember(body);
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
            return getAllMembers();
        })
    .get("/members/:memberId",
        ({ params }: { params: { memberId: number } }) => {
            return getMemberById(params.memberId);
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

