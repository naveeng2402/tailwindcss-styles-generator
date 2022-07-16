import data from "./data/tailwind.json";

import colorSystem from "./color";
import fontSystem from "./fonts";

import { manage_fonts, manage_pages } from "./utils";
import createDisplays from "./designs";

export const plugin = async () => {
  console.clear();

  // Initialize Variables
  global.color = data.theme.colors;
  global.fontFamily = data.theme.fontFamily;
  global.fontSize = data.theme.fontSize;
  global.fontWeight = data.theme.fontWeight;
  global.breakPoints = data.theme.screens;

  await manage_pages();
  colorSystem();
  await manage_fonts();
  await fontSystem();
  await createDisplays();
  // console.log(global.colorStyles);
  // console.log(global.fontStyles);
};

export const deleteStyles = () => {
  figma.getLocalPaintStyles().forEach((child) => child.remove());
  figma.getLocalTextStyles().forEach((child) => child.remove());
};

(async () => {
  deleteStyles();
  await plugin();
  figma.closePlugin("Plugin Closed");
})();
