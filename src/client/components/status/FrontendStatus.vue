<template>
	<StatusCard
		icon="🎨"
		title="前端狀態"
		status-class="online"
		status-text="運行中"
		description="Vue 3 應用程式正常運行"
	>
		<template #details>
			<DetailItem label="版本" value="Vue 3.3.8" />
			<DetailItem label="模式" value="開發模式" />
			<DetailItem label="路由" value="Vue Router 4" />
			<DetailItem label="建置工具" value="Vite 4.5" />
		</template>
	</StatusCard>
</template>

<script setup lang="ts">
import StatusCard from './StatusCard.vue'
import DetailItem from './DetailItem.vue'
</script> 