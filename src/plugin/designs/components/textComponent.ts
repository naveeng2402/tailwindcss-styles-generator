import {
  changeCurrentPage,
  deleteAllChildren,
  getPaintStyle,
  getTextStyle,
  hexToRgb,
} from "../../utils";

export const textComponent = async () => {
  const title: TextNode = figma.createText();
  await figma.loadFontAsync(title.fontName as FontName);
  title.characters = "The quick brown fox jumped over the lazy dog";
  title.name = "text";
  title.fills = [
    {
      type: "SOLID",
      color: hexToRgb("#1F2937"),
    },
  ];

  const specFont: FontName = {
    family: "Poppins",
    style: "Light",
  };
  const spec: TextNode = figma.createText();
  spec.name = "spec";
  spec.fontName = specFont;
  spec.characters = "Font Size: 0.75rem | Line Height: 1rem";
  spec.fontSize = 16;
  spec.lineHeight = {
    value: 24,
    unit: "PIXELS",
  };
  spec.fills = [
    {
      type: "SOLID",
      color: hexToRgb("#9CA3AF"),
    },
  ];

  const comp: ComponentNode = figma.createComponent();
  comp.name = "text";
  comp.layoutMode = "VERTICAL";
  comp.primaryAxisSizingMode = comp.counterAxisSizingMode = "AUTO";
  comp.itemSpacing = 8;
  comp.appendChild(title);
  comp.appendChild(spec);
  comp.x = globalThis.displayComponent.width + 20;

  globalThis.textComponent = comp;
  figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);
};
