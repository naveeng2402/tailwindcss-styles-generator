import {
  capitalize,
  changeCurrentPage,
  deleteAllChildren,
  getPaintStyle,
  getTextStyle,
  rgbToHex,
} from "../utils";

const createInstance = (
  styleId: string,
  weight: string,
  hexCode: string
): InstanceNode => {
  const colorPreview: InstanceNode = global.displayComponent.createInstance();

  const preview: RectangleNode = colorPreview.findOne(
    (child) => child.name === "preview"
  ) as RectangleNode;
  const title: TextNode = colorPreview.findOne(
    (child) => child.name === "title"
  ) as TextNode;
  const subtitle: TextNode = colorPreview.findOne(
    (child) => child.name === "subTitle"
  ) as TextNode;

  preview.fillStyleId = styleId;
  title.characters = weight;
  subtitle.characters = hexCode;

  return colorPreview;
};

export const createColor = async () => {
  changeCurrentPage("Color💥");
  deleteAllChildren(figma.currentPage);
  const singleColorsInstances: InstanceNode[] = [];
  const colorNodesInstances: Record<string, InstanceNode[]> = {};

  const colorSets: FrameNode[] = [];

  const colorSetFrame: FrameNode = figma.createFrame();
  colorSetFrame.name = "Colors";
  colorSetFrame.layoutMode = "VERTICAL";
  colorSetFrame.verticalPadding = colorSetFrame.horizontalPadding = 32;
  colorSetFrame.itemSpacing = 28;
  colorSetFrame.counterAxisSizingMode = "AUTO";
  colorSetFrame.primaryAxisSizingMode = "AUTO";

  // Creating the Instances of the displayComponent
  for (const [color, values] of Object.entries(global.colorStyles)) {
    if (values.type === "PAINT") {
      const instance = createInstance(
        values.id as string,
        color,
        rgbToHex(values.paints[0].color)
      );
      singleColorsInstances.push(instance);
      continue;
    }

    colorNodesInstances[color] = [];
    for (const [shade, style] of Object.entries(values)) {
      // console.log(color, shade)
      const instance = createInstance(
        style.id,
        shade,
        rgbToHex(style.paints[0].color)
      );
      colorNodesInstances[color].push(instance);
    }
  }

  // Creating the singleColorFrame
  const shadeFrame: FrameNode = figma.createFrame();
  let [x_space, y_space] = [24, 8];
  let [x, y] = [0, 0];
  for (const [index, shade] of singleColorsInstances.entries()) {
    if (index != 0 && index % 5 === 0) {
      x = 0;
      y += y_space;
    }
    shadeFrame.name = "Single Colors";
    [shade.x, shade.y] = [x, y];
    x += shade.width + x_space;
    shadeFrame.appendChild(shade);
    shadeFrame.resize(x - x_space, y == 0 ? shade.height : y);
  }
  // colorSets.push(shadeFrame);
  colorSetFrame.appendChild(shadeFrame);

  // Creating the colorFrames
  for (const [color, shades] of Object.entries(colorNodesInstances)) {
    // console.log(color, shades);
    const shadeFrame: FrameNode = figma.createFrame();
    let [x, y] = [0, 0];
    for (const [index, shade] of shades.entries()) {
      if (index != 0 && index % 5 === 0) {
        x = 0;
        y += shade.height + y_space;
      }
      shadeFrame.name = "shades";
      [shade.x, shade.y] = [x, y];
      x += shade.width + x_space;
      shadeFrame.appendChild(shade);
      shadeFrame.resize(x - x_space, y == 0 ? shade.height : y + shade.height);
    }

    const textStyle = getTextStyle("serif/8xl/Times New Roman/bold");
    await figma.loadFontAsync(textStyle.fontName);
    const title: TextNode = figma.createText();
    title.name = "Title";
    title.textStyleId = textStyle.id;
    title.characters = capitalize(color);
    title.fillStyleId = getPaintStyle("gray/800").id;

    const colorFrame = figma.createFrame();
    colorFrame.name = color;
    colorFrame.appendChild(title);
    colorFrame.appendChild(shadeFrame);
    colorFrame.resize(shadeFrame.width, 500);
    colorFrame.layoutMode = "VERTICAL";
    colorFrame.itemSpacing = 16;
    // colorSets.push(colorFrame);
    colorSetFrame.appendChild(colorFrame);
    // break;
  }
};
