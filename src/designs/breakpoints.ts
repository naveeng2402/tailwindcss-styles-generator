export const create_breakpoints = () => {
  figma.currentPage = figma.root.findOne(
    (node) => node.name === "Breakpoints✌️"
  ) as PageNode;

  figma.currentPage.children.forEach((child) => child.remove());

  const space = 20;
  let x_axis = 0;
  for (const [name, size] of Object.entries(global.breakPoints)) {
    const node = figma.createFrame();
    node.name = name;
    node.resize(parseInt(size), 768);
    node.x = x_axis;
    x_axis += node.width + space;
    figma.currentPage.appendChild(node);
  }
};
