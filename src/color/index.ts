import createColorStyle from "./createStyle";
import { Colors } from "../types/colors";

const colorSystem = (): Record<
  string,
  PaintStyle | Record<string, PaintStyle>
> => {
  const colors: Colors = global.color;
  const colorStyles: Record<string, PaintStyle | Record<string, PaintStyle>> =
    {};

  for (const [color, value] of Object.entries(colors)) {
    if (typeof value === "string" && !value.startsWith("#")) {
      console.log(`skipping ${color}`);
      continue;
    }

    colorStyles[color] = createColorStyle(color, value);
  }

  return colorStyles;
};

export default colorSystem;
