import data from "./data/tailwind.json";

import { Colors } from "./color/interfaces";
import colorSystem from "./color";

import { delete_styles } from "./dev_scripts";
import { manage_pages } from "./utils";

export const plugin = () => {
  console.clear();

  // Initialize Variables
  const colors: Colors = data.theme.colors;

  // manage_pages();
  colorSystem(colors);
};

export const clear = () => {
  delete_styles();

  figma.notify("Cleared The File");
};

(() => {
  clear();
  // plugin();
  figma.closePlugin();
})();
