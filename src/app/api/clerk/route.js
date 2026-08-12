import connectionDB from "@/config/db.config.js";
import UserModel from "@/models/User.model.js";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";



export async function POST(req, content) {

    const wh = new Webhook(process.env.SIGNIN_SECRET)
    const headerpayload = await headers()
    const svixHeaders = {
        'svix-id': headerpayload.get('svix-id'),
        'svix-timestamp': headerpayload.get('svix-timestamp'),
        'svix-signature': headerpayload.get('svix-signature'),
    }

    //get the payload and verify it
    const payload = await req.json();
    const body = JSON.stringify(payload);
    const { data, type } = wh.verify(body, svixHeaders)

    console.log(data)

    //prepare the user data to save in the database
    const userData = {
        _id: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
    }

    await connectionDB()

    switch (type) {
        case 'user.created':
            await UserModel.create(userData)
            break;
        case 'user.updated':
            await UserModel.findByIdAndUpdate(data.id , userData)
            break;
        case 'user.deleted':
            await UserModel.findByIdAndDelete(data.id)
            break;

        default:
            break;
    }

    return NextResponse.json({success:true, message : 'Message received'}, {status:200})
}