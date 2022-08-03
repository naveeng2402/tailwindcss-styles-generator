import data from "./data/tailwind.json";

import colorSystem from "./color";
import fontSystem from "./fonts";

import { manage_fonts, manage_pages } from "./utils";
import createDisplays from "./designs";

globalThis.isUI = false;

export const plugin = async (data: any) => {
  console.clear();
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
  globalThis.isUI && figma.ui.postMessage("Generating color styles");
  colorSystem();
  globalThis.isUI && figma.ui.postMessage("Processing Fonts");
  await manage_fonts();
  await fontSystem();
  await createDisplays();
  // console.log(globalThis.colorStyles);
  // console.log(globalThis.fontStyles);
};

export const resetFile = () => {
  figma.root.children.forEach((page) => {
    if (page != figma.currentPage) page.remove();
  });

  figma.getLocalPaintStyles().forEach((child) => child.remove());
  figma.getLocalTextStyles().forEach((child) => child.remove());
};

(async () => {
  resetFile();
  await plugin(data);
  figma.closePlugin("Plugin Closed");
})();
