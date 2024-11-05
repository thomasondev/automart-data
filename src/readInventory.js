import { readFileSync } from "fs";
import { join } from "path/posix";
import { cwd } from "process";

export const readInventory = () => {
  const fileContent = readFileSync(
    join(cwd(), "./data/automart_inventory.json"),
    "utf8"
  );
  return JSON.parse(fileContent);
};
