# CSS 选择器

**本章目的：掌握各种 CSS 选择器的使用方法，能够精确选择目标元素并应用样式**

## 本章目的

掌握各种 CSS 选择器的使用方法，能够精确选择目标元素并应用样式

---

## 内容概述

本章节将带你深入学习 CSS 选择器，包括基础选择器、组合选择器、伪类和伪元素选择器，以及选择器优先级和特异度的计算规则。通过学习，你将能够精确选择页面上的任意元素，并理解 CSS 样式的层叠和继承机制。

---

## 核心概念讲解

### 什么是 CSS 选择器？

CSS 选择器用于选择要应用样式的 HTML 元素。如果把 CSS 样式比作"指令"，那么选择器就是"接收这些指令的对象"。

**通俗理解：**
- 选择器就像"点名"，告诉浏览器要给"谁"（哪个元素）应用样式
- 不同的选择器有不同的"点名方式"

**生活类比：**
- 标签选择器：叫"所有学生"（所有 `<p>` 元素）
- 类选择器：叫"穿红色衣服的同学"（所有 `.red` 元素）
- ID 选择器：叫"学号 001 的同学"（`#student001` 元素）
- 组合选择器：叫"三班的班长"（组合条件）

**实际应用场景：**
- 想改变所有段落的字体 → 使用标签选择器
- 想高亮特定的几个元素 → 使用类选择器
- 想样式化页面的唯一元素（如 Logo）→ 使用 ID 选择器
- 想样式化某个容器内的元素 → 使用组合选择器

---

### 选择器优先级

当多个选择器选中同一个元素，并设置了不同的样式时，浏览器会根据"优先级"决定使用哪个样式。这就像"优先级规则"，决定谁的指令更重要。

**通俗理解：**
- 优先级高的样式会覆盖优先级低的样式
- 这就像"领导层级"，职级高的人的指令优先执行

**优先级规则（从高到低）：**
1. `!important`（强制最高，慎用）
2. 内联样式（style 属性）
3. ID 选择器
4. 类选择器、属性选择器、伪类
5. 标签选择器、伪元素

**计算方式：**
- 每个内联样式：1000 分
- 每个 ID 选择器：100 分
- 每个类选择器、属性选择器、伪类：10 分
- 每个标签选择器、伪元素：1 分

**示例：**
```css
/* 优先级：0,0,0,1（1 分）- 只有标签选择器 */
p {
  color: black;
}

/* 优先级：0,0,1,0（10 分）- 只有类选择器 */
.highlight {
  color: blue;
}

/* 优先级：0,1,0,0（100 分）- 只有 ID 选择器 */
#main {
  color: red;
}

/* 优先级：0,0,1,1（11 分）- 类 + 标签 */
p.highlight {
  color: green;
}

/* 优先级：0,1,0,1（101 分）- ID + 标签 */
#main.highlight {
  color: purple;
}
```

**实际应用：**
- 想覆盖某个样式时，提高选择器的优先级
- 避免使用 `!important`，除非绝对必要
- 尽量使用类选择器，优先级适中且灵活

---

## 选择器分类详解

### 1. 基础选择器

#### 标签选择器（Element Selector）

**概念：**直接使用 HTML 标签名选择元素

**语法：**
```css
标签名 {
  属性: 值;
}
```

**示例：**
```css
p {
  color: #333;
  font-size: 16px;
}

h1 {
  color: blue;
  text-align: center;
}
```

**解释：**
- `p` 选择所有 `<p>` 段落标签
- `h1` 选择所有 `<h1>` 一级标题标签

**实际应用：**
```css
/* 设置全局字体 */
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

/* 所有链接样式 */
a {
  color: #3498db;
  text-decoration: none;
}

/* 所有列表项 */
li {
  margin-bottom: 10px;
}
```

**使用场景：**
- 设置全局样式（如 body、html）
- 样式化所有同类型元素（如所有段落、所有链接）

---

#### 类选择器（Class Selector）

**概念：**使用 `.` 符号，选择所有具有指定类名的元素

**语法：**
```css
.类名 {
  属性: 值;
}
```

**示例：**
```css
.highlight {
  background-color: yellow;
  padding: 10px;
}

.text-center {
  text-align: center;
}

.btn-primary {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}
```

**HTML 使用：**
```html
<p class="highlight">这是一个高亮的段落</p>
<p class="text-center">这个段落的文本会居中</p>
<p class="highlight text-center">这个段落同时应用两个类</p>
<button class="btn-primary">主要按钮</button>
```

**解释：**
- `.highlight` 选择所有 `class="highlight"` 的元素
- 一个元素可以有多个类（用空格分隔）
- 多个元素可以有相同的类

**实际应用：**
```css
/* 错误消息 */
.error-message {
  color: red;
  background-color: #fee;
  padding: 10px;
  border: 1px solid #fcc;
  border-radius: 5px;
}

/* 成功消息 */
.success-message {
  color: green;
  background-color: #efe;
  padding: 10px;
  border: 1px solid #cfc;
  border-radius: 5px;
}

/* 卡片容器 */
.card {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
```

**使用场景：**
- 样式化特定的元素组
- 创建可复用的组件样式
- 标记元素的不同状态（如 `.active`、`.disabled`）

---

#### ID 选择器（ID Selector）

**概念：**使用 `#` 符号，选择具有指定 ID 的元素

**语法：**
```css
#ID名 {
  属性: 值;
}
```

**示例：**
```css
#main-title {
  font-size: 36px;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
}

#logo {
  width: 200px;
  height: 50px;
}
```

**HTML 使用：**
```html
<h1 id="main-title">这是主标题</h1>
<div id="logo">网站 Logo</div>
```

**解释：**
- `#main-title` 选择 `id="main-title"` 的元素
- ID 在一个页面中应该是唯一的

**实际应用：**
```css
/* 页面主要容器 */
#main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 网站头部 */
#site-header {
  background-color: #333;
  color: white;
  padding: 20px;
}

/* 网站底部 */
#site-footer {
  background-color: #f5f5f5;
  padding: 30px 0;
  text-align: center;
}
```

**使用场景：**
- 页面唯一的元素（如 Header、Footer、Sidebar）
- JavaScript 钩子（通过 ID 获取元素）
- 需要高优先级的样式（ID 选择器优先级高于类选择器）

**注意：**虽然 ID 优先级高，但建议主要用于唯一元素和 JavaScript，样式化时优先使用类选择器。

---

#### 通用选择器（Universal Selector）

**概念：**使用 `*` 符号，选择页面上的所有元素

**语法：**
```css
* {
  属性: 值;
}
```

**示例：**
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
- 性能开销较大，慎用

**实际应用：**
```css
/* CSS Reset - 重置默认样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 选择某个容器内的所有元素 */
.container * {
  font-family: Arial, sans-serif;
}
```

**使用场景：**
- 重置浏览器的默认样式
- 设置全局样式
- 选择某个容器内的所有元素

---

### 2. 组合选择器（Combinators）

#### 后代选择器（Descendant Selector）

**概念：**选择指定元素的所有后代元素（包含子元素、孙元素等）

**语法：**
```css
父元素 后代元素 {
  属性: 值;
}
```

**示例：**
```css
.container p {
  margin: 10px 0;
  line-height: 1.6;
}

/* 选择所有列表项 */
ul li {
  padding: 5px 0;
}

/* 选择导航栏内的所有链接 */
nav a {
  color: white;
  text-decoration: none;
}
```

**HTML 结构：**
```html
<div class="container">
  <p>这是第一段</p>
  <div>
    <p>这是第二段（嵌套在 div 中）</p>
  </div>
</div>
```

**解释：**
- `.container p` 选择 `.container` 内的所有 `<p>` 元素
- 不管嵌套多深，只要是后代都会被选中

**实际应用：**
```css
/* 文章内容中的所有段落 */
.article-content p {
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 15px;
}

/* 侧边栏中的所有链接 */
.sidebar a {
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
}

.sidebar a:hover {
  background-color: #f5f5f5;
}
```

**使用场景：**
- 选择某个容器内的特定元素
- 为不同区域的相同元素设置不同样式

---

#### 子选择器（Child Selector）

**概念：**只选择指定元素的直接子元素（不包含孙元素）

**语法：**
```css
父元素 > 子元素 {
  属性: 值;
}
```

**示例：**
```css
.container > p {
  color: blue;
}

ul > li {
  list-style: none;
}
```

**HTML 结构：**
```html
<div class="container">
  <p>这是直接子元素（会被选中）</p>
  <div>
    <p>这是孙元素（不会被选中）</p>
  </div>
</div>
```

**解释：**
- `.container > p` 只选择 `.container` 的直接子 `<p>` 元素
- 孙元素不会被选中

**实际应用：**
```css
/* 导航菜单的直接子项 */
.nav-menu > li {
  display: inline-block;
  margin-right: 20px;
}

/* 容器的直接子元素 */
.grid-container > .grid-item {
  flex: 1;
  padding: 10px;
}
```

**使用场景：**
- 只选择直接子元素
- 避免影响更深层的元素
- 创建特定的布局结构

---

#### 相邻兄弟选择器（Adjacent Sibling Selector）

**概念：**选择紧跟在指定元素后面的第一个兄弟元素

**语法：**
```css
元素1 + 元素2 {
  属性: 值;
}
```

**示例：**
```css
h1 + p {
  font-weight: bold;
  font-size: 18px;
}

.button + .tooltip {
  display: block;
  margin-top: 5px;
}
```

**HTML 结构：**
```html
<h1>标题</h1>
<p>这个段落会被选中（紧跟在 h1 后面）</p>
<p>这个段落不会被选中（不是紧跟在 h1 后面）</p>
<div>这个 div 不会被选中</div>
```

**解释：**
- `h1 + p` 选择紧跟在 `<h1>` 后面的第一个 `<p>` 元素
- 只选择第一个相邻的兄弟元素

**实际应用：**
```css
/* 标题后的第一个段落 */
h1 + p {
  font-size: 18px;
  font-weight: bold;
  color: #666;
}

/* 表单后的错误提示 */
input + .error-message {
  display: none;
}

input:invalid + .error-message {
  display: block;
  color: red;
}
```

**使用场景：**
- 为特定元素后的第一个兄弟元素设置样式
- 创建相邻元素的交互效果
- 实现条件样式（如表单验证提示）

---

#### 通用兄弟选择器（General Sibling Selector）

**概念：**选择指定元素后面的所有兄弟元素

**语法：**
```css
元素1 ~ 元素2 {
  属性: 值;
}
```

**示例：**
```css
h1 ~ p {
  margin-top: 20px;
}

.active ~ .item {
  opacity: 0.5;
}
```

**HTML 结构：**
```html
<h1>标题</h1>
<p>这个段落会被选中</p>
<p>这个段落也会被选中</p>
<div>这个 div 不会被选中</div>
<p>这个段落也会被选中</p>
```

**解释：**
- `h1 ~ p` 选择 `<h1>` 后面的所有 `<p>` 元素
- 不管中间隔了多少其他元素

**实际应用：**
```css
/* 标题后的所有段落 */
h1 ~ p {
  margin-top: 20px;
}

/* 被激活元素后的所有项 */
.active ~ .item {
  opacity: 0.5;
  pointer-events: none;
}

/* 选中复选框后的标签 */
input:checked ~ label {
  color: green;
}
```

**使用场景：**
- 为特定元素后的所有兄弟元素设置样式
- 实现批量状态变化
- 创建交互效果（如选中一项后其他项变灰）

---

### 3. 属性选择器（Attribute Selector）

#### 基本属性选择器

**概念：**根据元素的属性选择元素

**语法：**
```css
[属性名] {
  属性: 值;
}
```

**示例：**
```css
/* 选择所有有 title 属性的元素 */
[title] {
  border: 1px solid blue;
}

/* 选择所有有 target 属性的链接 */
a[target] {
  color: red;
}

/* 选择所有 type 为 text 的输入框 */
input[type="text"] {
  border: 1px solid #ccc;
}
```

**HTML 使用：**
```html
<div title="这是一个提示">悬停查看提示</div>
<a href="https://example.com" target="_blank">在新窗口打开</a>
<input type="text" placeholder="请输入文本">
<input type="password" placeholder="请输入密码">
```

---

#### 属性值匹配选择器

**1. 完全匹配（=）**
```css
input[type="text"] {
  border: 1px solid #ccc;
}
```

**2. 开头匹配（^=）**
```css
/* href 以 https 开头的链接 */
a[href^="https"] {
  color: green;
}

/* class 以 btn 开头的元素 */
div[class^="btn"] {
  padding: 10px;
}
```

**3. 结尾匹配（$=）**
```css
/* href 以 .pdf 结尾的链接 */
a[href$=".pdf"] {
  color: red;
}

/* class 以 -active 结尾的元素 */
div[class$="-active"] {
  background-color: yellow;
}
```

**4. 包含匹配（*=）**
```css
/* href 包含 example 的链接 */
a[href*="example"] {
  color: blue;
}

/* class 包含 active 的元素 */
div[class*="active"] {
  font-weight: bold;
}
```

**5. 词匹配（~=）**
```css
/* class 包含 active 这个单词（用空格分隔） */
div[class~="active"] {
  background-color: green;
}
```

**实际应用：**
```css
/* 外部链接 */
a[href^="http"] {
  color: #3498db;
}

/* 内部链接 */
a[href^="/"] {
  color: #333;
}

/* PDF 文件链接 */
a[href$=".pdf"] {
  background-color: #fee;
  padding: 2px 6px;
  border-radius: 3px;
}

/* 必填表单字段 */
input[required] {
  border-left: 3px solid red;
}

/* 只读表单字段 */
input[readonly] {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
```

---

### 4. 伪类选择器（Pseudo-classes）

#### 动态伪类

**1. :hover - 鼠标悬停**
```css
a:hover {
  color: red;
}

button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}
```

**使用场景：**
- 链接悬停效果
- 按钮悬停效果
- 卡片悬停效果

---

**2. :active - 激活状态（鼠标按下时）**
```css
button:active {
  transform: scale(0.98);
}

a:active {
  color: orange;
}
```

**使用场景：**
- 按钮点击效果
- 链接点击效果

---

**3. :focus - 获得焦点**
```css
input:focus {
  outline: 2px solid blue;
  border-color: blue;
}

button:focus {
  outline: 2px solid #3498db;
  outline-offset: 2px;
}
```

**使用场景：**
- 表单输入框焦点样式
- 可访问性（键盘导航）

---

#### 结构性伪类

**1. :first-child - 第一个子元素**
```css
li:first-child {
  font-weight: bold;
}

p:first-child {
  margin-top: 0;
}
```

---

**2. :last-child - 最后一个子元素**
```css
li:last-child {
  margin-bottom: 0;
  border-bottom: none;
}
```

---

**3. :nth-child(n) - 第 n 个子元素**
```css
/* 选择第 3 个元素 */
li:nth-child(3) {
  color: red;
}

/* 选择偶数元素 */
li:nth-child(even) {
  background-color: #f0f0f0;
}

/* 选择奇数元素 */
li:nth-child(odd) {
  background-color: #fff;
}

/* 选择前 3 个元素 */
li:nth-child(-n+3) {
  color: blue;
}

/* 选择从第 3 个开始的所有元素 */
li:nth-child(n+3) {
  color: green;
}

/* 选择每 3 个元素 */
li:nth-child(3n) {
  font-weight: bold;
}
```

---

**4. :first-of-type - 同类型中的第一个**
```css
/* 选择第一个段落（不管前面有什么元素）*/
p:first-of-type {
  font-size: 18px;
  font-weight: bold;
}
```

---

**5. :last-of-type - 同类型中的最后一个**
```css
p:last-of-type {
  margin-bottom: 0;
}
```

---

#### 表单伪类

**1. :checked - 选中状态**
```css
input:checked + label {
  color: blue;
  font-weight: bold;
}

/* 自定义复选框样式 */
input[type="checkbox"] {
  display: none;
}

input[type="checkbox"] + label {
  cursor: pointer;
}

input[type="checkbox"] + label::before {
  content: "☐";
  margin-right: 5px;
}

input[type="checkbox"]:checked + label::before {
  content: "☑";
}
```

---

**2. :disabled - 禁用状态**
```css
input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  color: #999;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

**3. :required - 必填字段**
```css
input:required {
  border-left: 3px solid red;
}

input:required::after {
  content: " *";
  color: red;
}
```

---

**4. :valid - 有效状态**
```css
input:valid {
  border-color: green;
}
```

---

**5. :invalid - 无效状态**
```css
input:invalid {
  border-color: red;
}
```

---

#### 否定伪类

**1. :not() - 排除特定元素**
```css
/* 选择所有段落，除了 .special 类的 */
p:not(.special) {
  color: #333;
}

/* 选择所有链接，除了外部链接 */
a:not([href^="http"]) {
  color: #333;
}

/* 选择所有元素，除了最后一个 */
li:not(:last-child) {
  margin-bottom: 10px;
}
```

---

### 5. 伪元素选择器（Pseudo-elements）

**::before - 元素前面**
```css
p::before {
  content: "→ ";
  color: blue;
  font-weight: bold;
}

.icon::before {
  content: "★";
  color: gold;
  margin-right: 5px;
}
```

---

**::after - 元素后面**
```css
p::after {
  content: " ←";
  color: red;
}

.required::after {
  content: " *";
  color: red;
}
```

---

**::selection - 选中的文本**
```css
::selection {
  background-color: yellow;
  color: black;
}
```

---

**::first-letter - 第一个字母**
```css
p::first-letter {
  font-size: 32px;
  color: #3498db;
  float: left;
  margin-right: 10px;
}
```

---

**::first-line - 第一行**
```css
p::first-line {
  font-weight: bold;
  color: #333;
}
```

---

## 实用技巧

### 1. 选择器分组

**概念：**多个选择器共享相同样式时，用逗号分隔

```css
h1, h2, h3 {
  font-family: Arial, sans-serif;
  color: #333;
  margin-top: 0;
}

.btn-primary, .btn-secondary, .btn-tertiary {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
```

**实际应用：**
```css
/* 所有标题 */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-weight: bold;
  line-height: 1.2;
}

/* 所有按钮 */
.btn, .button {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

/* 所有卡片 */
.card, .panel, .box {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
```

---

### 2. 上下文选择器

**概念：**结合父元素和子元素创建更精确的选择器

```css
/* 文章内容中的段落 */
.article p {
  line-height: 1.8;
  margin-bottom: 15px;
}

/* 侧边栏中的链接 */
.sidebar a {
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
  border-bottom: 1px solid #eee;
}

/* 导航菜单中的链接 */
.nav-menu a {
  color: white;
  padding: 10px 15px;
  display: inline-block;
}
```

**实际应用：**
```css
/* 博客文章 */
.blog-post p {
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 15px;
}

.blog-post h2 {
  margin-top: 30px;
  margin-bottom: 15px;
}

.blog-post img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin: 20px 0;
}
```

---

### 3. 状态选择器

**概念：**为元素的不同状态设置样式

```css
/* 链接的所有状态 */
a {
  color: #3498db;
  text-decoration: none;
  transition: all 0.3s ease;
}

a:hover {
  color: #2980b9;
  text-decoration: underline;
}

a:active {
  color: #1a5276;
}

a:focus {
  outline: 2px solid #3498db;
  outline-offset: 2px;
}
```

**实际应用：**
```css
/* 按钮 */
.button {
  background-color: #3498db;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.button:active {
  transform: translateY(0);
  box-shadow: 0 2px 5px rgba(52, 152, 219, 0.3);
}

.button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}
```

---

### 4. 结构化选择器

**概念：**根据元素在文档中的位置进行选择

```css
/* 选择第 3 个元素 */
li:nth-child(3) {
  color: red;
}

/* 选择偶数元素 */
li:nth-child(even) {
  background-color: #f0f0f0;
}

/* 选择最后 3 个元素 */
li:nth-last-child(-n+3) {
  color: blue;
}

/* 选择唯一子元素 */
div:only-child {
  width: 100%;
}
```

**实际应用：**
```css
/* 斑马纹表格 */
tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* 列表的第一个和最后一个 */
li:first-child {
  border-top: none;
}

li:last-child {
  border-bottom: none;
}

/* 每 4 个元素换行（Grid 布局） */
.grid-item:nth-child(4n+1) {
  grid-column: 1;
}
```

---

## 文件说明

### basic.html
演示基础选择器的使用，包括：
- 标签选择器
- 类选择器
- ID 选择器
- 通用选择器

**核心概念：**
- 标签选择器：直接使用 HTML 标签名
- 类选择器：使用 `.classname` 语法
- ID 选择器：使用 `#idname` 语法
- 通用选择器：`*` 选择所有元素

---

### combinators.html
演示组合选择器的使用，包括：
- 后代选择器（空格）
- 子选择器（`>`）
- 相邻兄弟选择器（`+`）
- 通用兄弟选择器（`~`）

**核心概念：**
- 后代选择器：选择所有后代元素
- 子选择器：仅选择直接子元素
- 兄弟选择器：选择同级元素

---

### pseudo.html
演示伪类和伪元素选择器，包括：
- 动态伪类（`:hover`, `:active`, `:focus`）
- 结构性伪类（`:first-child`, `:last-child`, `:nth-child`）
- 表单伪类（`:checked`, `:disabled`, `:required`）
- 伪元素（`::before`, `::after`, `::selection`）

**核心概念：**
- 伪类：选择元素的特定状态
- 伪元素：创建虚拟元素并为其添加样式

---

### practice-solution.html
基础练习参考答案，包含基础选择器、组合选择器与伪类示例。

---

## 常见错误

### 1. 过度依赖标签选择器

```css
/* 差 - 选择器太长，难以维护 */
.container .content .sidebar .widget h3 {
  font-size: 18px;
}

/* 好 - 使用语义化的类名 */
.widget-title {
  font-size: 18px;
}
```

---

### 2. 选择器过于复杂

```css
/* 差 - 选择器过于复杂 */
.container > div:nth-child(2n+1) > ul > li:first-child > a {
  color: red;
}

/* 好 - 简化为类选择器 */
.odd-item-link {
  color: red;
}
```

---

### 3. 忽略优先级

```css
/* 可能不生效 - 优先级不够 */
p {
  color: red !important;
}

/* 更好的方式 - 使用更高优先级的选择器 */
.highlight-text {
  color: red;
}
```

---

### 4. 滥用 ID 选择器

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

---

### 5. 滥用 `!important`

```css
/* 差 - 破坏了优先级规则 */
.text {
  color: red !important;
}

/* 好 - 通过提高选择器优先级来实现 */
.container .text.highlight {
  color: red;
}
```

---

## 最佳实践

### ✅ 推荐的做法

1. **使用语义化的类名**
   ```css
   .btn-primary { /* 好 - 描述功能 */
     background-color: blue;
   }

   .red-button { /* 差 - 描述外观 */
     background-color: red;
   }
   ```

2. **保持选择器简单**
   ```css
   .card-title { /* 好 - 简单清晰 */
     font-size: 18px;
   }

   .container .card .header h2 { /* 差 - 过于复杂 */
     font-size: 18px;
   }
   ```

3. **合理使用 ID 选择器**
   ```css
   /* ID 应该用于唯一元素 */
   #site-header {
     position: relative;
   }

   /* 样式化时优先使用类选择器 */
   .site-header {
     background-color: blue;
   }
   ```

4. **避免 `!important`**
   ```css
   /* 差 */
   .text {
     color: red !important;
   }

   /* 好 - 使用更高的优先级 */
   .highlight-text {
     color: red;
   }
   ```

5. **使用 BEM 等命名规范**
   ```css
   /* BEM 命名规范 */
   .card { }
   .card__title { }
   .card__body { }
   .card--featured { }
   ```

---

## 练习题

### 基础练习

**题目 1：使用基础选择器样式化页面**
- 使用标签选择器设置所有段落的字体大小和行高
- 使用类选择器创建三个不同样式的按钮（主要、次要、警告）
- 使用 ID 选择器样式化页面的唯一元素（如 Logo）
- 使用通用选择器重置默认的外边距和内边距

**题目 2：使用组合选择器**
- 创建一个导航菜单，使用子选择器样式化菜单项
- 创建一个文章容器，使用后代选择器样式化其中的段落和标题
- 使用相邻兄弟选择器样式化标题后的第一个段落
- 使用通用兄弟选择器样式化激活项后的所有项

**题目 3：使用伪类**
- 为链接添加悬停、激活、焦点状态样式
- 使用结构性伪类样式化列表的奇偶项
- 为表单输入框添加必填、有效、无效状态的样式
- 使用否定伪类排除特定元素的样式

---

### 进阶练习

**题目 1：创建一个卡片组件**
- 使用类选择器定义卡片的基本样式
- 使用伪类实现卡片的悬停效果（上浮、阴影变化）
- 使用伪元素在卡片上添加装饰元素
- 使用组合选择器样式化卡片内部的不同元素

**题目 2：创建一个导航栏**
- 使用子选择器样式化导航菜单项
- 使用伪类实现悬停和激活状态
- 使用伪元素添加下拉箭头指示器
- 使用属性选择器样式化外部链接

**题目 3：创建一个表格**
- 使用结构性伪类实现斑马纹效果
- 使用伪类样式化表头
- 使用伪元素添加排序指示器
- 使用组合选择器样式化表格单元格

---

### 挑战练习

**题目 1：创建一个复杂的表单**
- 使用类选择器定义不同类型的输入框样式
- 使用表单伪类实现必填、有效、无效、禁用状态的视觉反馈
- 使用伪类和伪元素自定义复选框和单选按钮的样式
- 使用组合选择器样式化表单组和错误消息

**题目 2：创建一个交互式组件库**
- 创建按钮组、卡片组、标签组等组件
- 使用伪类实现各种交互效果（悬停、激活、焦点）
- 使用伪元素创建装饰性和功能性元素
- 使用 BEM 命名规范组织选择器

**题目 3：创建一个响应式布局**
- 使用媒体查询和结构性伪类创建响应式网格布局
- 使用伪类和伪元素实现响应式导航菜单
- 使用组合选择器样式化不同屏幕尺寸下的元素
- 实现流畅的过渡和动画效果

---

## 学习目标检查清单

完成本章节学习后，检查你是否已经掌握以下内容：

### 基础选择器
- [ ] 掌握标签选择器的使用方法
- [ ] 掌握类选择器的使用方法
- [ ] 掌握 ID 选择器的使用方法
- [ ] 了解通用选择器的作用
- [ ] 知道各类基础选择器的适用场景

### 组合选择器
- [ ] 掌握后代选择器的使用方法
- [ ] 掌握子选择器的使用方法
- [ ] 掌握相邻兄弟选择器的使用方法
- [ ] 掌握通用兄弟选择器的使用方法
- [ ] 理解不同组合选择器的区别

### 属性选择器
- [ ] 掌握基本属性选择器的使用方法
- [ ] 掌握属性值匹配选择器（^=, $=, *=, ~=）
- [ ] 知道属性选择器的实际应用场景

### 伪类选择器
- [ ] 掌握动态伪类（:hover, :active, :focus）
- [ ] 掌握结构性伪类（:first-child, :nth-child 等）
- [ ] 掌握表单伪类（:checked, :disabled, :required 等）
- [ ] 掌握否定伪类（:not()）
- [ ] 知道伪类的实际应用场景

### 伪元素选择器
- [ ] 掌握常用伪元素（::before, ::after, ::selection）
- [ ] 理解伪元素的实际应用场景
- [ ] 知道如何使用伪元素创建装饰性元素

### 选择器优先级
- [ ] 理解选择器优先级的计算规则
- [ ] 知道如何提高选择器的优先级
- [ ] 了解特异度的概念
- [ ] 能够解决选择器冲突问题

### 实践能力
- [ ] 能够熟练使用各种选择器
- [ ] 能够根据需求选择合适的选择器
- [ ] 能够创建精确的选择器组合
- [ ] 能够解决样式冲突问题
- [ ] 能够使用伪类和伪元素创建交互效果

---

## 学习建议

1. **多练习**
   - 通过实际项目练习选择器使用
   - 尝试用不同选择器实现相同效果
   - 对比不同选择器的优缺点

2. **使用开发者工具**
   - 使用 Chrome DevTools 的 Elements 面板
   - 查看元素的计算样式和匹配的选择器
   - 学习如何调试选择器

3. **参考优秀代码**
   - 学习他人的选择器使用技巧
   - 分析优秀开源项目的代码结构
   - 学习命名规范和最佳实践

4. **性能意识**
   - 关注选择器对页面性能的影响
   - 避免使用过于复杂的选择器
   - 优化选择器的性能

5. **保持简单**
   - 优先使用类选择器
   - 保持选择器简单明了
   - 避免过度嵌套

---

## 相关资源

- [MDN CSS 选择器参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Selectors)
- [CSS Selectors Level 3 Specification](https://www.w3.org/TR/selectors-3/)
- [CSS Selectors Level 4 Specification](https://www.w3.org/TR/selectors-4/)

---

## 下一步

完成这个模块后，建议继续学习：

- 📦 **[CSS 盒模型 (03-box-model)](../03-box-model/)** - 理解网页布局的基础
- 🎨 **[CSS 布局 (04-layout)](../04-layout/)** - 掌握现代布局技术
- 📍 **[CSS 定位 (05-position)](../05-position/)** - 精确控制元素位置

---

## 总结

CSS 选择器是样式表的核心，掌握各种选择器的使用方法和优先级规则，是编写高效 CSS 代码的基础。通过本模块的学习，你能够：

1. ✅ 熟练使用各种基础选择器
2. ✅ 掌握组合选择器的应用
3. ✅ 理解伪类和伪元素的作用
4. ✅ 掌握选择器优先级规则
5. ✅ 能够创建精确的选择器组合

接下来，继续深入学习 CSS 盒模型，你将理解网页布局的基础！
