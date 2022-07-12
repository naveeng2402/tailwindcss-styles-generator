import data from "./data/tailwind.json";

import colorSystem from "./color";
import fontSystem from "./fonts";

import { delete_styles } from "./dev_scripts";
import { manage_fonts, manage_pages } from "./utils";
import { create_breakpoints } from "./designs";
import { displayComponent } from "./designs/components";

export const plugin = async () => {
  console.clear();

  // Initialize Variables
  global.color = data.theme.colors;
  global.fontFamily = data.theme.fontFamily;
  global.fontSize = data.theme.fontSize;
  global.fontWeight = data.theme.fontWeight;
  global.breakPoints = data.theme.screens;

  // manage_pages();
  // colorSystem();
  // await manage_fonts();
  // await fontSystem();
  // create_breakpoints();
  await displayComponent();
  // console.log(global.colorStyles);
  // console.log(global.fontStyles);
};

export const clear = () => {
  delete_styles();
};

(async () => {
  // clear();
  await plugin();
  figma.closePlugin("Plugin Closed");
})();
