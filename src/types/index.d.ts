import { Colors } from "./colors";
import { FontFamily, FontSize, FontWeight, Font_ } from "./fonts";

declare global {
  var color: Colors;
  var localFonts: Font[];
  var tailwindFonts: { [key: string]: Font_[] };
  var fontSize: FontSize;
  var fontFamily: FontFamily;
  var fontWeight: FontWeight;
  var fontFamilyNames: string[];

  var missingFonts: string[];
}

export {};
