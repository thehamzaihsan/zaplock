import { connectToMongo } from "@/libs/mongodb.lib";
import ContactModel from "@/model/user.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { authID, name, email, whatsApp , dep, isPaid, CardRecieved } = await request.json()
        await connectToMongo()
        await ContactModel.create( { authID, name, email, whatsApp , dep,  isPaid, CardRecieved })
        return NextResponse.json({ message: "Message sent successfully" }, { status: 200 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: "Failed to send message " }, { status: 400 })
    }
}

//