# Purimize Payment System

這是一個使用 Vue 3 + TypeScript + Fastify 構建的現代化支付系統平台，採用整合式開發環境設計。

## 專案特色

- **整合式開發環境**: 前後端統一開發體驗
- **TypeScript 全棧**: 前後端均使用 TypeScript 開發
- **即時通訊**: 支援 Server-Sent Events (SSE) 即時數據推送
- **現代化工具鏈**: 使用 Vite + tsx 提供快速開發體驗
- **生產就緒**: 完整的建置和部署配置

## 專案結構

```
purimize.node.payment/
├── src/
│   ├── client/              # Vue 前端應用
│   │   ├── assets/          # 靜態資源
│   │   └── index.html       # 入口 HTML
│   ├── server/              # Fastify 後端服務
│   │   ├── config/
│   │   │   └── env.ts       # 環境配置管理
│   │   ├── routes/
│   │   │   └── status.ts    # API 路由定義
│   │   ├── index.ts         # 伺服器入口
│   │   ├── runctl.ts        # 運行控制
│   │   └── tsconfig.json    # TypeScript 配置
│   └── shared/              # 前後端共享代碼
├── dist/                    # 建置輸出目錄
├── env.example              # 環境變數範例
├── package.json             # 專案配置
├── tsconfig.json            # 根 TypeScript 配置
└── vite.config.ts           # Vite 配置
```

## 技術棧

### 前端
- **Vue 3**: 現代化前端框架
- **TypeScript**: 類型安全的 JavaScript
- **Vite**: 快速建置工具
- **Vue Router**: 單頁應用路由

### 後端
- **Fastify**: 高性能 Node.js 框架
- **TypeScript**: 類型安全的後端開發
- **tsx**: TypeScript 執行器
- **dotenv**: 環境變數管理

### 開發工具
- **concurrently**: 並行執行多個命令
- **tsconfig-paths**: TypeScript 路徑映射

## 開發指令

```bash
# 安裝依賴
npm install

# 開發模式 (同時運行前後端)
npm run dev

# 僅運行後端開發伺服器
npm run dev:server

# 僅運行前端開發伺服器
npm run dev:client

# 類型檢查
npm run check:server    # 檢查後端類型
npm run check:client    # 檢查前端類型

# 建置
npm run build:server    # 建置後端
npm run build:client    # 建置前端

# 生產模式運行
npm run start:server
```

## 開發環境說明

### 開發模式
- **前端**: 運行在 `http://localhost:5173` (Vite 開發伺服器)
- **後端**: 運行在 `http://localhost:3000` (Fastify API 伺服器)
- **代理配置**: 前端自動代理 `/api/*` 請求到後端

### 生產模式
- **整合部署**: 前端建置後由後端提供靜態檔案服務
- **API 伺服器**: 運行在配置的 API_BIND_PORT 上
- **Vue 開發伺服器**: 運行在配置的 VUE_BIND_PORT 上

## API 端點

### 系統狀態
- `GET /api/v1/status` - 獲取伺服器狀態資訊

### 時間服務
- `GET /api/v1/time` - 獲取當前時間
- `GET /api/v1/time/sse` - Server-Sent Events 即時時間流

> 📖 **API 文檔**: 詳細的 API 回應格式和參數說明請參考專案文檔。

## 環境配置

### 設定檔功能

專案採用分層環境配置管理，支援多種設定檔：

#### 環境檔案類型
- **`.env`** - 基礎配置檔案
- **`.env.local`** - 本地開發覆蓋設定（git 忽略）
- **`.env.dev`** - 開發環境專用設定
- **`.env.prod`** - 生產環境專用設定

#### 載入優先級
系統會按以下順序載入環境變數（後面的會覆蓋前面的）：
1. `.env` (基礎配置)
2. `.env.local` (本地覆蓋)
3. `.env.dev` (開發環境) 或 `.env.prod` (生產環境)

#### 配置變數說明

```env
# 基本配置
NODE_ENV=development          # 運行環境

# Vue 配置
ENABLE_VUE=true              # 是否啟用 Vue 前端
VITE_APP_TITLE=Purimize Payment  # 應用標題
VUE_BIND_HOST=::1            # Vue 開發伺服器綁定主機
VUE_BIND_PORT=5173           # Vue 開發伺服器端口

# API 配置
API_BIND_HOST=127.0.0.1      # API 伺服器綁定主機
API_BIND_PORT=3000           # API 伺服器端口

# 客戶端靜態檔案路徑（生產環境）
CLIENT_DIST_PATH=./dist/client  # 前端建置輸出目錄
```

#### 前端環境變數
- 只有以 `VITE_` 開頭的環境變數會被傳遞給前端
- 可在 Vue 組件中通過 `import.meta.env.VITE_*` 存取

## 部署說明

### 開發部署
```bash
# 1. 安裝依賴
npm install

# 2. 建置前後端
npm run build:server
npm run build:client

# 3. 啟動生產服務
npm run start:server
```

### 環境變數
生產環境請設置：
```env
NODE_ENV=production
ENABLE_VUE=true
CLIENT_DIST_PATH=./dist/client
```

## 開發指南

### 新增 API 路由
1. 在 `src/server/routes/` 創建新的路由文件
2. 在 `src/server/index.ts` 中註冊路由
3. 使用 `env.API_PREFIX` 作為路由前綴

### 前端開發
1. Vue 組件放在 `src/client/` 目錄
2. 使用 `@/` 別名指向 `src/client/`
3. 使用 `@shared/` 別名指向 `src/shared/`

### 類型安全
- 前後端均使用 TypeScript
- 共享類型定義放在 `src/shared/` 目錄
- 使用 `npm run check:*` 進行類型檢查

## 故障排除

### 常見問題
1. **端口衝突**: 修改 `.env` 中的 `API_BIND_PORT` 或 `VUE_BIND_PORT` 設定
2. **Vite 代理問題**: 檢查 `vite.config.ts` 中的代理配置
3. **環境變數未載入**: 確認 `.env` 文件存在且格式正確

### 日誌查看
- 開發模式: 控制台會顯示詳細日誌
- 生產模式: 日誌級別為 `warn` 以上 