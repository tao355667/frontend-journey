# class 与 style 绑定

## 本章目的

掌握动态绑定 class 和 style 的方法。

---

## 核心概念

### 绑定 class

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const isActive = ref(true)
const hasError = ref(false)

const classObject = computed(() => ({
  active: isActive.value,
  'text-danger': hasError.value
}))
</script>

<template>
  <div>
    <!-- 对象语法 -->
    <div :class="{ active: isActive, 'text-danger': hasError }">
      动态 class
    </div>
    
    <!-- 绑定对象 -->
    <div :class="classObject">计算属性 class</div>
    
    <!-- 数组语法 -->
    <div :class="['base-class', { active: isActive }]">
      数组 class
    </div>
    
    <!-- 绑定普通 class 和动态 class -->
    <div class="static" :class="{ active: isActive }">
      混合 class
    </div>
  </div>
</template>

<style scoped>
.active { color: green; }
.text-danger { color: red; }
.static { font-size: 16px; }
</style>
```

### 绑定 style

```vue
<script setup lang="ts">
import { ref } from 'vue'

const activeColor = ref('red')
const fontSize = ref(30)

const styleObject = ref({
  color: 'red',
  fontSize: '13px'
})
</script>

<template>
  <div>
    <!-- 对象语法 -->
    <p :style="{ color: activeColor, fontSize: fontSize + 'px' }">
      动态 style
    </p>
    
    <!-- 绑定对象 -->
    <p :style="styleObject">对象 style</p>
    
    <!-- 数组语法（多个样式对象） -->
    <p :style="[baseStyles, overrideStyles]">
      数组 style
    </p>
    
    <!-- 多重值（浏览器支持的前缀） -->
    <p :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }">
      多重值
    </p>
  </div>
</template>
```

---

## 练习题

1. 创建可切换主题的按钮
2. 实现响应式布局组件
3. 创建动画过渡效果

---

## 下一步

进入 [第 11 章：组件基础与 props](../11-chapter-11/README.md)
