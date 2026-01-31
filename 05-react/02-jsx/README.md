# JSX 语法

## 本章目的

掌握 JSX 语法的基本规则，学会在 JavaScript 中编写类似 HTML 的模板代码。

---

## 内容概述

JSX 是 React 的核心特性之一，它允许您在 JavaScript 中编写类似 HTML 的语法。本章将深入讲解 JSX 的基本用法、表达式嵌入、属性设置、条件渲染等内容。通过本章的学习，您将能够熟练使用 JSX 编写 React 组件的模板部分。JSX 看起来像 HTML，但实际上它是 JavaScript 的语法扩展，最终会被编译为普通的 JavaScript 函数调用。

---

## 2.1 什么是 JSX

### 通俗解释

JSX 就像是一种"JavaScript 和 HTML 的混血语言"。它让您可以在 JavaScript 代码中直接写 HTML 一样的结构，同时还能在 HTML 中嵌入 JavaScript 表达式。

想象一下：传统的前端开发需要分别写 HTML（结构）、CSS（样式）、JavaScript（逻辑），三种语言来回切换。JSX 让您可以在一个地方写出整个组件的外观和行为，代码更加连贯。

### 技术定义

JSX 是 JavaScript Syntax Extension 的缩写，是一种 JavaScript 的语法扩展。它不是模板语言，而是一种语法糖，最终会被 Babel 等工具编译为 `React.createElement()` 函数调用。

```jsx
// JSX 语法
const element = <h1>Hello, React!</h1>;

// 编译后的 JavaScript
const element = React.createElement('h1', null, 'Hello, React!');
```

### JSX 的优势

| 优势 | 说明 |
|------|------|
| 代码简洁 | 在一个文件中编写模板和逻辑 |
| 类型安全 | 编译时检查错误，提前发现问题 |
| 开发效率 | IDE 智能提示更准确 |
| 易于维护 | 相关代码放在一起，便于理解 |

---

## 2.2 JSX 基本语法

### 标签语法

JSX 使用类似 HTML 的标签语法，但有一些重要区别：

```jsx
// HTML 风格标签（使用小写）
const element1 = <div>这是一个 div</div>;

// React 组件标签（首字母大写）
const element2 = <MyComponent>内容</MyComponent>;

// 自闭合标签
const element3 = <img src="image.jpg" alt="图片" />;
```

### 注意事项

JSX 有一些与 HTML 不同的规则：

```jsx
// 1. 必须有闭合标签
// 错误写法
const bad1 = <div>;

// 正确写法
const good1 = <div></div>;
const good2 = <input type="text" />;

// 2. 必须有一个顶级容器包裹
// 错误写法 - 多个同级元素
const bad2 = (
    <h1>标题</h1>
    <p>段落</p>
);

// 正确写法 - 用容器包裹
const good3 = (
    <div>
        <h1>标题</h1>
        <p>段落</p>
    </div>
);

// 3. 使用 Fragment 避免额外容器
const good4 = (
    <>
        <h1>标题</h1>
        <p>段落</p>
    </>
);
```

### 类名特殊处理

在 JSX 中，`class` 是 JavaScript 的保留关键字，所以使用 `className` 代替：

```jsx
// HTML 写法
<div class="container">内容</div>

// JSX 写法
<div className="container">内容</div>
```

---

## 2.3 嵌入 JavaScript 表达式

### 基本用法

在 JSX 中使用 `{}` 大括号嵌入 JavaScript 表达式：

```jsx
// 嵌入变量
const name = "React";
const element = <h1>Hello, {name}!</h1>;

// 嵌入计算表达式
const price = 99;
const element2 = <p>价格: {price * 2} 元</p>;

// 嵌入函数调用
function formatDate(date) {
    return date.toLocaleDateString();
}
const element3 = <p>今天日期: {formatDate(new Date())}</p>;
```

### 允许的表达式

大括号内可以包含任何有效的 JavaScript 表达式：

```jsx
// 算术运算
const a = 10, b = 5;
const sum = <p>{a + b}</p>;  // 15

// 字符串操作
const text = "react";
const upper = <p>{text.toUpperCase()}</p>;  // REACT

// 三元运算符
const isLoggedIn = true;
const greeting = <p>{isLoggedIn ? '欢迎回来' : '请登录'}</p>;

// 逻辑与运算符
const unreadCount = 3;
const message = unreadCount > 0 && <span>您有 {unreadCount} 条新消息</span>;

// 数组方法
const items = ['苹果', '香蕉', '橙子'];
const list = <ul>{items.map(item => <li>{item}</li>)}</ul>;
```

### 不允许的内容

以下内容不能直接放在大括号内：

```jsx
// 不能放置语句（if、for 等）
// 错误写法
const bad = (
    <div>
        {if (true) { return '内容'; }}  // 不允许！
    </div>
);

// 正确写法 - 使用三元表达式替代 if
const good = <div>{true ? '内容' : ''}</div>;

// 不能放置对象（除了 style 对象）
// 错误写法
const bad2 = <div>{{ a: 1, b: 2 }}</div>;  // 不允许！

// 正确写法
const obj = { color: 'red' };
const good2 = <div style={obj}>内容</div>;
```

---

## 2.4 属性设置

### 基本属性

使用 camelCase（驼峰命名）设置属性：

```jsx
// HTML 属性
<input type="text" value="默认值" />

// JSX 属性（驼峰命名）
<input type="text" maxLength={10} />
<input tabIndex={0} />
<input autoComplete="off" />
```

### 常用属性对照

| HTML 属性 | JSX 属性 | 说明 |
|-----------|----------|------|
| class | className | CSS 类名 |
| for | htmlFor | label 关联 |
| maxlength | maxLength | 最大长度 |
| colspan | colSpan | 表格列跨度 |
| rowspan | rowSpan | 表格行跨度 |
| tabindex | tabIndex | 焦点顺序 |
| onclick | onClick | 点击事件 |

### 布尔属性

布尔属性在 JSX 中的处理方式有所不同：

```jsx
// HTML 写法 - 只需写属性名
<input disabled />
<input checked />

// JSX 写法 - 需要明确值
<input disabled={true} />
<input disabled={false} />
<input checked={isChecked} />

// 简写形式（常用）
<input disabled />
<input readOnly />
```

### style 属性

`style` 属性接收一个 JavaScript 对象，而不是字符串：

```jsx
// 错误写法 - 字符串
const bad = <div style="color: red; font-size: 16px">内容</div>;

// 正确写法 - 对象
const good = (
    <div style={{
        color: 'red',
        fontSize: '16px',
        backgroundColor: '#f0f0f0',
        padding: '10px'
    }}>
        内容
    </div>
);

// 使用变量
const styles = {
    color: 'blue',
    fontSize: 20
};
const element = <p style={styles}>样式文本</p>;
```

### src 和 href 属性

处理 URL 时需要注意：

```jsx
// 直接使用变量
const imageUrl = '/path/to/image.jpg';
const img = <img src={imageUrl} alt="图片" />;

// 使用模板字符串
const baseUrl = 'https://example.com';
const link = <a href={`${baseUrl}/page`}>链接</a>;
```

---

## 2.5 注释写法

### JSX 中的注释

在 JSX 中使用 `{/* 注释内容 */}` 语法：

```jsx
const Component = () => {
    return (
        <div>
            {/* 这是单行注释 */}
            <h1>标题</h1>

            {/* 这是
                多行
                注释 */}
            <p>段落</p>

            {/* 
             * 多行注释
             * 可以这样写
             */}
            <span>内容</span>
        </div>
    );
};
```

### JavaScript 区域的注释

在 JSX 之外的 JavaScript 区域，可以使用普通注释：

```jsx
function MyComponent() {
    // 这是组件内部的注释（单行）
    const name = 'React';

    /*
     * 多行注释
     */
    return <div>{name}</div>;
}
```

---

## 2.6 最佳实践

### 推荐的写法

```jsx
// 1. 使用 Fragment 减少不必要的 DOM 层级
const Good = () => (
    <>
        <h1>标题</h1>
        <p>段落</p>
    </>
);

// 2. 合理换行提高可读性
const ComplexElement = () => (
    <div className="container">
        <header className="header">
            <h1 className="title">{pageTitle}</h1>
            <nav className="nav">
                {navItems.map(item => (
                    <a href={item.url} key={item.id}>{item.name}</a>
                ))}
            </nav>
        </header>
        <main className="main">
            <article>{content}</article>
        </main>
    </div>
);

// 3. 复杂逻辑抽离为变量或函数
const formatPrice = (price) => `¥${price.toFixed(2)}`;
const priceElement = <span>{formatPrice(99.9)}</span>;
```

### 应避免的写法

```jsx
// 1. 避免内联复杂逻辑
// 不好
const Bad1 = () => (
    <div>
        {items.filter(item => item.active).sort((a, b) => b.score - a.score).slice(0, 10).map(item => (
            <span key={item.id}>{item.name}</span>
        ))}
    </div>
);

// 好 - 提前处理数据
const Bad1Good = () => {
    const topItems = items
        .filter(item => item.active)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
    
    return (
        <div>
            {topItems.map(item => (
                <span key={item.id}>{item.name}</span>
            ))}
        </div>
    );
};

// 2. 避免深层嵌套
// 不好 - 层级太深
const DeepNesting = () => (
    <div>
        <div>
            <div>
                <div>
                    <p>内容</p>
                </div>
            </div>
        </div>
    </div>
);

// 好 - 使用组件分解
const Section = ({ children }) => <section>{children}</section>;
const Card = ({ children }) => <div className="card">{children}</div>;
const BetterNesting = () => (
    <Section>
        <Card>
            <p>内容</p>
        </Card>
    </Section>
);
```

---

## 练习题

### 基础练习

**练习要求**：创建一个显示学生信息的组件，包括姓名、年龄、专业，并使用变量存储数据。

**参考代码**：

```jsx
function StudentInfo() {
    const name = '张三';
    const age = 20;
    const major = '计算机科学';
    
    return (
        <div className="student-card">
            <h2>学生信息</h2>
            <p>姓名：{name}</p>
            <p>年龄：{age}</p>
            <p>专业：{major}</p>
        </div>
    );
}
```

### 进阶练习

**练习要求**：创建一个产品卡片组件，显示产品名称、价格、库存状态。要求：
- 价格使用函数格式化显示
- 库存状态根据数量显示"有货"或"缺货"
- 使用 style 属性设置卡片样式

### 挑战练习

**练习要求**：创建一个购物车组件，包含以下功能：
- 显示购物车中的商品列表
- 计算商品总价
- 显示购物车是否为空
- 使用三元表达式和逻辑与运算符进行条件显示

---

## 学习目标检查

- [ ] 理解 JSX 的概念和作用
- [ ] 掌握 JSX 的基本语法规则
- [ ] 能够在 JSX 中嵌入 JavaScript 表达式
- [ ] 正确使用 className 代替 class
- [ ] 掌握 style 属性的对象语法
- [ ] 能够在 JSX 中添加注释
- [ ] 理解 Fragment 的用途

---

## 文件说明

本章包含以下文件：

| 文件名 | 说明 |
|--------|------|
| `README.md` | 本章教程文档 |
| `basic.jsx` | JSX 基础语法示例 |
| `expressions.jsx` | JavaScript 表达式嵌入示例 |
| `attributes.jsx` | 属性设置示例 |
| `practice-solution.html` | 练习题参考答案 |

---

## 参考资料

- [JSX 简介](https://react.dev/learn/writing-markup-with-jsx)
- [JavaScript 表达式嵌入](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
- [JSX 属性](https://react.dev/learn/passing-props-to-a-component)
