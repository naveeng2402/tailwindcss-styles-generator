import { create_breakpoints } from "./breakpoints";
import { createColor } from "./color";
import { displayComponent } from "./components";

const createDisplays = async () => {
  // create_breakpoints();
  await displayComponent();
  await createColor();
};

export default createDisplays;
