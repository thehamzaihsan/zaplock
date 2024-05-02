import { connectToMongo } from "@/libs/mongodb.lib";
import ContactModel from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: { authIDs: string } }) {
  try {
    const { authIDs } = params;
    const { authID ,  newName: name, newEmail: email , newWhatsApp: whatsApp , newDep : dep , isPaid, CardRecieved} = await request.json();
    await connectToMongo();
    const updatedContact = await ContactModel.findOneAndUpdate({authIDs}, { name, email, whatsApp , dep, isPaid, CardRecieved });

    if (!updatedContact) {
      return NextResponse.json({ message: "No contact found with the provided authIDs" }, { status: 404 });
    }

    return NextResponse.json({ message: "Message Updated" }, { status: 200 });
  } catch (error:any) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred while updating the contact", error: error.message }, { status: 500 });
  }
}