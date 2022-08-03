import { changeCurrentPage } from "../utils";

export const create_breakpoints = () => {
  changeCurrentPage("Breakpoints✌️");

  figma.currentPage.children.forEach((child) => child.remove());

  const space = 20;
  let x_axis = 0;
  for (const [name, size] of Object.entries(globalThis.breakPoints)) {
    const node = figma.createComponent();
    node.name = name;
    node.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    node.resize(parseInt(size), 768);
    node.x = x_axis;
    x_axis += node.width + space;
    figma.currentPage.appendChild(node);
  }
};
