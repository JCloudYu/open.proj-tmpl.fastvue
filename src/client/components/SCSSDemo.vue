<template>
	<div class="scss-demo">
		<h2>SCSS 在 Vue 中的進階用法示範</h2>
		
		<!-- 變數使用 -->
		<section class="demo-section">
			<h3>1. 變數使用</h3>
			<div class="color-demo">
				<div class="color-box primary">主色</div>
				<div class="color-box secondary">次色</div>
				<div class="color-box success">成功色</div>
				<div class="color-box warning">警告色</div>
				<div class="color-box error">錯誤色</div>
			</div>
		</section>

		<!-- 巢狀結構 -->
		<section class="demo-section">
			<h3>2. 巢狀結構</h3>
			<div class="nested-demo">
				<div class="parent">
					<div class="child">
						<div class="grandchild">巢狀元素</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Mixin 使用 -->
		<section class="demo-section">
			<h3>3. Mixin 使用</h3>
			<div class="mixin-demo">
				<button class="btn-gradient">漸層按鈕</button>
				<button class="btn-outline">外框按鈕</button>
				<button class="btn-3d">3D 按鈕</button>
			</div>
		</section>

		<!-- 函數使用 -->
		<section class="demo-section">
			<h3>4. SCSS 函數</h3>
			<div class="function-demo">
				<div class="function-box light">淺色變體</div>
				<div class="function-box dark">深色變體</div>
				<div class="function-box transparent">透明變體</div>
			</div>
		</section>

		<!-- 條件語句 -->
		<section class="demo-section">
			<h3>5. 條件語句</h3>
			<div class="conditional-demo">
				<div class="conditional-box" :class="{ 'is-active': isActive }">
					{{ isActive ? '啟用狀態' : '停用狀態' }}
				</div>
				<button @click="toggleActive" class="toggle-btn">
					切換狀態
				</button>
			</div>
		</section>

		<!-- 迴圈 -->
		<section class="demo-section">
			<h3>6. 迴圈生成樣式</h3>
			<div class="loop-demo">
				<div class="loop-item" v-for="i in 5" :key="i" :class="`item-${i}`">
					項目 {{ i }}
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isActive = ref(false)

const toggleActive = () => {
	isActive.value = !isActive.value
}
</script>

<style lang="scss" scoped>
@use 'sass:color';
@use '@/styles/variables' as gvars;

// 定義 Mixins
@mixin gradient-button($start-color, $end-color) {
	background: linear-gradient(135deg, $start-color, $end-color);
	color: white;
	border: none;
	padding: gvars.$spacing-md gvars.$spacing-xl;
	border-radius: gvars.$border-radius-md;
	font-weight: 600;
	cursor: pointer;
	transition: all gvars.$transition-normal;
	box-shadow: gvars.$shadow;
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

	&:hover {
		transform: translateY(-3px);
		box-shadow: gvars.$shadow-hover;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);

		&::before {
			left: 100%;
		}
	}
}

@mixin outline-button($color) {
	background: transparent;
	color: $color;
	border: 2px solid $color;
	padding: gvars.$spacing-md gvars.$spacing-xl;
	border-radius: gvars.$border-radius-md;
	font-weight: 600;
	cursor: pointer;
	transition: all gvars.$transition-normal;
	position: relative;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba($color, 0.1), transparent);
		transition: left 0.5s;
	}

	&:hover {
		background: $color;
		color: white;
		transform: translateY(-3px);
		box-shadow: gvars.$shadow-hover;

		&::before {
			left: 100%;
		}
	}
}

@mixin three-d-button($color) {
	background: $color;
	color: white;
	border: none;
	padding: gvars.$spacing-md gvars.$spacing-xl;
	border-radius: gvars.$border-radius-md;
	font-weight: 600;
	cursor: pointer;
	transition: all gvars.$transition-normal;
	box-shadow: 0 4px 0 color.scale($color, $lightness: -20%);
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

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 0 color.scale($color, $lightness: -20%);

		&::before {
			left: 100%;
		}
	}

	&:active {
		transform: translateY(0);
		box-shadow: 0 2px 0 color.scale($color, $lightness: -20%);
	}
}

.scss-demo {
	max-width: gvars.$desktop-breakpoint;
	margin: 0 auto;
	padding: gvars.$spacing-xl;

	h2 {
		text-align: center;
		margin-bottom: gvars.$spacing-2xl;
		color: gvars.$text-primary;
		background: linear-gradient(135deg, gvars.$primary-color, gvars.$accent-color);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
	}
}

.demo-section {
	margin-bottom: gvars.$spacing-2xl;
	padding: gvars.$spacing-xl;
	background: linear-gradient(145deg, gvars.$card-background, gvars.$metal-color);
	border-radius: gvars.$border-radius-lg;
	box-shadow: gvars.$shadow;
	border: 1px solid gvars.$border-color;
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
		transition: opacity gvars.$transition-normal;
	}

	&:hover::before {
		opacity: 1;
	}

	h3 {
		color: gvars.$text-primary;
		margin-bottom: gvars.$spacing-lg;
		border-bottom: 2px solid gvars.$primary-color;
		padding-bottom: gvars.$spacing-sm;
		text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
	}
}

// 1. 變數使用
.color-demo {
	display: flex;
	gap: gvars.$spacing-md;
	flex-wrap: wrap;
	justify-content: center;
}

.color-box {
	padding: gvars.$spacing-lg;
	border-radius: gvars.$border-radius-md;
	color: white;
	font-weight: 600;
	min-width: 100px;
	text-align: center;
	box-shadow: gvars.$shadow;
	transition: all gvars.$transition-normal;

	&:hover {
		transform: translateY(-3px);
		box-shadow: gvars.$shadow-hover;
	}

	&.primary {
		background: gvars.$primary-color;
		box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
	}

	&.secondary {
		background: gvars.$text-secondary;
	}

	&.success {
		background: gvars.$success-color;
		box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
	}

	&.warning {
		background: gvars.$warning-color;
		box-shadow: 0 0 20px rgba(255, 170, 0, 0.3);
	}

	&.error {
		background: gvars.$error-color;
		box-shadow: 0 0 20px rgba(255, 0, 102, 0.3);
	}
}

// 2. 巢狀結構
.nested-demo {
	.parent {
		background: linear-gradient(145deg, color.scale(gvars.$primary-color, $lightness: 30%), color.scale(gvars.$accent-color, $lightness: 30%));
		padding: gvars.$spacing-lg;
		border-radius: gvars.$border-radius-md;
		box-shadow: gvars.$shadow;

		.child {
			background: linear-gradient(145deg, color.scale(gvars.$primary-color, $lightness: 20%), color.scale(gvars.$accent-color, $lightness: 20%));
			padding: gvars.$spacing-md;
			border-radius: gvars.$border-radius-sm;
			margin: gvars.$spacing-sm;
			box-shadow: gvars.$shadow;

			.grandchild {
				background: linear-gradient(135deg, gvars.$primary-color, gvars.$accent-color);
				color: white;
				padding: gvars.$spacing-sm;
				border-radius: gvars.$border-radius-sm;
				text-align: center;
				font-weight: 600;
				text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
			}
		}
	}
}

// 3. Mixin 使用
.mixin-demo {
	display: flex;
	gap: gvars.$spacing-md;
	flex-wrap: wrap;
	justify-content: center;
}

.btn-gradient {
	@include gradient-button(gvars.$primary-color, gvars.$accent-color);
}

.btn-outline {
	@include outline-button(gvars.$primary-color);
}

.btn-3d {
	@include three-d-button(gvars.$success-color);
}

// 4. SCSS 函數
.function-demo {
	display: flex;
	gap: gvars.$spacing-md;
	flex-wrap: wrap;
	justify-content: center;
}

.function-box {
	padding: gvars.$spacing-lg;
	border-radius: gvars.$border-radius-md;
	color: white;
	font-weight: 600;
	min-width: 120px;
	text-align: center;
	box-shadow: gvars.$shadow;
	transition: all gvars.$transition-normal;

	&:hover {
		transform: translateY(-3px);
		box-shadow: gvars.$shadow-hover;
	}

	&.light {
		background: color.scale(gvars.$primary-color, $lightness: 20%);
		box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
	}

	&.dark {
		background: color.scale(gvars.$primary-color, $lightness: -20%);
		box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
	}

	&.transparent {
		background: rgba(gvars.$primary-color, 0.7);
		box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
	}
}

// 5. 條件語句
.conditional-demo {
	text-align: center;
}

.conditional-box {
	padding: gvars.$spacing-lg;
	border-radius: gvars.$border-radius-md;
	margin-bottom: gvars.$spacing-md;
	font-weight: 600;
	transition: all gvars.$transition-normal;
	background: linear-gradient(145deg, gvars.$secondary-color, gvars.$metal-color);
	border: 2px solid gvars.$border-color;
	color: gvars.$text-primary;

	&.is-active {
		background: linear-gradient(135deg, gvars.$success-color, color.scale(gvars.$success-color, $lightness: -20%));
		color: white;
		border-color: gvars.$success-color;
		transform: scale(1.05);
		box-shadow: 0 0 30px rgba(0, 255, 136, 0.4);
	}
}

.toggle-btn {
	@include gradient-button(gvars.$primary-color, gvars.$accent-color);
}

// 6. 迴圈生成樣式
.loop-demo {
	display: flex;
	gap: gvars.$spacing-sm;
	flex-wrap: wrap;
	justify-content: center;
}

.loop-item {
	padding: gvars.$spacing-md;
	border-radius: gvars.$border-radius-md;
	color: white;
	font-weight: 600;
	min-width: 80px;
	text-align: center;
	box-shadow: gvars.$shadow;
	transition: all gvars.$transition-normal;
}

// 使用迴圈生成不同顏色的項目
@for $i from 1 through 5 {
	.item-#{$i} {
		background: color.adjust(gvars.$primary-color, $hue: $i * 30deg);
		transform: rotate($i * 5deg);
		box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);

		&:hover {
			transform: rotate($i * 5deg) scale(1.1);
			box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
		}
	}
}

// 響應式設計
@media (max-width: gvars.$mobile-breakpoint) {
	.scss-demo {
		padding: gvars.$spacing-md;
	}

	.color-demo,
	.mixin-demo,
	.function-demo {
		flex-direction: column;
		align-items: center;
	}

	.color-box,
	.function-box {
		width: 100%;
		max-width: 200px;
	}

	.loop-demo {
		flex-direction: column;
		align-items: center;
	}

	.loop-item {
		width: 100%;
		max-width: 150px;
	}
}
</style> 