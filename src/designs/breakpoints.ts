import { changeCurrentPage } from "../utils";

export const create_breakpoints = () => {
  changeCurrentPage("Breakpoints✌️");

  figma.currentPage.children.forEach((child) => child.remove());

  const space = 20;
  let x_axis = 0;
  for (const [name, size] of Object.entries(global.breakPoints)) {
    const node = figma.createComponent();
    node.name = name;
    node.resize(parseInt(size), 768);
    node.x = x_axis;
    x_axis += node.width + space;
    figma.currentPage.appendChild(node);
  }
};
