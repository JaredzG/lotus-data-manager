import {
  serial,
  text,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
} from "drizzle-orm/pg-core";
import { hero } from "./hero";

export const heroTalentLevelEnum = pgEnum("hero_talent_level", [
  "Novice",
  "Intermediate",
  "Advanced",
  "Expert",
]);

export const heroTalent = pgTable(
  "hero_talent",
  {
    id: serial("id").unique(),
    heroId: integer("hero_id")
      .references(() => hero.id)
      .notNull(),
    level: heroTalentLevelEnum("level").notNull(),
    type: text("type").notNull(),
    effect: text("effect").notNull(),
  },
  (heroTalent) => {
    return {
      pk: primaryKey({
        columns: [heroTalent.heroId, heroTalent.level, heroTalent.type],
      }),
    };
  }
);
