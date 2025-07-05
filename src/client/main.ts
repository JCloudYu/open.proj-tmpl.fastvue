import '#/lib/esext.js';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from '@/App.vue';

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

// 註冊 Element Plus
app.use(ElementPlus)

// 註冊所有圖標
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

app.use(router)
app.mount('#app') 