# DOM 操作

## 本章目的

掌握 JavaScript 如何操作网页的 DOM（文档对象模型），学会选择、修改页面元素和处理用户交互事件。

---

## 内容概述

本章将学习 JavaScript 与网页交互的核心技术：

1. **DOM 选择**：通过各种方式选择页面元素
2. **DOM 更新**：修改元素的内容、样式和属性
3. **事件处理**：响应用户的点击、输入等交互

---

## 核心概念讲解

### DOM：网页的"骨架"

DOM（Document Object Model）是浏览器将 HTML 网页转换成的 JavaScript 对象树，你可以通过 JavaScript 来操作这棵树。

#### DOM 树结构

```html
<!DOCTYPE html>
<html>
    <head>
        <title>My Page</title>
    </head>
    <body>
        <h1>Hello</h1>
        <p>World</p>
    </body>
</html>
```

转换成 DOM 树：
```
document (根节点)
├── html
    ├── head
    │   └── title
    └── body
        ├── h1
        └── p
```

**类比**：DOM 树就像一个家族树，每个 HTML 元素都是家族成员，有父节点、子节点和兄弟节点。

---

### DOM 选择：找到你想要的元素

要操作页面元素，首先需要找到它们。

#### getElementById：通过 ID 选择

```javascript
const header = document.getElementById("main-header");
```

**特点**：ID 是唯一的，返回单个元素。

#### getElementsByClassName：通过类名选择

```javascript
const items = document.getElementsByClassName("item");
```

**特点**：类名可重复，返回类似数组的集合。

#### getElementsByTagName：通过标签名选择

```javascript
const paragraphs = document.getElementsByTagName("p");
```

**特点**：返回该类型的所有元素。

#### querySelector：CSS 选择器（推荐）

```javascript
// 选择第一个匹配的元素
const header = document.querySelector("#main-header");
const item = document.querySelector(".item");
const paragraph = document.querySelector("p.active");

// 选择所有匹配的元素
const allItems = document.querySelectorAll(".item");
const allLinks = document.querySelectorAll("a[href^='https']");
```

**特点**：支持所有 CSS 选择器，更灵活。

**类比**：就像使用搜索引擎搜索，querySelector 是高级搜索，可以根据各种条件查找。

---

### DOM 更新：修改页面

找到元素后，可以修改它的内容、样式和属性。

#### 修改内容

```javascript
const element = document.querySelector(".message");

// 修改文本内容
element.textContent = "New text";

// 修改 HTML 内容
element.innerHTML = "<strong>Bold text</strong>";

// 获取内容
console.log(element.textContent);
```

**注意**：`textContent` 只设置文本，`innerHTML` 会解析 HTML，存在 XSS 风险。

#### 修改样式

```javascript
const element = document.querySelector(".box");

// 直接修改样式
element.style.backgroundColor = "red";
element.style.fontSize = "20px";

// 添加/删除类名
element.classList.add("active");
element.classList.remove("hidden");
element.classList.toggle("visible");
element.classList.contains("active"); // 检查是否包含类名

// 修改所有样式
element.className = "new-class another-class";
```

#### 修改属性

```javascript
const link = document.querySelector("a");

// 设置属性
link.setAttribute("href", "https://example.com");
link.setAttribute("target", "_blank");

// 获取属性
console.log(link.getAttribute("href"));

// 删除属性
link.removeAttribute("target");

// 直接访问属性（对于某些属性）
console.log(link.href);
link.id = "my-link";
```

#### 添加和删除元素

```javascript
// 创建新元素
const newDiv = document.createElement("div");
newDiv.textContent = "New element";
newDiv.className = "new-item";

// 添加到父元素
const container = document.querySelector(".container");
container.appendChild(newDiv);

// 插入到指定位置之前
const reference = document.querySelector(".reference");
container.insertBefore(newDiv, reference);

// 删除元素
const toRemove = document.querySelector(".remove-me");
toRemove.remove();

// 替换元素
const oldElement = document.querySelector(".old");
const newElement = document.createElement("div");
newElement.textContent = "New content";
oldElement.replaceWith(newElement);
```

---

### 事件处理：响应用户交互

事件是用户在页面上做的操作（点击、输入、滚动等），JavaScript 可以监听这些事件并做出响应。

#### 添加事件监听器

```javascript
const button = document.querySelector("button");

button.addEventListener("click", function(event) {
    console.log("Button clicked!");
    console.log("Event object:", event);
});

// 箭头函数
button.addEventListener("click", (event) => {
    console.log("Button clicked!");
});
```

#### 常用事件类型

| 事件类型 | 说明 | 示例 |
|---------|------|------|
| click | 点击 | 点击按钮 |
| dblclick | 双击 | 双击文本 |
| mouseover | 鼠标悬停 | 鼠标移到元素上 |
| mouseout | 鼠标移出 | 鼠标离开元素 |
| keydown | 按下键盘 | 输入框中按键 |
| keyup | 松开键盘 | 松开按键 |
| change | 值改变 | 下拉框选择改变 |
| submit | 表单提交 | 点击提交按钮 |
| load | 页面加载完成 | 页面加载完成 |

#### 事件对象

事件处理器会接收一个事件对象，包含事件的相关信息：

```javascript
button.addEventListener("click", (event) => {
    console.log("Target:", event.target); // 触发事件的元素
    console.log("Current target:", event.currentTarget); // 绑定事件的元素
    console.log("Client X:", event.clientX); // 鼠标位置
    console.log("Client Y:", event.clientY);
    event.preventDefault(); // 阻止默认行为
    event.stopPropagation(); // 阻止事件冒泡
});
```

#### 事件委托

事件委托是一种优化技术，只在父元素上监听事件，利用事件冒泡处理子元素的事件：

```javascript
const list = document.querySelector("ul");

list.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        console.log("Clicked item:", event.target.textContent);
    }
});
```

**优点**：
- 减少事件监听器数量
- 动态添加的元素也能响应事件

**类比**：就像在公司里，你不需要给每个员工都装一个电话，可以只在前台装一个电话，所有员工的消息都通过前台接收。

---

## 代码示例说明

### dom-select.html

这个文件展示了各种 DOM 选择方法：

- getElementById：通过 ID 选择
- getElementsByClassName：通过类名选择
- getElementsByTagName：通过标签名选择
- querySelector：CSS 选择器
- querySelectorAll：选择所有匹配元素

### dom-update.html

这个文件展示了 DOM 更新方法：

- 修改内容：textContent 和 innerHTML
- 修改样式：style 和 classList
- 修改属性：setAttribute 和直接属性访问
- 添加和删除元素：createElement、appendChild、remove

### dom-events.html

这个文件展示了事件处理：

- 基本事件监听：click、mouseover
- 事件对象：event.target、event.preventDefault
- 事件委托：在父元素上监听子元素事件
- 表单事件：submit、change、input

---

## 最佳实践

### 选择元素

1. **优先使用 querySelector**：最灵活，支持所有 CSS 选择器
2. **缓存选择结果**：避免重复查询 DOM
3. **使用语义化的 ID 和类名**：便于维护

```javascript
// 好的做法
const button = document.querySelector("#submit-button");
button.addEventListener("click", handleClick);

// 不好的做法
document.querySelector("#submit-button").addEventListener("click", function() { ... });
document.querySelector("#submit-button").addEventListener("click", function() { ... });
```

### 修改内容

1. **优先使用 textContent**：避免 XSS 攻击
2. **只在必要时使用 innerHTML**：需要解析 HTML 时使用

```javascript
// 好的做法
element.textContent = userInput;

// 不好的做法（存在 XSS 风险）
element.innerHTML = userInput;
```

### 添加事件

1. **使用 addEventListener**：可以添加多个处理器
2. **避免内联事件处理器**：HTML 和 JavaScript 分离

```javascript
// 好的做法
button.addEventListener("click", handleClick);

// 不好的做法
button.onclick = handleClick;
<button onclick="handleClick()">Click me</button>
```

### 性能优化

1. **使用事件委托**：减少事件监听器数量
2. **批量更新 DOM**：减少重排和重绘
3. **使用 DocumentFragment**：批量插入元素

```javascript
// 好的做法：使用事件委托
list.addEventListener("click", (event) => {
    if (event.target.classList.contains("item")) {
        handleItemClick(event.target);
    }
});

// 不好的做法：为每个子元素添加监听器
const items = list.querySelectorAll(".item");
items.forEach(item => {
    item.addEventListener("click", handleItemClick);
});
```

---

## 文件说明

本章节包含以下文件：

| 文件名 | 说明 | 主要内容 |
|--------|------|----------|
| dom-select.html | DOM 选择示例 | 各种选择器方法 |
| dom-update.html | DOM 更新示例 | 修改内容、样式、属性 |
| dom-events.html | 事件处理示例 | 事件监听、事件委托 |

---

## 练习题

### 基础练习

1. **修改文本**：创建一个按钮，点击后修改段落的文本

2. **切换样式**：创建一个按钮，点击后切换元素的显示/隐藏

3. **计数器**：创建一个计数器，每次点击增加数值

### 进阶练习

1. **待办事项**：创建一个简单的待办事项列表，可以添加和删除项目

2. **模态框**：创建一个模态框，点击按钮显示，点击关闭按钮或遮罩层隐藏

3. **表单验证**：创建一个注册表单，实时验证输入内容

### 挑战练习

1. **选项卡切换**：创建选项卡界面，点击不同选项卡显示不同内容

2. **图片轮播**：创建一个图片轮播组件，支持自动播放和手动切换

3. **拖拽排序**：创建一个可拖拽排序的列表

---

## 学习目标检查

完成本章学习后，你应该能够：

- [ ] 理解 DOM 的概念和结构
- [ ] 使用各种方法选择 DOM 元素
- [ ] 修改元素的内容、样式和属性
- [ ] 创建、添加、删除 DOM 元素
- [ ] 添加和移除事件监听器
- [ ] 理解事件对象的使用
- [ ] 使用事件委托优化代码
- [ ] 防止默认事件行为
- [ ] 遵循最佳实践编写高效的 DOM 操作代码
- [ ] 完成基础、进阶练习题

---

## 下一步

完成本章学习后，请继续学习 [第六章：异步编程](../06-async/)，学习如何处理异步操作和 API 请求。
