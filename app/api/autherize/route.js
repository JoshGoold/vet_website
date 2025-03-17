import Admin from "@/models/AdminSchema";
import db from "@/utils/db"
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import {generateCode} from "@/utils/genCode";
import { sendTwoFactorAuth } from "@/utils/Mailer";

export async function POST(req){
    try {
        await db();

        const body = await req.json();

        const {email, password} = body;

        const admin = await Admin.findOne({ email }); 
if (!admin) {
    return NextResponse.json({
        Message: "No user found",
        Success: false
    }, { status: 404 });
}


const isMatch = await bcrypt.compare(password, admin.password); 
if (!isMatch) {
    return NextResponse.json({
        Message: "Invalid Credentials",
        Success: false
    }, { status: 401 });
}

// Generate 2FA Code
const twoFactorCode = generateCode(); 
await sendTwoFactorAuth(email, twoFactorCode, "Two Factor Authentication Code", "Don't show to anyone!");

return NextResponse.json({
    Message: "User Authenticated, Please enter code sent to your email.",
    Code: twoFactorCode,
    Success: true
}, { status: 200 });
    } catch (error) {
        console.error("Error occured while trying to authenticate website admin: ", error)
        return NextResponse.json({Message: "Server Error Occured", Success: false}, {status: 500})
    }
}