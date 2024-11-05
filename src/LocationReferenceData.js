import _ from "lodash-es";
import { createHash } from "crypto";

export class LocationReferenceData {
  #referenceMap;

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Creates a LocationReferenceData instance.
   * Initializes the reference data and maps it by name from the given denormalized inventory data.
   *
   * @param {array} denormalizedInventory - The denormalized inventory data.
   */
  /******  ff2d9a48-0bd4-4b79-8630-10359e5dd2af  *******/
  constructor(denormalizedInventory) {
    this.#referenceMap = new Map(
      _.chain(denormalizedInventory)
        .map("location")
        .uniqWith(_.isEqual)
        .map((location, index) => [
          this.#hashLocation(location),
          {
            id: index + 1,
            ...location,
          },
        ])
        .value()
    );
  }

  getIdByLocation(location) {
    const hash = this.#hashLocation(location);
    if (this.#referenceMap.has(hash)) {
      return this.#referenceMap.get(hash).id;
    }

    throw new Error(
      `Location not found in reference data ${JSON.stringify(location)}`
    );
  }

  getAll() {
    return Array.from(
      this.#referenceMap.entries(),
      ([_, location]) => location
    );
  }

  #hashLocation(location) {
    const str = JSON.stringify(location);
    const hash = createHash("sha256");
    hash.update(str);
    return hash.digest("hex");
  }
}
