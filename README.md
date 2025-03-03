Proper usage documentation tbd; for now, here's some sample usage:

```js
import { draw as drawMatrix } from '/src/main.js'

const canvas = document.createElement('canvas');
canvas.width = 960;
canvas.height = 720;
const ctx = canvas.getContext('2d');

drawMatrix(ctx, {
	w: canvas.width,
	h: canvas.height,
	n_strs: 128,
	str_len: 8,
	n_passes: 4
})

const dataURL = canvas.toDataURL("image/png");
const img_el = document.querySelector('img');
img_el.src = dataURL;
```

You can directly use a canvas in the document; creating a png was relevant to my use case.
For full documentation on the allowed options, check the jsdoc comment in src/main.js