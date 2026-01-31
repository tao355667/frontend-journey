# JavaScript 实践

## 本章目的

通过实战项目巩固所学知识，实现一个完整的 Todo List 应用，将 JavaScript 理论应用到实际开发中。

---

## 内容概述

本章通过一个完整的 Todo List 项目，综合运用前面章节的知识：

1. **DOM 操作**：创建、修改、删除页面元素
2. **事件处理**：响应用户的点击、输入等操作
3. **数据存储**：使用 localStorage 持久化数据
4. **函数应用**：使用类和函数组织代码

---

## 核心概念讲解

### 项目需求

实现一个功能完整的 Todo List 应用：

- 添加待办事项
- 标记完成/未完成
- 编辑待办事项
- 删除待办事项
- 过滤显示（全部/进行中/已完成）
- 统计进行中的项目数量
- 数据持久化到 localStorage

---

## 代码示例说明

### index.html

页面的 HTML 结构：

- 输入框和添加按钮
- 过滤按钮（全部/进行中/已完成）
- 待办事项列表
- 统计信息

### main.js

JavaScript 逻辑实现：

- TodoApp 类封装应用逻辑
- 添加、编辑、删除待办事项
- 过滤功能实现
- localStorage 数据持久化
- 事件绑定和处理

### style.css

页面样式设计：

- 响应式布局
- 交互效果（悬停、点击）
- 完成状态样式
- 编辑模式样式

---

## 项目实现

### HTML 结构

```html
<div class="container">
    <h1>Todo List</h1>
    
    <div class="input-section">
        <input type="text" id="todoInput" placeholder="添加新待办事项...">
        <button id="addBtn">添加</button>
    </div>
    
    <div class="filter-section">
        <button class="filter-btn active" data-filter="all">全部</button>
        <button class="filter-btn" data-filter="active">进行中</button>
        <button class="filter-btn" data-filter="completed">已完成</button>
    </div>
    
    <ul id="todoList"></ul>
    
    <div class="stats">
        <span id="activeCount">0</span> 个进行中的项目
    </div>
</div>
```

### JavaScript 实现

```javascript
class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.render();
    }
    
    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();
        
        if (text) {
            const todo = {
                id: Date.now(),
                text: text,
                completed: false,
                createdAt: new Date().toISOString()
            };
            
            this.todos.unshift(todo);
            this.saveTodos();
            this.render();
            input.value = '';
        }
    }
    
    // ... 其他方法
}
```

---

## 最佳实践

### 代码组织

1. **使用类封装应用逻辑**：保持代码结构清晰
2. **分离数据操作和 UI 更新**：提高可维护性
3. **使用事件委托**：减少事件监听器数量

```javascript
// 好的做法
class TodoApp {
    constructor() {
        this.todos = [];
        this.bindEvents();
        this.render();
    }
    
    bindEvents() {
        document.getElementById('addBtn').addEventListener('click', () => this.addTodo());
    }
}
```

### 数据持久化

1. **使用 localStorage 保存数据**：避免刷新丢失
2. **及时保存**：每次修改后立即保存
3. **加载时检查**：页面加载时读取已有数据

```javascript
saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
}

loadTodos() {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
}
```

### 安全考虑

1. **转义 HTML**：防止 XSS 攻击
2. **验证输入**：检查空值和格式
3. **处理异常**：捕获可能的错误

```javascript
escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

---

## 文件说明

本章节包含以下文件：

| 文件名 | 说明 | 主要内容 |
|--------|------|----------|
| index.html | HTML 结构 | 页面结构和元素 |
| main.js | JavaScript 逻辑 | 应用功能实现 |
| style.css | CSS 样式 | 页面样式设计 |

---

## 练习题

### 基础练习

1. **添加功能**：实现添加待办事项的功能

2. **删除功能**：实现删除待办事项的功能

3. **完成功能**：实现标记完成的功能

### 进阶练习

1. **编辑功能**：实现编辑待办事项的功能

2. **过滤功能**：实现过滤显示功能

3. **持久化功能**：实现数据持久化到 localStorage

### 挑战练习

1. **拖拽排序**：实现拖拽排序功能

2. **批量操作**：实现批量删除和批量完成

3. **搜索功能**：实现搜索待办事项的功能

---

## 学习目标检查

完成本章学习后，你应该能够：

- [ ] 理解项目的整体架构
- [ ] 使用类组织 JavaScript 代码
- [ ] 实现基本的 CRUD 操作
- [ ] 使用 localStorage 持久化数据
- [ ] 绑定和处理 DOM 事件
- [ ] 动态更新页面内容
- [ ] 实现过滤和搜索功能
- [ ] 编写可维护的代码
- [ ] 处理用户交互和反馈
- [ ] 遵循最佳实践开发应用
- [ ] 完成基础、进阶练习题

---

## 项目扩展

完成基础项目后，可以尝试以下扩展功能：

1. **优先级设置**：为待办事项设置优先级
2. **截止日期**：添加截止日期功能
3. **分类标签**：为待办事项添加标签
4. **主题切换**：实现深色/浅色主题
5. **数据导出**：支持导出为 JSON 或 CSV

---

## 总结

通过这个项目，你已经综合运用了：

- **基础语法**：变量、函数、对象、数组
- **流程控制**：条件判断、循环
- **函数**：函数定义、箭头函数、闭包
- **DOM 操作**：选择元素、修改内容、处理事件
- **异步编程**：Promise、async/await（如需扩展）
- **ES6+ 特性**：解构、展开、模块
- **浏览器存储**：localStorage、sessionStorage

继续探索更多项目和挑战，不断提升你的 JavaScript 技能！
