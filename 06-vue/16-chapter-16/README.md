# 第16章：自定义指令 (Custom Directives)

## 概念

自定义指令是 Vue 提供的一种机制，让你可以直接操作 DOM 元素。除了内置指令（如 `v-if`、`v-for`、`v-model`）外，你还可以创建自己的指令。

### 什么时候使用自定义指令？

- 需要直接操作 DOM 的底层逻辑
- 通用的 DOM 操作需要复用
- 集成第三方 DOM 库

### 指令的钩子函数

```javascript
const myDirective = {
  // 绑定元素前调用
  created(el, binding, vnode, prevVnode) {
    // 指令首次绑定到元素
  },
  
  // 元素挂载前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  
  // 元素挂载后调用（★最常用）
  mounted(el, binding, vnode, prevVnode) {
    // DOM 已插入父节点
  },
  
  // 更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  
  // 更新后调用
  updated(el, binding, vnode, prevVnode) {},
  
  // 卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  
  // 卸载后调用（清理工作）
  unmounted(el, binding, vnode, prevVnode) {}
}
```

### 钩子参数

| 参数 | 说明 |
|------|------|
| `el` | 指令绑定的 DOM 元素 |
| `binding` | 包含指令信息的对象 |
| `vnode` | Vue 编译生成的虚拟节点 |
| `prevVnode` | 更新前的虚拟节点 |

`binding` 对象包含：
- `value`：指令的值（如 `v-my-directive="1+1"` 的值是 `2`）
- `oldValue`：更新前的值
- `arg`：参数（如 `v-my-directive:foo` 的 `arg` 是 `'foo'`）
- `modifiers`：修饰符对象（如 `v-my-directive.foo.bar`）
- `instance`：使用指令的组件实例
- `dir`：指令定义对象

---

## 1. 全局注册指令

### 基本方式

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 注册全局指令
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

app.mount('#app')
```

### 简写形式

如果只需要 `mounted` 和 `updated` 钩子，且逻辑相同：

```javascript
app.directive('color', (el, binding) => {
  el.style.color = binding.value
})
```

---

## 2. 局部注册指令

```vue
<script setup>
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

---

## 3. 指令使用示例

### 自动聚焦指令

```javascript
// 全局注册
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

// 使用
<input v-focus />
```

### 颜色指令

```javascript
app.directive('color', {
  mounted(el, binding) {
    el.style.color = binding.value
  },
  updated(el, binding) {
    el.style.color = binding.value
  }
})

// 使用
<p v-color="'red'">红色文字</p>
<p v-color="dynamicColor">动态颜色</p>
```

### 带参数的指令

```javascript
app.directive('pin', {
  mounted(el, binding) {
    const position = binding.arg || 'top-left'
    const [y, x] = position.split('-')
    
    el.style.position = 'fixed'
    el.style[y] = '10px'
    el.style[x] = '10px'
  }
})

// 使用
<div v-pin:top-right>固定在右上角</div>
<div v-pin:bottom-left>固定在左下角</div>
```

### 带修饰符的指令

```javascript
app.directive('click-outside', {
  mounted(el, binding) {
    el._clickOutside = (event) => {
      // 如果配置了阻止冒泡修饰符
      if (binding.modifiers.stop) {
        event.stopPropagation()
      }
      
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutside)
  }
})

// 使用
<div v-click-outside="closeModal">点击外部关闭</div>
<div v-click-outside.stop="handleClick">阻止冒泡</div>
```

---

## 4. 完整实用指令

### 复制到剪贴板

```javascript
app.directive('copy', {
  mounted(el, binding) {
    el._copyHandler = () => {
      const text = binding.value || el.textContent
      navigator.clipboard.writeText(text).then(() => {
        console.log('已复制:', text)
      })
    }
    
    el.addEventListener('click', el._copyHandler)
    el.style.cursor = 'pointer'
  },
  unmounted(el) {
    el.removeEventListener('click', el._copyHandler)
  }
})

// 使用
<button v-copy="'复制这段文字'">复制</button>
<span v-copy>点击复制这段内容</span>
```

### 权限控制

```javascript
app.directive('permission', {
  mounted(el, binding) {
    const userRole = localStorage.getItem('userRole')
    const requiredRole = binding.value
    
    if (userRole !== requiredRole) {
      el.style.display = 'none'
    }
  }
})

// 使用
<button v-permission="'admin'">只有管理员可见</button>
```

### 水印指令

```javascript
app.directive('watermark', {
  mounted(el, binding) {
    const text = binding.value || '水印'
    const canvas = document.createElement('canvas')
    canvas.width = 200
    canvas.height = 200
    
    const ctx = canvas.getContext('2d')
    ctx.rotate(-20 * Math.PI / 180)
    ctx.font = '16px Arial'
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillText(text, 20, 100)
    
    el.style.backgroundImage = `url(${canvas.toDataURL()})`
  }
})

// 使用
<div v-watermark="'机密文档'" style="width: 100%; height: 300px;">
  内容区域
</div>
```

### 防抖指令

```javascript
app.directive('debounce', {
  mounted(el, binding) {
    let timer
    const delay = binding.arg || 300
    
    el._debounceHandler = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        binding.value()
      }, delay)
    }
    
    el.addEventListener(binding.arg || 'input', el._debounceHandler)
  },
  unmounted(el, binding) {
    el.removeEventListener(binding.arg || 'input', el._debounceHandler)
  }
})

// 使用
<input v-debounce:300="search" v-model="query" />
```

---

## 5. 完整代码示例

### App.vue - 指令演示

```vue
<script setup>
import { ref } from 'vue'

// 局部注册指令
const vHighlight = {
  mounted(el, binding) {
    el.style.backgroundColor = binding.value || 'yellow'
  },
  updated(el, binding) {
    el.style.backgroundColor = binding.value || 'yellow'
  }
}

const color = ref('blue')
const showModal = ref(false)
const inputValue = ref('')

const closeModal = () => {
  showModal.value = false
}

const doSearch = () => {
  console.log('搜索:', inputValue.value)
}
</script>

<template>
  <div>
    <h2>1. 自动聚焦</h2>
    <input v-focus placeholder="自动聚焦" />
    
    <h2>2. 动态颜色</h2>
    <p v-color="color">这段文字颜色会变化</p>
    <button @click="color = color === 'blue' ? 'red' : 'blue'">
      切换颜色
    </button>
    
    <h2>3. 高亮（局部指令）</h2>
    <p v-highlight="'lightblue'">浅蓝色背景</p>
    
    <h2>4. 点击外部关闭</h2>
    <button @click="showModal = true">打开模态框</button>
    <div v-if="showModal" v-click-outside="closeModal" class="modal">
      <p>点击外部关闭我</p>
    </div>
    
    <h2>5. 防抖输入</h2>
    <input v-debounce:500="doSearch" v-model="inputValue" placeholder="输入后 500ms 触发搜索" />
    <p>输入值: {{ inputValue }}</p>
  </div>
</template>

<style>
.modal {
  padding: 20px;
  border: 1px solid #ddd;
  background: white;
  margin: 10px 0;
}
</style>
```

### main.js - 全局指令

```javascript
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 自动聚焦
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

// 颜色
app.directive('color', {
  mounted(el, binding) {
    el.style.color = binding.value
  },
  updated(el, binding) {
    el.style.color = binding.value
  }
})

// 点击外部
app.directive('click-outside', {
  mounted(el, binding) {
    el._clickOutside = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutside)
  }
})

// 防抖
app.directive('debounce', {
  mounted(el, binding) {
    let timer
    el._debounceHandler = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        binding.value()
      }, binding.arg || 300)
    }
    el.addEventListener('input', el._debounceHandler)
  },
  unmounted(el) {
    el.removeEventListener('input', el._debounceHandler)
  }
})

app.mount('#app')
```

---

## 关键点总结

| 钩子 | 用途 |
|------|------|
| `created` | 初始化指令 |
| `mounted` | ★ 操作 DOM，添加事件监听 |
| `updated` | 响应数据更新 |
| `unmounted` | ★ 清理事件监听，避免内存泄漏 |

### 指令命名规范

- 使用 `v-` 前缀（Vue 自动添加）
- 驼峰命名转换为短横线：`vMyDirective` → `v-my-directive`

### 注意事项

1. **务必清理副作用**：在 `unmounted` 中移除事件监听
2. **避免过度使用**：优先考虑组件和组合式函数
3. **不要操作组件内部**：只操作绑定元素自身

---

## 练习题

### 练习 1：v-tooltip 指令

创建一个提示框指令：
- 鼠标悬停时显示提示文字
- 支持自定义提示内容和位置
- 离开时隐藏提示

### 练习 2：v-resize 指令

创建元素尺寸监听指令：
- 监听元素大小变化
- 变化时触发回调函数
- 使用 ResizeObserver API

### 练习 3：v-loading 指令

创建加载状态指令：
- 显示加载动画覆盖层
- 支持自定义加载文字
- 值变为 false 时移除

---

## 常见错误

```javascript
// ❌ 错误：忘记清理事件监听
app.directive('click', {
  mounted(el, binding) {
    el.addEventListener('click', binding.value)
  }
  // 缺少 unmounted！
})

// ✅ 正确
app.directive('click', {
  mounted(el, binding) {
    el._handler = binding.value
    el.addEventListener('click', el._handler)
  },
  unmounted(el) {
    el.removeEventListener('click', el._handler)
  }
})
```

```javascript
// ❌ 错误：在 created 中操作 DOM
created(el) {
  el.style.color = 'red' // 此时 DOM 还未挂载
}

// ✅ 正确：在 mounted 中操作
mounted(el) {
  el.style.color = 'red'
}
```
