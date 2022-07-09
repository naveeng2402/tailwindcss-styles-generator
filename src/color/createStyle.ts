import { hexToRgb } from "../utils";
import { Color } from "./interfaces";

const createColorStyle = (
  color: string,
  value: Color | string
): PaintStyle | Record<string, PaintStyle> => {
  if (typeof value === "string") {
    const paint: Paint = {
      type: "SOLID",
      color: hexToRgb(value),
    };

    const style: PaintStyle = figma.createPaintStyle();
    style.name = `${color}`;
    style.paints = [paint];

    return style;
  }

  const paints: Record<string, PaintStyle> = {};

  for (const [weight, shade] of Object.entries(value)) {
    const paint: Paint = {
      type: "SOLID",
      color: hexToRgb(shade),
    };

    const style: PaintStyle = figma.createPaintStyle();
    style.name = `${color}/${weight}`;
    style.paints = [paint];

    paints[weight] = style;
  }

  return paints;
};

export default createColorStyle;
