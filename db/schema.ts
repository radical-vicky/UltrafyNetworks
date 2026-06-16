import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const contacts = sqliteTable("contacts", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),

  subject: text("subject").notNull(),
  message: text("message").notNull(),

  status: text("status").default("new"),

  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});