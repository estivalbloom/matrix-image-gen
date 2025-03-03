const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const chars_kv = chars.map((e, i) => [i, e]);
const chars_reverse = chars.map((e, i) => [e, i]);
const map = new Map(chars_kv.concat(chars_reverse));
const char_size = 16;

const fontPromise = new Promise((resolve, reject) => {
	const font = new Image();
	font.onload = () => resolve(font);
	font.onerror = reject;
	font.src = new URL('./matrix-font.png', import.meta.url).href;
})

const font = await fontPromise;

function randChar() {
	return chars[Math.floor(Math.random() * chars.length)];
}

function randStr(len) {
	const output = [];
	for(let i = 0; i < len; i++) {
		output.push(randChar());
	}
	return output.join('');
}

function drawChar(ctx, x, y, char) {
	const idx = map.get(char);
	ctx.drawImage(font, idx * char_size, 0, char_size, char_size, x, y, char_size, char_size);
}

function drawStr(ctx, x, y, str) {
	str.split('').forEach((char, idx) => {
		drawChar(ctx, x, y + idx * char_size, char);
	});
}

function drawStrWithColor(ctx, x, y, str, color) {
	const size = { x: char_size, y: char_size * str.length };
	const temp_canvas = document.createElement('canvas');
	const temp_ctx = temp_canvas.getContext('2d');
	temp_canvas.width = size.x;
	temp_canvas.height = size.y;

	temp_ctx.fillStyle = color;
	drawStr(temp_ctx, 0, 0, str);
	temp_ctx.globalCompositeOperation = 'source-in';
	temp_ctx.fillRect(0, 0, size.x, size.y);

	ctx.drawImage(temp_canvas, x, y);
}

function drawStrWithUnderStroke(ctx, x, y, str, color_main, color_stroke) {
	drawStrWithColor(ctx, x, y + 1, str, color_stroke);
	drawStrWithColor(ctx, x, y, str, color_main);
}

function clearAreaToColor(ctx, x, y, str, color) {
	ctx.save();
	ctx.fillStyle = color;
	ctx.fillRect(x, y, char_size, char_size * str.length);
	ctx.restore();
}

const toString = Object.prototype.toString;
function isString(obj) {
	return toString.call(obj) == '[object String]';
}

/**
 * Holds RGBA color information from 0-255
 * @typedef {Object} RGBAColor
 * @property {number} - R
 * @property {number} - G
 * @property {number} - B
 * @property {number} - A
 */

/**
 * Ensures input is formatted as color components
 * @param {string | RGBAColor} color - css color string or RGBA color values from 0-255
 * @returns {RGBAColor} - the RGBA values
 */
function colorToRGBA(color) {
	if(!isString(color)) {
		return color;
	}

    const ctx = document.createElement("canvas").getContext("2d");

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;

    return { r, g, b, a }
}

/**
 * A function that controls pixel effects between draw passes
 * @callback PixelEffectFn
 * @param {RGBAColor} color - Current color of the target pixel
 * @param {number} x - X position of the target pixel
 * @param {number} y - Y position of the target pixel
 * @param {number} pass - which pass is currently being processed
 * @param {number} idx - index of the pixel in the data
 * @param {Uint8ClampedArray} data - full pixel data of the image thus far
 * @returns {RGBAColor} - The resulting color data for the pixel at (x,y); either as css color or a struct
 */

/**
 * @typedef {Object} DrawOptions
 * @property {number} [x=0] - X position of the drawing in pixels (defaults to 0)
 * @property {number} [y=0] - Y position of the drawing in pixels (defaults to 0)
 * @property {number} w - Width of the drawing in pixels
 * @property {number} h - Height of the drawing in pixels
 * @property {string} [color_main='lime'] - Primary text color; can be any valid css color string (defaults to 'lime')
 * @property {string} [color_secondary='green'] - Text effect color; can be any valid css color string (defaults to 'green')
 * @property {string} [color_bg='black'] - Background color; can be any valid css color string but doesn't properly handle transparency (defaults to 'black')
 * @property {number} n_strs - Number of strings to draw
 * @property {number} str_len - Length of each string
 * @property {number} n_passes - Number of times to draw background effects; offsetting y by 1 each time.
 * @property {PixelEffectFn} [effect_func] - Controls effects applied to pixels between draw passes. Defaults to 50% chance of decay to background color except on last pass.
 */

/**
 * Draws characters onto the canvas in a style inspired by The Matrix
 * @param {CanvasRenderingContext2D} ctx - The target canvas context
 * @param {DrawOptions} opts - Options
 * @returns {void}
 */
function draw(ctx, opts) {
	const x = opts.x || 0;
	const y = opts.y || 0;
	const w = opts.w;
	const h = opts.h;
	const color_main = opts.color_main || 'lime';
	const color_secondary = opts.color_secondary || 'green';
	const color_bg = opts.color_bg || 'black';
	const n_strs = opts.n_strs;
	const str_len = opts.str_len;
	const n_passes = opts.n_passes;
	const bg_as_rgb = colorToRGBA(color_bg);
	const pixelEffectFn = opts.effect_func || ((color, _x, _y, pass) => {
		if( pass == n_passes - 1 ) {
			return color;
		}
		const rand = Math.random() > 0.5;
		return rand ? color : bg_as_rgb;
	});

	console.log({
		x, y, w, h, color_main, color_secondary, color_bg, n_strs, str_len, n_passes, pixelEffectFn
	});

	const c_width = Math.floor(w / char_size);
	const c_height = Math.floor(h / char_size);

	const temp_canvas = document.createElement('canvas');
	const temp_ctx = temp_canvas.getContext('2d');
	temp_canvas.width = w;
	temp_canvas.height = h;

	temp_ctx.fillStyle = color_bg;
	temp_ctx.fillRect(0, 0, w, h);

	const strings = [];
	for(let i = 0; i < n_strs; i++) {
		strings.push({
			x : Math.floor(Math.random() * c_width) * char_size,
			y : Math.floor(Math.random() * c_height) * char_size,
			text: randStr(str_len)
		});
	}

	for(let i = 0; i < n_passes; i++) {
		strings.forEach(str => {
			drawStrWithColor(temp_ctx, str.x, str.y + n_passes - i + 1, str.text, color_secondary);
		});

		const img_data = temp_ctx.getImageData(0, 0, w, h);
		const data_copy = new Uint8ClampedArray(img_data.data);

		for(let idx = 0; idx < w * h; idx++) {
			const color = {
				r: img_data.data[idx * 4 + 0],
				g: img_data.data[idx * 4 + 1],
				b: img_data.data[idx * 4 + 2],
				a: img_data.data[idx * 4 + 3]
			}

			const pixel_x = idx % w;
			const pixel_y = Math.floor(idx / w);
			const color_data = pixelEffectFn(color, pixel_x, pixel_y, i, idx, data_copy);

			img_data.data[idx * 4 + 0] = color_data.r;
			img_data.data[idx * 4 + 1] = color_data.g;
			img_data.data[idx * 4 + 2] = color_data.b;
			img_data.data[idx * 4 + 3] = color_data.a;
		}

		temp_ctx.putImageData(img_data, 0, 0);
	}

	strings.forEach(str => {
		drawStrWithColor(temp_ctx, str.x, str.y, str.text, color_main);
	});

	ctx.drawImage(temp_canvas, x, y);
}

export { char_size, randStr, drawChar, drawStr, drawStrWithColor, drawStrWithUnderStroke, clearAreaToColor, draw }