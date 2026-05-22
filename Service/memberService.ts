import type { Member, MemberRegisterRequestBody } from "../Dto/dto.ts";
import db from "../Database/db.ts";

function createMember(memberRequestBody: MemberRegisterRequestBody): Member {
    return db.createMember(memberRequestBody.name, memberRequestBody.email, memberRequestBody.phone, memberRequestBody.address);
}

function getAllMembers(): Member[] {
    return db.getAllMembers();
}

function getMemberById(memberId: number): Member{
    return db.getMemberById(memberId)
}

export default {
    createMember,
    getAllMembers,
    getMemberById,
};