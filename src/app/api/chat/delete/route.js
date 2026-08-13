import connectionDB from "@/config/db.config";
import ChatModel from "@/models/Chat.model";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(req) {
    try {
        const { userId } = getAuth(req);
        const { chatId } = await req.json()

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'User not authenticated'
            })
        }

        //Connect the database and delete the Chat
        await connectionDB()
        await ChatModel.findOneAndDelete({ _id: chatId, userId });

        return NextResponse.json({
            success: true,
            message: 'Chat is Deleted',
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error?.message,
        })
    }

}