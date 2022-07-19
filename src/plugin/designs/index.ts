import { changeCurrentPage, deleteAllChildren } from "../utils";
import { create_breakpoints } from "./breakpoints";
import { createColor } from "./color";
import { displayComponent } from "./components";
import { textComponent } from "./components/textComponent";
import { createType } from "./font";

const createDisplays = async () => {
  changeCurrentPage("Components🤖");
  deleteAllChildren(figma.currentPage);

  figma.ui.postMessage("Generating components");
  await displayComponent();
  await textComponent();

  create_breakpoints();

  figma.ui.postMessage("Generating color system");
  await createColor();
  figma.ui.postMessage("Generating type system");
  await createType();
};

export default createDisplays;
