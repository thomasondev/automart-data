import { readInventory } from "./readInventory.js";
import { OutputDirectory } from "./OutputDirectory.js";
import { LocationReferenceData } from "./LocationReferenceData.js";
import VehicleColorReferenceData from "./VehicleColorReferenceData.js";
import VechicleModelReferenceData from "./VehicleModelReferenceData.js";
import VechicleMakeReferenceData from "./VehicleMakeReferenceData.js";

const denormalizedInventory = readInventory();

const vehicleMakes = new VechicleMakeReferenceData(denormalizedInventory);
const vehicleModels = new VechicleModelReferenceData(
  denormalizedInventory,
  vehicleMakes
);
const vehicleColor = new VehicleColorReferenceData(denormalizedInventory);
const locations = new LocationReferenceData(denormalizedInventory);

const normalizedInventory = denormalizedInventory.map((item, index) => ({
  id: index + 1,
  vehicle_year: item.vehicle_year,
  vehicle_color_id: vehicleColor.getIdByName(item.vehicle_color),
  vehicle_vin: item.vehicle_vin,
  sale_price_cents: item.sale_price_cents,
  sale_date: item.sale_date,
  purchase_price_cents: item.purchase_price_cents,
  purchase_date: item.purchase_date,
  location_id: locations.getIdByLocation(item.location),
  vehicle_model_id: vehicleModels.getIdByName(item.vehicle_model),
}));

const outDirectoryRelativePath = process.argv[2];
const outDirectory = new OutputDirectory(outDirectoryRelativePath);
outDirectory.removeAndCreate();
outDirectory.writeInventoryReferenceDataToJSON(
  vehicleMakes,
  appendAutomartPrefixToFileName("vehicle_make")
);
outDirectory.writeInventoryReferenceDataToJSON(
  vehicleModels,
  appendAutomartPrefixToFileName("vehicle_model")
);
outDirectory.writeInventoryReferenceDataToJSON(
  vehicleColor,
  appendAutomartPrefixToFileName("vehicle_color")
);
outDirectory.writeNormalizedInventoryToJSON(
  normalizedInventory,
  appendAutomartPrefixToFileName("inventory")
);
outDirectory.writeInventoryReferenceDataToJSON(
  locations,
  appendAutomartPrefixToFileName("locations")
);

function appendAutomartPrefixToFileName(fileName) {
  return `automart_${fileName}`;
}
