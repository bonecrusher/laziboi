# LaziBoi
Applies a lazy effect to HTML elements based on the speed of the scroll event using css transforms.

## Installation
```npm install laziboi```

## Basic Usage
```
import LazyBoi from 'laziboi'

new LaziBoi(document.querySelector('#element'), { multiplier: 2, min: -100, max: 100 });

```

## Options
```multiplier```: The multiplier for the effect. Default is ```1```.

```min```: The minimum value for the effect. Default is ```-100```.

```max```: The maximum value for the effect. Default is ```100```.

```dampening```: Timing for the effect to finish/settle in seconds. Default is ```0.25```.

```restrictToViewport```: Restricts effect to only affect elements within the viewport, may help if there are performance issues, set to ```false``` if it makes the effect awkward for your use case. Default is ```true```.

```respectReducedMotion```: Accessibility feature, respects the user's wishes to limit animations on the screen. Default is ```true```.

```prefer3dTransforms```: Use 3D CSS transforms. Default is ```true```.

## Methods
```disable()```: Pauses the effect for a single element.

```enable()```: Resumes the effect for a single element.

[//]: # (## Examples)

[//]: # ([Click here to view]&#40;./index.html&#41;)