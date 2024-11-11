export default class VehicleReferenceData {
  #referenceMap;

  constructor(iterable) {
    this.#referenceMap = new Map(iterable);
  }

  getAll() {
    return Array.from(this.#referenceMap.values());
  }

  getIdByName(name) {
    if (this.#referenceMap.has(name)) {
      return this.#referenceMap.get(name).id;
    }

    return null;
  }
}
