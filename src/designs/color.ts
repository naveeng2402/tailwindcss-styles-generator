import {
  capitalize,
  changeCurrentPage,
  deleteAllChildren,
  hexToRgb,
  rgbToHex,
} from "../utils";

const createInstance = (
  styleId: string,
  weight: string,
  hexCode: string
): InstanceNode => {
  const colorPreview: InstanceNode = global.displayComponent.createInstance();
  colorPreview.name = weight;

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

  const colorInstances: Record<string, InstanceNode[]> = {
    singleColors: [],
  };
  const colorFrames: FrameNode[] = [];
  const colorSystem: FrameNode[] = [];

  // Creating Instances
  for (const [color, styles] of Object.entries(global.colorStyles)) {
    // generating single style instances
    if (styles.type === "PAINT") {
      const instance = createInstance(
        styles.id as string,
        capitalize(color),
        rgbToHex(styles.paints[0].color)
      );
      colorInstances.singleColors.push(instance);
      continue;
    }

    // generating group style instances
    colorInstances[color] = [];
    for (const [shade, style] of Object.entries(styles)) {
      const instance = createInstance(
        style.id,
        shade,
        rgbToHex(style.paints[0].color)
      );
      colorInstances[color].push(instance);
    }
  }

  let [x_space, y_space] = [24, 8];
  for (const [color, shades] of Object.entries(colorInstances)) {
    // Creating a shades frame
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
    const titleFont: FontName = {
      family: "Times New Roman",
      style: "Regular",
    };
    await figma.loadFontAsync(titleFont);
    const title: TextNode = figma.createText();
    title.fontName = titleFont;
    title.fontSize = 48;
    title.lineHeight = { value: 100, unit: "PERCENT" };
    title.name = "Title";
    title.characters = capitalize(color);
    title.fills = [{ type: "SOLID", color: hexToRgb("#1F2937") }];
    const colorFrame = figma.createFrame();
    colorFrame.name = color;
    colorFrame.appendChild(title);
    colorFrame.appendChild(shadeFrame);
    colorFrame.layoutMode = "VERTICAL";
    colorFrame.primaryAxisSizingMode = "AUTO";
    colorFrame.counterAxisSizingMode = "AUTO";
    colorFrame.itemSpacing = 16;
    colorFrames.push(colorFrame);
    // break;
  }

  for (let i = 0; i < Math.ceil(colorFrames.length / 5); i++) {
    const newFrame = figma.createFrame();
    newFrame.name = "Colors";
    newFrame.verticalPadding = newFrame.horizontalPadding = 32;
    newFrame.layoutMode = "VERTICAL";
    newFrame.primaryAxisSizingMode = "AUTO";
    newFrame.counterAxisSizingMode = "AUTO";
    newFrame.itemSpacing = 28;
    colorSystem.push(newFrame);
  }

  let frameNumber = 0;
  for (const [index, colorFrame] of colorFrames.entries()) {
    if (index != 0 && index % 5 == 0) frameNumber++;
    colorSystem[frameNumber].appendChild(colorFrame);
  }

  let x = 0;
  x_space = 40;
  for (const frame of colorSystem) {
    frame.x = x;
    x += frame.width + x_space;
  }

  figma.viewport.scrollAndZoomIntoView(colorSystem);
};
