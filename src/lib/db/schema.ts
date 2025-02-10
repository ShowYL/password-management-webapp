
import { mysqlTable, serial, varchar, bigint, uniqueIndex } from 'drizzle-orm/mysql-core'

const varchar255 = () => varchar({ length: 255 })

export const user = mysqlTable('user', {
  id: serial().primaryKey(),
  username: varchar255().notNull(),
  password: varchar255().notNull()
}, (table) => [
  uniqueIndex('unique_username_password').on(table.username, table.password)
])

export const compte = mysqlTable('compte', {
  id: serial().primaryKey(),
  username: varchar255(),
  email: varchar255(),
  password: varchar255().notNull(),
  user_id: bigint({ mode: 'number', unsigned: true }).references(() => user.id)
})
