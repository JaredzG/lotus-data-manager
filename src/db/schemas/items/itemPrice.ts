import {
  serial,
  text,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
} from "drizzle-orm/pg-core";
import { item } from "./item";

export const itemPriceTypeEnum = pgEnum("item_price_type", [
  "Purchase Price",
  "Sell Price",
]);

export const itemPrice = pgTable(
  "item_price",
  {
    id: serial("id").unique(),
    itemId: integer("item_id")
      .references(() => item.id)
      .notNull(),
    type: itemPriceTypeEnum("type").notNull(),
    amount: text("amount").notNull(),
  },
  (itemPrice) => {
    return {
      pk: primaryKey({ columns: [itemPrice.itemId, itemPrice.type] }),
    };
  }
);
