# 事件处理

## 本章目的

掌握 Vue 的事件处理机制，学会使用 v-on 指令处理用户交互，包括事件修饰符、按键修饰符等高级用法。

---

## 内容概述

- v-on 指令与事件监听
- 方法事件处理器
- 内联事件处理器
- 事件修饰符
- 按键修饰符
- 系统按键修饰符
- 鼠标按键修饰符

---

## 核心概念讲解

### 什么是事件处理？

事件处理是响应用户操作（点击、输入、按键等）的机制。就像餐厅的服务员：顾客举手（触发事件），服务员响应（处理事件）。

#### 类比理解

想象你在操作一台自动售货机：
- **事件**：按钮被按下
- **监听器**：机器检测到按钮动作
- **处理器**：机器执行对应的操作（出货、计算金额）

### v-on 指令

`v-on` 指令用于监听 DOM 事件。简写为 `@`。

#### 内联事件处理器

直接在模板中写 JavaScript 语句：

```html
<!-- 完整写法 -->
<button v-on:click="count++">点击</button>

<!-- 简写 -->
<button @click="count++">点击</button>

<!-- 可以访问事件对象 $event -->
<button @click="count += $event.target.value">点击</button>
```

#### 方法事件处理器

绑定组件上的一个方法：

```html
<!-- 不传参 -->
<button @click="handleClick">点击</button>

<!-- 传参 -->
<button @click="handleClick('hello')">点击</button>

<!-- 既传参又访问事件对象 -->
<button @click="handleClick('hello', $event)">点击</button>
```

```javascript
const handleClick = (message, event) => {
  console.log(message)  // 'hello'
  console.log(event)    // MouseEvent 对象
}
```

### 事件修饰符

Vue 提供了一系列事件修饰符，用于简化常见的事件处理需求。

#### 阻止默认行为

```html
<!-- 阻止表单提交（页面刷新） -->
<form @submit.prevent="handleSubmit">...</form>

<!-- 阻止链接跳转 -->
<a @click.prevent="handleClick" href="https://example.com">链接</a>
```

#### 阻止事件冒泡

```html
<!-- 点击按钮时不会触发父元素的点击事件 -->
<div @click="parentClick">
  <button @click.stop="childClick">点击</button>
</div>
```

#### 修饰符链式调用

```html
<!-- 同时阻止冒泡和默认行为 -->
<a @click.stop.prevent="doThat"></a>

<!-- 等价于 -->
<a @click.prevent.stop="doThat"></a>
```

#### 其他事件修饰符

| 修饰符 | 作用 |
|--------|------|
| `.capture` | 使用事件捕获模式（从外到内） |
| `.self` | 只当事件从元素本身触发时才触发 |
| `.once` | 事件只触发一次 |
| `.passive` | 不阻止默认行为（提升滚动性能） |

```html
<!-- 事件捕获模式 -->
<div @click.capture="handleCapture">...</div>

<!-- 只触发一次 -->
<button @click.once="handleOnce">只能点一次</button>
```

### 按键修饰符

监听键盘事件时使用：

```html
<!-- 只在按下 Enter 时触发 -->
<input @keyup.enter="submit">

<!-- 常用按键别名 -->
<input @keyup.enter="submit">
<input @keyup.tab="handleTab">
<input @keyup.delete="handleDelete"> <!-- 捕获 Delete 和 Backspace -->
<input @keyup.esc="handleEsc">
<input @keyup.space="handleSpace">
<input @keyup.up="handleUp">
<input @keyup.down="handleDown">
<input @keyup.left="handleLeft">
<input @keyup.right="handleRight">
```

#### 系统按键修饰符

```html
<!-- Ctrl + Click -->
<button @click.ctrl="handleCtrlClick">Ctrl+点击</button>

<!-- Alt + Enter -->
<input @keyup.alt.enter="handleAltEnter">

<!-- 修饰符 .exact：精确匹配 -->
<!-- 只有在只按下 Ctrl 时触发 -->
<button @click.ctrl.exact="handleExactCtrl">仅 Ctrl</button>
```

#### 鼠标按键修饰符

```html
<!-- 左键 -->
<button @click.left="handleLeftClick">

<!-- 右键 -->
<button @click.right="handleRightClick">

<!-- 中键 -->
<button @click.middle="handleMiddleClick">
```

---

## 代码示例说明

### JavaScript 版本

文件：`src/js/event-handling.html`

一个完整的事件处理示例，包含各种事件类型、修饰符的使用场景。

### TypeScript 版本

文件：`src/ts/event-handling.html`

功能与 JS 版本相同，添加了事件类型定义。

---

## JS 与 TS 对比

| 方面 | JavaScript | TypeScript |
|------|-----------|------------|
| **事件类型** | 无类型信息 | 可以定义 MouseEvent, KeyboardEvent 等 |
| **方法签名** | 灵活 | 明确的参数类型 |
| **代码提示** | 基础 | 完整的事件属性提示 |

### 示例对比

**JavaScript：**
```javascript
const handleClick = (event) => {
  // 不知道 event 有哪些属性
  console.log(event.target)
}
```

**TypeScript：**
```typescript
const handleClick = (event: MouseEvent) => {
  // 完整的类型提示
  console.log(event.clientX, event.clientY)
  console.log(event.target as HTMLElement)
}
```

---

## 最佳实践

### ✅ 推荐做法

1. **优先使用方法事件处理器**：复杂的逻辑应该放在方法中
2. **合理使用事件修饰符**：简化代码，提高可读性
3. **使用 .prevent 代替 event.preventDefault()**：更简洁
4. **使用 .stop 代替 event.stopPropagation()**：更声明式
5. **为键盘事件添加修饰符**：提高用户体验

```html
<!-- 推荐：简洁的声明式写法 -->
<form @submit.prevent="submitForm">
  <input @keyup.enter="submitForm">
</form>

<!-- 不推荐：在方法中手动调用 -->
<form @submit="submitForm">
<script>
const submitForm = (e) => {
  e.preventDefault()  // 可以简化为修饰符
  // ...
}
</script>
```

### ❌ 应避免的做法

1. **不要滥用内联事件处理器**：复杂的逻辑会使模板难以维护
2. **不要忘记移除事件监听**：虽然 Vue 会自动处理，但自定义事件要注意
3. **不要混淆捕获和冒泡**：理解事件传播机制很重要

---

## 练习题

### 基础练习

创建一个简单的事件演示：
1. 点击按钮显示 "Hello World"
2. 鼠标移动到区域显示坐标位置
3. 输入框输入时实时显示字符数
4. 按 Enter 键触发提交

### 进阶练习

创建一个交互式画板：
1. 在 canvas 上点击并拖动绘制线条
2. 支持选择不同颜色
3. 支持调整画笔粗细
4. 支持清空画板
5. 实现撤销功能（记录绘制历史）

### 挑战练习

创建一个键盘快捷键系统：
1. 实现全局快捷键（Ctrl+S 保存，Ctrl+Z 撤销）
2. 实现快捷键提示界面（显示所有可用快捷键）
3. 支持自定义快捷键绑定
4. 检测快捷键冲突
5. 实现 Vim 模式的 hjkl 导航

---

## 学习目标检查清单

- [ ] 掌握 v-on 指令的基本用法
- [ ] 理解内联事件处理器和方法事件处理器的区别
- [ ] 掌握常用的事件修饰符（.stop, .prevent, .once）
- [ ] 掌握按键修饰符的使用
- [ ] 理解系统按键修饰符
- [ ] 能够处理各种 DOM 事件（click, keyup, mousemove 等）

---

## 练习题答案

详见 `practice-solution.html` 文件。

---

## 下一步

完成本章学习后，进入 [第 10 章：表单输入绑定](../10-chapter-10/README.md)，学习如何使用 v-model 实现表单数据双向绑定。
