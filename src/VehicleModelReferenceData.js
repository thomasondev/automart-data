import _ from "lodash-es";
import VehicleReferenceData from "./VehicleReferenceData.js";

export default class VechicleModelReferenceData extends VehicleReferenceData {
  #referenceMap;

  constructor(denormalizedInventory, vechicleMakeReferenceData) {
    if (vechicleMakeReferenceData === undefined) {
      throw new Error("vechicleMakeReferenceData is required");
    }

    if (denormalizedInventory === undefined) {
      throw new Error("denormalizedInventory is required");
    }

    super(
      _.chain(denormalizedInventory)
        .map(({ vehicle_make, vehicle_model }, index) => ({
          id: index + 1,
          vehicle_make_id: vechicleMakeReferenceData.getIdByName(vehicle_make),
          name: vehicle_model,
        }))
        .uniq(_.isEqual)
        .map((model) => [model.name, model])
        .value()
    );
  }
}
