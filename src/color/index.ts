import createColorStyle from "./createStyles";
import { Colors } from "./interfaces";

const colorSystem = (
  colors: Colors
): Record<string, PaintStyle | Record<string, PaintStyle>> => {
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
