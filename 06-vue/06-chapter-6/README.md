# Class 与 Style 绑定：动态样式的艺术

## 本章目的

掌握 Vue 中动态绑定 HTML class 和 style 的方法，能够根据不同的状态和数据动态应用样式，创建交互性强的用户界面。

---

## 内容概述

- 绑定 HTML Class
  - 对象语法
  - 数组语法
  - 在组件上使用
- 绑定内联 Style
  - 对象语法
  - 数组语法
  - 自动前缀
- 多重值
- 实战案例：主题切换、状态指示器

---

## 核心概念讲解

### 为什么需要动态绑定 Class 和 Style？

想象你正在设计一个智能房间：
- **灯光（class）**：根据时间自动切换日光灯/夜光灯模式
- **颜色（style）**：根据心情调节墙壁颜色
- **布局（style）**：根据活动类型调整家具摆放

静态的 HTML/CSS 就像固定的房间装修，而动态绑定让你可以实时改变房间的氛围和功能。

---

### 1. 绑定 HTML Class - 对象语法

最常用的方式，根据布尔值动态切换 class。

#### 基础用法

```html
<div id="app">
  <!-- 基础对象语法 -->
  <div :class="{ active: isActive }">
    当 isActive 为 true 时，添加 'active' class
  </div>
  
  <!-- 多个 class -->
  <div :class="{ active: isActive, 'text-danger': hasError }">
    可以同时控制多个 class
  </div>
  
  <!-- 与静态 class 共存 -->
  <div class="static-class" :class="{ active: isActive }">
    静态 class 和动态 class 可以共存
  </div>
</div>

<script>
createApp({
  data() {
    return {
      isActive: true,
      hasError: false
    }
  }
}).mount('#app')
</script>

<style>
.active { color: #42b883; }
.text-danger { color: red; }
.static-class { font-size: 16px; }
</style>
```

#### 绑定对象变量

```javascript
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false,
      highlight: true
    }
  }
}
```

```html
<div :class="classObject">
  绑定整个对象
</div>
```

**生活类比**：对象语法就像开关面板，每个开关控制一个灯的亮灭。

---

### 2. 绑定 HTML Class - 数组语法

用于需要多个动态 class 的场景。

```html
<div id="app">
  <!-- 基础数组语法 -->
  <div :class="[activeClass, errorClass]">
    添加 'active' 和 'text-danger' class
  </div>
  
  <!-- 数组中使用对象语法 -->
  <div :class="[activeClass, { 'text-danger': hasError }]">
    混合使用
  </div>
  
  <!-- 三元表达式 -->
  <div :class="[isActive ? activeClass : '', errorClass]">
    条件判断
  </div>
</div>

<script>
createApp({
  data() {
    return {
      activeClass: 'active',
      errorClass: 'text-danger',
      isActive: true,
      hasError: true
    }
  }
}).mount('#app')
</script>
```

**生活类比**：数组语法就像购物清单，每一项都是要买的商品（应用的 class）。

---

### 3. 绑定内联 Style - 对象语法

用于动态设置内联样式。

```html
<div id="app">
  <!-- 基础对象语法 -->
  <div :style="{ color: activeColor, fontSize: fontSize + 'px' }">
    动态颜色和字体大小
  </div>
  
  <!-- 驼峰命名或短横线命名（需引号） -->
  <div :style="{ 
    backgroundColor: bgColor,      // 驼峰
    'border-radius': '8px'         // 短横线（需引号）
  }">
    多种样式属性
  </div>
  
  <!-- 绑定 style 对象 -->
  <div :style="styleObject">
    绑定整个 style 对象
  </div>
</div>

<script>
createApp({
  data() {
    return {
      activeColor: '#42b883',
      fontSize: 16,
      bgColor: '#f0f0f0',
      styleObject: {
        color: '#42b883',
        fontSize: '16px',
        backgroundColor: '#f0f0f0'
      }
    }
  }
}).mount('#app')
</script>
```

---

### 4. 绑定内联 Style - 数组语法

可以将多个 style 对象合并。

```javascript
data() {
  return {
    baseStyles: {
      fontSize: '16px',
      color: '#333'
    },
    overrideStyles: {
      color: '#42b883',  // 覆盖 baseStyles 中的 color
      fontWeight: 'bold'
    }
  }
}
```

```html
<!-- 后面的对象属性会覆盖前面的 -->
<div :style="[baseStyles, overrideStyles]">
  字体大小: 16px, 颜色: #42b883 (被覆盖), 字重: bold
</div>
```

---

### 5. 自动添加浏览器前缀

Vue 会自动为需要前缀的 CSS 属性添加相应的前缀。

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }">
  为 display: flex 自动添加前缀
</div>
```

```html
<div :style="{ transform: 'rotate(45deg)' }">
  Vue 会自动添加 -webkit-transform, -moz-transform 等前缀
</div>
```

---

### 6. 实战案例

#### 案例 1：主题切换器

```html
<div id="app" :class="currentTheme">
  <h1>主题切换演示</h1>
  
  <div class="theme-buttons">
    <button @click="currentTheme = 'light'">☀️ 亮色主题</button>
    <button @click="currentTheme = 'dark'">🌙 暗色主题</button>
    <button @click="currentTheme = 'colorful'">🎨 彩色主题</button>
  </div>
  
  <div class="content-box">
    <p>这是一个可以切换主题的卡片</p>
  </div>
</div>

<style>
/* 亮色主题 */
.light { background: #fff; color: #333; }
.light .content-box { background: #f5f5f5; border: 1px solid #ddd; }

/* 暗色主题 */
.dark { background: #333; color: #fff; }
.dark .content-box { background: #444; border: 1px solid #555; }

/* 彩色主题 */
.colorful { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; }
.colorful .content-box { background: rgba(255,255,255,0.2); border: 2px solid #fff; }
</style>
```

#### 案例 2：状态指示器

```html
<div id="app">
  <div 
    class="status-badge"
    :class="{
      'status-success': status === 'success',
      'status-warning': status === 'warning',
      'status-error': status === 'error',
      'status-loading': status === 'loading'
    }"
    :style="{ 
      transform: status === 'loading' ? 'scale(1.1)' : 'scale(1)',
      transition: 'all 0.3s'
    }"
  >
    {{ statusText }}
  </div>
  
  <button @click="status = 'success'">成功</button>
  <button @click="status = 'warning'">警告</button>
  <button @click="status = 'error'">错误</button>
  <button @click="status = 'loading'">加载中</button>
</div>

<script>
createApp({
  data() {
    return {
      status: 'success' // success, warning, error, loading
    }
  },
  computed: {
    statusText() {
      const texts = {
        success: '✓ 操作成功',
        warning: '⚠ 需要注意',
        error: '✗ 发生错误',
        loading: '⟳ 加载中...'
      }
      return texts[this.status]
    }
  }
}).mount('#app')
</script>

<style>
.status-badge {
  padding: 10px 20px;
  border-radius: 4px;
  display: inline-block;
  margin: 10px 0;
}
.status-success { background: #d4edda; color: #155724; }
.status-warning { background: #fff3cd; color: #856404; }
.status-error { background: #f8d7da; color: #721c24; }
.status-loading { background: #e2e3e5; color: #383d41; }
</style>
```

---

## JavaScript vs TypeScript 对比

| 特性 | JavaScript | TypeScript |
|------|-----------|------------|
| Class 绑定 | `:class="{ active: isActive }"` | 相同 |
| Style 绑定 | `:style="{ color: textColor }"` | 相同 |
| 类型检查 | 无 | 可定义样式对象类型 |

#### TypeScript 示例

```typescript
interface StyleObject {
  color?: string
  fontSize?: string
  backgroundColor?: string
  [key: string]: string | undefined
}

interface ClassObject {
  active?: boolean
  disabled?: boolean
  [key: string]: boolean | undefined
}

export default {
  data() {
    return {
      styleObject: {
        color: '#42b883',
        fontSize: '16px'
      } as StyleObject,
      
      classObject: {
        active: true,
        disabled: false
      } as ClassObject
    }
  }
}
```

---

## 完整示例代码

### JavaScript 版本

详见 `src/js/example.html`

### TypeScript 版本

详见 `src/ts/example.html`

---

## 练习题

### 基础练习

创建一个交互式卡片组件：
1. 使用对象语法绑定 class，实现：
   - 鼠标悬停时添加 'hovered' class
   - 点击时添加 'selected' class
   - 根据 `isActive` 状态切换 'active' class
2. 使用 style 绑定动态改变：
   - 背景颜色（通过颜色选择器）
   - 内边距（通过滑块）
   - 圆角（通过滑块）

### 进阶练习

创建一个响应式导航栏：
1. 根据滚动位置动态改变导航栏样式：
   - 顶部时：透明背景
   - 滚动后：白色背景 + 阴影
2. 当前活动项高亮显示
3. 移动端适配：小屏幕时显示汉堡菜单
4. 使用 transition 实现平滑过渡效果

### 挑战练习

创建一个完整的主题切换系统：
1. 支持亮色/暗色/高对比度三种主题
2. 主题切换应用到整个页面（使用 CSS 变量）
3. 主题偏好保存到 localStorage
4. 支持跟随系统主题（检测系统偏好）
5. 所有组件根据当前主题动态调整样式

---

## 练习题答案

详见 `practice-solution.html`

---

## 学习目标检查清单

- [ ] 掌握 Class 绑定的对象语法
- [ ] 掌握 Class 绑定的数组语法
- [ ] 掌握 Style 绑定的对象语法
- [ ] 掌握 Style 绑定的数组语法
- [ ] 理解静态和动态 class/style 如何共存
- [ ] 能够在组件上使用动态 class
- [ ] 了解 Vue 会自动添加浏览器前缀
- [ ] 能够创建主题切换等实际应用

---

## 延伸阅读

- [Vue 官方文档 - Class 与 Style 绑定](https://cn.vuejs.org/guide/essentials/class-and-style.html)
- [MDN CSS 参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)
- [CSS 变量指南](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)
