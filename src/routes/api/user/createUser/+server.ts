
import { json } from '@sveltejs/kit';
import { createUser } from '$lib/db/user';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {

    try{

        const { username, password } = await request.json()

        await createUser(username, password)

        return json({code:200,message:"Succesfull"})

    }catch(err){
        console.error('Error while creating the user: ', err)
        return json({code:500,message:"failed",error:err})
    }

}