import { changeCurrentPage, getPaintStyle, getTextStyle } from "../../utils";

export const displayComponent = async () => {
  changeCurrentPage("Components🤖");

  const preview: RectangleNode = figma.createRectangle();
  preview.name = "preview";
  preview.resize(100, 100);
  preview.cornerRadius = 5;

  let textStyle = getTextStyle("poppins/base/medium");
  await figma.loadFontAsync(textStyle.fontName);
  const title: TextNode = figma.createText();
  title.name = "title";
  title.textStyleId = textStyle.id;
  title.characters = "title";
  title.fillStyleId = getPaintStyle("gray/800").id;

  textStyle = getTextStyle("poppins/sm/light");
  await figma.loadFontAsync(textStyle.fontName);
  const subTitle: TextNode = figma.createText();
  subTitle.name = "SubTitle";
  subTitle.textStyleId = textStyle.id;
  subTitle.characters = "SubTitle";
  subTitle.fillStyleId = getPaintStyle("gray/400").id;

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
};
