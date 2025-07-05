# Element Plus 整合說明

## 概述

本專案已成功整合 Element Plus，這是一個基於 Vue 3 的現代化 UI 元件庫。

## 安裝的套件

- `element-plus`: 主要的 UI 元件庫
- `@element-plus/icons-vue`: Element Plus 的圖標庫

## 整合步驟

### 1. 安裝套件

```bash
npm install element-plus @element-plus/icons-vue
```

### 2. 在 main.ts 中設定

```typescript
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// 註冊 Element Plus
app.use(ElementPlus)

// 註冊所有圖標
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
```

### 3. 建立示範元件

建立了 `src/client/components/ElementPlusDemo.vue` 來展示各種 Element Plus 元件的使用。

## 可用的元件

Element Plus 提供了豐富的 UI 元件，包括：

### 基本元件
- Button (按鈕)
- Input (輸入框)
- Select (選擇器)
- Switch (開關)
- Rate (評分)
- Progress (進度條)
- Tag (標籤)

### 進階元件
- Card (卡片)
- Table (表格)
- Row/Col (網格系統)
- Message (訊息提示)

### 圖標
所有 Element Plus 圖標都可以直接使用，例如：
- `<el-icon><Plus /></el-icon>`
- `<el-icon><Check /></el-icon>`
- `<el-icon><Warning /></el-icon>`

## 使用範例

### 基本按鈕
```vue
<el-button type="primary" :icon="Plus">主要按鈕</el-button>
<el-button type="success" :icon="Check">成功按鈕</el-button>
```

### 輸入框
```vue
<el-input v-model="inputValue" placeholder="請輸入文字" :prefix-icon="Search" />
```

### 表格
```vue
<el-table :data="tableData">
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="age" label="年齡" />
</el-table>
```

### 訊息提示
```vue
<script setup>
import { ElMessage } from 'element-plus'

const showMessage = () => {
    ElMessage.success('操作成功！')
}
</script>
```

## 樣式自訂

Element Plus 使用 CSS 變數來控制主題色彩，可以在全域 CSS 中覆寫：

```css
:root {
    --el-color-primary: #00d4ff;
    --el-color-success: #00ff88;
    --el-color-warning: #ffaa00;
    --el-color-danger: #ff4444;
}
```

## 注意事項

1. Element Plus 已與現有的 Tailwind CSS 和 SCSS 樣式系統相容
2. 所有圖標都已全域註冊，可以直接使用
3. 元件支援 TypeScript，提供完整的型別支援
4. 響應式設計已整合到示範元件中

## 下一步

- 根據專案需求自訂 Element Plus 主題
- 建立更多自訂元件
- 整合 Element Plus 的國際化功能
- 加入更多進階元件如 Dialog、Drawer 等 