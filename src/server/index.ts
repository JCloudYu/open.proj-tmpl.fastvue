import Fastify from 'fastify';
import dayjs from 'dayjs';

import '#/lib/esext.js';
import Env from '@/env.js';



(async()=>{
	"use strict";

	const boot_time = Date.now();
	const fastify = Fastify({
		logger: {
			level: process.env.NODE_ENV === 'dev' ? 'info' : 'warn'
		}
	});

	// Set error handler to return unified error response
	fastify.setErrorHandler(async(error, req, res)=>{
		console.error(error);

		const response: APIErrorResponse = {
			code: error.code || 'error#internal-server-error',
			message: error.message || 'Internal server error'
		};

		if ( process.env.NODE_ENV === 'dev' ) {
			response.details = {
				stack: (error.stack||'').split('\n').slice(1).map(p=>p.trim().substring(3))
			};	
		}

		return res.status(500).send(response);
	});

	// 註冊 CORS
	await fastify.register((await import('@fastify/cors')).default, { origin:true, credentials:true });

	await fastify.register(async(fastify)=>{
		fastify.get('/up', (req, res)=>{
			return res.status(200).send({
				boot: dayjs.unix(boot_time/1000).format('YYYY-MM-DDTHH:mm:ssZZ'),
				uptime: Math.floor((Date.now() - boot_time) / 1000)
			});
		});

		await fastify.register((await import('./routes/status')).default, {prefix:Env.getEnv('API_BIND_PREFIX')});
	});

	// 註冊 API 路由

	// 啟動伺服器
	const result = await fastify.listen({
		host: Env.getEnv('API_BIND_HOST'),
		port: Env.getEnv('API_BIND_PORT')
	});
	console.log(`🚀 Server is listening on ${result}...`);

	Env.final(()=>fastify.close());

	// 處理終止信號
	process.on('SIGINT', ()=>process.emit('terminate'));
	process.on('SIGTERM', ()=>process.emit('terminate'));
})()
.catch(e=>process.emit('terminate', e));