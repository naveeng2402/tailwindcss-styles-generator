import { changeCurrentPage, deleteAllChildren } from "../utils";
import { create_breakpoints } from "./breakpoints";
import { createColor } from "./color";
import { displayComponent } from "./components";
import { textComponent } from "./components/textComponent";

const createDisplays = async () => {
  changeCurrentPage("Components🤖");
  deleteAllChildren(figma.currentPage);
  await displayComponent();
  await textComponent();

  // create_breakpoints();
  // await createColor();
};

export default createDisplays;
