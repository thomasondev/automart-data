import _ from "lodash-es";
import VehicleReferenceData from "./VehicleReferenceData.js";

export default class VechicleMakeReferenceData extends VehicleReferenceData {
  constructor(denormalizedInventory) {
    super(
      _.chain(denormalizedInventory)
        .map("vehicle_make")
        .uniq()
        .map((name, index) => [
          name,
          {
            id: index + 1,
            name,
          },
        ])
        .value()
    );
  }
}
