<template>
	<StatusCard
		icon="🔗"
		title="API 連接"
		:status-class="statusClass"
		:status-text="statusText"
		:description="description"
	>
		<template #details>
			<DetailItem label="端點" value="/api/status" />
			<DetailItem label="響應時間" :value="`${responseTime}ms`" />
			<DetailItem label="協議" value="HTTP/1.1" />
			<DetailItem label="CORS" value="已啟用" />
		</template>
	</StatusCard>
</template>

<script setup lang="ts">
import StatusCard from './StatusCard.vue'
import DetailItem from './DetailItem.vue'

interface Props {
	statusClass: 'online' | 'offline' | 'checking'
	statusText: string
	description: string
	responseTime: number
}

defineProps<Props>()
</script> 