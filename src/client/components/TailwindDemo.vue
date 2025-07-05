<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
    <!-- 標題區域 -->
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          Tailwind CSS 展示
        </h1>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          探索 Tailwind CSS 的強大功能，從基礎樣式到進階動畫效果
        </p>
      </div>

      <!-- 功能卡片網格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
          :class="feature.borderColor"
        >
          <div 
            class="w-16 h-16 bg-gradient-to-br rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300"
            :class="feature.color"
          >
            {{ feature.icon }}
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">{{ feature.title }}</h3>
          <p class="text-gray-300 text-sm leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>

      <!-- 響應式展示區域 -->
      <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/10">
        <h2 class="text-3xl font-bold text-white mb-6 text-center">響應式設計展示</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-6 rounded-xl border border-blue-500/30">
            <div class="text-2xl mb-2">📱</div>
            <h3 class="font-semibold text-white mb-2">手機</h3>
            <p class="text-sm text-gray-300">小螢幕適配</p>
          </div>
          <div class="bg-gradient-to-br from-green-500/20 to-green-600/20 p-6 rounded-xl border border-green-500/30">
            <div class="text-2xl mb-2">💻</div>
            <h3 class="font-semibold text-white mb-2">平板</h3>
            <p class="text-sm text-gray-300">中等螢幕適配</p>
          </div>
          <div class="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-6 rounded-xl border border-purple-500/30">
            <div class="text-2xl mb-2">🖥️</div>
            <h3 class="font-semibold text-white mb-2">桌面</h3>
            <p class="text-sm text-gray-300">大螢幕適配</p>
          </div>
          <div class="bg-gradient-to-br from-pink-500/20 to-pink-600/20 p-6 rounded-xl border border-pink-500/30">
            <div class="text-2xl mb-2">🖥️</div>
            <h3 class="font-semibold text-white mb-2">超大螢幕</h3>
            <p class="text-sm text-gray-300">超大螢幕適配</p>
          </div>
        </div>
      </div>

      <!-- 動畫效果展示 -->
      <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/10">
        <h2 class="text-3xl font-bold text-white mb-6 text-center">動畫效果</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div 
            v-for="(animation, index) in animations" 
            :key="index"
            class="text-center group"
          >
            <div 
              class="w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
              :class="[animation.color, animation.class]"
            >
              <span class="text-white font-bold text-sm">動畫</span>
            </div>
            <div class="text-sm font-medium text-white">{{ animation.name }}</div>
          </div>
        </div>
      </div>

      <!-- 狀態標籤展示 -->
      <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/10">
        <h2 class="text-3xl font-bold text-white mb-6 text-center">狀態標籤</h2>
        <div class="flex flex-wrap gap-4 justify-center">
          <span 
            v-for="(status, index) in statuses" 
            :key="index"
            class="px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200"
            :class="getStatusClasses(status.color)"
          >
            {{ status.text }}
          </span>
        </div>
      </div>

      <!-- 表單元素展示 -->
      <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/10">
        <h2 class="text-3xl font-bold text-white mb-6 text-center">表單元素</h2>
        <div class="max-w-md mx-auto space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">輸入框</label>
            <input 
              type="text" 
              placeholder="請輸入內容..."
              class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">下拉選單</label>
            <select class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
              <option value="">請選擇選項</option>
              <option value="1">選項 1</option>
              <option value="2">選項 2</option>
              <option value="3">選項 3</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">按鈕</label>
            <div class="flex gap-4">
              <button class="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                主要按鈕
              </button>
              <button class="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium border border-white/20 transition-all duration-200">
                次要按鈕
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 進度條展示 -->
      <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <h2 class="text-3xl font-bold text-white mb-6 text-center">進度條</h2>
        <div class="space-y-6 max-w-2xl mx-auto">
          <div>
            <div class="flex justify-between text-sm text-gray-300 mb-2">
              <span>基礎進度</span>
              <span>75%</span>
            </div>
            <div class="w-full bg-white/10 rounded-full h-3">
              <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out" style="width: 75%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-sm text-gray-300 mb-2">
              <span>動畫進度</span>
              <span>90%</span>
            </div>
            <div class="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div class="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full animate-pulse" style="width: 90%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 功能卡片數據
const features = ref([
  {
    icon: '🎨',
    title: '實用工具類',
    description: '豐富的 CSS 類別，快速設定樣式',
    color: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-500/30'
  },
  {
    icon: '📱',
    title: '響應式設計',
    description: '適配各種螢幕尺寸的佈局',
    color: 'from-green-500 to-green-600',
    borderColor: 'border-green-500/30'
  },
  {
    icon: '⚡',
    title: '高效能',
    description: '只包含使用的樣式，檔案更小',
    color: 'from-purple-500 to-purple-600',
    borderColor: 'border-purple-500/30'
  },
  {
    icon: '🔧',
    title: '易於配置',
    description: '簡單的配置檔案，高度可自定義',
    color: 'from-pink-500 to-pink-600',
    borderColor: 'border-pink-500/30'
  },
  {
    icon: '🎯',
    title: '一致性',
    description: '統一的設計系統和間距',
    color: 'from-indigo-500 to-indigo-600',
    borderColor: 'border-indigo-500/30'
  },
  {
    icon: '🚀',
    title: '快速開發',
    description: '減少 CSS 編寫時間，提高效率',
    color: 'from-orange-500 to-orange-600',
    borderColor: 'border-orange-500/30'
  },
  {
    icon: '🎪',
    title: '動畫效果',
    description: '內建動畫類別，輕鬆實現互動',
    color: 'from-teal-500 to-teal-600',
    borderColor: 'border-teal-500/30'
  },
  {
    icon: '🌙',
    title: '深色模式',
    description: '原生支援深色模式切換',
    color: 'from-gray-500 to-gray-600',
    borderColor: 'border-gray-500/30'
  }
])

// 動畫效果數據
const animations = ref([
  { name: '脈動', class: 'animate-pulse', color: 'bg-blue-500/50' },
  { name: '彈跳', class: 'animate-bounce', color: 'bg-green-500/50' },
  { name: '旋轉', class: 'animate-spin', color: 'bg-purple-500/50' },
  { name: 'Ping', class: 'animate-ping', color: 'bg-pink-500/50' },
  { name: '淡入', class: 'animate-fade-in', color: 'bg-indigo-500/50' },
  { name: '滑入', class: 'animate-slide-in', color: 'bg-orange-500/50' },
  { name: '縮放', class: 'animate-scale', color: 'bg-teal-500/50' },
  { name: '搖晃', class: 'animate-wiggle', color: 'bg-red-500/50' }
])

// 狀態標籤數據
const statuses = ref([
  { text: '✅ 成功', color: 'green' },
  { text: '⚠️ 警告', color: 'yellow' },
  { text: '❌ 錯誤', color: 'red' },
  { text: 'ℹ️ 資訊', color: 'blue' },
  { text: '🔄 處理中', color: 'purple' },
  { text: '📝 草稿', color: 'gray' }
])

// 獲取狀態標籤樣式類別
const getStatusClasses = (color: string) => {
  const colorClasses = {
    green: 'bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30',
    yellow: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30 hover:bg-yellow-500/30',
    red: 'bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30',
    blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30',
    purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30',
    gray: 'bg-gray-500/20 text-gray-300 border-gray-500/30 hover:bg-gray-500/30'
  }
  return colorClasses[color as keyof typeof colorClasses] || colorClasses.gray
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-in {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@keyframes scale {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes wiggle {
  0%, 7% { transform: rotateZ(0); }
  15% { transform: rotateZ(-15deg); }
  20% { transform: rotateZ(10deg); }
  25% { transform: rotateZ(-10deg); }
  30% { transform: rotateZ(6deg); }
  35% { transform: rotateZ(-4deg); }
  40%, 100% { transform: rotateZ(0); }
}

.animate-fade-in {
  animation: fade-in 2s ease-in-out infinite;
}

.animate-slide-in {
  animation: slide-in 2s ease-in-out infinite;
}

.animate-scale {
  animation: scale 2s ease-in-out infinite;
}

.animate-wiggle {
  animation: wiggle 1s ease-in-out infinite;
}
</style> 