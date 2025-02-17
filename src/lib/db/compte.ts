import { compte } from './schema'
import { drizzle } from 'drizzle-orm/mysql2';
import Connection from './index';
import { sql } from 'drizzle-orm';
import { getID } from './user';

interface Compte {
    id: number;
    title: string | null;
    username: string | null;
    password: string;
    email: string | null;
}

export async function getAllCompte(username: string): Promise<Compte[] | boolean> {

    const getIdUser = await getID(username)

    if (getIdUser) {

        const db: ReturnType<typeof drizzle> = await Connection.getConnection()

        const result = await db.select({
            id: compte.id,
            title: compte.title,
            username: compte.username,
            password: compte.password,
            email: compte.email
        })
            .from(compte)
            .where(sql`${getIdUser[0].id} = ${compte.user_id}`)

        Connection.closeConnection()

        if (result && result.length > 0) {
            return Promise.resolve(result)
        } else {
            return true
        }


    }

    return false

}

export async function createAcc(title: string | null = null, username: string | null = null, password: string, email: string | null, user_name: string): Promise<boolean> {

    const userResult = await getID(user_name)

    if (!userResult || userResult.length === 0) return false

    const user_id = userResult[0].id

    const db: ReturnType<typeof drizzle> = await Connection.getConnection()

    const result = await db.insert(compte)
        .values({ title: title, username: username, password: password, email: email, user_id: user_id })
        .$returningId();

    Connection.closeConnection()

    return result && result.length > 0 ? true : false
}

