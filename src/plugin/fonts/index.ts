import createFontStyle from "./createStyle";
import { Font_, TextStyle_ } from "../types/fonts";

const fontSystem = async () => {
  const tailwindFonts: Record<string, Font_[]> = globalThis.tailwindFonts;
  let fontStyles: Record<string, TextStyle_> = {};

  for (const [type, fonts] of Object.entries(tailwindFonts)) {
    globalThis.isUI && figma.ui.postMessage(`Generating font styles (${type})`);
    fontStyles[type] = await createFontStyle(type, fonts);
    console.log(`Generated ${type}.`);
  }

  globalThis.fontStyles = fontStyles;
};

export default fontSystem;
