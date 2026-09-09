import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest){
    try {
        const {email , password} = await request.json()

        if(!email || !password){
            return Response.json({
                error:"Email and password Required",               
            }, {status:400} )
        }
        // before check email already exist to check database

        await connectToDatabase()

        //existingUser
        const existingUser = await User.findOne({email})

        if(existingUser){
            return Response.json(
                {error:"User already existed"},
                {status : 400}
            )
        }
         
        // create user
    const user = await User.create(
            {email , password}
        )

        return NextResponse.json(
            {message: "User Registered"},
            {status: 200}
        )

    } catch (error) {
        console.error("Failed registration", error)
        return NextResponse.json(
            {error: "Failed to Registerd"},
            {status: 400}
        )
        
    }

}