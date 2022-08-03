import { Colors } from "./colors";
import { FontFamily, FontSize, FontWeight, Font_, TextStyle_ } from "./fonts";

declare global {
  var color: Colors;
  var localFonts: Font[];
  var tailwindFonts: Record<string, Font_[]>;
  var fontSize: FontSize;
  var fontFamily: FontFamily;
  var fontWeight: FontWeight;
  var fontFamilyNames: string[];
  var breakPoints: Record<string, string>;

  var missingFonts: string[];
}

declare global {
  var colorStyles: Record<string, PaintStyle | Record<string, PaintStyle>>;
  var fontStyles: Record<string, TextStyle_>;
}

declare global {
  var displayComponent: ComponentNode;
  var textComponent: ComponentNode;
}

export {};
