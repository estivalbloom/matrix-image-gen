import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from "vite"

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
	esbuild: {
		supported: {
			'top-level-await': true
		}
	},
	build: {
		lib: {
			entry: resolve(__dirname, 'src/main.js'),
			name: 'MatrixGen',
			fileName: 'matrix-gen',
			formats: ['es'],
		}
	}
})