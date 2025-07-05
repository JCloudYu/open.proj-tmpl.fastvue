<template>
	<StatusCard
		icon="⚙️"
		title="後端狀態"
		:status-class="statusClass"
		:status-text="statusText"
		:description="description"
	>
		<template #details>
			<DetailItem label="框架" value="Fastify" />
			<DetailItem label="端口" value="3000" />
			<DetailItem label="環境" :value="environment" />
			<DetailItem label="運行時間" :value="uptimeText" />
		</template>
	</StatusCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import StatusCard from './StatusCard.vue'
import DetailItem from './DetailItem.vue'

interface Props {
	statusClass: 'online' | 'offline' | 'checking'
	statusText: string
	description: string
	environment?: string
	uptime?: number
}

const props = withDefaults(defineProps<Props>(), {
	environment: 'development',
	uptime: 0
})

const uptimeText = computed(() => {
	if (props.uptime === 0) return '未知'
	
	const hours = Math.floor(props.uptime / 3600)
	const minutes = Math.floor((props.uptime % 3600) / 60)
	const seconds = Math.floor(props.uptime % 60)
	
	if (hours > 0) {
		return `${hours}小時 ${minutes}分鐘`
	} else if (minutes > 0) {
		return `${minutes}分鐘 ${seconds}秒`
	} else {
		return `${seconds}秒`
	}
})
</script> 