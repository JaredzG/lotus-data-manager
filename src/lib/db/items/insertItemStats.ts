import {
  itemStat,
  insertItemStatSchema,
  type ItemStat,
} from "../../../db/schemas/items/itemStat";
import { type DB } from "../../../db/db";

const insertItemStats = async (
  db: DB,
  itemId: number,
  stats: any
): Promise<void> => {
  if (stats !== null) {
    for (const stat of stats) {
      const { property, effect, value, variant } = stat;

      const itemStatEntry = {
        itemId,
        property,
        effect,
        value,
        variant,
      };

      if (insertItemStatSchema.safeParse(itemStatEntry).success) {
        const insertedItemStat: ItemStat[] = await db
          .insert(itemStat)
          .values(itemStatEntry)
          .onConflictDoUpdate({
            target: [itemStat.itemId, itemStat.property],
            set: itemStatEntry,
          })
          .returning();

        console.log(insertedItemStat[0]);
      }
    }
  }
};

export default insertItemStats;
