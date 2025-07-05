<template>
	<div id="app">
		<nav>
			<div class="nav-container">
				<div class="nav-brand">
					<router-link to="/">🚀 Vue + Fastify</router-link>
				</div>
				<div class="nav-links">
					<router-link to="/">首頁</router-link>
					<router-link to="/status">狀態</router-link>
				</div>
			</div>
		</nav>
		<main>
			<router-view />
		</main>
	</div>
</template>

<script setup lang="ts">
// 使用 Vue 3 Composition API
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as gvars;

.nav-container {
	max-width: gvars.$desktop-breakpoint;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: gvars.$mobile-breakpoint) {
		flex-direction: column;
		gap: gvars.$spacing-md;
	}
}

.nav-brand {
	a {
		font-size: 1.25rem;
		font-weight: 700;
		background: linear-gradient(135deg, gvars.$primary-color, gvars.$accent-color);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-decoration: none;
		text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
		transition: all gvars.$transition-normal;

		&:hover {
			text-shadow: 0 0 30px rgba(0, 212, 255, 0.8);
		}

		@media (max-width: gvars.$mobile-breakpoint) {
			font-size: 1.1rem;
		}
	}
}

.nav-links {
	display: flex;
	gap: gvars.$spacing-sm;

	a {
		text-decoration: none;
	}
}
</style> 