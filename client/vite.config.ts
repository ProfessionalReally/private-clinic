import react from '@vitejs/plugin-react-swc';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@app': resolve(__dirname, './src/app'),
			'@entities': resolve(__dirname, './src/entities'),
			'@features': resolve(__dirname, './src/features'),
			'@pages': resolve(__dirname, './src/pages'),
			'@shared': resolve(__dirname, './src/shared'),
			'@widgets': resolve(__dirname, './src/widgets'),
		},
	},
});
