# SCSS 樣式結構

這個專案使用 SCSS 來管理樣式，並採用模組化的結構來提高可維護性。

## 檔案結構

```
src/client/styles/
├── _variables.scss    # 變數定義
├── _base.scss         # 基礎樣式（重置、根變數、基本元素）
├── _components.scss   # 元件樣式（導航欄、卡片、按鈕等）
├── _responsive.scss   # 響應式設計
└── README.md          # 說明文件
```

## 檔案說明

### `_variables.scss`
包含所有 SCSS 變數：
- 顏色變數（主色、次色、文字色等）
- 陰影變數
- 字體設定
- 響應式斷點
- 間距變數
- 圓角變數
- 過渡動畫

### `_base.scss`
包含基礎樣式：
- 全域重置
- CSS 變數定義（用於 JavaScript 存取）
- 主體樣式
- 應用程式容器
- 標題樣式

### `_components.scss`
包含元件樣式：
- 導航欄
- 主要內容區域
- 卡片元件
- 按鈕元件（包含多種變體）

### `_responsive.scss`
包含響應式設計：
- 手機版樣式（< 768px）
- 平板版樣式（< 1024px）
- 桌面版樣式（> 1200px）

## 使用方式

### 在 Vue 元件中使用 SCSS

#### 基本用法

```vue
<template>
  <div class="my-component">
    <button class="btn-success">成功按鈕</button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables';

.my-component {
  padding: $spacing-lg;
  
  button {
    margin-top: $spacing-md;
  }
}
</style>
```

#### 進階用法 - Mixins

```vue
<style lang="scss" scoped>
@import '@/styles/variables';

// 定義 Mixin
@mixin card-style($bg-color: $card-background) {
  background: $bg-color;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-lg;
  padding: $spacing-xl;
  border: 1px solid $border-color;
}

.my-card {
  @include card-style();
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-hover;
  }
}
</style>
```

#### 巢狀結構

```vue
<style lang="scss" scoped>
.navbar {
  background: $primary-color;
  padding: $spacing-md;
  
  .nav-brand {
    font-weight: bold;
    
    a {
      color: white;
      text-decoration: none;
      
      &:hover {
        color: lighten($primary-color, 20%);
      }
    }
  }
  
  .nav-links {
    display: flex;
    gap: $spacing-md;
    
    a {
      color: white;
      padding: $spacing-sm $spacing-md;
      border-radius: $border-radius-sm;
      transition: all $transition-normal;
      
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      
      &.active {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }
}
</style>
```

#### 條件語句與動態樣式

```vue
<template>
  <div class="status-card" :class="{ 'is-active': isActive }">
    {{ status }}
  </div>
</template>

<style lang="scss" scoped>
.status-card {
  padding: $spacing-lg;
  border-radius: $border-radius-md;
  background: $secondary-color;
  transition: all $transition-normal;
  
  &.is-active {
    background: $success-color;
    color: white;
    transform: scale(1.05);
  }
}
</style>
```

### 新增樣式

1. **新增變數**：在 `_variables.scss` 中定義
2. **新增元件樣式**：在 `_components.scss` 中新增
3. **新增響應式樣式**：在 `_responsive.scss` 中新增
4. **新增全域樣式**：在 `_base.scss` 中新增

### 按鈕變體

專案提供多種按鈕變體：
- 預設按鈕（主色）
- `.btn-secondary` - 次要按鈕
- `.btn-success` - 成功按鈕
- `.btn-warning` - 警告按鈕
- `.btn-error` - 錯誤按鈕

## 最佳實踐

1. **使用變數**：優先使用 `_variables.scss` 中定義的變數
2. **巢狀結構**：善用 SCSS 的巢狀語法來組織樣式
3. **模組化**：將相關的樣式放在同一個檔案中
4. **響應式優先**：使用變數定義斷點，確保一致性
5. **命名規範**：使用 BEM 命名法或類似的命名規範

## 編譯

Vite 會自動編譯 SCSS 檔案，無需額外設定。在開發模式下，變更會即時反映。 