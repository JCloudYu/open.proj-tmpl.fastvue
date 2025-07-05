import $ from "shstore";
import dotenv from "dotenv";



const envFiles = ['.env'];
if ( process.env['NODE_ENV'] === 'production' ) {
	envFiles.push('.env.prod');
}
if ( process.env['NODE_ENV'] === 'development' ) {
	envFiles.push('.env.dev');
}
dotenv.config({path:envFiles, override:true});



export default class {
	static async init() {
		const MetaRuntime = $('_meta');
		if ( MetaRuntime.isInitialized ) return;
		

		
		Object.defineProperty(MetaRuntime, 'isInitialized', {
			value: true, 
			writable: false, enumerable: true, configurable: false
		});

		
		// Prepare runtime configuration from .env
		{
			const RuntimeConf = $('runtime.server');
			
			RuntimeConf.env = process.env['NODE_ENV'] === 'production' ? 'production' : 'development';
			RuntimeConf.isProduction = RuntimeConf.env === 'production';
			
			RuntimeConf.serve = {
				host: process.env['API_BIND_HOST']||'::1',
				port: parseInt(process.env['API_BIND_PORT']||'3000', 10)
			};
		}
	}
}