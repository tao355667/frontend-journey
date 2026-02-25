# 条件渲染

## 本章目的

掌握 Vue 的条件渲染指令 `v-if`、`v-else-if`、`v-else` 和 `v-show` 的使用方法。

---

## 核心概念

### v-if vs v-show

| 指令 | 适用场景 | 特点 |
|------|----------|------|
| **v-if** | 切换不频繁 | 条件为 false 时，元素从 DOM 中移除 |
| **v-show** | 频繁切换 | 条件为 false 时，元素隐藏（display: none） |

### 基本用法

```vue
<script setup lang="ts">
import { ref } from 'vue'

const isLoggedIn = ref(false)
const userType = ref('guest')  // guest, member, admin
const showDetails = ref(true)
</script>

<template>
  <div>
    <!-- v-if -->
    <p v-if="isLoggedIn">欢迎回来！</p>
    <p v-else>请登录</p>

    <!-- v-else-if -->
    <div v-if="userType === 'guest'">游客模式</div>
    <div v-else-if="userType === 'member'">会员模式</div>
    <div v-else-if="userType === 'admin'">管理员模式</div>
    <div v-else>未知类型</div>

    <!-- v-show -->
    <div v-show="showDetails">
      <p>这里是详细信息...</p>
    </div>
  </div>
</template>
```

### 在 template 上使用 v-if

```vue
<template>
  <template v-if="isLoggedIn">
    <h1>欢迎</h1>
    <p>个人信息...</p>
  </template>
  <template v-else>
    <h1>请登录</h1>
    <button>登录</button>
  </template>
</template>
```

---

## 最佳实践

1. **切换频繁用 v-show**：如标签页切换
2. **条件复杂用 v-if**：如权限控制
3. **不要同时使用 v-if 和 v-for**：将 v-if 移到外层或使用 computed

---

## 练习题

1. 创建登录状态切换组件
2. 创建权限控制面板（管理员/普通用户/访客）
3. 实现可展开/折叠的内容区域

---

## 下一步

进入 [第 8 章：列表渲染](../08-chapter-8/README.md)
