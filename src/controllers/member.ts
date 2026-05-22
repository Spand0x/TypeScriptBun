import {t} from "elysia";
import type {MemberRegisterRequestBody, Member, BookIssue} from "../types/dto.ts";
import {app} from "../app.ts";
import memberService from "../services/member.service.ts";

app
    .post('/members',
        ({body}: { body: MemberRegisterRequestBody }): Member => {
            return memberService.createMember(body);
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
            return memberService.getAllMembers();
        })
    .get("/members/:memberId",
        ({ params }: { params: { memberId: number } }): Member => {
            const result = memberService.getMemberById(params.memberId);
            if (!result) {
                throw new Error("No member with id " + params.memberId);
            }
            return result;
        },
        {
            params: t.Object({
                memberId: t.Numeric()
            }),
        })
    .get("/members/:memberId/issues", ({params}: { params: { memberId: number } }): BookIssue[]  => {
            return memberService.getIssuesByMember(params.memberId);
        },
        {
            params: t.Object({
                memberId: t.Numeric()
            })
        })
