import * as fs from "fs";
import path from "path";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const itemImages = fs.readdirSync("images/items");

const uploadItemImages = async (
  s3: any,
  s3BucketName: any,
  s3ContentType: any
): Promise<void> => {
  for (let i = 0; i < itemImages.length; i++) {
    const uploadheroAbilityImageCommand = new PutObjectCommand({
      Bucket: s3BucketName,
      Key: itemImages[i],
      Body: fs.readFileSync(path.join("images/heroes", itemImages[i])),
      ContentType: s3ContentType,
    });

    await s3.send(uploadheroAbilityImageCommand);
  }
};

const getItemImage = async (name: string): Promise<string> => {
  const itemImage = itemImages.filter(
    (item: string) =>
      name.toLowerCase().replaceAll(",", "").replaceAll(" ", "_") ===
      item.replace(".png", "")
  )[0];

  return itemImage;
};

export { uploadItemImages, getItemImage };
