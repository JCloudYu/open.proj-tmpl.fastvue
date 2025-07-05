import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export interface StatusResponse {
	status: string;
	timestamp: string;
	uptime: number;
	environment: string;
}

export interface TimeResponse {
	timestamp: string;
	timezone: string;
	formatted: string;
}

export default async function statusRoutes(fastify: FastifyInstance) {
	// 取得伺服器狀態
	fastify.get('/status', async (request: FastifyRequest, reply: FastifyReply) => {
		const response: StatusResponse = {
			status: 'ok',
			timestamp: new Date().toISOString(),
			uptime: process.uptime(),
			environment: process.env.NODE_ENV || 'development'
		};

		return reply.send(response);
	});

	// 取得當前時間
	fastify.get('/time', async (request: FastifyRequest, reply: FastifyReply) => {
		const now = new Date();
		return reply.send({
			timestamp: now.toISOString(),
			timezone: 'Asia/Taipei',
			formatted: now.toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
		});
	});

	// Server-Sent Events 端點 - 持續推送時間更新
	fastify.get('/time/sse', async (request: FastifyRequest, reply: FastifyReply) => {
		// 設定 SSE 相關 headers
		reply.raw.writeHead(200, {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Cache-Control'
		});

		// 發送初始連接訊息
		reply.raw.write('data: {"type":"connected","message":"SSE 連接已建立"}\n\n');

		// 設定定時器，每秒發送時間更新
		const intervalId = setInterval(() => {
			const now = new Date();
			const timeData: TimeResponse = {
				timestamp: now.toISOString(),
				timezone: 'Asia/Taipei',
				formatted: now.toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
			};

			// 發送時間數據
			reply.raw.write(`data: ${JSON.stringify(timeData)}\n\n`);
		}, 1000);

		// 處理客戶端斷線
		request.raw.on('close', () => {
			clearInterval(intervalId);
			reply.raw.end();
		});

		// 處理錯誤
		request.raw.on('error', (err) => {
			fastify.log.error('SSE 錯誤:', err);
			clearInterval(intervalId);
			reply.raw.end();
		});

		// 防止 Fastify 自動結束回應
		return reply;
	});
} 