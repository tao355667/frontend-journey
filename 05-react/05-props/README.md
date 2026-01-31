# Props 属性

## 本章目的

理解 Props 的概念和作用，掌握组件间数据传递的方法，学会使用 Props 自定义组件行为。

---

## 内容概述

Props 是 React 组件之间传递数据的主要方式，它允许父组件向子组件传递信息。通过 Props，子组件可以接收父组件的数据，并根据这些数据渲染不同的内容。本章将深入讲解 Props 的基本用法、类型检查、默认属性、特殊 children 属性等内容。掌握 Props 是理解组件化开发的关键，也是构建可复用组件的基础。

---

## 5.1 Props 的基本概念

### 通俗解释

Props 就像是组件的"输入参数"或"配置选项"。想象一个工厂生产产品，Props 就是原材料和说明书，告诉工厂应该生产什么样的产品。

在网页中，一个按钮组件可能需要以下配置：
- 按钮文字（ButtonText）
- 按钮颜色（Color）
- 点击事件（OnClick）
- 是否禁用（Disabled）

这些配置就是 Props，通过 Props 传递，我们可以让同一个按钮组件在不同的场景下显示不同的内容、有不同的行为。

### 技术定义

Props 是只读的 React 对象，用于从父组件向子组件传递数据。Props 遵循单向数据流原则：数据从父组件流向子组件，子组件不能修改接收到的 props。

```
┌────────────────────────────────────────────────────────────┐
│                        父组件                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  state = { name: 'React', count: 5 }                  │  │
│  └──────────────────────┬───────────────────────────────┘  │
│                         │                                  │
│                         │ 传递 props                       │
│                         ▼                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  <ChildComponent                                      │  │
│  │      name={state.name}                                │  │
│  │      count={state.count}                              │  │
│  │      onIncrement={handleIncrement}                    │  │
│  │  />                                                   │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────┐
│                        子组件                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  function ChildComponent(props) {                     │  │
│  │      return <div>{props.name}</div>;                  │  │
│  │  }                                                    │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

### Props 的特点

| 特点 | 说明 |
|------|------|
| 只读性 | 子组件不能修改 props |
| 单向流动 | 数据只能从父到子传递 |
| 任意类型 | 可以传递任何 JavaScript 数据类型 |
| 可组合 | 可以传递函数作为事件处理 |

---

## 5.2 使用 Props

### 基本用法

```jsx
// 父组件
function App() {
    const name = 'React';
    return <Greeting name={name} />;
}

// 子组件：接收 props 参数
function Greeting(props) {
    return <h1>你好, {props.name}!</h1>;
}
```

### 传递不同类型的数据

```jsx
// 传递字符串
<Greeting name="张三" />

// 传递数字（需要使用 {}）
<UserCard age={25} />

// 传递布尔值
<Button disabled={true} />

// 传递数组
<List items={['苹果', '香蕉', '橙子']} />

// 传递对象
<UserInfo user={{ name: '李四', age: 30 }} />

// 传递函数
<Button onClick={handleClick} />

// 传递 JSX 元素
<Card><p>内容</p></Card>
```

### 解构 Props

使用 ES6 解构语法使代码更简洁：

```jsx
// 不使用解构
function UserCard(props) {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>{props.age}岁</p>
            <p>{props.email}</p>
        </div>
    );
}

// 使用解构
function UserCard({ name, age, email }) {
    return (
        <div>
            <h2>{name}</h2>
            <p>{age}岁</p>
            <p>{email}</p>
        </div>
    );
}

// 解构并设置默认值
function Button({ 
    text = '按钮', 
    variant = 'primary', 
    onClick 
}) {
    return <button className={`btn ${variant}`}>{text}</button>;
}
```

---

## 5.3 特殊 Props

### children 属性

`children` 是一个特殊的 prop，表示组件开始和结束标签之间的内容：

```jsx
// 父组件传递 children
function Card({ children }) {
    return <div className="card">{children}</div>;
}

<Card>
    <h2>标题</h2>
    <p>内容</p>
</Card>

// 在 Card 组件中，children 就是 <h2>标题</h2><p>内容</p>
```

### children 的使用场景

```jsx
// 1. 布局组件
function Layout({ children }) {
    return (
        <div className="layout">
            <header>头部</header>
            <main>{children}</main>
            <footer>底部</footer>
        </div>
    );
}

// 2. 模态框组件
function Modal({ isOpen, title, children, onClose }) {
    if (!isOpen) return null;
    
    return (
        <div className="modal-overlay">
            <div className="modal">
                <header>
                    <h3>{title}</h3>
                    <button onClick={onClose}>×</button>
                </header>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

// 3. 列表组件
function List({ items, renderItem }) {
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index}>{renderItem(item)}</li>
            ))}
        </ul>
    );
}

<List
    items={users}
    renderItem={user => <span>{user.name}</span>}
/>
```

---

## 5.4 默认 Props

### 使用 defaultProps

```jsx
function Button({ text, variant, disabled }) {
    return (
        <button className={`btn btn-${variant}`} disabled={disabled}>
            {text}
        </button>
    );
}

// 设置默认属性
Button.defaultProps = {
    text: '按钮',
    variant: 'primary',
    disabled: false
};
```

### 使用解构默认值

```jsx
function Button({ text = '按钮', variant = 'primary', disabled = false }) {
    return (
        <button className={`btn btn-${variant}`} disabled={disabled}>
            {text}
        </button>
    );
}
```

### 两种方式的对比

| 方式 | 优点 | 缺点 |
|------|------|------|
| defaultProps | 声明式，明确显示默认值 | 在组件外部，可能被忽略 |
| 解构默认值 | 内联式，代码更紧凑 | 深层对象需要单独处理 |

---

## 5.5 Props 类型检查

### 使用 PropTypes

```jsx
import PropTypes from 'prop-types';

function UserCard({ name, age, email, isAdmin }) {
    return (
        <div className="user-card">
            <h2>{name}</h2>
            <p>年龄: {age}</p>
            <p>邮箱: {email}</p>
            <p>管理员: {isAdmin ? '是' : '否'}</p>
        </div>
    );
}

// 类型检查
UserCard.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    email: PropTypes.string,
    isAdmin: PropTypes.bool
};
```

### 常用 PropTypes 类型

| 类型 | 说明 | 示例 |
|------|------|------|
| string | 字符串 | PropTypes.string |
| number | 数字 | PropTypes.number |
| bool | 布尔值 | PropTypes.bool |
| func | 函数 | PropTypes.func |
| array | 数组 | PropTypes.array |
| object | 对象 | PropTypes.object |
| node | 任何可渲染 | PropTypes.node |
| element | React 元素 | PropTypes.element |
| oneOf | 枚举类型 | PropTypes.oneOf(['A', 'B']) |
| arrayOf | 数组类型 | PropTypes.arrayOf(PropTypes.string) |
| objectOf | 对象类型 | PropTypes.objectOf(PropTypes.number) |
| shape | 对象形状 | PropTypes.shape({ name: PropTypes.string }) |

### 使用 isRequired

```jsx
UserCard.propTypes = {
    name: PropTypes.string.isRequired,  // 必填
    age: PropTypes.number,
    email: PropTypes.string
};
```

---

## 5.6 传递函数的 Props

```jsx
// 父组件：定义回调函数
function App() {
    const handleClick = (message) => {
        alert(message);
    };
    
    return <Button onClick={() => handleClick('按钮被点击!')} />;
}

// 子组件：接收并调用回调函数
function Button({ onClick, children }) {
    return <button onClick={onClick}>{children}</button>;
}

// 传递参数
<Button onClick={() => handleDelete(id)}>删除</Button>

// 使用 bind 传递参数
<Button onClick={this.handleClick.bind(this, id)}>删除</Button>
```

---

## 练习题

### 基础练习

**练习要求**：创建一个 Profile 组件，接收 avatar、name、bio 三个 props，显示用户信息卡片。

### 进阶练习

**练习要求**：创建一个 Rating 组件，接收 maxRating（最大星级）和 currentRating（当前星级）两个 props，显示星级评分。

### 挑战练习

**练习要求**：创建一个 Pagination 组件，接收 totalPages、currentPage、onPageChange 三个 props，实现分页功能。

---

## 学习目标检查

- [ ] 理解 Props 的概念和作用
- [ ] 掌握传递各种类型数据的方法
- [ ] 学会使用解构语法简化代码
- [ ] 理解 children 属性的使用
- [ ] 掌握设置默认属性的方法
- [ ] 了解 PropTypes 类型检查

---

## 文件说明

本章包含以下文件：

| 文件名 | 说明 |
|--------|------|
| `README.md` | 本章教程文档 |
| `basic-props.jsx` | Props 基础示例 |
| `props-types.jsx` | 类型检查示例 |
| `practice-solution.html` | 练习题参考答案 |

---

## 参考资料

- [Props 介绍](https://react.dev/learn/passing-props-to-a-component)
- [PropTypes](https://react.dev/reference/react/PropTypes)
- [组件 props](https://react.dev/reference/react/Component#props)
