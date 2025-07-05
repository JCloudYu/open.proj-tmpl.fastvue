<template>
	<div class="detail-item">
		<span class="detail-label">{{ label }}</span>
		<span class="detail-value">{{ value }}</span>
	</div>
</template>

<script setup lang="ts">
interface Props {
	label: string
	value: string | number
}

defineProps<Props>()
</script>

<style scoped>
.detail-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.75rem 0;
	border-bottom: 1px solid var(--border-color);
	transition: all 0.2s ease;
}

.detail-item:hover {
	background: rgba(0, 212, 255, 0.05);
	margin: 0 -0.5rem;
	padding-left: 0.5rem;
	padding-right: 0.5rem;
	border-radius: 0.25rem;
}

.detail-item:last-child {
	border-bottom: none;
}

.detail-label {
	color: var(--text-secondary);
	font-weight: 500;
}

.detail-value {
	color: var(--primary-color);
	font-weight: 600;
	text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
}
</style> 