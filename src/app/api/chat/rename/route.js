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

        const {chatId , name }=await req.json();

        //Connect the database and get the Chat by userId
        await connectionDB()
        await ChatModel.findOneAndUpdate({_id:chatId,userId}, {name});

        return NextResponse.json({
            success: true,
            message: 'Chat is Renamed',
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error?.message,
        })
    }

}