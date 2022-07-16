import { hexToRgb } from "../../utils";

export const displayComponent = async () => {
  const preview: RectangleNode = figma.createRectangle();
  preview.name = "preview";
  preview.resize(100, 100);
  preview.cornerRadius = 5;
  preview.fills = [
    {
      type: "SOLID",
      color: hexToRgb("#D9D9D9"),
    },
  ];

  const titleFont: FontName = {
    family: "Poppins",
    style: "Medium",
  };
  await figma.loadFontAsync(titleFont);
  const title: TextNode = figma.createText();
  title.fontName = titleFont;
  title.name = "title";
  title.characters = "Title";
  title.fontSize = 16;
  title.lineHeight = {
    value: 24,
    unit: "PIXELS",
  };
  title.fills = [
    {
      type: "SOLID",
      color: hexToRgb("#1F2937"),
    },
  ];

  const subTitleFont: FontName = {
    family: "Poppins",
    style: "Light",
  };
  await figma.loadFontAsync(subTitleFont);
  const subTitle: TextNode = figma.createText();
  subTitle.fontName = subTitleFont;
  subTitle.name = "subTitle";
  subTitle.characters = "SubTitle";
  subTitle.fontSize = 14;
  subTitle.lineHeight = {
    value: 20,
    unit: "PIXELS",
  };
  subTitle.fills = [
    {
      type: "SOLID",
      color: hexToRgb("#9CA3AF"),
    },
  ];

  const contents: FrameNode = figma.createFrame();
  contents.fills = [];
  contents.name = "contents";
  contents.appendChild(title);
  contents.appendChild(subTitle);
  contents.layoutMode = "VERTICAL";
  contents.primaryAxisSizingMode = "AUTO";
  contents.itemSpacing = -5;

  const display: ComponentNode = figma.createComponent();
  display.fills = [];
  display.name = "display";
  display.appendChild(preview);
  display.appendChild(contents);
  display.layoutMode = "VERTICAL";
  display.primaryAxisSizingMode = "AUTO";
  display.itemSpacing = 5;

  figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);
  global.displayComponent = display;
};
