# CSS 入门介绍

**本章目的：学会在网页中引入和使用 CSS 样式，理解 CSS 的基本概念和工作原理**

## 本章目的

学会在网页中引入和使用 CSS 样式，理解 CSS 的基本概念和工作原理

---

## 内容概述

本章节将带你从零开始认识 CSS，学习三种不同的样式引入方式（内联、内部、外部），掌握 CSS 的基础语法和规则，为后续学习打下坚实基础。

---

## 核心概念讲解

### 什么是 CSS？

CSS（Cascading Style Sheets）是层叠样式表，用于描述 HTML 文档的样式。如果把 HTML 比作网页的"骨架"，那么 CSS 就是网页的"皮肤"和"衣服"。

**通俗理解：**
- HTML 负责网页的**结构**（有什么内容）
- CSS 负责网页的**外观**（内容长什么样）

**实际应用场景：**
- 改变文字颜色和大小
- 设置背景图片和颜色
- 调整元素的布局和位置
- 添加动画和交互效果

### CSS 的作用

想象你在装修房子：
- HTML 是房子的建筑结构（墙、地板、屋顶）
- CSS 是装修（油漆、壁纸、家具摆放）

CSS 让你能够：
1. **美化网页**：控制颜色、字体、间距等视觉效果
2. **布局网页**：决定元素在页面上的位置和排列方式
3. **提升体验**：添加动画、过渡效果，让网页更生动

### CSS 的层叠特性

"层叠"是什么意思？就像在画板上画画，新的图层会覆盖旧的图层。CSS 也是如此，当多个样式规则应用于同一个元素时，浏览器会根据特定规则决定最终使用哪个样式。

**生活类比：**
- 就像穿衣服，你可能会穿多层衣服（T恤 + 外套）
- 最外层的衣服（外套）会覆盖里面的衣服（T恤）
- CSS 的层叠就像给网页元素穿衣服，后面的样式规则可能会覆盖前面的

---

## CSS 引入方式详解

### 1. 内联样式（Inline Style）

**概念：**直接在 HTML 标签的 `style` 属性中编写 CSS

**特点：**
- 优先级最高，会覆盖其他样式
- 适合快速测试和特殊情况
- 不利于维护和复用

**代码示例：**
```html
<h1 style="color: blue; font-size: 24px;">这是一行蓝色的大标题</h1>
```

**解释：**
- `style="..."` 是 HTML 标签的属性
- `color: blue` 设置文字颜色为蓝色
- `font-size: 24px` 设置字体大小为 24 像素
- 每条样式之间用分号 `;` 分隔

**实际应用：**
```html
<!-- 临时测试样式 -->
<button style="background-color: green; color: white; padding: 10px;">
  点击我
</button>
```

---

### 2. 内部样式表（Internal Style Sheet）

**概念：**将 CSS 写在 HTML 文件的 `<style>` 标签中，通常放在 `<head>` 部分

**特点：**
- 样式与 HTML 在同一文件中
- 可以在页面内重用样式
- 适合单页面应用
- 维护性优于内联样式

**代码示例：**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>内部样式表演示</title>
  <style>
    .highlight {
      background-color: yellow;
      padding: 10px;
      border: 1px solid orange;
    }

    .title {
      color: #333;
      font-size: 32px;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1 class="title">欢迎学习 CSS</h1>
  <p class="highlight">这是一个高亮的段落</p>
  <p class="highlight">这也是一个高亮的段落</p>
</body>
</html>
```

**解释：**
- `<style>` 标签放在 `<head>` 中
- `.highlight` 是类选择器，可以选中所有 `class="highlight"` 的元素
- 相同的类可以被多个元素使用，实现样式复用

**实际应用：**
```html
<style>
  /* 设置全局样式 */
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
  }

  /* 定义按钮样式 */
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .btn-primary {
    background-color: blue;
    color: white;
  }
</style>
```

---

### 3. 外部样式表（External Style Sheet）

**概念：**将 CSS 写在单独的 `.css` 文件中，通过 `<link>` 标签引入

**特点：**
- 样式与内容完全分离
- 可以在多个页面间复用
- 便于维护和更新
- 有利于浏览器缓存，提升加载速度
- **推荐的生产环境做法**

**代码示例：**

**HTML 文件（index.html）：**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>外部样式表演示</title>
  <!-- 引入外部 CSS 文件 -->
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1 class="title">欢迎学习 CSS</h1>
  <p class="paragraph">这是第一个段落</p>
  <p class="paragraph highlight">这是高亮的段落</p>
  <button class="btn btn-primary">主要按钮</button>
</body>
</html>
```

**CSS 文件（styles.css）：**
```css
/* 设置全局样式 */
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 20px;
}

/* 标题样式 */
.title {
  color: #333;
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
}

/* 段落样式 */
.paragraph {
  color: #666;
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 15px;
}

/* 高亮样式 */
.highlight {
  background-color: yellow;
  padding: 5px 10px;
  border-radius: 3px;
}

/* 按钮样式 */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}
```

**解释：**
- `<link rel="stylesheet" href="styles.css">` 引入外部 CSS 文件
- `rel="stylesheet"` 说明这是一个样式表
- `href="styles.css"` 指定 CSS 文件的路径
- CSS 文件中不需要 `<style>` 标签，直接写样式规则
- `/* ... */` 是 CSS 的注释，用于说明代码

**实际应用：**
```
project/
├── index.html
├── about.html
├── contact.html
└── css/
    └── styles.css  /* 所有页面共享同一个样式表 */
```

---

## CSS 基础语法

### CSS 规则的结构

```css
选择器 {
  属性: 值;
  属性: 值;
}
```

**详细说明：**

1. **选择器（Selector）**：指定要应用样式的 HTML 元素
   - 可以是标签名、类名、ID 等

2. **声明块（Declaration Block）**：用大括号 `{}` 包裹的所有样式规则
   - 包含一个或多个声明

3. **声明（Declaration）**：由属性和值组成，用冒号 `:` 分隔
   - 每个声明以分号 `;` 结尾

**完整示例：**
```css
h1 {
  color: #333;           /* 文字颜色 */
  font-size: 24px;      /* 字体大小 */
  text-align: center;   /* 文本居中 */
  margin-bottom: 20px;   /* 下边距 */
}
```

---

## 常用 CSS 选择器

### 1. 标签选择器

选择所有指定标签的元素

```css
p {
  color: #333;
  font-size: 16px;
}

h1 {
  color: blue;
}
```

**解释：**
- `p` 选择所有 `<p>` 标签
- `h1` 选择所有 `<h1>` 标签

---

### 2. 类选择器（Class Selector）

使用 `.` 符号，选择所有具有指定类名的元素

```css
.highlight {
  background-color: yellow;
  padding: 10px;
}

.text-center {
  text-align: center;
}
```

**HTML 使用：**
```html
<p class="highlight">这个段落会被高亮显示</p>
<p class="text-center">这个段落的文本会居中</p>
<p class="highlight text-center">这个段落同时应用两个类</p>
```

**重要：**
- 一个元素可以有多个类（用空格分隔）
- 多个元素可以有相同的类（实现样式复用）

---

### 3. ID 选择器（ID Selector）

使用 `#` 符号，选择具有指定 ID 的元素

```css
#main-title {
  font-size: 36px;
  color: #2c3e50;
  text-align: center;
}
```

**HTML 使用：**
```html
<h1 id="main-title">这是主标题</h1>
```

**重要：**
- ID 在一个页面中应该是唯一的（不要重复使用）
- 优先级高于类选择器

---

### 4. 通用选择器

使用 `*` 符号，选择所有元素

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

**解释：**
- 选择页面上的所有元素
- 常用于重置默认样式

---

## 常用 CSS 属性

### 文本属性

| 属性 | 说明 | 示例 |
|------|------|------|
| `color` | 文字颜色 | `color: #333;` |
| `font-size` | 字体大小 | `font-size: 16px;` |
| `font-family` | 字体族 | `font-family: Arial, sans-serif;` |
| `text-align` | 文本对齐 | `text-align: center;` |
| `line-height` | 行高 | `line-height: 1.6;` |
| `font-weight` | 字体粗细 | `font-weight: bold;` |

**示例：**
```css
p {
  color: #333;                    /* 深灰色文字 */
  font-size: 16px;                /* 16 像素字体 */
  font-family: Arial, sans-serif; /* 使用 Arial 字体 */
  text-align: justify;            /* 两端对齐 */
  line-height: 1.8;               /* 1.8 倍行高 */
}
```

---

### 背景属性

| 属性 | 说明 | 示例 |
|------|------|------|
| `background-color` | 背景颜色 | `background-color: #f0f0f0;` |
| `background-image` | 背景图片 | `background-image: url('bg.jpg');` |
| `background-size` | 背景尺寸 | `background-size: cover;` |
| `background-repeat` | 是否重复 | `background-repeat: no-repeat;` |

**示例：**
```css
.header {
  background-color: #3498db;           /* 蓝色背景 */
}

.hero {
  background-image: url('hero.jpg');   /* 背景图片 */
  background-size: cover;              /* 覆盖整个区域 */
  background-repeat: no-repeat;        /* 不重复 */
  background-position: center;         /* 居中显示 */
}
```

---

### 盒模型属性

| 属性 | 说明 | 示例 |
|------|------|------|
| `width` | 宽度 | `width: 100%;` |
| `height` | 高度 | `height: 200px;` |
| `margin` | 外边距 | `margin: 20px;` |
| `padding` | 内边距 | `padding: 15px;` |
| `border` | 边框 | `border: 1px solid #ccc;` |

**示例：**
```css
.box {
  width: 300px;                     /* 宽度 300 像素 */
  height: 200px;                    /* 高度 200 像素 */
  margin: 20px auto;                /* 上下 20px，左右自动居中 */
  padding: 20px;                     /* 内边距 20px */
  border: 2px solid #333;           /* 2px 实线黑色边框 */
  background-color: #fff;           /* 白色背景 */
}
```

---

## CSS 引入方式比较

| 方式 | 优先级 | 维护性 | 复用性 | 适用场景 | 推荐度 |
|------|--------|--------|--------|----------|--------|
| **内联样式** | 最高 | 差 | 差 | 快速测试、特殊情况 | ⭐ |
| **内部样式表** | 中 | 中 | 中 | 单页面应用 | ⭐⭐⭐ |
| **外部样式表** | 低 | 好 | 好 | 多页面项目 | ⭐⭐⭐⭐⭐ |

**优先级规则（从高到低）：**
1. `!important`（强制覆盖，慎用）
2. 内联样式（inline style）
3. ID 选择器
4. 类选择器、属性选择器、伪类
5. 标签选择器、伪元素

---

## 文件说明

### inline.html
演示内联样式的使用方法，展示了如何直接在 HTML 标签中添加样式。

### internal.html
演示内部样式表的使用方法，展示了如何在 `<style>` 标签中编写 CSS。

### external.html
演示外部样式表的使用方法，展示了如何通过 `<link>` 标签引入独立的 CSS 文件。

### styles.css
外部样式表文件，包含完整的样式定义，展示了模块化 CSS 的最佳实践。

### practice-solution.html
基础练习参考答案，包含三种样式引入方式与按钮示例。

### practice-solution.css
practice-solution.html 使用的外部样式表。

---

## 最佳实践

### ✅ 推荐的做法

1. **优先使用外部样式表**
   ```css
   /* styles.css */
   body {
     font-family: Arial, sans-serif;
   }
   ```

2. **使用语义化的类名**
   ```css
   .btn-primary { /* 好 - 有意义的名称 */
     background-color: blue;
   }

   .red-button { /* 差 - 描述外观而非功能 */
     background-color: red;
   }
   ```

3. **保持 CSS 代码整洁**
   ```css
   /* 好的代码风格 */
   .container {
     max-width: 1200px;
     margin: 0 auto;
     padding: 20px;
   }
   ```

4. **使用注释说明代码**
   ```css
   /* 按钮基础样式 */
   .btn {
     padding: 10px 20px;
    border: none;
   }

   /* 主要按钮样式 */
   .btn-primary {
     background-color: #3498db;
     color: white;
   }
   ```

5. **遵循命名规范**
   ```css
   /* 使用小写字母和连字符 */
   .main-content { }
   .nav-bar { }
   .search-box { }
   ```

### ❌ 避免的做法

1. **避免使用内联样式（除非特殊需要）**
   ```html
   <!-- 差 -->
   <div style="color: red; font-size: 20px;">

   <!-- 好 -->
   <div class="error-message">
   ```

2. **避免使用 `!important`**
   ```css
   /* 差 - 会覆盖所有其他样式 */
   .text {
     color: red !important;
   }

   /* 好 - 使用更高的优先级 */
   .highlight-text {
     color: red;
   }
   ```

3. **避免使用 ID 选择器进行样式设置**
   ```css
   /* 差 - ID 优先级太高，难以覆盖 */
   #header {
     background-color: blue;
   }

   /* 好 - 使用类选择器 */
   .site-header {
     background-color: blue;
   }
   ```

4. **避免过深的嵌套**
   ```css
   /* 差 - 选择器太复杂 */
   .container .content .sidebar .widget h3 {
     font-size: 18px;
   }

   /* 好 - 扁平化的选择器 */
   .widget-title {
     font-size: 18px;
   }
   ```

---

## 练习题

### 基础练习

**题目 1：创建一个个人简介页面**
- 使用外部样式表
- 包含标题、段落、图片
- 设置合适的颜色、字体大小和间距
- 要求页面美观、易读

**题目 2：练习三种样式引入方式**
- 创建三个 HTML 文件
- 分别使用内联、内部、外部样式表
- 实现相同的视觉效果
- 对比三种方式的差异

**题目 3：创建一个简单的按钮**
- 使用类选择器
- 设置背景颜色、文字颜色、内边距
- 添加圆角和边框
- 实现按钮的悬停效果

---

### 进阶练习

**题目 1：创建一个卡片组件**
- 使用外部样式表
- 包含标题、图片、描述文本
- 添加阴影和圆角效果
- 实现悬停时卡片上浮的动画效果

**题目 2：创建一个导航栏**
- 使用多个类选择器
- 包含 Logo、导航链接、按钮
- 实现水平和居中布局
- 添加悬停效果

**题目 3：创建一个简单的布局**
- 使用盒模型属性
- 创建头部、主要内容、侧边栏、底部
- 使用不同的背景颜色区分区域
- 确保布局合理、美观

---

### 挑战练习

**题目 1：创建一个产品展示页面**
- 使用外部样式表和多个 CSS 文件（按组件组织）
- 包含导航栏、英雄区域、特性列表、产品卡片
- 实现响应式设计（适配不同屏幕尺寸）
- 添加渐变背景和动画效果

**题目 2：创建一个个人作品集**
- 展示多个项目卡片
- 使用统一的设计风格
- 添加过滤功能（通过类名实现）
- 实现流畅的交互效果

**题目 3：创建一个登录页面**
- 包含 Logo、输入框、按钮
- 实现表单验证样式的视觉效果
- 添加背景图片和遮罩层
- 实现输入框的焦点效果

---

## 学习目标检查清单

完成本章节学习后，检查你是否已经掌握以下内容：

### 基础概念
- [ ] 理解 CSS 的作用和重要性
- [ ] 知道 CSS 和 HTML 的关系
- [ ] 理解 CSS 的层叠特性

### 样式引入方式
- [ ] 掌握内联样式的使用方法
- [ ] 掌握内部样式表的使用方法
- [ ] 掌握外部样式表的使用方法
- [ ] 知道三种引入方式的优缺点
- [ ] 知道何时使用哪种引入方式

### CSS 语法
- [ ] 理解 CSS 规则的基本结构
- [ ] 掌握选择器、属性、值的写法
- [ ] 知道如何编写 CSS 注释

### 选择器
- [ ] 掌握标签选择器的使用
- [ ] 掌握类选择器的使用
- [ ] 掌握 ID 选择器的使用
- [ ] 了解通用选择器的作用
- [ ] 理解类选择器和 ID 选择器的区别

### 常用属性
- [ ] 掌握文本相关属性（color、font-size 等）
- [ ] 掌握背景相关属性（background-color 等）
- [ ] 掌握盒模型相关属性（width、margin 等）
- [ ] 了解更多 CSS 属性的使用方法

### 实践能力
- [ ] 能够独立创建外部样式表文件
- [ ] 能够在 HTML 中正确引入样式表
- [ ] 能够为网页元素添加基本样式
- [ ] 能够创建简单的组件（按钮、卡片等）
- [ ] 能够使用浏览器开发者工具查看和修改样式

---

## 学习建议

1. **从基础开始**
   - 先掌握基本语法和常用属性
   - 不要一开始就追求复杂的效果

2. **多练习**
   - 通过实际项目练习巩固知识
   - 尝试复制你喜欢的网站样式

3. **参考优秀案例**
   - 学习他人的代码和设计思路
   - 分析优秀网站的 CSS 实现

4. **使用开发者工具**
   - Chrome DevTools 是调试 CSS 的利器
   - 学会使用 Elements 面板查看样式

5. **逐步深入**
   - 在掌握基础后学习高级特性
   - 不要急于求成，循序渐进

---

## 相关资源

- [MDN CSS 参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS)
- [CSS Tricks](https://css-tricks.com/)
- [W3Schools CSS 教程](https://www.w3schools.com/css/)

---

## 下一步

完成这个模块后，建议继续学习：

- 🎯 **[CSS 选择器 (02-selectors)](../02-selectors/)** - 学习更强大的选择器技巧
- 📦 **[CSS 盒模型 (03-box-model)](../03-box-model/)** - 理解网页布局的基础
- 🎨 **[CSS 布局 (04-layout)](../04-layout/)** - 掌握现代布局技术

---

## 总结

CSS 是前端开发的核心技术之一。掌握 CSS 的基础知识和最佳实践，是创建美观、用户友好的网页的关键。通过本模块的学习，你已经：

1. ✅ 理解了 CSS 的作用和工作原理
2. ✅ 掌握了三种样式引入方式
3. ✅ 学会了 CSS 的基础语法
4. ✅ 能够使用常用选择器和属性

接下来，继续深入学习 CSS 选择器，你将能够更精确地控制页面样式！
