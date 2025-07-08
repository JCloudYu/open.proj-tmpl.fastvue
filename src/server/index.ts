import Fastify from 'fastify';
import $ from "shstore";

import '#/lib/esext.js';
import { RunCtrl } from '@/runctl.js';
import Env from '@/env.js';



(async()=>{
	"use strict";

	await Env.init();


	const RuntimeConf = $('runtime.server');
	const ServerConf = RuntimeConf.serve;

	const fastify = Fastify({
		logger: {
			level: RuntimeConf.env === 'development' ? 'info' : 'warn'
		}
	});

	// 註冊 CORS
	await fastify.register((await import('@fastify/cors')).default, { origin:true, credentials:true });

	// 註冊 API 路由
	await fastify.register((await import('./routes/status')).default, {prefix:'/api'});

	// 啟動伺服器
	const result = await fastify.listen(ServerConf);
	console.log(`🚀 Server is listening on ${result}...`);

	RunCtrl.final(()=>fastify.close());

	// 處理終止信號
	process.on('SIGINT', ()=>process.emit('terminate'));
	process.on('SIGTERM', ()=>process.emit('terminate'));
})()
.catch(e=>process.emit('terminate', e));