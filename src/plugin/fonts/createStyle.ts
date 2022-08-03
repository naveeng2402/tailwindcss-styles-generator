import { Font_, TextStyle_ } from "../types/fonts";
import { remToPx, fontWeightNames } from "../utils";

const createFontStyle = async (
  type: string,
  fonts: Font_[]
): Promise<TextStyle_> => {
  let textStyles: TextStyle_ = {};

  for (const [size, _] of Object.entries(globalThis.fontSize)) {
    const fontSize = remToPx(_[0] as string);
    const lineHeight = /^[0-9]*$/.test(_[1]["lineHeight"] as string)
      ? parseFloat(_[1]["lineHeight"])
      : remToPx(_[1]["lineHeight"]);

    let familyMap: Record<string, Record<string, TextStyle>> = {};
    for (const { family, style } of fonts) {
      let weightsMap: Record<string, TextStyle> = {};
      for (const weight of style) {
        const font: FontName = {
          family: family,
          style: weight,
        };

        await figma.loadFontAsync(font);
        const textStyle = figma.createTextStyle();
        textStyle.name =
          fonts.length > 1
            ? `${type}/${size}/${family}/${fontWeightNames[weight]}`
            : `${type}/${size}/${fontWeightNames[weight]}`;
        textStyle.fontName = font;
        textStyle.fontSize = fontSize;
        textStyle.lineHeight = {
          value: lineHeight === 1 ? 100 : lineHeight,
          unit: lineHeight === 1 ? "PERCENT" : "PIXELS",
        };
        weightsMap[weight] = textStyle;
      }
      familyMap[family] = weightsMap;
    }
    textStyles[size] = familyMap;
  }
  return textStyles;
};

export default createFontStyle;
