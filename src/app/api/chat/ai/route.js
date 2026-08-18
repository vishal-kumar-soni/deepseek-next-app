export const maxDuration = 60;

import connectionDB from "@/config/db.config";
import ChatModel from "@/models/Chat.model";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        const { chatId, prompt } = await req.json();

        console.log("Chat ID and prompt:", chatId, prompt);

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'User not authenticated'
            }, { status: 401 }); // 401 is better for auth errors
        }

        await connectionDB();
        const chatData = await ChatModel.findOne({ userId, _id: chatId });

        if (!chatData) {
            return NextResponse.json({
                success: false,
                message: "Chat not found"
            }, { status: 404 });
        }

        const userPrompt = {
            role: "user",
            content: prompt,
            timestamps: Date.now()
        };
        chatData.messages.push(userPrompt);

        // Call DeepSeek API
        const completion = await openai.chat.completions.create({
            messages: [
                ...chatData.messages.map(msg => ({
                    role: msg.role,
                    content: msg.content,
                }))
            ],
            model: "openrouter/free",
            stream: false,
        });

        // Create properly structured AI message
        const aiMessage = {
            role: "assistant",
            content: completion.choices[0].message.content,
            timestamps: Date.now()
        };

        chatData.messages.push(aiMessage);
        await chatData.save();

        return NextResponse.json({
            success: true,
            data: aiMessage,
        }, { status: 200 });

    } catch (error) {
        console.error("DeepSeek API Error:", error);
        return NextResponse.json({
            success: false,
            message: error.message || "Something went wrong",
        }, { status: 500 });
    }
}