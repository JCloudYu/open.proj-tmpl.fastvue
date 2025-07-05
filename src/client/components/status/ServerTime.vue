<template>
	<StatusCard
		icon="🕐"
		title="伺服器時間"
		:status-class="statusClass"
		:status-text="statusText"
		:description="description"
	>
		<template #details>
			<DetailItem label="當前時間" :value="currentTime" />
			<DetailItem label="時區" value="Asia/Taipei" />
			<DetailItem label="連接狀態" :value="connectionStatus" />
			<DetailItem label="更新頻率" value="1秒" />
		</template>
	</StatusCard>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import StatusCard from './StatusCard.vue'
import DetailItem from './DetailItem.vue'

const currentTime = ref('載入中...')
const statusClass = ref<'online' | 'offline' | 'checking'>('checking')
const statusText = ref('連接中...')
const description = ref('正在建立 SSE 連接...')
const connectionStatus = ref('連接中...')

let eventSource: EventSource | null = null

const connectSSE = () => {
	try {
		statusClass.value = 'checking'
		statusText.value = '連接中...'
		description.value = '正在建立 SSE 連接...'
		connectionStatus.value = '連接中...'
		
		eventSource = new EventSource('/api/time/sse')
		
		eventSource.onopen = () => {
			statusClass.value = 'online'
			statusText.value = '即時更新'
			description.value = 'SSE 連接已建立，時間即時更新中'
			connectionStatus.value = '已連接'
		}
		
		eventSource.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data)
				
				if (data.type === 'connected') {
					console.log('SSE 連接已建立:', data.message)
					return
				}
				
				// 更新時間顯示
				if (data.formatted) {
					currentTime.value = data.formatted
				}
			} catch (error) {
				console.error('解析 SSE 數據失敗:', error)
			}
		}
		
		eventSource.onerror = (error) => {
			console.error('SSE 連接錯誤:', error)
			statusClass.value = 'offline'
			statusText.value = '連接失敗'
			description.value = '無法連接到伺服器時間服務'
			connectionStatus.value = '連接失敗'
			currentTime.value = '無法獲取'
		}
		
	} catch (error) {
		console.error('建立 SSE 連接失敗:', error)
		statusClass.value = 'offline'
		statusText.value = '連接失敗'
		description.value = '無法建立 SSE 連接'
		connectionStatus.value = '連接失敗'
		currentTime.value = '無法獲取'
	}
}

const disconnectSSE = () => {
	if (eventSource) {
		eventSource.close()
		eventSource = null
	}
}

onMounted(() => {
	connectSSE()
})

onUnmounted(() => {
	disconnectSSE()
})
</script> 