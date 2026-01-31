# 条件渲染 (v-if, v-show)

## 本章目的

掌握 Vue 的条件渲染指令，学会根据不同条件控制元素的显示与隐藏。

---

## 内容概述

- v-if / v-else-if / v-else 指令
- v-show 指令
- v-if 与 v-show 的区别
- 模板中的条件渲染
- v-if 与 v-for 的优先级

---

## 核心概念讲解

### 什么是条件渲染？

条件渲染是根据数据的状态来决定是否渲染某些 DOM 元素。就像生活中的开关：条件满足就显示，不满足就隐藏。

#### 类比理解

想象你有一个智能家电系统：
- **v-if**：像是一个电源开关，关闭时设备完全断电（DOM 元素被移除）
- **v-show**：像是一个屏幕亮度调节，调到 0% 时设备还在运行，只是看不见（DOM 元素通过 CSS 隐藏）

### v-if 指令

`v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回真值时被渲染。

```html
<!-- 只有当 isLoggedIn 为 true 时，才会渲染这个段落 -->
<p v-if="isLoggedIn">欢迎回来，用户！</p>
```

#### 完整的条件链

```html
<div v-if="type === 'A'">类型 A</div>
<div v-else-if="type === 'B'">类型 B</div>
<div v-else-if="type === 'C'">类型 C</div>
<div v-else">其他类型</div>
```

### v-show 指令

`v-show` 只是简单地切换元素的 CSS `display` 属性。

```html
<!-- 无论 isVisible 为何值，元素始终在 DOM 中 -->
<p v-show="isVisible">这个段落可以被显示或隐藏</p>
```

### v-if vs v-show 对比

| 特性 | v-if | v-show |
|------|------|--------|
| **切换开销** | 高（需要创建/销毁组件） | 低（只是切换 CSS） |
| **初始渲染** | 如果条件为 false，不渲染 | 总是渲染 |
| **适用场景** | 条件很少改变 | 需要频繁切换 |
| **DOM 存在性** | 条件为 false 时移除 | 始终在 DOM 中 |
| **支持 v-else** | 支持 | 不支持 |

### 在 <template> 上使用条件

当需要切换多个元素时，可以使用 `<template>` 元素作为包装器：

```html
<template v-if="isVisible">
  <h1>标题</h1>
  <p>段落 1</p>
  <p>段落 2</p>
</template>
```

`<template>` 不会渲染为实际的 DOM 元素。

### v-if 与 v-for 的优先级

**重要**：当 `v-if` 和 `v-for` 同时存在于一个元素上时，`v-if` 的优先级更高。

```html
<!-- 不推荐：v-if 会先执行，但 item 还未定义 -->
<li v-for="item in items" v-if="item.isActive">
  {{ item.name }}
</li>

<!-- 推荐：使用计算属性过滤列表 -->
<li v-for="item in activeItems" :key="item.id">
  {{ item.name }}
</li>
```

---

## 代码示例说明

### JavaScript 版本

文件：`src/js/conditional-rendering.html`

一个完整的用户登录状态切换示例，展示 v-if、v-show 和各种条件组合的使用。

### TypeScript 版本

文件：`src/ts/conditional-rendering.html`

功能与 JS 版本相同，添加了类型注解。

---

## JS 与 TS 对比

| 方面 | JavaScript | TypeScript |
|------|-----------|------------|
| **类型定义** | 无需定义 | 可以定义布尔类型、联合类型 |
| **代码提示** | 基础提示 | 更好的条件表达式提示 |
| **错误检查** | 运行时 | 编译时检查逻辑错误 |

### 示例对比

**JavaScript：**
```javascript
const isVisible = ref(true)
const userType = ref('guest') // 可以是任何字符串
```

**TypeScript：**
```typescript
const isVisible = ref<boolean>(true)
const userType = ref<'admin' | 'user' | 'guest'>('guest') // 限制为特定值
```

---

## 最佳实践

### ✅ 推荐做法

1. **优先使用 v-show 做频繁切换**：如选项卡、弹窗显示/隐藏
2. **优先使用 v-if 做条件分支**：如权限控制、页面状态切换
3. **避免在同一元素上同时使用 v-if 和 v-for**：使用计算属性提前过滤
4. **使用 key 管理可复用元素**：当切换相同类型的元素时，添加 key 确保正确渲染

```html
<!-- 使用 key 确保输入框在切换时不会复用 -->
<template v-if="loginType === 'username'">
  <label>用户名</label>
  <input placeholder="输入用户名" key="username-input">
</template>
<template v-else>
  <label>邮箱</label>
  <input placeholder="输入邮箱" key="email-input">
</template>
```

### ❌ 应避免的做法

1. **不要滥用 v-show 做权限控制**：虽然隐藏了，但敏感数据仍在 DOM 中
2. **不要在 v-if 中写复杂表达式**：提取为计算属性或方法
3. **不要忽视切换成本**：在性能敏感场景下错误选择 v-if/v-show

---

## 练习题

### 基础练习

创建一个用户资料卡片：
1. 根据 `isLoggedIn` 显示登录状态
2. 根据 `userRole`（admin/user/guest）显示不同的欢迎信息
3. 使用 v-show 控制详细信息区域的显示/隐藏

### 进阶练习

创建一个权限管理系统界面：
1. 使用 v-if/v-else-if/v-else 实现三级权限显示（管理员/普通用户/访客）
2. 添加一个 "切换视图模式" 按钮，使用 v-show 切换列表视图和卡片视图
3. 实现一个简单的登录/登出状态切换

### 挑战练习

创建一个多步骤表单向导：
1. 步骤 1：用户信息（姓名、邮箱）
2. 步骤 2：偏好设置（主题、通知）
3. 步骤 3：确认页面（显示所有输入）
4. 使用 v-if 控制步骤切换
5. 添加步骤指示器（显示当前步骤）

---

## 学习目标检查清单

- [ ] 理解 v-if 和 v-show 的工作原理
- [ ] 掌握 v-if/v-else-if/v-else 的完整用法
- [ ] 了解 v-if 和 v-show 的区别和使用场景
- [ ] 能够使用 <template> 进行多元素条件渲染
- [ ] 理解 v-if 与 v-for 的优先级问题
- [ ] 能够根据场景选择正确的条件渲染方式

---

## 练习题答案

详见 `practice-solution.html` 文件。

---

## 下一步

完成本章学习后，进入 [第 8 章：列表渲染](../08-chapter-8/README.md)，学习如何使用 v-for 渲染列表数据。
