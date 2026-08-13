import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
        userId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        message: [
            {
                role: { type: String, required: true },
                content: { type: String, required: true },
                timestamps: { type: Number, required: true },
            },
        ],
    },
    { timestamps: true },
);

const ChatModel = mongoose.models.ChatModel || mongoose.model("Chat", ChatSchema);

export default ChatModel;
