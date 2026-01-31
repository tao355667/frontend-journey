# 媒体与其他常用标签

## 本章目的

**让网页更丰富、更专业**，学会使用媒体标签（音频、视频）、响应式图片、折叠内容、时间标签等，提升网页的交互性和专业性。

---

## 本章涵盖内容

本节涵盖在基础章节之外、但常见且实用的标签：

- **媒体**：`audio`、`video`、`source`、`track`
- **图文与响应式**：`figure`、`figcaption`、`picture`、`source`
- **折叠与说明**：`details`、`summary`
- **时间与联系**：`time`、`address`
- **模板与无脚本**：`template`、`noscript`

---

## 媒体标签

### 音频 `<audio>`

```html
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    你的浏览器不支持音频播放。
</audio>
```

**属性说明**：
- `controls`：显示播放控制面板（播放、暂停、音量等）
- `autoplay`：自动播放（注意：很多浏览器会阻止自动播放）
- `loop`：循环播放
- `muted`：静音播放

**说明**：
- `<source>` 提供多种音频格式，兼容不同浏览器
- MP3 是最常见的格式，兼容性最好

---

### 视频 `<video>`

```html
<video controls width="640">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <track kind="captions" srclang="en" label="English" src="captions.vtt" default>
    你的浏览器不支持视频播放。
</video>
```

**属性说明**：
- `controls`：显示播放控制面板
- `width` / `height`：视频宽度和高度
- `poster`：封面图片，视频加载前显示
- `autoplay`：自动播放（建议配合 muted 使用）

**字幕轨道 `<track>`**：
- `kind="captions"`：字幕
- `srclang="en"`：字幕语言
- `src="captions.vtt"`：字幕文件路径
- `default`：默认显示

---

## 图文与说明

### 图文说明 `<figure>` 和 `<figcaption>`

```html
<figure>
    <img src="screenshot.png" alt="产品截图">
    <figcaption>图 1：产品功能展示</figcaption>
</figure>
```

**作用**：
- `<figure>`：标记图片、图表、代码块等独立内容
- `<figcaption>`：为 `<figure>` 添加说明文字

**说明**：
- 不仅适用于图片，也适用于代码块、图表等
- 说明文字会在图片下方显示
- 对 SEO 和无障碍访问很有帮助

---

### 响应式图片 `<picture>` 和 `<source>`

```html
<picture>
    <source media="(min-width: 800px)" srcset="large.jpg">
    <source media="(min-width: 400px)" srcset="medium.jpg">
    <img src="small.jpg" alt="响应式图片">
</picture>
```

**作用**：根据屏幕宽度加载不同尺寸的图片，提升加载速度和用户体验。

**属性说明**：
- `media`：媒体查询条件
- `srcset`：图片路径
- `<img>`：默认图片（不满足任何条件时使用）

**说明**：
- 在大屏幕上加载大图，在小屏幕上加载小图
- 减少流量消耗，加快加载速度
- `<img>` 标签必须放在最后作为备选

---

## 折叠与说明

### 折叠内容 `<details>` 和 `<summary>`

```html
<details>
    <summary>点击展开详情</summary>
    <p>这里是详细内容，默认折叠起来，用户点击标题后展开。</p>
</details>
```

**属性说明**：
- `open`：默认展开（不加此属性则默认折叠）

**使用场景**：
- FAQ（常见问题）
- 补充说明
- 长内容的折叠显示

**说明**：
- `<summary>` 是折叠内容的标题，点击可展开/收起
- 纯 HTML 实现，不需要 JavaScript

---

## 时间与联系

### 时间标签 `<time>`

```html
<p>发布日期：<time datetime="2026-01-24">2026 年 1 月 24 日</time></p>
<p>会议时间：<time datetime="2026-02-15T14:30">2026 年 2 月 15 日下午 2:30</time></p>
<p>有效期限：<time datetime="P3D">3 天</time></p>
```

**作用**：机器可读的时间标记，对搜索引擎、日历应用、提醒功能很有帮助。

**datetime 格式说明**：
- 日期：`2026-01-24`
- 日期时间：`2026-02-15T14:30`（T 分隔日期和时间）
- 时间段：`P3D`（P 表示 Period，3D 表示 3 天）

**说明**：
- `<time>` 标签内的内容是人类可读的
- `datetime` 属性是机器可读的标准格式

---

### 联系信息 `<address>`

```html
<address>
    <p>作者：李明</p>
    <p>邮箱：<a href="mailto:liming@example.com">liming@example.com</a></p>
    <p>地址：北京市朝阳区某某大厦 101 室</p>
</address>
```

**作用**：标记联系信息或文章作者信息。

**说明**：
- 通常放在 `<article>` 或 `<footer>` 中
- 浏览器会以斜体显示（可以用 CSS 修改）
- 包含邮箱、地址、电话等信息

---

## 模板与无脚本

### 模板 `<template>`

```html
<template id="card-template">
    <div class="card">
        <h3 class="card-title">标题</h3>
        <p class="card-content">内容</p>
    </div>
</template>
```

**作用**：定义可复用的 HTML 模板，不会在页面中显示，需要用 JavaScript 克隆。

**使用示例（JavaScript）**：
```javascript
const template = document.getElementById('card-template');
const clone = template.content.cloneNode(true);
clone.querySelector('.card-title').textContent = '新标题';
document.body.appendChild(clone);
```

**说明**：
- 模板内容不会被浏览器渲染
- 适合动态生成重复的内容（如卡片、列表项）
- 需要配合 JavaScript 使用

---

### 无脚本提示 `<noscript>`

```html
<noscript>
    <p>您的浏览器未启用 JavaScript，部分功能不可用。</p>
    <p>请启用 JavaScript 以获得最佳体验。</p>
</noscript>
```

**作用**：在浏览器禁用 JavaScript 时显示替代内容。

**说明**：
- 正常情况下内容不会显示
- 只在 JavaScript 被禁用时显示
- 可以提示用户或提供备用功能

---

## 完整示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>媒体与其他标签示例</title>
</head>
<body>
    <h1>媒体与其他标签示例</h1>

    <h2>音频</h2>
    <audio controls>
        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" type="audio/mpeg">
        你的浏览器不支持音频播放。
    </audio>

    <h2>视频（含字幕）</h2>
    <video controls width="640">
        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">
        <track kind="captions" srclang="en" label="English" src="https://interactive-examples.mdn.mozilla.net/media/examples/flower.vtt" default>
        你的浏览器不支持视频播放。
    </video>

    <h2>图文与说明</h2>
    <figure>
        <img src="https://via.placeholder.com/400x220" alt="示例图片">
        <figcaption>使用 figure/figcaption 为图片添加说明。</figcaption>
    </figure>

    <h2>响应式图片</h2>
    <picture>
        <source media="(min-width: 600px)" srcset="https://via.placeholder.com/640x360">
        <source media="(max-width: 599px)" srcset="https://via.placeholder.com/320x180">
        <img src="https://via.placeholder.com/640x360" alt="响应式图片示例">
    </picture>

    <h2>折叠内容</h2>
    <details>
        <summary>点击展开详情</summary>
        <p>details/summary 可用于折叠 FAQ 或补充说明。</p>
    </details>

    <h2>时间与联系信息</h2>
    <p>发布日期：<time datetime="2026-01-24">2026 年 1 月 24 日</time></p>
    <address>作者：前端同学 · 邮箱：example@example.com</address>

    <h2>模板与无脚本提示</h2>
    <template id="card-template">
        <div class="card">这里是模板内容，可用 JS 克隆。</div>
    </template>
    <noscript>你的浏览器未启用 JavaScript，部分功能不可用。</noscript>
</body>
</html>
```

---

## 最佳实践

### 1. 媒体资源优化

- 使用合适的格式（MP3、MP4 兼容性最好）
- 提供多种格式以兼容不同浏览器
- 压缩媒体文件大小

---

### 2. 响应式图片

- 使用 `<picture>` 为不同设备提供不同尺寸的图片
- 使用现代图片格式（WebP）提升加载速度

---

### 3. 可访问性

- 为所有媒体提供替代文本或字幕
- 使用 `<time>` 标记时间信息
- 使用 `<address>` 标记联系信息

---

### 4. 用户体验

- 不要自动播放音视频（除非用户明确同意）
- 提供清晰的播放控制
- 使用 `<details>` 组织长内容

---

## 文件说明

- `index.html` - 各标签的简单示例合集

---

## 练习题

### 基础练习
创建 `media-practice.html`，要求：
1. 添加一个音频播放器，使用外部音频链接
2. 添加一个视频播放器，设置宽度和封面
3. 使用 `<figure>` 和 `<figcaption>` 展示一张图片并添加说明
4. 使用 `<time>` 标记文章发布时间

### 进阶练习
在基础练习的基础上添加：
1. 创建一个响应式图片，为不同屏幕宽度提供不同尺寸
2. 使用 `<details>` 和 `<summary>` 创建一个 FAQ 区块（至少 3 个问题）
3. 使用 `<address>` 标记作者联系信息
4. 创建一个 `<template>` 模板

### 挑战练习
创建一个"音乐播放器"页面，要求：
1. 包含多个音频播放器，每个播放器有对应的专辑封面（使用 `<figure>`）
2. 使用 `<details>` 展示歌曲歌词
3. 使用 `<time>` 标记专辑发布时间
4. 添加一个联系我们部分，使用 `<address>` 和表单
5. 页面结构清晰，使用语义化标签
6. 为所有媒体提供替代内容

---

## 学习目标检查

- [ ] 掌握 `<audio>` 和 `<video>` 标签的用法
- [ ] 理解 `<source>` 和 `<track>` 的作用
- [ ] 能够使用 `<figure>` 和 `<figcaption>` 添加图文说明
- [ ] 掌握响应式图片的实现方法（`<picture>` 和 `<source>`）
- [ ] 能够使用 `<details>` 和 `<summary>` 创建折叠内容
- [ ] 理解 `<time>` 和 `<address>` 标签的语义
- [ ] 了解 `<template>` 和 `<noscript>` 的用途
