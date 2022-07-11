import createFontStyle from "./createStyle";
import { Font_, TextStyle_ } from "../types/fonts";

const fontSystem = async () => {
  const tailwindFonts: Record<string, Font_[]> = global.tailwindFonts;
  let fontStyles: Record<string, TextStyle_> = {};

  for (const [type, fonts] of Object.entries(tailwindFonts)) {
    fontStyles[type] = await createFontStyle(type, fonts);
    console.log(`Generated ${type}.`);
  }

  global.fontStyles = fontStyles;
};

export default fontSystem;
