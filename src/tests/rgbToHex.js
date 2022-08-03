console.clear();

function rgbToHex(color) {
  r = Math.floor(color.r * 255);
  g = Math.floor(color.g * 255);
  b = Math.floor(color.b * 255);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)}`.toUpperCase();
}

console.log(
  rgbToHex({
    r: 0.8509804010391235,
    g: 0.27450981736183167,
    b: 0.9372549057006836,
  })
);
