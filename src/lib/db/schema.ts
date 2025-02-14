import { mysqlTable, serial, varchar, bigint } from 'drizzle-orm/mysql-core';

const varchar255 = () => varchar({ length: 255 });

export const user = mysqlTable(
	'user',
	{
		id: serial().primaryKey(),
		username: varchar255().notNull().unique(),
		password: varchar255().notNull()
	}
);

export const compte = mysqlTable('compte', {
	id: serial().primaryKey(),
	title: varchar255(),
	username: varchar255(),
	email: varchar255(),
	password: varchar255().notNull(),
	user_id: bigint({ mode: 'number', unsigned: true }).references(() => user.id)
});
