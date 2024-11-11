import { existsSync, rmSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { join } from "path/posix";
import { cwd } from "process";

export class OutputDirectory {
  #path;

  constructor() {
    this.#path = join(cwd(), "dist");
  }

  removeAndCreate() {
    if (existsSync(this.#path)) {
      rmSync(this.#path, { recursive: true });
    }

    mkdirSync(this.#path, { recursive: true });
  }

  writeInventoryReferenceDataToJSON(
    inventoryReferenceData,
    filenameWithoutExtension
  ) {
    const path = join(this.#path, `${filenameWithoutExtension}.json`);
    writeFileSync(
      path,
      JSON.stringify(inventoryReferenceData.getAll(), null, 2)
    );
  }

  writeNormalizedInventoryToJSON(
    normalizedInventory,
    filenameWithoutExtension
  ) {
    const path = join(this.#path, filenameWithoutExtension + ".json");
    writeFileSync(path, JSON.stringify(normalizedInventory, null, 2));
  }
}
