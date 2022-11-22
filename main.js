import LaziBoi from "./lib/LaziBoi.js";

export { LaziBoi };

document.querySelector("ul#example-1")
  .querySelectorAll("li")
  .forEach((el, i) => {
    LaziBoi.add(el, { multiplier: i * 3, min: -20, max: 200 });
  });

document.querySelector("ul#example-2")
  .querySelectorAll("li")
  .forEach((el, i) => {
    LaziBoi.add(el, { multiplier: Math.random() * 6 + i, min: -20, max: 100 });
  });
