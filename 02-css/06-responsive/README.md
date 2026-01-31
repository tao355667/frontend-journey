# CSS 响应式设计

**本章目的：掌握响应式设计技术，创建适配各种设备的网页**

## 本章目的

掌握响应式设计技术，创建适配各种设备的网页

---

## 内容概述

本章节将带你深入学习 CSS 响应式设计，包括媒体查询、移动优先设计理念以及响应式布局策略。通过学习，你将理解如何创建适配各种设备的网页，掌握常用断点的设置方法，能够为用户提供优秀的浏览体验。

---

## 概述

响应式设计是一种网页设计方法，使网页能够在不同设备和屏幕尺寸上提供最佳的浏览体验。通过 CSS 媒体查询和灵活的布局技术，创建适配各种设备的网页。

## 学习目标

通过这个模块，你将学习：

1. 媒体查询的语法和使用方法
2. 响应式布局的实现技巧
3. 移动优先的设计理念
4. 常用断点的设置方法
5. 响应式图片和文字的处理

## 文件说明

### media-query.html
完整的媒体查询演示页面，包含：

**核心内容：**
- 基础媒体查询语法
- 不同断点的响应式效果
- 设备特性检测
- 方向和分辨率适配
- 打印样式优化

**演示特性：**
- 响应式网格布局
- 自适应文字大小
- 响应式导航菜单
- 设备信息显示
- 实时视口检测

### practice-solution.html
基础练习参考答案，包含响应式布局、导航与文字示例。

## 媒体查询基础

### 基本语法
```css
@media media-type and (media-feature) {
  /* CSS 规则 */
}
```

### 常用媒体类型
- `all` - 所有设备（默认）
- `screen` - 屏幕设备
- `print` - 打印设备
- `speech` - 语音设备

### 媒体特性

#### 宽度相关
```css
/* 视口宽度 */
@media (min-width: 768px) {
  .container {
    max-width: 750px;
  }
}

/* 设备宽度 */
@media (min-device-width: 768px) {
  .element {
    font-size: 16px;
  }
}
```

#### 高度相关
```css
/* 视口高度 */
@media (min-height: 600px) {
  .modal {
    max-height: 500px;
  }
}
```

#### 方向检测
```css
/* 横屏 */
@media (orientation: landscape) {
  .sidebar {
    width: 300px;
  }
}

/* 竖屏 */
@media (orientation: portrait) {
  .sidebar {
    width: 100%;
  }
}
```

#### 分辨率检测
```css
/* 高分辨率屏幕 */
@media (-webkit-min-device-pixel-ratio: 2),
       (min-resolution: 192dpi) {
  .logo {
    background-image: url('logo@2x.png');
  }
}
```

## 响应式布局策略

### 1. 移动优先（Mobile First）
```css
/* 基础样式 - 移动设备 */
.container {
  width: 100%;
  padding: 15px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}

/* 平板设备 */
@media (min-width: 768px) {
  .container {
    max-width: 750px;
    margin: 0 auto;
    padding: 30px;
  }
  
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 桌面设备 */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    padding: 40px;
  }
  
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
}
```

### 2. 桌面优先（Desktop First）
```css
/* 基础样式 - 桌面设备 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

/* 平板设备 */
@media (max-width: 1023px) {
  .container {
    max-width: 750px;
    padding: 30px;
  }
  
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

/* 移动设备 */
@media (max-width: 767px) {
  .container {
    width: 100%;
    padding: 15px;
  }
  
  .grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}
```

## 常用断点设置

### 标准断点
```css
/* 超小屏幕（手机） */
@media (max-width: 575px) { }

/* 小屏幕（手机横屏） */
@media (min-width: 576px) and (max-width: 767px) { }

/* 中等屏幕（平板） */
@media (min-width: 768px) and (max-width: 991px) { }

/* 大屏幕（桌面） */
@media (min-width: 992px) and (max-width: 1199px) { }

/* 超大屏幕（大桌面） */
@media (min-width: 1200px) { }
```

### 简化断点
```css
/* 移动设备 */
@media (max-width: 767px) { }

/* 平板设备 */
@media (min-width: 768px) and (max-width: 1023px) { }

/* 桌面设备 */
@media (min-width: 1024px) { }
```

## 响应式组件

### 1. 响应式导航
```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.nav-menu {
  display: none;
}

@media (min-width: 768px) {
  .nav-toggle {
    display: none;
  }
  
  .nav-menu {
    display: flex;
    gap: 2rem;
  }
}
```

### 2. 响应式卡片
```css
.card-grid {
  display: grid;
  gap: 2rem;
  padding: 1rem;
}

/* 移动端：单列 */
.card-grid {
  grid-template-columns: 1fr;
}

/* 平板端：2列 */
@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
    padding: 2rem;
  }
}

/* 桌面端：3列 */
@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
    padding: 3rem;
  }
}
```

### 3. 响应式文字
```css
/* 基础文字大小 */
html {
  font-size: 16px;
}

/* 移动设备 */
@media (max-width: 767px) {
  html {
    font-size: 14px;
  }
  
  h1 {
    font-size: 1.5rem;
  }
  
  h2 {
    font-size: 1.3rem;
  }
}

/* 桌面设备 */
@media (min-width: 1024px) {
  html {
    font-size: 18px;
  }
  
  h1 {
    font-size: 2.5rem;
  }
  
  h2 {
    font-size: 2rem;
  }
}
```

## 响应式图片

### 1. 自适应图片
```css
img {
  max-width: 100%;
  height: auto;
}
```

### 2. 响应式背景图片
```css
.hero {
  background-image: url('hero-small.jpg');
  background-size: cover;
  background-position: center;
  min-height: 300px;
}

@media (min-width: 768px) {
  .hero {
    background-image: url('hero-medium.jpg');
    min-height: 400px;
  }
}

@media (min-width: 1024px) {
  .hero {
    background-image: url('hero-large.jpg');
    min-height: 500px;
  }
}
```

### 3. 高分辨率图片
```css
.logo {
  background-image: url('logo.png');
  background-size: contain;
  background-repeat: no-repeat;
}

@media (-webkit-min-device-pixel-ratio: 2),
       (min-resolution: 192dpi) {
  .logo {
    background-image: url('logo@2x.png');
  }
}
```

## Flexbox 响应式

### 1. 自适应 Flexbox
```css
.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.flex-item {
  flex: 1 1 300px;
  min-width: 0;
}
```

### 2. 响应式 Flexbox 方向
```css
.flex-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .flex-container {
    flex-direction: row;
  }
}
```

## Grid 响应式

### 1. 自动适应 Grid
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
```

### 2. 响应式 Grid 区域
```css
.grid-layout {
  display: grid;
  gap: 1rem;
  grid-template-areas:
    "header"
    "main"
    "sidebar"
    "footer";
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid-layout {
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
    grid-template-columns: 200px 1fr;
  }
}

@media (min-width: 1024px) {
  .grid-layout {
    grid-template-areas:
      "header header header"
      "sidebar main aside"
      "footer footer footer";
    grid-template-columns: 200px 1fr 200px;
  }
}
```

## 高级媒体查询技巧

### 1. 复合条件
```css
/* 同时满足多个条件 */
@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .element {
    /* 样式规则 */
  }
}

/* 满足任一条件 */
@media (min-width: 768px), (orientation: landscape) {
  .element {
    /* 样式规则 */
  }
}
```

### 2. 否定条件
```css
/* 非打印设备 */
@media not print {
  .no-print {
    display: block;
  }
}
```

### 3. 媒体查询嵌套（使用预处理器）
```scss
.container {
  width: 100%;
  
  @media (min-width: 768px) {
    max-width: 750px;
    margin: 0 auto;
    
    @media (min-width: 1024px) {
      max-width: 1200px;
    }
  }
}
```

## 性能优化

### 1. CSS 优化
```css
/* 避免重复的媒体查询 */
@media (min-width: 768px) {
  .element-1 {
    font-size: 18px;
  }
  
  .element-2 {
    font-size: 18px;
  }
  
  .element-3 {
    font-size: 18px;
  }
}

/* 更好的方式 */
@media (min-width: 768px) {
  .responsive-text {
    font-size: 18px;
  }
}
```

### 2. 图片优化
```css
/* 使用 srcset 属性 */
<img src="image.jpg" 
     srcset="image-small.jpg 480w,
             image-medium.jpg 768w,
             image-large.jpg 1024w"
     sizes="(max-width: 480px) 480px,
            (max-width: 768px) 768px,
            1024px"
     alt="描述">
```

### 3. 加载优化
```css
/* 移动端不加载某些资源 */
@media (max-width: 767px) {
  .desktop-only {
    display: none;
  }
  
  .mobile-background {
    background-image: none;
  }
}
```

## 调试和测试

### 1. 开发者工具
- Chrome DevTools 设备模拟器
- Firefox 响应式设计模式
- Safari 开发者工具

### 2. 调试技巧
```css
/* 显示当前断点 */
body::before {
  content: "Mobile";
  position: fixed;
  top: 0;
  left: 0;
  background: red;
  color: white;
  padding: 5px 10px;
  z-index: 9999;
}

@media (min-width: 768px) {
  body::before {
    content: "Tablet";
    background: orange;
  }
}

@media (min-width: 1024px) {
  body::before {
    content: "Desktop";
    background: green;
  }
}
```

### 3. 真实设备测试
- 使用 BrowserStack 等云测试服务
- 在真实设备上测试
- 测试不同屏幕方向

## 常见问题和解决方案

### 1. 视口设置
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 2. 横屏适配
```css
@media (orientation: landscape) and (max-height: 500px) {
  .modal {
    max-height: 90vh;
    overflow-y: auto;
  }
}
```

### 3. 触摸设备优化
```css
@media (hover: none) and (pointer: coarse) {
  .button {
    min-height: 44px;
    min-width: 44px;
  }
}
```

## 最佳实践

### 1. 移动优先
- 从小屏幕开始设计
- 逐步增强到大屏幕
- 减少不必要的媒体查询

### 2. 灵活的单位
```css
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

.text {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
}
```

### 3. 性能考虑
- 按需加载资源
- 优化图片大小
- 减少 CSS 文件大小

### 4. 可访问性
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 学习建议

1. **掌握基础**：理解媒体查询语法和常用特性
2. **实践项目**：通过实际项目练习响应式设计
3. **测试工具**：熟练使用各种调试和测试工具
4. **性能意识**：关注响应式设计对性能的影响
5. **持续学习**：关注新的响应式技术和最佳实践

## 相关资源

- [MDN 媒体查询](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Media_Queries)
- [响应式设计指南](https://web.dev/responsive-web-design-basics/)
- [Can I Use - 媒体查询支持](https://caniuse.com/css-mediaqueries)

## 下一步

完成这个模块后，建议继续学习：
- CSS 模块化 (07-css-modular)
- CSS 实践项目 (08-css-practice)

## 总结

响应式设计是现代网页开发的核心技能。通过掌握媒体查询和响应式布局技术，你可以创建适配各种设备的网页，为用户提供优秀的浏览体验。响应式设计不仅提升了用户体验，也提高了开发效率和代码的可维护性。

---

## 练习题

### 基础练习

**题目 1：使用媒体查询创建响应式布局**
- 创建一个基础布局（单列）
- 使用媒体查询添加断点（768px, 1024px）
- 在不同断点下使用不同的布局（2列、3列）
- 测试在不同屏幕尺寸下的显示效果

**题目 2：创建响应式导航**
- 创建一个导航菜单
- 使用媒体查询实现移动端和桌面端的不同显示方式
- 移动端使用汉堡菜单
- 桌面端显示完整菜单

**题目 3：创建响应式文字**
- 设置基础字体大小
- 使用媒体查询在不同屏幕尺寸下调整字体大小
- 确保文字在各种设备上都能正常阅读
- 测试在不同屏幕尺寸下的显示效果

---

### 进阶练习

**题目 1：创建响应式卡片网格**
- 使用 `repeat(auto-fit, minmax(250px, 1fr))` 创建自适应网格
- 为卡片添加悬停效果
- 使用媒体查询调整间距和内边距
- 确保卡片在各种设备上都能正常显示

**题目 2：创建响应式图片**
- 使用 `max-width: 100%` 实现自适应图片
- 使用媒体查询加载不同尺寸的图片
- 确保图片在各种设备上都能正常显示
- 测试在不同屏幕尺寸下的显示效果

**题目 3：创建响应式表单**
- 创建一个表单
- 使用媒体查询实现移动端和桌面端的不同布局
- 移动端使用单列布局
- 桌面端使用多列布局
- 确保表单在各种设备上都能正常使用

---

### 挑战练习

**题目 1：创建一个完整的响应式页面**
- 使用移动优先设计理念
- 创建头部、导航、内容、底部等区域
- 使用媒体查询适配不同屏幕尺寸
- 为不同区域添加不同的响应式布局
- 确保页面在各种设备上都能正常显示

**题目 2：创建一个响应式产品展示页**
- 创建产品卡片网格
- 使用媒体查询实现不同的布局（1列、2列、3列）
- 为产品卡片添加悬停效果
- 使用媒体查询调整图片大小
- 确保产品展示页在各种设备上都能正常显示

**题目 3：创建一个响应式博客**
- 创建博客文章列表
- 使用媒体查询实现不同的布局（单列、多列）
- 为博客文章卡片添加悬停效果
- 使用媒体查询调整字体大小和间距
- 确保博客在各种设备上都能正常阅读

---

## 学习目标检查清单

完成本章节学习后，检查你是否已经掌握以下内容：

### 媒体查询
- [ ] 理解媒体查询的基本语法
- [ ] 掌握常用媒体类型（screen, print）
- [ ] 掌握常用媒体特性（min-width, max-width, orientation）
- [ ] 能够使用媒体查询创建响应式布局
- [ ] 知道常用断点的设置方法

### 响应式布局策略
- [ ] 理解移动优先的设计理念
- [ ] 理解桌面优先的设计理念
- [ ] 知道两种策略的优缺点
- [ ] 能够选择合适的布局策略
- [ ] 能够创建响应式布局

### 响应式组件
- [ ] 能够创建响应式导航
- [ ] 能够创建响应式卡片
- [ ] 能够创建响应式文字
- [ ] 能够创建响应式图片
- [ ] 能够创建响应式表单

### 实践能力
- [ ] 能够创建响应式页面
- [ ] 能够使用媒体查询适配不同屏幕尺寸
- [ ] 能够测试响应式布局
- [ ] 能够解决响应式相关的问题
- [ ] 能够优化响应式布局的性能
