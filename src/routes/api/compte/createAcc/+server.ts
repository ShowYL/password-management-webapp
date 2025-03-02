import { json } from "@sveltejs/kit";
import { createAcc } from "$lib/db/compte";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { title, username, password, email, user_name } = await request.json()

        const result = await createAcc(title, username, password, email, user_name)

        if (result) return json({ code: 200, message: "Succesfull" })
        return json({ code: 400, message: "error user" })

    } catch (err) {
        console.error(err)
        return json({ code: 500, message: "Internal error" })
    }

}
