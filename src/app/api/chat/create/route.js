import connectionDB from "@/config/db.config";
import ChatModel from "@/models/Chat.model";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'User not authenticated'
            })
        }

        // Prepare the chat data to be saved in the database 
        let chatdata = {
            userId,
            messages: [],
            name: 'New Chat',
        }

        //Connect the database and create a new chat
        await connectionDB()
        await ChatModel.create(chatdata);

        return NextResponse.json({
            success: true,
            message: 'Chat is created'
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error?.message,
        })
    }

}