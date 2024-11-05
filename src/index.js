import { InventoryReferenceData } from "./InventoryReferenceData.js";
import { readInventory } from "./readInventory.js";
import { OutputDirectory } from "./OutputDirectory.js";
import { LocationReferenceData } from "./LocationReferenceData.js";

const denormalizedInventory = readInventory();

const vehicleMakes = new InventoryReferenceData(
  denormalizedInventory,
  "vehicle_make"
);
const vehicleModels = new InventoryReferenceData(
  denormalizedInventory,
  "vehicle_model"
);
const vehicleColor = new InventoryReferenceData(
  denormalizedInventory,
  "vehicle_color"
);

const locations = new LocationReferenceData(denormalizedInventory);

const normalizedInventory = denormalizedInventory.map((item) => ({
  vehicle_year: item.vehicle_year,
  vehicle_color_id: vehicleColor.getIdByName(item.vehicle_color),
  vehicle_vin: item.vehicle_vin,
  sale_price_cents: item.sale_price_cents,
  sale_date: item.sale_date,
  purchase_price_cents: item.purchase_price_cents,
  purchase_date: item.purchase_date,
  location_id: locations.getIdByLocation(item.location),
  vehicle_make_id: vehicleMakes.getIdByName(item.vehicle_make),
  vehicle_model_id: vehicleModels.getIdByName(item.vehicle_model),
}));

const outDirectory = new OutputDirectory();
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
