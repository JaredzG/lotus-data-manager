import { serial, text, pgEnum, pgTable, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod";

export const itemTypeEnum = pgEnum("item_type", [
  "Basic",
  "Upgrade",
  "Neutral",
]);

export const itemClassificationEnum = pgEnum("item_classification", [
  "Consumables",
  "Attributes",
  "Equipment",
  "Miscellaneous",
  "Secret",
  "Accessories",
  "Support",
  "Magical",
  "Armor",
  "Weapons",
  "Artifacts",
  "Tier 1",
  "Tier 2",
  "Tier 3",
  "Tier 4",
  "Tier 5",
]);

export const item = pgTable("item", {
  id: serial("id").unique(),
  name: text("name").primaryKey(),
  lore: text("lore"),
  type: itemTypeEnum("type").notNull(),
  classification: itemClassificationEnum("classification").notNull(),
  hasStats: boolean("has_stats").notNull(),
  hasAbilities: boolean("has_abilities").notNull(),
  hasPrices: boolean("has_prices").notNull(),
  isComponent: boolean("is_component").notNull(),
  hasComponents: boolean("has_components").notNull(),
  hasRecipe: boolean("has_recipe").notNull(),
  imageKey: text("image_key").unique(),
});

export const insertItemSchema = createInsertSchema(item);

export type Item = z.infer<typeof insertItemSchema>;
