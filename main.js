import LaziBoi from "./lib/LaziBoi.js";

export { LaziBoi };

document.querySelector('ul#example-1')
    .querySelectorAll("li").forEach((el, i) => {
        new LaziBoi(el, { multiplier: i * 3, min: -20, max: 200 });
    });

document.querySelector('ul#example-2')
    .querySelectorAll("li").forEach((el, i) => {
  new LaziBoi(el, { multiplier: (Math.random() * 4) + i, min: 0, max: 100 });
});
