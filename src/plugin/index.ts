// import data from "./data/tailwind.json";

import colorSystem from "./color";
import fontSystem from "./fonts";

import { manage_fonts, manage_pages } from "./utils";
import createDisplays from "./designs";

export const plugin = async (data: any) => {
  // console.clear();
  console.warn("inside plugin()");

  // Initialize Variables
  globalThis.color = data.theme.colors;
  globalThis.fontFamily = data.theme.fontFamily;
  globalThis.fontSize = data.theme.fontSize;
  globalThis.fontWeight = data.theme.fontWeight;
  globalThis.breakPoints = data.theme.screens;
  console.log(data);
  console.log(globalThis.color);

  await manage_pages();
  figma.ui.postMessage("Generating color styles");
  colorSystem();
  figma.ui.postMessage("Processing Fonts");
  await manage_fonts();
  await fontSystem();
  await createDisplays();
  // console.log(globalThis.colorStyles);
  // console.log(globalThis.fontStyles);
};

export const deleteStyles = () => {
  figma.getLocalPaintStyles().forEach((child) => child.remove());
  figma.getLocalTextStyles().forEach((child) => child.remove());
};

// (async () => {
// deleteStyles();
// await plugin();
//   figma.closePlugin("Plugin Closed");
// })();
