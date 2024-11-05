import _ from "lodash-es";

/**
 * Class that encapsulates the reference data for a given property in the inventory data.
 */
export class InventoryReferenceData {
  #referenceMap;

  /**
   * Constructs an InventoryReferenceData instance.
   * Initializes the reference data and maps it by name from the given denormalized inventory data.
   *
   * @param {array} denormalizedInventory - The denormalized inventory data.
   * @param {string} propertyInInventory - The property to extract and map into reference data.
   */
  constructor(denormalizedInventory, propertyInInventory) {
    this.#referenceMap = new Map(
      _.chain(denormalizedInventory)
        .map(propertyInInventory)
        .uniq()
        .map((name, index) => [name, index + 1])
        .value()
    );
  }

  /**
   * Gets all the reference data.
   * @returns {array} - An array of objects with id and name properties.
   */
  getAll() {
    return Array.from(this.#referenceMap.entries(), ([name, id]) => ({
      id,
      name,
    }));
  }

  /**
   * Gets the id of the reference data with the given name.
   * @param {string} name - The name of the reference data.
   * @returns {number|undefined} - The id of the reference data, or undefined if not found.
   */
  getIdByName(name) {
    if (this.#referenceMap.has(name)) {
      return this.#referenceMap.get(name);
    }

    return null;
  }
}
