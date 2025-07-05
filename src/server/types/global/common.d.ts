import type os from "node:os";


declare global {
	interface SStorageExt {
		(scope:'runtime.server'): {
			env: 'development' | 'production';
			isProduction:boolean;
			
			serve: {
				host: string;
				port: number;
			};
		}
	}
}