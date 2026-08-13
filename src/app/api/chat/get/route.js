import connectionDB from "@/config/db.config";
import ChatModel from "@/models/Chat.model";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(req) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'User not authenticated'
            })
        }

        //Connect the database and get the Chat by userId
        await connectionDB()
        let data = await ChatModel.find({ userId });

        return NextResponse.json({
            success: true,
            message: 'Chat is get',
            data
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error?.message,
        })
    }

}