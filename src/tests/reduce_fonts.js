console.clear();
const data = [
  {
    family: "Cambria",
    style: "Bold",
  },
  {
    family: "Cambria",
    style: "Regular",
  },
  {
    family: "Georgia",
    style: "Bold",
  },
  {
    family: "Georgia",
    style: "Regular",
  },
  {
    family: "Times New Roman",
    style: "Bold",
  },
  {
    family: "Times New Roman",
    style: "Regular",
  },
];

const res = Object.values(
  data.reduce((sortedData, { family, style }) => {
    console.log(family, style);
    sortedData[family] = sortedData[family] || { family: family, style: [] };
    sortedData[family].style.push(style);
    return sortedData;
  }, {})
);

console.log("*".repeat(15));

console.log(res);

const fonts = {
  sans: [
    {
      family: "Arial",
      style: ["Black", "Bold", "Regular"],
    },
    {
      family: "Noto Sans",
      style: [
        "Black",
        "Bold",
        "ExtraBold",
        "ExtraLight",
        "Light",
        "Medium",
        "Regular",
        "SemiBold",
        "Thin",
      ],
    },
    {
      family: "Roboto",
      style: [
        "Black",
        "Bold",
        "ExtraBold",
        "ExtraLight",
        "Light",
        "Medium",
        "Regular",
        "SemiBold",
        "Thin",
      ],
    },
    {
      family: "Segoe UI",
      style: ["Black", "Bold", "Light", "Regular"],
    },
    {
      family: "Segoe UI Emoji",
      style: ["Regular"],
    },
    {
      family: "Segoe UI Symbol",
      style: ["Regular"],
    },
  ],
  serif: [
    {
      family: "Cambria",
      style: ["Bold", "Regular"],
    },
    {
      family: "Georgia",
      style: ["Bold", "Regular"],
    },
    {
      family: "Times New Roman",
      style: ["Bold", "Regular"],
    },
  ],
  mono: [
    {
      family: "Consolas",
      style: ["Bold", "Regular"],
    },
    {
      family: "Courier New",
      style: ["Bold", "Regular"],
    },
  ],
  poppins: [
    {
      family: "Poppins",
      style: [
        "Black",
        "Bold",
        "ExtraBold",
        "ExtraLight",
        "Light",
        "Medium",
        "Regular",
        "SemiBold",
        "Thin",
      ],
    },
  ],
};
