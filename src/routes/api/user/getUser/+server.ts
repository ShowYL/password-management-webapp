import { json } from '@sveltejs/kit';
import type { RequestHandler } from "@sveltejs/kit";
import { getUser } from '$lib/db/user';

export const POST: RequestHandler = async ({ request }) => {

    try{
        const { username, password } = await request.json()

        const res = await getUser(username, password)

        if (!res){
            return json({code:404, message:'user not found'})
        }

        return json({code:200, message:"Succesfull", data:res})

    } catch(err) {
        console.error(`Error while fetching the user: `, err)
        return json({code:500, message:"failed", error:err})
    }
}