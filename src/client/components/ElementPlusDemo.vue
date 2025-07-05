<template>
	<div class="element-plus-demo">
		<el-card class="demo-card">
			<template #header>
				<div class="card-header">
					<span>Element Plus 示範</span>
					<el-button type="primary" @click="showMessage">顯示訊息</el-button>
				</div>
			</template>
			
			<div class="demo-content">
				<el-row :gutter="20">
					<el-col :span="12">
						<h3>基本元件</h3>
						<el-button type="primary" :icon="Plus">主要按鈕</el-button>
						<el-button type="success" :icon="Check">成功按鈕</el-button>
						<el-button type="warning" :icon="Warning">警告按鈕</el-button>
						<el-button type="danger" :icon="Delete">危險按鈕</el-button>
						
						<div class="mt-4">
							<el-input v-model="inputValue" placeholder="請輸入文字" :prefix-icon="Search" />
						</div>
						
						<div class="mt-4">
							<el-select v-model="selectValue" placeholder="請選擇選項">
								<el-option label="選項 1" value="1" />
								<el-option label="選項 2" value="2" />
								<el-option label="選項 3" value="3" />
							</el-select>
						</div>
					</el-col>
					
					<el-col :span="12">
						<h3>進階元件</h3>
						<el-switch v-model="switchValue" />
						<span class="ml-2">開關狀態: {{ switchValue ? '開啟' : '關閉' }}</span>
						
						<div class="mt-4">
							<el-rate v-model="rateValue" />
							<span class="ml-2">評分: {{ rateValue }}</span>
						</div>
						
						<div class="mt-4">
							<el-progress :percentage="progressValue" />
						</div>
						
						<div class="mt-4">
							<el-tag type="success">成功標籤</el-tag>
							<el-tag type="warning">警告標籤</el-tag>
							<el-tag type="danger">危險標籤</el-tag>
						</div>
					</el-col>
				</el-row>
				
				<div class="mt-6">
					<h3>表格示範</h3>
					<el-table :data="tableData" style="width: 100%">
						<el-table-column prop="name" label="姓名" />
						<el-table-column prop="age" label="年齡" />
						<el-table-column prop="city" label="城市" />
						<el-table-column label="操作">
							<template #default="scope">
								<el-button size="small" @click="handleEdit(scope.row)">編輯</el-button>
								<el-button size="small" type="danger" @click="handleDelete(scope.row)">刪除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Check, Warning, Delete, Search } from '@element-plus/icons-vue'

// 響應式資料
const inputValue = ref('')
const selectValue = ref('')
const switchValue = ref(true)
const rateValue = ref(4)
const progressValue = ref(70)

const tableData = ref([
	{ name: '張三', age: 25, city: '台北' },
	{ name: '李四', age: 30, city: '台中' },
	{ name: '王五', age: 28, city: '高雄' }
])

// 方法
const showMessage = () => {
	ElMessage.success('Element Plus 已成功整合！')
}

const handleEdit = (row: any) => {
	ElMessage.info(`編輯: ${row.name}`)
}

const handleDelete = (row: any) => {
	ElMessage.warning(`刪除: ${row.name}`)
}
</script>

<style scoped>
.element-plus-demo {
	padding: 20px;
}

.demo-card {
	max-width: 1200px;
	margin: 0 auto;
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.demo-content h3 {
	margin-bottom: 16px;
	color: #303133;
}

.mt-4 {
	margin-top: 16px;
}

.mt-6 {
	margin-top: 24px;
}

.ml-2 {
	margin-left: 8px;
}
</style> 