import {
  capitalize,
  changeCurrentPage,
  deleteAllChildren,
  hexToRgb,
  remToPx,
} from "../utils";

const createInstance = async (
  size: string,
  fontSize: number,
  lineHeight: number
): Promise<InstanceNode> => {
  const instance: InstanceNode = globalThis.textComponent.createInstance();
  instance.name = size;
  const text: TextNode = instance.findChild(
    (child) => child.name === "text"
  ) as TextNode;
  text.characters = `text-${size}`;
  text.fontSize = fontSize;
  text.lineHeight = {
    value: lineHeight === 1 ? 100 : lineHeight,
    unit: lineHeight === 1 ? "PERCENT" : "PIXELS",
  };

  const spec: TextNode = instance.findChild(
    (child) => child.name === "spec"
  ) as TextNode;
  await figma.loadFontAsync(spec.fontName as FontName);
  // dividing by 60 to convert px to rem
  spec.characters = `Font Size: ${fontSize / 16}rem | Line Height: ${
    lineHeight === 1 ? "100%" : `${lineHeight / 16}rem`
  }`;
  return instance;
};

// Create the textNode which indicates the weighted frame
const createWeightText = async (weight: string): Promise<TextNode> => {
  const font: FontName = {
    family: "Poppins",
    style: "Light",
  };
  await figma.loadFontAsync(font);

  const node: TextNode = figma.createText();
  node.name = weight;
  node.fontName = font;
  node.fontSize = 26;
  node.fills = [{ type: "SOLID", color: hexToRgb("#9CA3AF") }];
  node.characters = weight;
  return node;
};

export const createType = async () => {
  changeCurrentPage("Type🅰️");
  deleteAllChildren(figma.currentPage);

  const instances: InstanceNode[] = [];

  // create instances
  for (const [size, _] of Object.entries(globalThis.fontSize)) {
    const fontSize = remToPx(_[0] as string);
    const lineHeight = /^[0-9]*$/.test(_[1]["lineHeight"] as string)
      ? parseFloat(_[1]["lineHeight"])
      : remToPx(_[1]["lineHeight"]);
    const instance: InstanceNode = await createInstance(
      size,
      fontSize,
      lineHeight
    );
    instances.push(instance);
  }

  // creating the frame
  const sizeFrame = figma.createFrame();
  sizeFrame.name = "sizing";
  sizeFrame.layoutMode = "VERTICAL";
  sizeFrame.primaryAxisSizingMode = sizeFrame.counterAxisSizingMode = "AUTO";
  sizeFrame.horizontalPadding = sizeFrame.verticalPadding = 32;
  sizeFrame.itemSpacing = 32;
  for (const instance of instances) {
    sizeFrame.appendChild(instance);
  }

  // Creating a Font List frame
  const typeFrames: FrameNode[] = [];
  for (const [type, value] of Object.entries(globalThis.fontStyles)) {
    const variants = Object.entries(value)[0][1];

    const typeFrame: FrameNode = figma.createFrame();
    typeFrame.name = type;
    typeFrame.layoutMode = "VERTICAL";
    typeFrame.itemSpacing = 12;
    typeFrame.primaryAxisSizingMode = typeFrame.counterAxisSizingMode = "AUTO";

    const titleFont: FontName = {
      family: "Times New Roman",
      style: "Bold",
    };
    await figma.loadFontAsync(titleFont);
    const title: TextNode = figma.createText();
    title.name = "title";
    title.fontName = titleFont;
    title.fontSize = 48;
    title.fills = [{ type: "SOLID", color: hexToRgb("#1F2937") }];
    title.characters = capitalize(type);

    const fontFrame: FrameNode = figma.createFrame();
    fontFrame.name = "fonts";
    fontFrame.layoutMode = "VERTICAL";
    fontFrame.itemSpacing = 8;
    fontFrame.primaryAxisSizingMode = fontFrame.counterAxisSizingMode = "AUTO";
    fontFrame.paddingLeft = 32;

    for (const [family, weights] of Object.entries(variants)) {
      const fontFamilyFrame: FrameNode = figma.createFrame();
      fontFamilyFrame.name = family;
      fontFamilyFrame.layoutMode = "HORIZONTAL";
      fontFamilyFrame.itemSpacing = 24;
      fontFamilyFrame.primaryAxisSizingMode =
        fontFamilyFrame.counterAxisSizingMode = "AUTO";
      fontFamilyFrame.counterAxisAlignItems = "BASELINE";

      const fontNameFont: FontName = {
        family: "Poppins",
        style: "Regular",
      };
      await figma.loadFontAsync(fontNameFont);
      const fontName: TextNode = figma.createText();
      fontName.name = family;
      fontName.fontName = fontNameFont;
      fontName.fontSize = 32;
      fontName.fills = [{ type: "SOLID", color: hexToRgb("#374151") }];
      fontName.characters = family;

      const weightsFrame: FrameNode = figma.createFrame();
      weightsFrame.name = "weights";
      weightsFrame.layoutMode = "HORIZONTAL";
      weightsFrame.itemSpacing = 16;
      weightsFrame.primaryAxisSizingMode = weightsFrame.counterAxisSizingMode =
        "AUTO";

      for (const [weight, _] of Object.entries(weights)) {
        weightsFrame.appendChild(await createWeightText(weight));
      }
      fontFamilyFrame.appendChild(fontName);
      fontFamilyFrame.appendChild(weightsFrame);

      fontFrame.appendChild(fontFamilyFrame);
    }
    typeFrame.appendChild(title);
    typeFrame.appendChild(fontFrame);

    typeFrames.push(typeFrame);
  }

  const fontListFrame: FrameNode = figma.createFrame();
  fontListFrame.name = "fontList";
  fontListFrame.layoutMode = "VERTICAL";
  fontListFrame.primaryAxisSizingMode = fontListFrame.counterAxisSizingMode =
    "AUTO";
  fontListFrame.horizontalPadding = fontListFrame.verticalPadding = 32;
  fontListFrame.itemSpacing = 28;
  for (const typeFrame of typeFrames) fontListFrame.appendChild(typeFrame);

  fontListFrame.x = sizeFrame.width + 40;

  figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);
};
