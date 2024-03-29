import {
  serial,
  text,
  integer,
  pgTable,
  primaryKey,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod";
import { item } from "./item";

export const itemAbility = pgTable(
  "item_ability",
  {
    id: serial("id").unique(),
    itemId: integer("item_id")
      .references(() => item.id)
      .notNull(),
    name: text("name").notNull(),
    description: text("description").notNull(),
  },
  (itemAbility) => {
    return {
      pk: primaryKey({ columns: [itemAbility.itemId, itemAbility.name] }),
    };
  }
);

export const insertItemAbilitySchema = createInsertSchema(itemAbility);

export type ItemAbility = z.infer<typeof insertItemAbilitySchema>;
