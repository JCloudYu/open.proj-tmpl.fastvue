import '#/lib/esext.js'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import '@/style.scss'

// 路由配置
const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('./views/Home.vue')
	},
	{
		path: '/status',
		name: 'Status',
		component: () => import('./views/Status.vue')
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

const app = createApp(App)
app.use(router)
app.mount('#app') 