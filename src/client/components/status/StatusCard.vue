<template>
	<div class="status-card">
		<div class="status-icon">{{ icon }}</div>
		<h3>{{ title }}</h3>
		<div class="status-indicator" :class="statusClass">
			<span class="dot"></span>
			<span class="status-text">{{ statusText }}</span>
		</div>
		<p class="status-description">{{ description }}</p>
		<div class="status-details">
			<slot name="details"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	icon: string
	title: string
	statusClass: 'online' | 'offline' | 'checking'
	statusText: string
	description: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.status-card {
	background: linear-gradient(145deg, var(--card-background), var(--metal-color));
	padding: 2rem;
	border-radius: 1rem;
	box-shadow: var(--shadow-lg);
	border: 1px solid var(--border-color);
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	text-align: center;
	position: relative;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
		opacity: 0;
		transition: opacity 0.3s ease;
	}
}

.status-card:hover {
	transform: translateY(-8px);
	box-shadow: var(--shadow-hover);
	border-color: rgba(0, 212, 255, 0.3);

	&::before {
		opacity: 1;
	}
}

.status-icon {
	font-size: 3rem;
	margin-bottom: 1rem;
	color: var(--primary-color);
	text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
}

.status-card h3 {
	color: var(--text-primary);
	font-size: 1.5rem;
	margin-bottom: 1.5rem;
	text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
}

.status-indicator {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.75rem;
	margin: 1.5rem 0;
	font-weight: 600;
	font-size: 1.1rem;
}

.dot {
	width: 12px;
	height: 12px;
	border-radius: 50%;
	display: inline-block;
	position: relative;
}

.online .dot {
	background-color: var(--success-color);
	box-shadow: 0 0 20px rgba(0, 255, 136, 0.6);
	
	&::after {
		content: '';
		position: absolute;
		top: -4px;
		left: -4px;
		right: -4px;
		bottom: -4px;
		border-radius: 50%;
		border: 2px solid var(--success-color);
		opacity: 0.3;
		animation: ripple 2s infinite;
	}
}

.offline .dot {
	background-color: var(--error-color);
	box-shadow: 0 0 20px rgba(255, 0, 102, 0.6);
}

.checking .dot {
	background-color: var(--warning-color);
	box-shadow: 0 0 20px rgba(255, 170, 0, 0.6);
	animation: pulse 1.5s infinite;
}

@keyframes pulse {
	0% { opacity: 1; transform: scale(1); }
	50% { opacity: 0.7; transform: scale(1.1); }
	100% { opacity: 1; transform: scale(1); }
}

@keyframes ripple {
	0% { transform: scale(1); opacity: 0.3; }
	100% { transform: scale(2); opacity: 0; }
}

.status-description {
	color: var(--text-secondary);
	margin-bottom: 1.5rem;
	font-size: 1rem;
}

.status-details {
	text-align: left;
	background: linear-gradient(145deg, var(--secondary-color), var(--metal-color));
	padding: 1rem;
	border-radius: 0.5rem;
	margin-top: 1rem;
	border: 1px solid var(--border-color);
}

@media (max-width: 768px) {
	.status-card {
		padding: 1.5rem;
	}
	
	.status-icon {
		font-size: 2.5rem;
	}
}
</style> 