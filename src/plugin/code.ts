import { plugin } from ".";

figma.showUI(__html__, {
  themeColors: true,
  width: 600,
  height: 400,
});

type message = { type: string; data: Object };

figma.ui.onmessage = async (msg: message) => {
  if (msg.type === "send-data") {
    console.log(msg.data);
    await plugin(msg.data);
  }
  figma.closePlugin();
};
