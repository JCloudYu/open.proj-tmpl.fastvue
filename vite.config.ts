import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dotenv from 'dotenv';

export default defineConfig(({ mode }) => {
	// 先使用 dotenv 讀取環境變數
	const envFiles = ['.env'];
	if (mode === 'production') {
		envFiles.push('.env.prod');
	}
	if (mode === 'development') {
		envFiles.push('.env.dev');
	}
	
	// 載入 dotenv 配置
	dotenv.config({ path: envFiles, override: true });
	
	// 直接使用 process.env，因為 dotenv 已經將環境變數載入
	const env = process.env;

	
	
	// 從環境變數讀取配置，提供預設值
	const vueBindHost = env.VUE_BIND_HOST || '::1';
	const vueBindPort = parseInt(env.VUE_BIND_PORT || '5173', 10);
	const apiBindHost = env.API_BIND_HOST || '::1';
	const apiBindPort = parseInt(env.API_BIND_PORT || '3000', 10);

	return {
		plugins: [
			vue()
		],
		root: 'src/client',
		build: {
			outDir: resolve(__dirname, 'dist/client'),
			emptyOutDir: true
		},

		server: {
			host: vueBindHost,
			port: vueBindPort,
			// 啟用 IPv6 支援
			strictPort: false,
			proxy: {
				'/api': {
					target: `http://${apiBindHost === '::1' ? '127.0.0.1' : apiBindHost}:${apiBindPort}`,
					changeOrigin: true
				}
			}
		},
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src/client'),
				'#': resolve(__dirname, 'src/shared')
			}
		},
		define: {
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: false
		},
		// 添加 Sass 配置以確保使用現代 API
		css: {
			preprocessorOptions: {
				scss: {
					// 確保使用現代 Sass API
					api: 'modern-compiler'
				}
			}
		}
	};
}); 