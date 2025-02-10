
import { drizzle } from "drizzle-orm/mysql2";
import { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_DATABASE, MYSQL_PASSWORD } from '$env/static/private'
import mysql from "mysql2/promise";

export default class Connection {

    private conn: mysql.Connection;
    private instance: Connection | null = null

    private constructor(conn: mysql.Connection) {
        this.conn = conn;
    }

    private static async create(): Promise<mysql.Connection> {
        return await mysql.createConnection({
            host: MYSQL_HOST + ":" + MYSQL_PORT,
            user: MYSQL_USER,
            database: MYSQL_DATABASE,
            password: MYSQL_PASSWORD
        });
    }

    async getConnection(): Promise<ReturnType<typeof drizzle>> {
        if(this.instance === null){
            this.instance = new Connection(await Connection.create())
        }
        return drizzle({client: this.conn});
    }

    async closeConnection(): Promise<void> {
        this.conn.end();
    }
}
