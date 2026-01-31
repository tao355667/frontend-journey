# 事件处理

## 本章目的

掌握 React 中的事件处理机制，学会绑定和处理各种用户事件，理解事件对象的用法。

---

## 内容概述

用户与网页的交互主要通过事件来完成：点击按钮、输入文字、提交表单等都是事件。React 使用合成事件（SyntheticEvent）系统，提供了一套与浏览器原生事件兼容的事件处理机制。本章将讲解事件绑定的基本方法、事件对象的属性和使用、常见事件类型的处理等内容。通过本章的学习，您将能够为组件添加交互功能，创建响应用户操作的用户界面。

---

## 7.1 事件处理的基本概念

### 通俗解释

事件就像是网页的"神经系统"，它感知用户的每一个动作并做出相应的反应。当你点击一个按钮、滑动鼠标、按下键盘时，事件系统就会"感知"到这些动作，并执行预先定义好的代码来处理这些动作。

在 React 中，事件处理就像给按钮安装一个"开关"，当用户点击时，开关触发，预先设定好的函数就会执行。比如：点击"提交"按钮后，表单数据被发送；点击"删除"按钮后，列表项被移除。

### 技术定义

React 使用合成事件（SyntheticEvent）来包装原生 DOM 事件，提供跨浏览器兼容的事件接口。React 事件与原生 DOM 事件类似，但有一些区别：

| 特性 | React 事件 | 原生 DOM 事件 |
|------|-----------|--------------|
| 事件名称 | camelCase | lowercase |
| 阻止默认 | `e.preventDefault()` | `event.preventDefault()` |
| 绑定方式 | JSX 属性 | `addEventListener` |
| 事件对象 | SyntheticEvent | 原生 Event |

### React 事件的特点

```
┌─────────────────────────────────────────────────────────────┐
│                    React 事件特点                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. 事件名称使用 camelCase                                  │
│     onClick, onMouseEnter, onKeyDown                        │
│                                                              │
│  2. 事件处理函数作为 JSX 属性传递                            │
│     <button onClick={handleClick}>按钮</button>             │
│                                                              │
│  3. 传入函数引用，而不是字符串                               │
│     onClick="handleClick()"  ❌                             │
│     onClick={handleClick}    ✅                             │
│                                                              │
│  4. 不能返回 false 阻止默认行为，需要调用 preventDefault()  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 7.2 绑定事件处理函数

### 基本语法

```jsx
function Button() {
    // 定义事件处理函数
    const handleClick = () => {
        alert('按钮被点击了！');
    };
    
    // 绑定事件
    return <button onClick={handleClick}>点击我</button>;
}
```

### 传递参数

```jsx
function List() {
    const items = ['苹果', '香蕉', '橙子'];
    
    const handleDelete = (item) => {
        alert(`删除: ${item}`);
    };
    
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index}>
                    {item}
                    {/* 使用箭头函数传递参数 */}
                    <button onClick={() => handleDelete(item)}>删除</button>
                </li>
            ))}
        </ul>
    );
}
```

### 使用 bind 传递参数

```jsx
function DeleteButton({ id, onDelete }) {
    // 使用 bind 传递参数
    return <button onClick={onDelete.bind(null, id)}>删除</button>;
}
```

### 在类组件中绑定

```jsx
class Counter extends React.Component {
    state = {
        count: 0
    };
    
    // 方法需要绑定 this
    handleClick() {
        this.setState({ count: this.state.count + 1 });
    }
    
    render() {
        // 方式一：在构造函数中绑定
        return <button onClick={this.handleClick}>计数: {this.state.count}</button>;
    }
}

// 现代写法：使用箭头函数
class ModernCounter extends React.Component {
    state = {
        count: 0
    };
    
    // 箭头函数自动绑定 this
    handleClick = () => {
        this.setState({ count: this.state.count + 1 });
    };
    
    render() {
        return <button onClick={this.handleClick}>计数: {this.state.count}</button>;
    }
}
```

---

## 7.3 事件对象

### 基本使用

```jsx
function InputExample() {
    const handleChange = (event) => {
        // 事件对象包含各种信息
        console.log('输入值:', event.target.value);
        console.log('事件类型:', event.type);
        console.log('目标元素:', event.target);
    };
    
    return <input onChange={handleChange} placeholder="输入内容" />;
}
```

### 常用事件对象属性

| 属性 | 说明 | 示例值 |
|------|------|--------|
| `type` | 事件类型 | 'click', 'change' |
| `target` | 触发事件的元素 | `<input>` |
| `currentTarget` | 绑定事件的元素 | `<button>` |
| `preventDefault()` | 阻止默认行为 | - |
| `stopPropagation()` | 停止事件冒泡 | - |
| `nativeEvent` | 原生事件对象 | - |

### 常用事件类型

```jsx
// 鼠标事件
function MouseEvents() {
    const handleMouseEnter = (e) => {
        e.target.style.backgroundColor = '#f0f0f0';
    };
    
    const handleMouseLeave = (e) => {
        e.target.style.backgroundColor = 'transparent';
    };
    
    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ padding: '20px', border: '1px solid #ccc' }}
        >
            鼠标悬停测试
        </div>
    );
}

// 键盘事件
function KeyboardEvents() {
    const handleKeyDown = (e) => {
        console.log('按键:', e.key);
        console.log('按键码:', e.keyCode);
        if (e.key === 'Enter') {
            alert('按下回车键！');
        }
    };
    
    return (
        <input
            onKeyDown={handleKeyDown}
            placeholder="按下任意按键"
        />
    );
}

// 表单事件
function FormEvents() {
    const handleFocus = (e) => {
        e.target.style.borderColor = 'blue';
    };
    
    const handleBlur = (e) => {
        e.target.style.borderColor = '#ccc';
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('表单提交！');
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="聚焦/失焦测试"
            />
            <button type="submit">提交</button>
        </form>
    );
}

// 剪贴板事件
function ClipboardEvents() {
    const handleCopy = (e) => {
        alert('内容已复制！');
        // 可以修改剪贴板内容
        // e.clipboardData.setData('text', '自定义内容');
    };
    
    return (
        <p onCopy={handleCopy}>
            尝试复制这段文字
        </p>
    );
}
```

---

## 7.4 常见事件处理示例

### 点击事件

```jsx
function ClickEvents() {
    const handleSingleClick = () => {
        alert('单击事件');
    };
    
    const handleDoubleClick = () => {
        alert('双击事件');
    };
    
    return (
        <div>
            <button onClick={handleSingleClick}>单击我</button>
            <button onDoubleClick={handleDoubleClick}>双击我</button>
        </div>
    );
}
```

### 表单输入事件

```jsx
function InputForm() {
    const [text, setText] = React.useState('');
    const [focused, setFocused] = React.useState(false);
    
    const handleChange = (e) => {
        setText(e.target.value);
    };
    
    return (
        <div>
            <input
                value={text}
                onChange={handleChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="输入内容..."
            />
            <p>输入内容: {text}</p>
            <p>聚焦状态: {focused ? '是' : '否'}</p>
        </div>
    );
}
```

### 复选框和选择器

```jsx
function CheckboxForm() {
    const [isChecked, setIsChecked] = React.useState(false);
    const [fruit, setFruit] = React.useState('apple');
    
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                />
                我同意条款
            </label>
            <p>选中状态: {isChecked ? '是' : '否'}</p>
            
            <select
                value={fruit}
                onChange={(e) => setFruit(e.target.value)}
            >
                <option value="apple">苹果</option>
                <option value="banana">香蕉</option>
                <option value="orange">橙子</option>
            </select>
            <p>选择: {fruit}</p>
        </div>
    );
}
```

### 阻止默认行为

```jsx
function LinkExample() {
    const handleClick = (e) => {
        // 阻止默认行为（导航）
        e.preventDefault();
        alert('链接被点击，但不跳转页面');
    };
    
    return (
        <a href="https://example.com" onClick={handleClick}>
            点击我（不会跳转）
        </a>
    );
}

function FormWithPrevent() {
    const handleSubmit = (e) => {
        // 阻止表单默认提交行为
        e.preventDefault();
        alert('表单已阻止默认提交行为');
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="姓名" />
            <button type="submit">提交</button>
        </form>
    );
}
```

---

## 7.5 事件处理的最佳实践

### 不要在渲染中创建新函数

```jsx
// 不推荐：每次渲染都创建新函数
function BadExample({ id, onDelete }) {
    return (
        <button onClick={() => onDelete(id)}>删除</button>
    );
}

// 推荐：使用 useCallback 缓存函数
function GoodExample({ id, onDelete }) {
    const handleClick = React.useCallback(() => {
        onDelete(id);
    }, [id, onDelete]);
    
    return <button onClick={handleClick}>删除</button>;
}
```

### 事件处理函数命名规范

```jsx
// 推荐使用 handle 前缀
function Recommended() {
    const handleClick = () => { /* ... */ };
    const handleChange = () => { /* ... */ };
    const handleSubmit = () => { /* ... */ };
    
    return (
        <button onClick={handleClick}>点击</button>
    );
}

// 类组件中方法命名
class Component extends React.Component {
    handleClick = () => { /* ... */ };
    handleMouseEnter = () => { /* ... */ };
    handleKeyDown = () => { /* ... */ };
    
    render() {
        return <button onClick={this.handleClick}>点击</button>;
    }
}
```

---

## 练习题

### 基础练习

**练习要求**：创建一个简单的计算器，支持加法、减法、乘法、除法运算。

### 进阶练习

**练习要求**：创建一个待办事项列表，支持：
- 添加任务
- 标记完成/未完成
- 删除任务
- 使用本地存储保存数据

### 挑战练习

**练习要求**：创建一个自定义 Hook，用于追踪鼠标位置并在页面上显示。

---

## 学习目标检查

- [ ] 理解 React 事件系统的基本概念
- [ ] 掌握事件绑定的方法
- [ ] 理解事件对象的属性和方法
- [ ] 能够处理各种类型的事件（点击、输入、键盘等）
- [ ] 掌握阻止默认行为和停止事件冒泡的方法
- [ ] 了解事件处理的最佳实践

---

## 文件说明

本章包含以下文件：

| 文件名 | 说明 |
|--------|------|
| `README.md` | 本章教程文档 |
| `basic-events.jsx` | 基础事件示例 |
| `event-object.jsx` | 事件对象示例 |
| `practice-solution.html` | 练习题参考答案 |

---

## 参考资料

- [事件处理](https://react.dev/learn/responding-to-events)
- [合成事件](https://react.dev/reference/react/SyntheticEvent)
- [事件处理函数](https://react.dev/reference/react-dom#event-properties)
