import _ from "lodash-es";
import VehicleReferenceData from "./VehicleReferenceData.js";

export default class VehicleColorReferenceData extends VehicleReferenceData {
  constructor(denormalizedInventory) {
    super(
      _.chain(denormalizedInventory)
        .map("vehicle_color")
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
