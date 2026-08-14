export const maxDuration = 60; // Gives this route a maximum execution duration of 60 seconds.
import connectionDB from "@/config/db.config";
import ChatModel from "@/models/Chat.model";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";


const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(req) {
    try {
        const { userId } = getAuth(req)

        // Extract chatId and request from the request body
        const { chatId, prompt } = await req.json();

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'User not authenticated'
            })
        }

        // Find the chat document in the database based on chatId and userId
        await connectionDB()
        const chatData = await ChatModel.findOne({ userId, _id: chatId }) // issue

        // Create a user message object
        const userPrompt = {
            role: "user",
            content: prompt,
            timestamp: Date.now()
        }

        chatData.messages.push(userPrompt)

        // Call the deepseek API to get a chat complition
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "deepseek-v4-pro",
            store: true,
            thinking: { "type": "enabled" },
            reasoning_effort: "high",
            stream: false,
        });

        const message = completion.choices[0].message.content;
        message.timestamp = Date.now()

        chatData.messages.push(message)
        await chatData.save()


        return NextResponse.json({
            success: true,
            data:chatData,
        })

    } catch (error) {

        return NextResponse.json({
            success: false,
            message: error.message,
        })

    }
}
