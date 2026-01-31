# CSS 布局

**本章目的：掌握现代 CSS 布局技术，能够创建复杂的页面布局**

## 本章目的

掌握现代 CSS 布局技术，能够创建复杂的页面布局

---

## 内容概述

本章节将带你深入学习 CSS 布局，包括 Flexbox 弹性布局、Grid 网格布局以及传统布局方式。通过学习，你将理解一维布局和二维布局的区别，掌握常用布局模式的实现方法，能够创建响应式和用户友好的网页布局。

---

## 核心概念讲解

### 什么是 CSS 布局？

CSS 布局就像"房间家具的摆放"，它决定了网页上的各种元素如何排列、如何占用空间、如何相互配合。

**生活类比：**
- **Flexbox** 像一排书架——所有书都在一条线上排列，适合处理单方向的布局
- **Grid** 像 Excel 表格——可以同时处理行和列，适合创建复杂的二维布局
- **传统布局** 像老式排版——需要手动计算和调整，较为繁琐

**实际应用场景：**
- 创建导航栏和菜单
- 设计卡片网格和图片画廊
- 实现响应式的页面布局
- 创建复杂的表单和仪表盘

### 为什么需要现代布局技术？

想象你在布置客厅：
- **传统布局**（float、position）：像手动移动家具，需要不断测量和调整，很容易"摆放歪了"
- **Flexbox 布局**：像有智能书架，自动调整每个格子的位置，整齐划一
- **Grid 布局**：像有专业的室内设计师，可以同时规划整体布局和细节

现代布局技术的优势：
- **更简单**：代码量少，易于理解和维护
- **更灵活**：可以轻松创建各种复杂的布局
- **更可靠**：浏览器支持良好，兼容性问题少
- **更高效**：性能更好，渲染速度更快

### 布局技术选择指南

| 场景 | 推荐技术 | 原因 |
|------|---------|------|
| 导航栏、按钮组 | Flexbox | 单方向排列，自动对齐 |
| 卡片网格、图片画廊 | Grid | 二维布局，同时控制行列 |
| 整体页面结构 | Grid | 规划整体布局更直观 |
| 响应式布局 | Flexbox + Grid | 组合使用，发挥各自优势 |
| 简单的左右布局 | Flexbox | 轻量级，易于实现 |

---

## 学习目标

通过这个模块，你将学习：

1. Flexbox 弹性布局的使用方法
2. Grid 网格布局的应用技巧
3. 传统布局方式的理解
4. 响应式布局的实现
5. 布局技术的选择和组合

## 目录结构

```
04-layout/
├── flex/
│   ├── flex-basic.html    # Flexbox 基础演示
│   ├── flex-center.html   # Flexbox 居中对齐
│   └── README.md
├── grid/
│   ├── grid-basic.html    # Grid 基础演示
│   └── README.md
├── practice-solution.html # 基础练习参考答案
└── README.md              # 本文件
```

## Flexbox 弹性布局

### 什么是 Flexbox？

Flexbox（Flexible Box）即"弹性盒子"，是一种一维布局方法。想象你在整理一排书架，每本书可以根据需要自动调整大小和位置。

**生活类比：**
- **主轴**：就像书架的横杆，主要排列方向
- **交叉轴**：就像书架的高度，垂直于主轴
- **flex-grow**：就像书的弹性，可以自动拉伸填充空间
- **flex-shrink**：就像书的可压缩性，空间不够时自动缩小

**核心特点：**
- 一维布局：只在一个方向上排列（横向或纵向）
- 弹性伸缩：元素可以根据容器大小自动调整
- 对齐灵活：可以轻松实现各种对齐方式
- 顺序可变：可以改变元素的出现顺序

---

### Flexbox 核心概念详解

#### 1. 主轴和交叉轴

```
默认方向（row）：
┌────────────────────────────────────┐
│  ┌───┐  ┌───┐  ┌───┐  ┌───┐      │
│  │ 1 │  │ 2 │  │ 3 │  │ 4 │      │
│  └───┘  └───┘  └───┘  └───┘      │
│   ↑←────── 主轴（横向） ────→     │
│                ↓                   │
│           交叉轴（纵向）           │
└────────────────────────────────────┘

纵向方向（column）：
┌────────────────────────────────────┐
│      ↑                             │
│   交叉轴（横向）                   │
│      ↓                             │
│  ┌───┐  ←──── 主轴（纵向） ────→ │
│  │ 1 │                            │
│  └───┘                            │
│  ┌───┐                            │
│  │ 2 │                            │
│  └───┘                            │
│  ┌───┐                            │
│  │ 3 │                            │
│  └───┘                            │
└────────────────────────────────────┘
```

---

#### 2. 容器属性

##### display: flex - 开启 Flexbox

```css
.container {
  display: flex; /* 将容器变为弹性容器 */
}
```

**作用：**
- 将父元素变为弹性容器
- 子元素自动变为弹性项目
- 默认横向排列（row）

**实际应用：**
```css
/* 导航栏 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

---

##### flex-direction - 设置主轴方向

```css
.container {
  flex-direction: row;         /* 横向（默认） */
  flex-direction: row-reverse; /* 横向反向 */
  flex-direction: column;      /* 纵向 */
  flex-direction: column-reverse; /* 纵向反向 */
}
```

**可视化说明：**
```css
/* row - 横向从左到右 */
flex-direction: row;
/* [1] [2] [3] [4] */

/* row-reverse - 横向从右到左 */
flex-direction: row-reverse;
/* [4] [3] [2] [1] */

/* column - 纵向从上到下 */
flex-direction: column;
/* [1] */
/* [2] */
/* [3] */
/* [4] */

/* column-reverse - 纵向从下到上 */
flex-direction: column-reverse;
/* [4] */
/* [3] */
/* [2] */
/* [1] */
```

---

##### flex-wrap - 换行控制

```css
.container {
  flex-wrap: nowrap;  /* 不换行（默认） */
  flex-wrap: wrap;    /* 换行 */
  flex-wrap: wrap-reverse; /* 换行并反向 */
}
```

**实际应用：**
```css
/* 卡片网格，空间不足时自动换行 */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 300px; /* 基础宽度300px，可伸缩 */
}
```

---

##### justify-content - 主轴对齐

```css
.container {
  justify-content: flex-start;    /* 起点（默认） */
  justify-content: flex-end;      /* 终点 */
  justify-content: center;        /* 居中 */
  justify-content: space-between; /* 两端对齐 */
  justify-content: space-around;  /* 环绕对齐 */
  justify-content: space-evenly;  /* 平均分配 */
}
```

**可视化说明：**
```css
/* flex-start - 起点对齐 */
justify-content: flex-start;
/* [1] [2] [3] [4] ────── */

/* flex-end - 终点对齐 */
justify-content: flex-end;
/* ────── [1] [2] [3] [4] */

/* center - 居中对齐 */
justify-content: center;
/* ──── [1] [2] [3] [4] ─── */

/* space-between - 两端对齐 */
justify-content: space-between;
/* [1] ── [2] ── [3] ── [4] */

/* space-around - 环绕对齐 */
justify-content: space-around;
/* ─ [1] ─── [2] ─── [3] ─── [4] ─ */

/* space-evenly - 平均分配 */
justify-content: space-evenly;
/* ── [1] ── [2] ── [3] ── [4] ── */
```

---

##### align-items - 交叉轴对齐

```css
.container {
  align-items: stretch;     /* 拉伸（默认） */
  align-items: flex-start;  /* 起点 */
  align-items: flex-end;    /* 终点 */
  align-items: center;      /* 居中 */
  align-items: baseline;    /* 基线 */
}
```

**实际应用：**
```css
/* 让不同高度的元素垂直居中 */
.navbar {
  display: flex;
  align-items: center; /* Logo 和文字垂直居中 */
}
```

---

#### 3. 项目属性

##### flex - 复合属性（推荐使用）

```css
.item {
  flex: flex-grow flex-shrink flex-basis;
}
```

**常用值：**
```css
/* 自适应，平均分配空间 */
.item {
  flex: 1;
}

/* 不伸缩，保持基础宽度 */
.item {
  flex: 0 1 auto;
}

/* 占满剩余空间 */
.item {
  flex: 1 1 100%;
}

/* 固定宽度，不伸缩 */
.item {
  flex: 0 0 200px;
}
```

**实际应用：**
```css
/* 布局：侧边栏固定，主内容自适应 */
.layout {
  display: flex;
}

.sidebar {
  flex: 0 0 250px; /* 固定250px，不伸缩 */
}

.main {
  flex: 1; /* 占满剩余空间 */
}
```

---

### Flexbox 常用布局模式

#### 1. 水平居中

```css
.container {
  display: flex;
  justify-content: center;
}
```

**应用场景：**
- 导航菜单居中
- 按钮组居中
- 图片居中

---

#### 2. 垂直居中

```css
.container {
  display: flex;
  align-items: center;
}
```

**应用场景：**
- Logo 和文字垂直居中
- 卡片内容垂直居中
- 表单元素垂直居中

---

#### 3. 完美居中（水平 + 垂直）

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

**应用场景：**
- 模态框居中
- 登录页面居中
- 加载动画居中

---

#### 4. 等分布局

```css
.container {
  display: flex;
}

.item {
  flex: 1;
}
```

**应用场景：**
- 按钮组等宽
- 标签页等宽
- 分步导航等宽

---

#### 5. 固定边栏布局

```css
.container {
  display: flex;
}

.sidebar {
  flex: 0 0 250px;
}

.main {
  flex: 1;
}
```

**应用场景：**
- 带侧边栏的布局
- 仪表盘侧边栏
- 博客侧边栏

---

#### 6. 响应式卡片网格

```css
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 300px;
}
```

**应用场景：**
- 产品卡片网格
- 图片画廊
- 博客文章列表

## Grid 网格布局

### 什么是 CSS Grid？

CSS Grid 是一个二维布局系统，可以同时处理行和列。想象你在用 Excel 表格或乐高积木搭建一个建筑，你可以同时规划横向和纵向的布局。

**生活类比：**
- **Grid 容器**：就像建筑工地，规划整体布局
- **Grid 轨道**：像乐高的凹槽和凸起，定义网格线
- **Grid 单元格**：像乐高积木，最小的布局单位
- **Grid 区域**：像组合好的乐高模型，可以跨越多个单元格

**核心特点：**
- 二维布局：同时控制行和列
- 网格系统：基于行和列的网格结构
- 灵活定义：可以精确控制每个网格的大小和位置
- 区域布局：可以定义命名区域，直观明了

---

### Grid 核心概念详解

#### 1. 网格线、轨道、单元格和区域

```
网格结构可视化：

    列轨道 →  ┌───────────┬───────────┬───────────┐
    ↑         │           │           │           │
    │         │   单元格   │   单元格   │   单元格   │
    │  轨道   │    (1,1)   │    (1,2)   │    (1,3)   │
    │         │           │           │           │
行 轨道 ├───────────┼───────────┼───────────┤
    │         │           │           │           │
    │         │   单元格   │   区域    │   单元格   │
    │         │    (2,1)   │  (2,2-3)  │    (2,4)   │
    │         │           │           │           │
    ↓         ├───────────┼───────────┼───────────┤
              │           │           │           │
              │   单元格   │   单元格   │   单元格   │
              │    (3,1)   │    (3,2)   │    (3,3)   │
              │           │           │           │
              └───────────┴───────────┴───────────┘

网格线标记：
   1       2       3       4
 ──┼───────┼───────┼───────┼──
   │       │       │       │
 1 ┼───●───┼───●───┼───●───┼──
   │       │       │       │
 2 ┼───●───┼───●───┼───●───┼──
   │       │       │       │
 3 ┼───●───┼───●───┼───●───┼──
   │       │       │       │
 4 ┼───●───┼───●───┼───●───┼──
```

---

#### 2. 容器属性

##### display: grid - 开启 Grid

```css
.container {
  display: grid;
}
```

**作用：**
- 将父元素变为网格容器
- 子元素自动变为网格项目
- 默认单列单行（1x1）

---

##### grid-template-columns - 定义列

```css
.container {
  grid-template-columns: 100px 1fr 2fr;
}
```

**单位说明：**
- `px`：固定像素值
- `fr`：分数单位（fraction），表示占剩余空间的份数
- `%`：百分比
- `auto`：自动计算
- `minmax(最小值, 最大值)`：设置范围
- `repeat(次数, 大小)`：重复模式

**实际应用：**
```css
/* 三等分布局 */
.grid {
  grid-template-columns: 1fr 1fr 1fr;
}

/* 侧边栏 + 主内容 */
.layout {
  grid-template-columns: 250px 1fr;
}

/* 响应式：自动填充 */
.responsive {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

---

##### grid-template-rows - 定义行

```css
.container {
  grid-template-rows: auto 1fr auto;
}
```

**实际应用：**
```css
/* 头部 + 主内容 + 底部 */
.page {
  grid-template-rows: auto 1fr auto;
}
```

---

##### gap - 网格间距

```css
.container {
  gap: 20px;           /* 行列间距相同 */
  gap: 20px 10px;       /* 行间距20px，列间距10px */
  row-gap: 20px;        /* 行间距 */
  column-gap: 10px;     /* 列间距 */
}
```

**实际应用：**
```css
/* 卡片网格间距 */
.card-grid {
  gap: 30px;
}
```

---

##### grid-template-areas - 区域布局（推荐）

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
```

**可视化布局：**
```
┌────────────────────────────────────┐
│              header                 │
├──────────┬─────────────┬────────────┤
│ sidebar  │     main     │   aside    │
├──────────┴─────────────┴────────────┤
│              footer                  │
└────────────────────────────────────┘
```

**优势：**
- 直观明了，一目了然
- 易于调整布局
- 响应式友好

**实际应用：**
```css
/* 移动端布局 */
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "aside"
      "footer";
  }
}
```

---

#### 3. 项目属性

##### grid-area - 放置项目

```css
.item {
  grid-area: 行起始 / 列起始 / 行结束 / 列结束;
}
```

**示例：**
```css
/* 跨 2 行 2 列 */
.item {
  grid-area: 1 / 1 / 3 / 3;
}

/* 等价于 */
.item {
  grid-row: 1 / 3;
  grid-column: 1 / 3;
}

/* 使用命名区域 */
.main {
  grid-area: main;
}
```

---

### Grid 常用布局模式

#### 1. 基础网格

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 100px;
  gap: 20px;
}
```

**应用场景：**
- 产品卡片网格
- 图片画廊
- 博客文章列表

---

#### 2. 响应式网格

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
```

**工作原理：**
- `auto-fit`：尽可能多地放入列
- `minmax(250px, 1fr)`：最小 250px，最大平分剩余空间
- 自动适配不同屏幕尺寸

**应用场景：**
- 响应式卡片网格
- 自适应图片库
- 灵活的标签页

---

#### 3. 区域布局（Holy Grail）

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
```

**应用场景：**
- 经典网站布局
- 博客布局
- 文档页面布局

## 布局技术比较

| 特性 | Flexbox | Grid | Float/Position |
|------|---------|------|----------------|
| 维度 | 一维 | 二维 | 一维 |
| 适用场景 | 组件级 | 页面级 | 简单布局 |
| 对齐能力 | 强 | 强 | 有限 |
| 响应式 | 好 | 优秀 | 差 |
| 浏览器支持 | 优秀 | 优秀 | 优秀 |
| 学习难度 | 中等 | 中等 | 简单 |
| 代码量 | 少 | 中等 | 多 |

**选择建议：**
- **组件级布局**：使用 Flexbox（导航栏、按钮组、卡片）
- **页面级布局**：使用 Grid（整体页面结构、复杂网格）
- **简单布局**：使用 Flexbox（居中、等分布局）
- **传统布局**：仅用于简单场景或兼容旧代码

---

## 传统布局方式（了解即可）

### Float 布局

```css
.container::after {
  content: "";
  display: table;
  clear: both;
}

.left {
  float: left;
  width: 50%;
}

.right {
  float: right;
  width: 50%;
}
```

**问题：**
- 需要清除浮动
- 垂直对齐困难
- 不灵活
- 已被 Flexbox 和 Grid 取代

---

### Position 布局

```css
.container {
  position: relative;
}

.absolute {
  position: absolute;
  top: 0;
  left: 0;
}
```

**问题：**
- 脱离文档流
- 响应式困难
- 需要手动计算位置

---

### Table 布局

```css
.table {
  display: table;
}

.row {
  display: table-row;
}

.cell {
  display: table-cell;
}
```

**问题：**
- 语义不正确
- 不灵活
- 性能较差

---

## 实际应用案例

### 案例 1：响应式导航栏

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: white;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  transition: opacity 0.3s;
}

.nav-links a:hover {
  opacity: 0.8;
}

/* 移动端 */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
```

---

### 案例 2：卡片网格布局

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 2rem;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.card-description {
  color: #666;
  line-height: 1.6;
}
```

---

### 案例 3：仪表盘布局

```css
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "sidebar main"
    "footer footer";
  min-height: 100vh;
}

.header {
  grid-area: header;
  padding: 1rem 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
}

.sidebar {
  grid-area: sidebar;
  background-color: #f5f5f5;
  padding: 2rem;
}

.main {
  grid-area: main;
  padding: 2rem;
}

.footer {
  grid-area: footer;
  padding: 1rem 2rem;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
  text-align: center;
}

/* 响应式 */
@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "footer";
  }
}
```

---

### 案例 4：图片画廊

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.gallery-item {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.gallery-item:hover img {
  transform: scale(1.1);
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.gallery-overlay span {
  color: white;
  font-size: 1.5rem;
}
```

---

## 响应式布局策略

### 1. 移动优先（Mobile First）

```css
/* 基础样式 - 移动设备 */
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* 平板设备 */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}

/* 桌面设备 */
@media (min-width: 1024px) {
  .container {
    gap: 2rem;
  }
}
```

**优势：**
- 优先考虑移动端体验
- 渐进增强
- 性能更好
- 代码更简洁

---

### 2. 使用 Flexbox 和 Grid 组合

```css
/* 页面整体使用 Grid */
.page {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;
}

/* 内部组件使用 Flexbox */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

---

## 最佳实践

### ✅ 推荐的做法

1. **选择合适的布局技术**
   - 组件级：Flexbox
   - 页面级：Grid
   - 简单布局：Flexbox

2. **使用语义化 HTML**
   ```html
   <header>
   <nav>
   <main>
   <aside>
   <section>
   <footer>
   ```

3. **移动优先设计**
   ```css
   /* 从小屏幕开始 */
   .container {
     flex-direction: column;
   }

   /* 逐步增强到大屏幕 */
   @media (min-width: 768px) {
     .container {
       flex-direction: row;
     }
   }
   ```

4. **使用相对单位**
   ```css
   .container {
     gap: 1rem;
     padding: 2rem;
   }
   ```

5. **避免固定尺寸**
   ```css
   /* 不推荐 */
   .item {
     width: 300px;
   }

   /* 推荐 */
   .item {
     min-width: 0;
     flex: 1;
   }
   ```

---

### ❌ 避免的做法

1. **避免过度的嵌套**
   ```css
   /* 差 */
   .container > div > ul > li > a {
     display: flex;
   }

   /* 好 */
   .nav-link {
     display: flex;
   }
   ```

2. **避免使用固定像素**
   ```css
   /* 差 */
   .container {
     width: 1200px;
   }

   /* 好 */
   .container {
     max-width: 1200px;
     width: 100%;
   }
   ```

3. **避免忽略响应式**
   ```css
   /* 差 - 没有考虑移动端 */
   .grid {
     grid-template-columns: repeat(3, 1fr);
   }

   /* 好 - 响应式 */
   .grid {
     grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
   }
   ```

## 响应式布局

### 媒体查询
```css
.container {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 流式布局
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.item {
  width: 33.333%;
  float: left;
}
```

## 布局最佳实践

### 1. 选择合适的布局技术
- **组件级布局**：使用 Flexbox
- **页面级布局**：使用 Grid
- **简单布局**：使用传统方法

### 2. 移动优先
```css
/* 移动端 */
.container {
  display: flex;
  flex-direction: column;
}

/* 桌面端 */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}
```

### 3. 使用语义化 HTML
```html
<div class="grid-container">
  <header class="header">页眉</header>
  <aside class="sidebar">侧边栏</aside>
  <main class="main">主要内容</main>
  <footer class="footer">页脚</footer>
</div>
```

### 4. 避免固定尺寸
```css
/* 不推荐 */
.item {
  width: 300px;
  height: 200px;
}

/* 推荐 */
.item {
  width: 100%;
  max-width: 300px;
  aspect-ratio: 3/2;
}
```

## 常见布局模式

### 1. Holy Grail 布局
```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  min-height: 100vh;
}
```

### 2. 卡片布局
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}
```

### 3. 侧边栏布局
```css
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  flex-shrink: 0;
}

.main {
  flex: 1;
  overflow-y: auto;
}
```

### 4. 居中布局
```css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

## 性能优化

### 1. 避免过度布局
```css
/* 不推荐 */
.container > div > ul > li > a {
  display: block;
}

/* 推荐 */
.link {
  display: block;
}
```

### 2. 使用硬件加速
```css
.animated {
  transform: translateZ(0);
  will-change: transform;
}
```

### 3. 减少重排重绘
```css
.stable {
  position: absolute;
  top: 0;
  left: 0;
}
```

## 调试技巧

### 1. 使用开发者工具
- Grid 检查器
- Flexbox 检查器
- 布局调试面板

### 2. 添加调试样式
```css
.debug {
  outline: 1px solid red;
}

.debug-grid {
  background-image: 
    linear-gradient(rgba(255,0,0,.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,0,0,.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

## 学习建议

1. **掌握基础**：先理解 Flexbox 和 Grid 的核心概念
2. **多练习**：通过实际项目练习布局技巧
3. **参考案例**：学习优秀的布局实现
4. **关注兼容性**：了解不同浏览器的支持情况
5. **持续学习**：关注新的布局特性和最佳实践

## 相关资源

- [MDN Flexbox 指南](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [MDN Grid 指南](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout)
- [Flexbox Froggy](https://flexboxfroggy.com/)
- [CSS Grid Garden](https://cssgridgarden.com/)

## 下一步

完成这个模块后，建议继续学习：
- CSS 定位 (05-position)
- CSS 响应式设计 (06-responsive)
- CSS 模块化 (07-css-modular)

## 总结

CSS 布局是前端开发的核心技能。Flexbox 和 Grid 为现代网页布局提供了强大而灵活的解决方案。通过本模块的学习，你将能够创建各种复杂的布局结构，实现响应式设计，为用户提供优秀的浏览体验。

---

## 练习题

### 基础练习

**题目 1：使用 Flexbox 创建导航栏**
- 使用 `display: flex` 创建水平导航栏
- 使用 `justify-content` 实现不同对齐方式
- 使用 `align-items` 实现垂直居中
- 为导航项添加合适的间距

**题目 2：使用 Flexbox 创建居中布局**
- 创建一个容器
- 使用 Flexbox 实现水平和垂直居中
- 容器高度为 `100vh`
- 内容为文本或图片

**题目 3：使用 Grid 创建基本网格**
- 创建一个 3 列网格
- 设置列宽为 `1fr`（等宽）
- 添加间距 `gap: 20px`
- 为网格项添加背景色和内边距

---

### 进阶练习

**题目 1：使用 Flexbox 创建卡片网格**
- 使用 `flex-wrap: wrap` 实现换行
- 使用 `flex: 1` 实现等分布局
- 为卡片添加悬停效果（上浮、阴影）
- 实现响应式布局（适配不同屏幕尺寸）

**题目 2：使用 Grid 创建响应式网格**
- 使用 `repeat(auto-fit, minmax(250px, 1fr))` 实现自适应网格
- 为网格项添加悬停效果
- 实现响应式布局（适配不同屏幕尺寸）
- 使用 `grid-area` 创建特定布局

**题目 3：使用 Grid 创建复杂布局**
- 使用 `grid-template-areas` 创建页面布局
- 定义头部、侧边栏、主内容、底部区域
- 实现响应式布局（适配不同屏幕尺寸）
- 为不同区域添加不同的样式

---

### 挑战练习

**题目 1：创建一个完整的页面布局**
- 使用 Grid 创建页面整体结构
- 使用 Flexbox 创建导航栏
- 使用 Grid 创建内容区域
- 实现响应式布局（适配不同屏幕尺寸）
- 添加过渡和动画效果

**题目 2：创建一个组件库**
- 创建按钮组、卡片组、标签组等组件
- 使用 Flexbox 和 Grid 实现不同的布局模式
- 实现组件的悬停和点击效果
- 确保组件在不同屏幕尺寸下都能正常显示

**题目 3：创建一个复杂的仪表盘**
- 使用 Grid 创建仪表盘布局
- 使用 Flexbox 创建侧边栏
- 使用 Grid 创建数据卡片网格
- 实现响应式布局（适配不同屏幕尺寸）
- 添加过渡和动画效果

---

## 学习目标检查清单

完成本章节学习后，检查你是否已经掌握以下内容：

### Flexbox 布局
- [ ] 理解 Flexbox 的一维布局特性
- [ ] 掌握容器属性（display, flex-direction, flex-wrap 等）
- [ ] 掌握项目属性（flex-grow, flex-shrink, flex-basis 等）
- [ ] 能够创建常见的 Flexbox 布局（居中、等分布局等）
- [ ] 知道 Flexbox 的适用场景

### Grid 布局
- [ ] 理解 Grid 的二维布局特性
- [ ] 掌握容器属性（display, grid-template-columns, grid-gap 等）
- [ ] 掌握项目属性（grid-column, grid-row, grid-area 等）
- [ ] 能够创建常见的 Grid 布局（网格布局、区域布局等）
- [ ] 知道 Grid 的适用场景

### 响应式布局
- [ ] 理解响应式布局的重要性
- [ ] 能够使用 Flexbox 和 Grid 创建响应式布局
- [ ] 能够使用媒体查询适配不同屏幕尺寸
- [ ] 知道移动优先的设计理念

### 传统布局
- [ ] 了解 Float 布局的工作原理
- [ ] 了解 Position 布局的工作原理
- [ ] 了解 Table 布局的工作原理
- [ ] 知道传统布局的优缺点

### 实践能力
- [ ] 能够使用 Flexbox 创建组件级布局
- [ ] 能够使用 Grid 创建页面级布局
- [ ] 能够创建复杂的页面布局
- [ ] 能够创建响应式布局
- [ ] 能够解决布局相关的问题
