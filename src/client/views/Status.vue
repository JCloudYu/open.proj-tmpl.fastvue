<template>
	<div class="status">
		<div class="status-header">
			<h1>系統狀態監控</h1>
			<p class="status-subtitle">即時監控應用程式的運行狀態</p>
		</div>
		
		<div class="status-grid">
			<!-- 前端狀態 -->
			<FrontendStatus />
			
			<!-- 後端狀態 -->
			<BackendStatus
				:status-class="backendStatus"
				:status-text="backendStatusText"
				:description="backendStatusMessage"
				:environment="environment"
				:uptime="uptime"
			/>
			
			<!-- 伺服器時間 (SSE) -->
			<ServerTime />
			
			<!-- API 連接狀態 -->
			<ApiStatus
				:status-class="apiStatus"
				:status-text="apiStatusText"
				:description="apiStatusMessage"
				:response-time="responseTime"
			/>
		</div>
		
		<div class="status-actions">
			<button @click="checkBackendStatus" :disabled="checking" class="refresh-btn">
				<span class="btn-icon">{{ checking ? '⏳' : '🔄' }}</span>
				{{ checking ? '檢查中...' : '重新檢查狀態' }}
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import FrontendStatus from '@/components/status/FrontendStatus.vue'
import BackendStatus from '@/components/status/BackendStatus.vue'
import ServerTime from '@/components/status/ServerTime.vue'
import ApiStatus from '@/components/status/ApiStatus.vue'
import { useBackendStatus } from '@/composables/useBackendStatus'

const {
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
} = useBackendStatus()

onMounted(() => {
	checkBackendStatus()
})
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as gvars;

.status {
	max-width: 1200px;
	margin: 0 auto;
	padding: 2rem;
}

.status-header {
	text-align: center;
	margin-bottom: 3rem;
}

.status-header h1 {
	color: gvars.$text-primary;
	margin-bottom: 0.5rem;
	background: linear-gradient(135deg, gvars.$primary-color, gvars.$accent-color);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
}

.status-subtitle {
	color: gvars.$text-secondary;
	font-size: 1.1rem;
}

.status-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	gap: 2rem;
	margin-bottom: 3rem;
}

.status-card {
	background: linear-gradient(145deg, gvars.$card-background, gvars.$metal-color);
	padding: 2rem;
	border-radius: 1rem;
	box-shadow: gvars.$shadow-lg;
	border: 1px solid gvars.$border-color;
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
		background: linear-gradient(90deg, transparent, gvars.$primary-color, transparent);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	&:hover {
		transform: translateY(-8px);
		box-shadow: gvars.$shadow-hover;
		border-color: rgba(0, 212, 255, 0.3);

		&::before {
			opacity: 1;
		}
	}
}

.status-icon {
	font-size: 3rem;
	margin-bottom: 1rem;
	color: gvars.$primary-color;
	text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
}

.status-card h3 {
	color: gvars.$text-primary;
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
	background-color: gvars.$success-color;
	box-shadow: 0 0 20px rgba(0, 255, 136, 0.6);
	
	&::after {
		content: '';
		position: absolute;
		top: -4px;
		left: -4px;
		right: -4px;
		bottom: -4px;
		border-radius: 50%;
		border: 2px solid gvars.$success-color;
		opacity: 0.3;
		animation: ripple 2s infinite;
	}
}

.offline .dot {
	background-color: gvars.$error-color;
	box-shadow: 0 0 20px rgba(255, 0, 102, 0.6);
}

.checking .dot {
	background-color: gvars.$warning-color;
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
	color: gvars.$text-secondary;
	margin-bottom: 1.5rem;
	font-size: 1rem;
}

.status-details {
	text-align: left;
	background: linear-gradient(145deg, gvars.$secondary-color, gvars.$metal-color);
	padding: 1rem;
	border-radius: 0.5rem;
	margin-top: 1rem;
	border: 1px solid gvars.$border-color;
}

.detail-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.75rem 0;
	border-bottom: 1px solid gvars.$border-color;
	transition: all 0.2s ease;

	&:hover {
		background: rgba(0, 212, 255, 0.05);
		margin: 0 -0.5rem;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		border-radius: 0.25rem;
	}

	&:last-child {
		border-bottom: none;
	}
}

.detail-label {
	color: gvars.$text-secondary;
	font-weight: 500;
}

.detail-value {
	color: gvars.$primary-color;
	font-weight: 600;
	text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
}

.status-actions {
	text-align: center;
}

.refresh-btn {
	background: linear-gradient(135deg, gvars.$primary-color, gvars.$accent-color);
	color: white;
	border: none;
	padding: 1rem 2rem;
	border-radius: 0.5rem;
	font-weight: 600;
	font-size: 1rem;
	cursor: pointer;
	transition: all 0.3s ease;
	box-shadow: gvars.$shadow;
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	position: relative;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: left 0.5s;
	}

	&:hover:not(:disabled) {
		transform: translateY(-3px);
		box-shadow: gvars.$shadow-hover;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);

		&::before {
			left: 100%;
		}
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none;
	}
}

.btn-icon {
	font-size: 1.1rem;
}

@media (max-width: 768px) {
	.status {
		padding: 1rem;
	}
	
	.status-grid {
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}
	
	.status-card {
		padding: 1.5rem;
	}
	
	.status-icon {
		font-size: 2.5rem;
	}
}
</style> 