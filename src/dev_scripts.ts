export const delete_styles = () => {
  figma.getLocalPaintStyles().forEach((child) => child.remove());
  console.log("Styles Deleted Successfully");
};
