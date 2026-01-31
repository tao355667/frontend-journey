# 模板语法：Vue 的"翻译官"

## 本章目的

掌握 Vue 模板语法的核心概念，包括插值表达式、指令系统和修饰符，能够使用模板语法将数据渲染到页面上。

---

## 内容概述

- 文本插值（Mustache 语法）
- 原始 HTML 渲染
- 属性绑定（v-bind）
- JavaScript 表达式
- 指令系统（v-if, v-for, v-on, v-model 等）
- 参数与动态参数
- 修饰符

---

## 核心概念讲解

### 什么是模板语法？

模板语法是 Vue 提供的一套"翻译规则"，让你可以用声明式的方式将数据渲染到 DOM 中。就像一位翻译官，把 JavaScript 世界的数据翻译成 HTML 世界的视觉效果。

#### 类比理解

想象你在开一家餐厅：
- **菜单（模板）**：上面写着菜名和价格的位置（占位符）
- **厨房（JavaScript）**：实际准备的菜品和数据
- **服务员（Vue）**：把厨房的东西按菜单格式送到客人面前

模板语法就是那本"菜单规范手册"，告诉 Vue 如何把数据"摆放"到页面上。

---

### 1. 文本插值（Mustache 语法）

最基本的数据绑定形式，使用双大括号 `{{ }}`：

```html
<span>Message: {{ msg }}</span>
```

**生活类比**：就像填空题，双大括号是下划线，Vue 会帮你把答案填进去。

#### 示例

```html
<div id="app">
  <!-- 简单文本插值 -->
  <p>用户名: {{ username }}</p>
  
  <!-- 支持表达式 -->
  <p>价格: ¥{{ price }}</p>
  <p>折扣价: ¥{{ price * 0.8 }}</p>
  <p>全名: {{ firstName + ' ' + lastName }}</p>
</div>

<script>
const { createApp } = Vue

createApp({
  data() {
    return {
      username: '张三',
      price: 100,
      firstName: '张',
      lastName: '三'
    }
  }
}).mount('#app')
</script>
```

#### 注意：只能写表达式，不能写语句

```html
<!-- ✓ 正确：这是表达式 -->
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}

<!-- ✗ 错误：这些是语句 -->
{{ var a = 1 }}
{{ if (ok) { return message } }}
```

---

### 2. 原始 HTML 渲染（v-html）

双大括号会将数据解析为纯文本，如果内容是 HTML 字符串，需要使用 `v-html` 指令：

```html
<p>纯文本: {{ rawHtml }}</p>
<p>HTML渲染: <span v-html="rawHtml"></span></p>
```

```javascript
data() {
  return {
    rawHtml: '<span style="color: red">这段文字应该是红色的</span>'
  }
}
```

⚠️ **安全警告**：在网站上动态渲染任意 HTML 是非常危险的，容易导致 XSS 攻击。请确保内容可信。

**生活类比**：`{{ }}` 像复印机（原样打印），`v-html` 像印刷机（解析排版）。复印机安全但死板，印刷机灵活但风险大。

---

### 3. 属性绑定（v-bind）

HTML 属性不能使用双大括号，需要使用 `v-bind` 指令：

```html
<!-- 完整写法 -->
<div v-bind:id="dynamicId"></div>

<!-- 简写（强烈推荐） -->
<div :id="dynamicId"></div>

<!-- 布尔属性 -->
<button :disabled="isDisabled">按钮</button>

<!-- 动态绑定多个属性 -->
<div v-bind="objectOfAttrs"></div>
```

```javascript
data() {
  return {
    dynamicId: 'user-' + 123,
    isDisabled: true,
    objectOfAttrs: {
      id: 'container',
      class: 'wrapper',
      style: 'background-color: red'
    }
  }
}
```

#### 布尔属性

对于 `disabled`、`checked`、`selected` 等布尔属性：
- 值为真值（truthy）：属性存在
- 值为假值（falsy）：属性移除

```html
<!-- 当 isDisabled 为 false 时，disabled 属性会被移除 -->
<button :disabled="isDisabled">点击</button>
```

**生活类比**：属性绑定就像给物品贴标签，`:id` 就是"请在这个位置贴上 id 标签"。

---

### 4. 指令系统（Directives）

指令是带有 `v-` 前缀的特殊属性，Vue 提供了许多内置指令：

| 指令 | 作用 | 类比 |
|------|------|------|
| `v-bind` | 绑定属性 | 给元素贴标签 |
| `v-on` | 监听事件 | 给元素装感应器 |
| `v-if` | 条件渲染 | 开关控制 |
| `v-for` | 列表渲染 | 批量复印 |
| `v-model` | 双向绑定 | 对讲机 |
| `v-show` | 显示/隐藏 | 窗帘 |
| `v-text` | 更新文本 | 文字替换 |
| `v-html` | 更新 HTML | 排版替换 |

#### 指令的参数

有些指令需要一个参数，在指令名后通过一个冒号指明：

```html
<!-- v-bind 绑定 href 属性 -->
<a v-bind:href="url">...</a>
<a :href="url">...</a>

<!-- v-on 监听 click 事件 -->
<button v-on:click="doSomething">...</button>
<button @click="doSomething">...</button>
```

#### 动态参数

可以用方括号括起来的 JavaScript 表达式作为参数：

```html
<!-- attributeName 可以是 'href'、'src'、'title' 等 -->
<a v-bind:[attributeName]="url">...</a>

<!-- 简写 -->
<a :[attributeName]="url">...</a>

<!-- 同样适用于事件 -->
<button v-on:[eventName]="doSomething">...</button>
<button @[eventName]="doSomething">...</button>
```

```javascript
data() {
  return {
    attributeName: 'href',
    eventName: 'click',
    url: 'https://vuejs.org'
  }
}
```

**生活类比**：静态参数是"请绑定 href"，动态参数是"请绑定 attributeName 变量所指的属性"。

---

### 5. 修饰符（Modifiers）

修饰符是以点开头的特殊后缀，用于指出指令应以特殊方式绑定：

```html
<!-- .prevent 修饰符：阻止默认行为 -->
<form @submit.prevent="onSubmit">...</form>

<!-- .stop 修饰符：阻止事件冒泡 -->
<button @click.stop="doSomething">...</button>

<!-- .lazy 修饰符：失去焦点后更新 -->
<input v-model.lazy="msg" />

<!-- .number 修饰符：自动转换为数字 -->
<input v-model.number="age" />

<!-- .trim 修饰符：自动过滤首尾空格 -->
<input v-model.trim="msg" />
```

#### 修饰符可以串联

```html
<!-- 同时阻止冒泡和默认行为 -->
<a @click.stop.prevent="doSomething">...</a>

<!-- 顺序不重要 -->
<a @click.prevent.stop="doSomething">...</a>
```

**生活类比**：修饰符就像给指令加"配件"，`.prevent` 是"加个防误触保护"，`.lazy` 是"加个延迟触发器"。

---

## JavaScript vs TypeScript 对比

| 特性 | JavaScript | TypeScript |
|------|-----------|------------|
| 属性绑定 | `:id="dynamicId"` | `:id="dynamicId"` |
| 类型检查 | 运行时错误 | 编译时检查 |
| 智能提示 | 有限 | 完整的属性和指令提示 |
| 复杂度 | 低 | 中 |

#### TypeScript 优势示例

```typescript
// TypeScript 可以定义数据类型
interface UserData {
  username: string
  price: number
  isDisabled: boolean
}

export default {
  data(): { user: UserData } {
    return {
      user: {
        username: '张三',
        price: 100,
        isDisabled: false
      }
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

创建一个用户信息展示卡片，要求：
1. 使用文本插值显示用户名和年龄
2. 使用 `v-html` 显示一段带有样式的个人简介
3. 使用属性绑定动态设置卡片的背景颜色

### 进阶练习

创建一个动态表单配置器：
1. 使用动态参数 `:type` 让输入框可以在 text、password、email 之间切换
2. 使用修饰符 `.trim` 自动去除输入内容的首尾空格
3. 使用 `.lazy` 让数据在失去焦点后才更新

### 挑战练习

创建一个动态组件渲染器：
1. 使用动态属性绑定（`:[attrName]="value"`）
2. 实现一个可以根据配置动态渲染不同 HTML 元素的组件
3. 支持动态事件绑定（`:@[eventName]="handler"`）

---

## 练习题答案

详见 `practice-solution.html`

---

## 学习目标检查清单

- [ ] 理解文本插值（双大括号）的基本用法
- [ ] 知道何时使用 `v-html` 及其安全风险
- [ ] 掌握 `v-bind` 及其简写 `:`
- [ ] 理解指令的概念和常见指令的作用
- [ ] 掌握指令参数和动态参数的用法
- [ ] 了解常用修饰符的作用（.prevent, .stop, .lazy, .trim, .number）
- [ ] 能够区分 JavaScript 表达式和语句
- [ ] 能够在实际项目中正确运用模板语法

---

## 延伸阅读

- [Vue 官方文档 - 模板语法](https://cn.vuejs.org/guide/essentials/template-syntax.html)
- [Vue 官方文档 - 指令](https://cn.vuejs.org/guide/essentials/template-syntax.html#directives)
