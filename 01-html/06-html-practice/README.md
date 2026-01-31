# HTML 综合练习

## 本章目的

**将学到的 HTML 知点整合运用**，通过实际项目巩固 HTML 基础知识，学会规划页面结构、组织内容和创建完整的网页。

---

## 综合练习概述

这个章节将整合前面学到的所有知识点，创建一个完整的个人主页，包括：

- 基础结构（HTML 文档结构）
- 常用标签（文本、链接、图片、列表）
- 语义化标签（header、nav、main、footer）
- 表单元素（联系表单）
- 表格展示（技能列表或作品清单）

---

## 页面结构规划

在开始写代码之前，先规划页面结构：

### 页面布局

```
┌─────────────────────────────────┐
│         Header（头部）          │  ← 网站标题、导航
├─────────────────────────────────┤
│                                 │
│         Main（主要内容）         │
│  ┌──────────┬──────────────┐   │
│  │  Article │    Aside     │   │  ← 个人简介 + 侧边栏
│  │  （文章）│  （侧边栏）   │   │
│  └──────────┴──────────────┘   │
│                                 │
├─────────────────────────────────┤
│         Footer（页脚）          │  ← 版权信息、联系方式
└─────────────────────────────────┘
```

---

## 内容组织思路

### 1. Header 部分
- 网站标题（`<h1>`）
- 导航菜单（`<nav>` + `<ul>` + `<a>`）
- 个人头像（`<img>`）

---

### 2. Main 部分

#### Article - 个人简介
- 自我介绍（`<p>`）
- 技能列表（`<ul>` + `<li>`）
- 工作经历（有序列表或表格）
- 作品展示（`<figure>` + `<figcaption>`）

#### Aside - 侧边栏
- 联系方式（`<address>`）
- 社交链接（`<a>`）
- 快速导航

---

### 3. Footer 部分
- 版权声明（`<small>` 或 `<p>`）
- 友情链接（`<a>`）

---

## 实现步骤

### 步骤 1：创建基础结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的个人主页</title>
</head>
<body>
    <!-- 页面内容 -->
</body>
</html>
```

---

### 步骤 2：添加 Header

```html
<header>
    <h1>张三的个人主页</h1>
    <nav>
        <ul>
            <li><a href="#about">关于我</a></li>
            <li><a href="#skills">技能</a></li>
            <li><a href="#works">作品</a></li>
            <li><a href="#contact">联系</a></li>
        </ul>
    </nav>
</header>
```

---

### 步骤 3：添加 Main 和 Article

```html
<main>
    <article id="about">
        <h2>关于我</h2>
        <p>你好，我是张三，一名热爱前端开发的程序员...</p>
    </article>
</main>
```

---

### 步骤 4：添加侧边栏

```html
<aside>
    <h3>联系方式</h3>
    <address>
        <p>邮箱：zhangsan@example.com</p>
        <p>微信：zhangsan123</p>
    </address>
</aside>
```

---

### 步骤 5：添加 Footer

```html>
<footer>
    <p>&copy; 2026 张三的个人主页</p>
</footer>
```

---

### 步骤 6：添加表单

```html
<section id="contact">
    <h2>联系我</h2>
    <form>
        <label for="name">姓名：</label>
        <input type="text" id="name" name="name" required>
        <label for="message">留言：</label>
        <textarea id="message" name="message" rows="4"></textarea>
        <button type="submit">发送</button>
    </form>
</section>
```

---

### 步骤 7：添加表格

```html
<section id="works">
    <h2>我的作品</h2>
    <table>
        <thead>
            <tr>
                <th>作品名称</th>
                <th>类型</th>
                <th>时间</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>个人博客</td>
                <td>网站</td>
                <td>2025-01</td>
            </tr>
            <tr>
                <td>待办事项应用</td>
                <td>应用</td>
                <td>2025-06</td>
            </tr>
        </tbody>
    </table>
</section>
```

---

## 完整示例结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的个人主页</title>
</head>
<body>
    <header>
        <h1>张三的个人主页</h1>
        <nav>
            <ul>
                <li><a href="#about">关于我</a></li>
                <li><a href="#skills">技能</a></li>
                <li><a href="#works">作品</a></li>
                <li><a href="#contact">联系</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article id="about">
            <h2>关于我</h2>
            <p>你好，我是张三，一名热爱前端开发的程序员...</p>
        </article>

        <section id="skills">
            <h2>技能</h2>
            <ul>
                <li>HTML5 / CSS3</li>
                <li>JavaScript</li>
                <li>React</li>
            </ul>
        </section>

        <section id="works">
            <h2>我的作品</h2>
            <table>
                <!-- 表格内容 -->
            </table>
        </section>

        <section id="contact">
            <h2>联系我</h2>
            <form>
                <!-- 表单内容 -->
            </form>
        </section>
    </main>

    <aside>
        <h3>联系方式</h3>
        <address>
            <p>邮箱：zhangsan@example.com</p>
        </address>
    </aside>

    <footer>
        <p>&copy; 2026 张三的个人主页</p>
    </footer>
</body>
</html>
```

---

## 项目规范

### 1. 文件命名

- 使用小写字母和连字符：`personal-homepage.html`
- 不要使用空格或特殊字符

---

### 2. 目录结构

```
html-practice/
├── index.html          # 个人主页
├── css/                # 样式文件（可选）
│   └── style.css
└── images/             # 图片资源（可选）
    └── avatar.png
```

---

### 3. 代码组织

1. **头部优先**：`<head>` 包含所有元数据
2. **结构清晰**：使用语义化标签
3. **缩进规范**：保持代码层次清晰
4. **注释适当**：关键部分添加注释

---

### 4. 语义化检查

- [ ] 每个页面只有一个 `<h1>`
- [ ] 使用 `<header>`、`<nav>`、`<main>`、`<footer>`
- [ ] 相关内容用 `<section>` 或 `<article>` 分组
- [ ] 使用 `<aside>` 包裹侧边栏内容

---

## 完成标准

- 页面结构清晰合理
- 正确使用 HTML5 语义化标签
- 包含表单和表格元素
- 代码规范，注释清晰
- 页面内容完整，有实际意义

---

## 文件说明

- `simple-page.html` - 综合练习示例，包含完整的个人主页

---

## 练习题

### 基础练习
创建 `my-homepage.html`，要求：
1. 创建一个简单的个人主页，包含 Header、Main、Footer
2. Header 包含网站标题和导航菜单（3-4 个链接）
3. Main 包含 2-3 个 Section（如"关于我"、"技能"、"作品"）
4. Footer 包含版权信息

### 进阶练习
在基础练习的基础上添加：
1. 使用 `<article>` 包裹主要内容
2. 使用 `<aside>` 添加侧边栏，包含联系方式
3. 添加一个联系表单（包含姓名、邮箱、留言）
4. 添加一个作品展示表格
5. 使用 `<figure>` 和 `<figcaption>` 添加一张图片

### 挑战练习
创建一个完整的个人主页，要求：
1. 包含所有语义化标签（header、nav、main、section、article、aside、footer）
2. 至少包含一个表单和一个表格
3. 包含无序列表、有序列表、定义列表
4. 使用锚点链接实现页面内跳转
5. 为所有图片提供 alt 文本
6. 使用时间标签 `<time>` 标记发布时间
7. 添加折叠内容 `<details>` 和 `<summary>`
8. 代码结构清晰，有适当的注释

---

## 学习目标检查

- [ ] 能够独立规划页面结构
- [ ] 能够将多个章节的知识点整合运用
- [ ] 能够创建一个完整的 HTML 页面
- [ ] 能够合理使用语义化标签
- [ ] 能够在页面中添加表单和表格
- [ ] 代码规范，结构清晰
