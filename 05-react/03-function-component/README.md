# 函数组件

## 本章目的

理解 React 组件的概念，掌握函数组件的创建和使用方法，学会组件复用。

---

## 内容概述

函数组件是 React 中最常用的组件类型，它就像一个 JavaScript 函数，接收输入（props），返回 JSX（界面）。本章将深入讲解组件的概念、函数组件的定义方式、组件的组合使用，以及如何通过组件复用提高开发效率。通过本章的学习，您将能够创建自己的函数组件，并理解组件化开发的核心思想。组件化开发是 React 的核心理念，掌握组件是成为 React 开发者的第一步。

---

## 3.1 组件的基本概念

### 通俗解释

组件就像乐高积木，每一块积木都有自己的形状和功能。您可以用简单的积木搭建出复杂的城堡，而每一块积木都是独立制作、独立测试的。

在网页开发中，组件就是网页的一个个"零件"：
- 一个按钮是一个组件
- 一个卡片是一个组件
- 一个导航栏是一个组件
- 整个页面也可以是一个组件

组件化的好处是：一次编写，到处使用。就像设计好一个按钮后，整个网站的所有页面都可以使用这个按钮组件，而不需要每个页面都重新写一次按钮的代码。

### 技术定义

组件是 React 应用的基本构建块，它是一个接受输入（props）并返回 React 元素（JSX）的函数或类。组件让您可以将 UI 拆分成独立、可复用的片段。

```
┌─────────────────────────────────────────────────┐
│                    组件                          │
│  ┌───────────────────────────────────────────┐  │
│  │              输入 (Props)                  │  │
│  └─────────────────┬─────────────────────────┘  │
│                    │                            │
│                    ▼                            │
│  ┌───────────────────────────────────────────┐  │
│  │            JavaScript 函数                 │  │
│  │            或 ES6 类                       │  │
│  └─────────────────┬─────────────────────────┘  │
│                    │                            │
│                    ▼                            │
│  ┌───────────────────────────────────────────┐  │
│  │              输出 (JSX)                    │  │
│  │           用户界面元素                      │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### 组件的特点

| 特点 | 说明 |
|------|------|
| 独立性 | 每个组件都是独立的代码单元 |
| 可复用 | 组件可以在多处使用 |
| 可组合 | 组件可以嵌套其他组件 |
| 可配置 | 通过 props 自定义组件行为 |
| 可维护 | 代码结构清晰，便于维护 |

---

## 3.2 创建函数组件

### 基本语法

函数组件就是一个普通的 JavaScript 函数，返回 JSX：

```jsx
// 函数组件的定义
function Welcome() {
    return <h1>欢迎使用 React!</h1>;
}

// 组件的使用
<Welcome />
```

### 完整示例

```jsx
// 定义一个简单的问候组件
function Greeting() {
    return (
        <div className="greeting">
            <h1>早上好!</h1>
            <p>祝您有美好的一天!</p>
        </div>
    );
}

// 在主应用中使用组件
function App() {
    return (
        <div>
            <Greeting />
            <Greeting />
            <Greeting />
        </div>
    );
}
```

这个示例展示了组件的复用性：同一个组件可以在一个页面中使用多次。

### 组件命名规范

React 组件的名称必须以大写字母开头：

```jsx
// 正确：首字母大写
function MyComponent() {
    return <div>组件内容</div>;
}

// 错误：首字母小写（会被当作 HTML 标签）
// function myComponent() {
//     return <div>组件内容</div>;
// }

// 组件使用
<MyComponent />  // 正确，会调用 MyComponent 函数
<myComponent />  // 错误，会被当作原生 HTML 标签
```

### 返回单一级别的 JSX

函数组件必须返回单一的 JSX 元素：

```jsx
// 正确：使用 Fragment
function Correct() {
    return (
        <>
            <h1>标题</h1>
            <p>段落</p>
        </>
    );
}

// 正确：使用 div 包裹
function CorrectWithDiv() {
    return (
        <div>
            <h1>标题</h1>
            <p>段落</p>
        </div>
    );
}

// 错误：返回多个同级元素
// function Wrong() {
//     return (
//         <h1>标题</h1>
//         <p>段落</p>
//     );
// }
```

---

## 3.3 组件的组合使用

### 嵌套组件

组件可以像拼积木一样嵌套使用：

```jsx
// 1. 定义子组件
function Header() {
    return <header><h1>网站标题</h1></header>;
}

function Navigation() {
    return (
        <nav>
            <ul>
                <li><a href="/">首页</a></li>
                <li><a href="/about">关于</a></li>
            </ul>
        </nav>
    );
}

function Content() {
    return (
        <main>
            <article>
                <h2>文章标题</h2>
                <p>文章内容...</p>
            </article>
        </main>
    );
}

function Footer() {
    return <footer><p>&copy; 2024 我的网站</p></footer>;
}

// 2. 定义父组件（组合子组件）
function Page() {
    return (
        <div className="page">
            <Header />
            <Navigation />
            <Content />
            <Footer />
        </div>
    );
}
```

### 组件分离的原则

将大型组件拆分为小型组件的指导原则：

| 原则 | 说明 |
|------|------|
| 单一职责 | 每个组件只做一件事 |
| 易于理解 | 组件名字应该清晰表达用途 |
| 便于测试 | 小组件更容易编写测试 |
| 便于复用 | 通用功能应该抽为独立组件 |

### 组件分离示例

```jsx
// 不好：一个组件做太多事情
function BadUserProfile() {
    return (
        <div>
            <div className="user-header">
                <img src="avatar.jpg" alt="用户头像" />
                <h2>用户名</h2>
                <p>用户简介</p>
            </div>
            <div className="user-stats">
                <span>粉丝: 1000</span>
                <span>关注: 500</span>
            </div>
            <div className="user-posts">
                <h3>他的帖子</h3>
                <ul>
                    <li>帖子1</li>
                    <li>帖子2</li>
                </ul>
            </div>
        </div>
    );
}

// 好：拆分为多个组件
function UserHeader({ avatar, name, bio }) {
    return (
        <div className="user-header">
            <img src={avatar} alt={`${name}的头像`} />
            <h2>{name}</h2>
            <p>{bio}</p>
        </div>
    );
}

function UserStats({ followers, following }) {
    return (
        <div className="user-stats">
            <span>粉丝: {followers}</span>
            <span>关注: {following}</span>
        </div>
    );
}

function UserPosts({ posts }) {
    return (
        <div className="user-posts">
            <h3>他的帖子</h3>
            <ul>
                {posts.map((post, index) => (
                    <li key={index}>{post}</li>
                ))}
            </ul>
        </div>
    );
}

function GoodUserProfile({ user }) {
    return (
        <div>
            <UserHeader 
                avatar={user.avatar}
                name={user.name}
                bio={user.bio}
            />
            <UserStats 
                followers={user.followers}
                following={user.following}
            />
            <UserPosts posts={user.posts} />
        </div>
    );
}
```

---

## 3.4 组件的复用

### 创建可复用的 UI 组件

以下是一个按钮组件的完整示例，展示了如何创建高度可复用的组件：

```jsx
// Button.jsx - 可复用的按钮组件
function Button({ children, onClick, variant = 'primary', disabled = false }) {
    // 根据 variant 动态设置类名
    const className = `btn btn-${variant} ${disabled ? 'btn-disabled' : ''}`;
    
    return (
        <button 
            className={className} 
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

// 使用示例
function ButtonDemo() {
    return (
        <div>
            <Button onClick={() => alert('主要按钮')}>主要按钮</Button>
            <Button 
                variant="secondary" 
                onClick={() => alert('次要按钮')}
            >
                次要按钮
            </Button>
            <Button 
                variant="danger" 
                onClick={() => alert('危险按钮')}
            >
                删除
            </Button>
            <Button disabled>禁用按钮</Button>
        </div>
    );
}
```

### 卡片组件

```jsx
// Card.jsx - 可复用的卡片组件
function Card({ title, children, footer }) {
    return (
        <div className="card">
            {title && <div className="card-header">
                <h3>{title}</h3>
            </div>}
            <div className="card-body">
                {children}
            </div>
            {footer && <div className="card-footer">
                {footer}
            </div>}
        </div>
    );
}

// 使用示例
function CardDemo() {
    return (
        <div>
            <Card 
                title="用户信息"
                footer={<button>查看详情</button>}
            >
                <p>姓名：张三</p>
                <p>邮箱：zhang@example.com</p>
            </Card>
            
            <Card>
                <h3>提示信息</h3>
                <p>这是一段没有标题的卡片</p>
            </Card>
        </div>
    );
}
```

### 图标组件

```jsx
// Icon.jsx - 可复用的图标组件
function Icon({ name, size = 24, color = 'currentColor' }) {
    // 根据图标名称返回不同的 SVG
    const icons = {
        home: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
        ),
        user: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
        ),
        mail: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
        )
    };
    
    return icons[name] || null;
}

// 使用示例
function IconDemo() {
    return (
        <div>
            <Icon name="home" size={32} />
            <Icon name="user" size={32} color="blue" />
            <Icon name="mail" size={32} color="red" />
        </div>
    );
}
```

---

## 3.5 函数组件的注意事项

### props 是只读的

函数组件的 props 是只读的，不能在组件内部修改：

```jsx
// 正确：只读取 props
function Correct({ name, age }) {
    return (
        <div>
            <p>姓名: {name}</p>
            <p>年龄: {age}</p>
        </div>
    );
}

// 错误：尝试修改 props（这会导致错误）
// function Wrong({ name }) {
//     name = '新名字';  // 错误！props 是只读的
//     return <div>{name}</div>;
// }
```

### 保持组件纯净

函数组件应该是"纯函数"，相同的输入应该产生相同的输出：

```jsx
// 纯函数：给定相同的 props，总是返回相同的 JSX
function PureComponent({ title }) {
    return <h1>{title}</h1>;
}

// 不纯的函数（应该避免）
// function ImpureComponent({ title }) {
//     // 依赖外部变量或随机数
//     const randomId = Math.random();
//     return <h1>{title} - {randomId}</h1>;
// }
```

### 合理使用 useState

从下一章开始，我们将学习如何使用 useState 来管理组件内部的状态。在此之前，函数组件是无状态的（stateless），只依赖于传入的 props。

---

## 练习题

### 基础练习

**练习要求**：创建一个 Profile 组件，显示用户头像、用户名和用户简介。

**参考效果**：

```jsx
function Profile({ avatar, username, bio }) {
    return (
        <div className="profile">
            <img src={avatar} alt={`${username}的头像`} />
            <h2>{username}</h2>
            <p>{bio}</p>
        </div>
    );
}
```

### 进阶练习

**练习要求**：创建一个 Alert 组件，根据 type 属性显示不同类型的提示框：
- type 为 "success" 时显示绿色成功提示
- type 为 "error" 时显示红色错误提示
- type 为 "warning" 时显示黄色警告提示

### 挑战练习

**练习要求**：创建一个 List 组件，能够渲染任意类型的数据列表：
- 接收 data（数组）和 renderItem（渲染函数）作为 props
- 使用 map 方法渲染列表
- 每个列表项需要设置唯一的 key

---

## 学习目标检查

- [ ] 理解组件的概念和作用
- [ ] 掌握函数组件的定义语法
- [ ] 理解组件命名规范（首字母大写）
- [ ] 学会组件的嵌套组合使用
- [ ] 掌握组件分离的原则
- [ ] 能够创建可复用的 UI 组件
- [ ] 理解 props 的只读性

---

## 文件说明

本章包含以下文件：

| 文件名 | 说明 |
|--------|------|
| `README.md` | 本章教程文档 |
| `simple-component.jsx` | 简单组件示例 |
| `component-reuse.jsx` | 组件复用示例 |
| `practice-solution.html` | 练习题参考答案 |

---

## 参考资料

- [组件介绍](https://react.dev/learn/your-first-component)
- [组件 Props](https://react.dev/learn/passing-props-to-a-component)
- [组件 State](https://react.dev/learn/state-a-component-s-memory)
