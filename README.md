# LaziBoi

Applies a lazy effect to HTML elements based on the speed of the window scroll event using css transforms.

## Installation

`npm install laziboi`

## Basic Usage

```
import LaziBoi from 'laziboi'

LaziBoi.add(document.querySelector('#element'), { multiplier: 2, min: -100, max: 100 });

```

## More Examples
```
document.querySelector("ul#example-1")
  .querySelectorAll("li")
  .forEach((el, i) => {
    LaziBoi.add(el, { multiplier: i * 3, min: -20, max: 200 });
  });
```
```
document.querySelector("ul#example-2")
  .querySelectorAll("li")
  .forEach((el, i) => {
    LaziBoi.add(el, { multiplier: Math.random() * 6 + i, min: -20, max: 100 });
  });
```

## Options

`multiplier`: The multiplier for the effect. Default is `1`.

`min`: The minimum value for the effect. Default is `-100`.

`max`: The maximum value for the effect. Default is `100`.

`dampening`: Timing for the effect to finish/settle in seconds. Default is `0.25`.

`restrictToViewport`: Restricts effect to only affect elements within the viewport, may help if there are performance issues, set to `false` if it makes the effect awkward for your use case. Default is `true`.

`respectReducedMotion`: Accessibility feature, respects the user's wishes to limit animations on the screen. Default is `true`.

`prefer3dTransforms`: Use 3D CSS transforms. Default is `true`.

## Methods

[//]: # (`disable&#40;&#41;`: Pauses the effect for a single element.)

`add()`: adds a new LazyBoi item.

`disableAll()`: Pauses the effect for all elements.

[//]: # (`enable&#40;&#41;`: Resumes the effect for a single element.)

`enableAll()`: Resumes the effect for all elements.

`getAll()`: Returns all LaziBoi elements.

[//]: # (`remove&#40;&#41;`: Removes a single element from the LaziBoi effect.)

[//]: # "## Examples"
[//]: # "[Click here to view](./index.html)"
