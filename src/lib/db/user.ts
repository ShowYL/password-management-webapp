import bcrypt from 'bcrypt';
import { user } from './schema';
import Connection from './index';
import { drizzle } from 'drizzle-orm/mysql2';
import { sql } from 'drizzle-orm';

export async function getUser(
	username: string,
	password: string
): Promise<
	{
			username: string;
	  }[]
	| false
> {
	const db: ReturnType<typeof drizzle> = await Connection.getConnection();
	const result = await db
		.select({
			username: user.username,
			password: user.password
		})
		.from(user)
		.where(sql`${username} = ${user.username}`);

	Connection.closeConnection();

	if (result && result.length > 0) {
		const foundUser = result.find((person) => bcrypt.compareSync(password, person.password));
		if (foundUser) return Promise.resolve([{ username: username }]);
	}

	return false;
}

export async function createUser(username: string, password: string): Promise<boolean> {
	const hash: string = bcrypt.hashSync(password, 10);

	const db: ReturnType<typeof drizzle> = await Connection.getConnection();
	const result = await db
		.insert(user)
		.values({ username: username, password: hash })
		.$returningId();

	Connection.closeConnection();

	return result && result.length > 0 ? true : false;
}

export async function deleteUser(username: string, password: string): Promise<boolean> {
	const id = await getID(username, password);

	const db: ReturnType<typeof drizzle> = await Connection.getConnection();
	const result = await db.delete(user).where(sql`${id} = ${user.id}`);

	Connection.closeConnection();

	return result && result.length > 0 ? true : false;
}

export async function getID(
	username: string,
	password: string
): Promise<
	| {
			id: number;
	  }[]
	| false
> {
	const db: ReturnType<typeof drizzle> = await Connection.getConnection();
	const result = await db
		.select({
			id: user.id,
			password: user.password
		})
		.from(user)
		.where(sql`${username} = ${user.username}`);

	Connection.closeConnection();

	if (result) {
		const findUser = result.find((person) => bcrypt.compareSync(password, person.password));
		if (findUser) return Promise.resolve([{ id: findUser.id }]);
	}

	return false;
}

export async function idExist(id: number): Promise<boolean> {
	const db: ReturnType<typeof drizzle> = await Connection.getConnection();
	const result = await db
		.select({
			id: user.id
		})
		.from(user)
		.where(sql`${id} = ${user.id}`);

	Connection.closeConnection();

	return result.length > 0 ? true : false;
}

export async function modifPassword(id: number, newPassword: string): Promise<boolean> {
	if (!idExist(id)) return false;

	const hash: string = bcrypt.hashSync(newPassword, 10);

	const db: ReturnType<typeof drizzle> = await Connection.getConnection();
	const result = await db
		.update(user)
		.set({ password: hash })
		.where(sql`${user.id} = ${id}`);

	Connection.closeConnection();

	return result && result.length ? true : false;
}

export async function isPasswordCorrect(id: number, password: string): Promise<boolean>{
    if (!idExist(id)) return false

    const db: ReturnType<typeof drizzle> = await Connection.getConnection()
    const result = await db.select({
        password: user.password
    })
        .from(user)
        .where(sql`${user.id} = ${id}`)
    
    Connection.closeConnection()

    if (bcrypt.compareSync(password,result[0].password)) return true
    return false
}
