import { Font_ } from "./types/fonts";

// ref: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgbs
export const hexToRgb = (hex: string) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : null;
};

export const rgbToHex = (color: RGB): string => {
  const r: number = Math.floor(color.r * 255);
  const g: number = Math.floor(color.g * 255);
  const b: number = Math.floor(color.b * 255);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)}`.toUpperCase();
};

export const remToPx = (rem: string): number => {
  const val: number = parseFloat(rem.slice(0, -3));
  return Math.floor(val * 16);
};

export const manage_pages = async () => {
  const pages = [
    "Breakpoints✌️",
    "Color💥",
    "Type🅰️",
    "Spacing📐",
    "BorderRadius⏺️",
    "Shadow🪄",
    "Components🤖",
    "----------",
  ];

  if (figma.root.children.length > 1) {
    figma.notify(
      "The file has more than one page please delete all the pages.",
      { error: true }
    );
    figma.closePlugin();
  }

  figma.currentPage.children.forEach((child) => child.remove());
  figma.currentPage.name = "Cover🌈";

  pages.forEach((page) => {
    const newPage = figma.createPage();
    newPage.name = page;
  });
};

export const fontWeightNames = {
  Thin: "thin",
  ExtraLight: "extralight",
  Light: "light",
  Regular: "normal",
  Medium: "medium",
  SemiBold: "semibold",
  Bold: "bold",
  ExtraBold: "extrabold",
  Black: "black",
};

export const manage_fonts = async () => {
  const localFonts = await figma.listAvailableFontsAsync();
  const tailwindFonts = {};
  // console.log(localFonts);

  for (let [family, fonts] of Object.entries(globalThis.fontFamily)) {
    // if (family != "serif") {
    //   continue;
    // }
    fonts = fonts.map((font) => font.replaceAll('"', ""));

    // console.log(family, fonts);

    const x = localFonts
      .filter(
        (el) =>
          fonts.includes(el.fontName.family) &&
          Object.keys(fontWeightNames).includes(el.fontName.style)
      )
      .map((el) => el.fontName);

    if (x.length) {
      tailwindFonts[family] = Object.values(
        x.reduce(
          (sortedData, { family, style }) => {
            // console.log(family, style);
            sortedData[family] = sortedData[family] || {
              family: family,
              style: [],
            };
            sortedData[family].style.push(style);
            return sortedData;
          },

          {}
        )
      );
    }

    // console.log(tailwindFonts);

    globalThis.localFonts = localFonts;
    globalThis.tailwindFonts = tailwindFonts;
  }
};

export const changeCurrentPage = (pageName: string) => {
  figma.currentPage = figma.root.findOne(
    (node) => node.name === pageName
  ) as PageNode;
};

export const deleteAllChildren = (root: FrameNode | PageNode) => {
  root.children.forEach((child) => child.remove());
};

export const getTextStyle = (name: string): TextStyle => {
  return figma.getLocalTextStyles().find((style) => style.name === name);
};

export const getPaintStyle = (name: string): PaintStyle => {
  return figma.getLocalPaintStyles().find((style) => style.name === name);
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
