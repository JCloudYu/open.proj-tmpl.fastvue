import { ref } from 'vue'

interface StatusResponse {
	status: string
	timestamp: string
	uptime: number
	environment: string
}

export function useBackendStatus() {
	const backendStatus = ref<'online' | 'offline' | 'checking'>('checking')
	const backendStatusText = ref('檢查中...')
	const backendStatusMessage = ref('正在檢查後端服務狀態')
	const apiStatus = ref<'online' | 'offline' | 'checking'>('checking')
	const apiStatusText = ref('檢查中...')
	const apiStatusMessage = ref('正在檢查 API 連接狀態')
	const responseTime = ref(0)
	const environment = ref('development')
	const uptime = ref(0)
	const checking = ref(false)

	const checkBackendStatus = async () => {
		checking.value = true
		const startTime = Date.now()
		
		try {
			const response = await fetch('/api/status')
			const endTime = Date.now()
			responseTime.value = endTime - startTime
			
			if (response.ok) {
				const data: StatusResponse = await response.json()
				
				backendStatus.value = 'online'
				backendStatusText.value = '運行中'
				backendStatusMessage.value = 'Fastify 後端服務正常運行'
				environment.value = data.environment
				uptime.value = data.uptime
				
				// 檢查 API 連接
				apiStatus.value = 'online'
				apiStatusText.value = '連接正常'
				apiStatusMessage.value = 'API 端點可正常訪問'
			} else {
				throw new Error('後端回應錯誤')
			}
		} catch (error) {
			console.error('檢查後端狀態失敗:', error)
			backendStatus.value = 'offline'
			backendStatusText.value = '離線'
			backendStatusMessage.value = '無法連接到後端服務'
			
			apiStatus.value = 'offline'
			apiStatusText.value = '連接失敗'
			apiStatusMessage.value = '無法連接到 API 端點'
		} finally {
			checking.value = false
		}
	}

	return {
		backendStatus,
		backendStatusText,
		backendStatusMessage,
		apiStatus,
		apiStatusText,
		apiStatusMessage,
		responseTime,
		environment,
		uptime,
		checking,
		checkBackendStatus
	}
} 