import { drizzle } from 'drizzle-orm/mysql2';
import { env } from '$env/dynamic/private';
import mysql from 'mysql2/promise';

export default class Connection {
	private static conn: mysql.Connection;
	private static instance: Connection | null = null;

	private constructor(conn: mysql.Connection) {
		Connection.conn = conn;
	}

	private static async create(): Promise<mysql.Connection> {
		return await mysql.createConnection({
			host: env.NODE_ENV === 'production' ? env.MYSQL_HOST : 'localhost',
			port: Number(env.MYSQL_PORT),
			user: env.MYSQL_USER,
			database: env.MYSQL_DATABASE,
			password: env.MYSQL_PASSWORD
		});
	}

	static async getConnection(): Promise<ReturnType<typeof drizzle>> {
		if (this.instance === null) {
			this.instance = new Connection(await Connection.create());
		}
		return drizzle({ client: Connection.conn });
	}

	static async closeConnection(): Promise<void> {
		await Connection.conn.end();
		Connection.instance = null;
	}
}
