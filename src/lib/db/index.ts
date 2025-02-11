import { drizzle } from 'drizzle-orm/mysql2';
import {
	MYSQL_HOST,
	MYSQL_PORT,
	MYSQL_USER,
	MYSQL_DATABASE,
	MYSQL_PASSWORD
} from '$env/static/private';
import mysql from 'mysql2/promise';

export default class Connection {
	private static conn: mysql.Connection;
	private static instance: Connection | null = null;

	private constructor(conn: mysql.Connection) {
		Connection.conn = conn;
	}

	private static async create(): Promise<mysql.Connection> {
		return await mysql.createConnection({
			host: MYSQL_HOST,
			port: Number(MYSQL_PORT),
			user: MYSQL_USER,
			database: MYSQL_DATABASE,
			password: MYSQL_PASSWORD
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
