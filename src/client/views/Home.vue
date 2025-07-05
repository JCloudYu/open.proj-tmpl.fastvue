<template>
	<div class="home">
		<div class="hero">
			<h1>{{ appTitle }}</h1>
			<p class="hero-subtitle">現代化全端開發的最佳實踐</p>
		</div>
		
		<div class="content">
			<div class="intro-card">
				<div class="intro-icon">⚡</div>
				<h2>快速開發，高效能</h2>
				<p>這是一個整合 Vue 3 + Fastify 的現代化 Web 應用程式範例，提供完整的開發體驗和最佳實踐。</p>
			</div>
			
			<div class="features">
				<div class="feature-card">
					<div class="feature-icon">🎨</div>
					<h3>前端技術</h3>
					<ul>
						<li>Vue 3 Composition API</li>
						<li>TypeScript 支援</li>
						<li>Vue Router 路由管理</li>
						<li>Vite 建置工具</li>
						<li>響應式設計</li>
					</ul>
				</div>
				
				<div class="feature-card">
					<div class="feature-icon">⚙️</div>
					<h3>後端技術</h3>
					<ul>
						<li>Fastify 框架</li>
						<li>TypeScript 支援</li>
						<li>RESTful API</li>
						<li>CORS 支援</li>
						<li>高效能路由</li>
					</ul>
				</div>
			</div>
			
			<div class="cta-section">
				<h2>開始使用</h2>
				<p>這個專案提供了完整的開發環境配置，讓您可以快速開始開發。</p>
				<div class="cta-buttons">
					<button class="primary-btn">查看文檔</button>
					<button class="secondary-btn">GitHub 專案</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// 使用 Vue 3 Composition API
const appTitle = import.meta.env.VITE_APP_TITLE
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as gvars;

// 使用 SCSS 混入 (Mixin) 來重複使用樣式
@mixin gradient-text {
	background: linear-gradient(135deg, gvars.$primary-color, gvars.$accent-color);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
}

@mixin solid-text {
	color: gvars.$text-primary;
	text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
}

@mixin card-hover {
	transition: transform gvars.$transition-slow, box-shadow gvars.$transition-slow;
	
	&:hover {
		transform: translateY(-8px);
		box-shadow: gvars.$shadow-hover;
		border-color: rgba(0, 212, 255, 0.3);
	}
}

@mixin button-base {
	padding: gvars.$spacing-md gvars.$spacing-xl;
	border-radius: gvars.$border-radius-md;
	font-weight: 600;
	font-size: 1rem;
	cursor: pointer;
	transition: all gvars.$transition-slow;
}

.home {
	min-height: 100vh;
}

.hero {
	text-align: center;
	padding: gvars.$spacing-2xl gvars.$spacing-xl;
	margin-bottom: gvars.$spacing-xl;
	background: linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(42, 42, 42, 0.9) 100%);
	backdrop-filter: blur(20px);
	border-radius: gvars.$border-radius-xl;
	box-shadow: gvars.$shadow-lg;
	border: 1px solid rgba(0, 212, 255, 0.2);
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
	}

	h1 {
		font-size: 3rem;
		font-weight: 800;
		margin-bottom: gvars.$spacing-md;
		@include gradient-text;
		letter-spacing: -0.02em;
	}

	&-subtitle {
		font-size: 1.25rem;
		color: gvars.$text-secondary;
		opacity: 0.9;
		margin-bottom: gvars.$spacing-xl;
		font-weight: 500;
		letter-spacing: 0.01em;
	}
}

.content {
	max-width: gvars.$desktop-breakpoint;
	margin: 0 auto;
	padding: 0 gvars.$spacing-xl;
}

.intro-card {
	background: linear-gradient(135deg, gvars.$primary-color, gvars.$accent-color);
	color: white;
	padding: gvars.$spacing-2xl gvars.$spacing-xl;
	border-radius: gvars.$border-radius-xl;
	text-align: center;
	margin-bottom: gvars.$spacing-2xl;
	box-shadow: gvars.$shadow-lg;
	position: relative;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
		transform: translateX(-100%);
		transition: transform 0.6s ease;
	}

	&:hover::before {
		transform: translateX(100%);
	}

	&-icon {
		font-size: 3rem;
		margin-bottom: gvars.$spacing-md;
		text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
	}

	h2 {
		color: white;
		font-size: 2rem;
		margin-bottom: gvars.$spacing-md;
		text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
	}

	p {
		font-size: 1.1rem;
		opacity: 0.9;
		max-width: 600px;
		margin: 0 auto;
	}
}

.features {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	gap: gvars.$spacing-xl;
	margin-bottom: gvars.$spacing-2xl;
}

.feature-card {
	background: linear-gradient(145deg, gvars.$card-background, gvars.$metal-color);
	padding: gvars.$spacing-xl;
	border-radius: gvars.$border-radius-lg;
	box-shadow: gvars.$shadow-lg;
	border: 1px solid gvars.$border-color;
	@include card-hover;
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

	&-icon {
		font-size: 2.5rem;
		margin-bottom: gvars.$spacing-md;
		text-align: center;
		color: gvars.$primary-color;
		text-shadow: 0 0 15px rgba(0, 212, 255, 0.5);
	}

	h3 {
		color: gvars.$text-primary;
		font-size: 1.5rem;
		margin-bottom: gvars.$spacing-lg;
		text-align: center;
		text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
	}

	ul {
		list-style: none;
		padding: 0;
	}

	li {
		padding: gvars.$spacing-sm 0;
		color: gvars.$text-secondary;
		position: relative;
		padding-left: gvars.$spacing-xl;
		border-bottom: 1px solid gvars.$border-color;
		transition: all 0.2s ease;

		&:hover {
			color: gvars.$text-primary;
			background: rgba(0, 212, 255, 0.05);
			margin: 0 -0.5rem;
			padding-left: calc(gvars.$spacing-xl - 0.5rem);
			border-radius: 0.25rem;
		}

		&:last-child {
			border-bottom: none;
		}

		&::before {
			content: "✓";
			position: absolute;
			left: 0;
			color: gvars.$success-color;
			font-weight: bold;
			font-size: 1.1rem;
			text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
		}
	}
}

.cta-section {
	text-align: center;
	padding: gvars.$spacing-2xl gvars.$spacing-xl;
	background: linear-gradient(145deg, gvars.$secondary-color, gvars.$metal-color);
	border-radius: gvars.$border-radius-xl;
	margin-bottom: gvars.$spacing-xl;
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
	}

	h2 {
		color: gvars.$text-primary;
		margin-bottom: gvars.$spacing-md;
		text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
	}

	p {
		color: gvars.$text-secondary;
		margin-bottom: gvars.$spacing-xl;
		font-size: 1.1rem;
	}
}

.cta-buttons {
	display: flex;
	gap: gvars.$spacing-md;
	justify-content: center;
	flex-wrap: wrap;
}

.primary-btn {
	@include button-base;
	background: linear-gradient(135deg, gvars.$primary-color, gvars.$primary-hover);
	color: white;
	border: none;
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

.secondary-btn {
	@include button-base;
	background: transparent;
	color: gvars.$primary-color;
	border: 2px solid gvars.$primary-color;
	position: relative;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
		transition: left 0.5s;
	}

	&:hover {
		background: gvars.$primary-color;
		color: white;
		transform: translateY(-3px);
		box-shadow: gvars.$shadow-hover;

		&::before {
			left: 100%;
		}
	}
}

// 響應式設計
@media (max-width: gvars.$mobile-breakpoint) {
	.hero {
		padding: gvars.$spacing-xl gvars.$spacing-md;
		
		h1 {
			font-size: 2rem;
		}

		&-subtitle {
			font-size: 1rem;
		}
	}

	.intro-card {
		padding: gvars.$spacing-xl gvars.$spacing-md;
	}

	.features {
		grid-template-columns: 1fr;
	}

	.cta-buttons {
		flex-direction: column;
		align-items: center;
	}

	.primary-btn,
	.secondary-btn {
		width: 100%;
		max-width: 300px;
	}
}
</style> 