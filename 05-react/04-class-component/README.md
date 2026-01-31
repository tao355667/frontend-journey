# Class 组件

## 本章目的

掌握类组件的创建方法，理解构造函数和生命周期概念，学会在类组件中管理状态。

---

## 内容概述

类组件是 React 早期版本中创建组件的主要方式，它使用 ES6 类来定义组件。虽然现在函数组件配合 Hooks 是推荐的方式，但类组件在许多现有项目中仍然广泛使用，了解类组件对于维护旧代码和深入理解 React 非常重要。本章将讲解类组件的定义、构造函数、状态管理、生命周期方法等内容。通过本章的学习，您将能够理解类组件的工作原理，并能够在需要时使用类组件。

---

## 4.1 类组件的基本概念

### 通俗解释

类组件就像一个"有记忆的机器"。函数组件就像一个简单的加工站，给它什么原料（props），它就产出相应的产品（JSX），但它不会记住任何之前处理过的内容。类组件则像一个更复杂的机器，它有一个内部的工作台（state），可以存放工具和正在加工的零件，并且可以按照预定的流程（生命周期方法）在不同阶段执行特定的操作。

可以把类组件想象成一个工厂车间：
- **props** 是送到车间的原材料
- **state** 是车间里存放的半成品和工具
- **方法** 是车间里的操作流程
- **生命周期方法** 是在特定时间点自动执行的程序

### 技术定义

类组件是继承自 `React.Component` 的 ES6 类，它必须包含一个 `render` 方法用于返回 JSX。类组件可以使用 `this.state` 来存储组件的内部状态，并通过生命周期方法来控制组件的行为。

```jsx
// 类组件的基本结构
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}!</h1>;
    }
}
```

### 函数组件与类组件的对比

| 特性 | 函数组件 | 类组件 |
|------|---------|--------|
| 定义方式 | JavaScript 函数 | ES6 类 |
| 状态管理 | useState Hook | this.state |
| 生命周期 | useEffect Hook | 生命周期方法 |
| this 指向 | 无 | 需要处理 |
| 代码简洁 | 更简洁 | 较冗长 |
| 性能 | 略好 | 略差 |
| 当前推荐 | 是 | 维护旧代码时 |

---

## 4.2 创建类组件

### 基本语法

```jsx
// 导入 React 和 React.Component
import React from 'react';

class MyComponent extends React.Component {
    render() {
        return (
            <div>
                <h1>我的组件</h1>
                <p>这是一个类组件</p>
            </div>
        );
    }
}

// 简写方式（推荐）
class MyComponent extends Component {
    render() {
        return <div>我的组件</div>;
    }
}
```

### 完整示例

```jsx
import React, { Component } from 'react';

class Greeting extends Component {
    render() {
        return (
            <div className="greeting">
                <h1>你好，{this.props.name}！</h1>
                <p>欢迎来到 React 世界！</p>
            </div>
        );
    }
}

// 使用类组件
<Greeting name="张三" />
```

### 注意事项

```jsx
// 1. 类必须继承 React.Component
// 错误写法
// class BadComponent {
//     render() {
//         return <div>内容</div>;
//     }
// }

// 2. 必须有 render 方法
// 错误写法
// class BadComponent2 extends Component {
//     // 没有 render 方法
// }

// 3. render 方法必须返回 JSX
// 错误写法
// class BadComponent3 extends Component {
//     render() {
//         console.log('render');  // 不是 JSX
//     }
// }
```

---

## 4.3 构造函数

### 构造函数的作用

构造函数是类组件中初始化 state 和绑定方法的主要地方。在 React 16.3 之后，推荐使用新的方式定义 state，但了解构造函数仍然很重要。

```jsx
class Counter extends Component {
    // 构造函数
    constructor(props) {
        super(props);  // 必须调用 super(props)
        
        // 初始化 state
        this.state = {
            count: 0,
            name: '计数器'
        };
        
        // 绑定方法（旧的写法，现在可以使用箭头函数）
        this.handleClick = this.handleClick.bind(this);
    }
    
    // 方法
    handleClick() {
        this.setState({ count: this.state.count + 1 });
    }
    
    render() {
        return (
            <div>
                <h2>{this.state.name}</h2>
                <p>计数: {this.state.count}</p>
                <button onClick={this.handleClick}>增加</button>
            </div>
        );
    }
}
```

### super(props) 的重要性

```jsx
// 正确：调用 super(props)
class Correct extends Component {
    constructor(props) {
        super(props);  // 必须调用
        this.state = { data: props.data };
    }
    render() {
        return <div>{this.state.data}</div>;
    }
}

// 错误：不调用 super(props)
// class Wrong extends Component {
//     constructor(props) {
//         this.state = { data: props.data };  // 会报错！
//     }
//     render() {
//         return <div>内容</div>;
//     }
// }
```

### 现代写法（不使用构造函数）

在现代 React 中，我们可以直接在类属性中定义 state 和使用箭头函数方法来避免构造函数：

```jsx
class ModernCounter extends Component {
    // 直接在类属性中定义 state（无需构造函数）
    state = {
        count: 0
    };
    
    // 使用箭头函数，自动绑定 this
    handleClick = () => {
        this.setState({ count: this.state.count + 1 });
    };
    
    render() {
        return (
            <div>
                <p>计数: {this.state.count}</p>
                <button onClick={this.handleClick}>增加</button>
            </div>
        );
    }
}
```

---

## 4.4 状态管理（State）

### 设置初始 State

```jsx
class UserProfile extends Component {
    // 方式一：类属性语法（推荐）
    state = {
        username: '张三',
        age: 25,
        email: 'zhang@example.com',
        isLoading: true
    };
    
    // 方式二：构造函数中设置
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         username: '张三',
    //         age: 25
    //     };
    // }
    
    render() {
        return (
            <div>
                <h2>用户信息</h2>
                <p>姓名: {this.state.username}</p>
                <p>年龄: {this.state.age}</p>
                <p>邮箱: {this.state.email}</p>
            </div>
        );
    }
}
```

### 更新 State

使用 `this.setState()` 方法更新 state：

```jsx
class Counter extends Component {
    state = {
        count: 0
    };
    
    increment = () => {
        // 方式一：对象形式
        this.setState({ count: this.state.count + 1 });
    };
    
    decrement = () => {
        this.setState({ count: this.state.count - 1 });
    };
    
    reset = () => {
        // 方式二：函数形式（推荐用于依赖前一个 state）
        this.setState(prevState => ({
            count: 0
        }));
    };
    
    render() {
        return (
            <div>
                <p>计数: {this.state.count}</p>
                <button onClick={this.increment}>+1</button>
                <button onClick={this.decrement}>-1</button>
                <button onClick={this.reset}>重置</button>
            </div>
        );
    }
}
```

### setState 的特点

```jsx
class SetStateDemo extends Component {
    state = {
        count: 0,
        data: null
    };
    
    // setState 是异步的
    handleClick = () => {
        console.log('当前 count:', this.state.count);  // 0
        this.setState({ count: this.state.count + 1 });
        console.log('设置后 count:', this.state.count);  // 仍然是 0（异步）
    };
    
    // 使用回调获取更新后的值
    handleAsyncUpdate = () => {
        this.setState(
            { count: this.state.count + 1 },
            () => {
                // 这个回调在 state 更新后执行
                console.log('更新后的 count:', this.state.count);
            }
        );
    };
    
    // 依赖前一个 state 时使用函数形式
    handleIncrement = () => {
        this.setState(prevState => ({
            count: prevState.count + 1
        }));
    };
    
    render() {
        return (
            <div>
                <p>计数: {this.state.count}</p>
                <button onClick={this.handleClick}>增加（异步）</button>
                <button onClick={this.handleAsyncUpdate}>增加（回调）</button>
                <button onClick={this.handleIncrement}>增加（依赖）</button>
            </div>
        );
    }
}
```

---

## 4.5 生命周期方法

### 生命周期阶段

```
┌─────────────────────────────────────────────────────────────────┐
│                        组件生命周期                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐                                                 │
│  │   挂载阶段   │  constructor → render → componentDidMount      │
│  └──────┬──────┘                                                 │
│         │                                                        │
│         ▼                                                        │
│  ┌─────────────┐                                                 │
│  │   更新阶段   │  render → shouldComponentUpdate →              │
│  │             │  componentDidUpdate                             │
│  └──────┬──────┘                                                 │
│         │                                                        │
│         ▼                                                        │
│  ┌─────────────┐                                                 │
│  │   卸载阶段   │  componentWillUnmount                           │
│  └─────────────┘                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 常用生命周期方法

```jsx
class LifecycleDemo extends Component {
    // 1. 构造函数
    constructor(props) {
        super(props);
        this.state = { data: null };
        console.log('1. constructor - 构造函数执行');
    }
    
    // 2. 渲染方法（必须）
    render() {
        console.log('2. render - 渲染界面');
        return (
            <div>
                <h2>生命周期演示</h2>
                <p>数据: {this.state.data || '加载中...'}</p>
            </div>
        );
    }
    
    // 3. 组件挂载后执行（常用于数据获取）
    componentDidMount() {
        console.log('3. componentDidMount - 组件已挂载');
        // 模拟数据获取
        setTimeout(() => {
            this.setState({ data: '加载完成！' });
        }, 1000);
    }
    
    // 4. 组件更新前执行（可选，用于性能优化）
    shouldComponentUpdate(nextProps, nextState) {
        console.log('4. shouldComponentUpdate - 决定是否更新');
        return true;  // 返回 false 可阻止更新
    }
    
    // 5. 组件更新后执行（常用于操作 DOM 或数据获取）
    componentDidUpdate(prevProps, prevState) {
        console.log('5. componentDidUpdate - 组件已更新');
    }
    
    // 6. 组件卸载前执行（常用于清理工作）
    componentWillUnmount() {
        console.log('6. componentWillUnmount - 组件即将卸载');
        // 清理定时器、取消网络请求等
    }
}
```

### 生命周期方法用途对照

| 方法 | 阶段 | 用途 |
|------|------|------|
| constructor | 挂载前 | 初始化 state，绑定方法 |
| render | 挂载/更新 | 返回 JSX（必须） |
| componentDidMount | 挂载后 | 数据获取、DOM 操作 |
| shouldComponentUpdate | 更新前 | 性能优化 |
| componentDidUpdate | 更新后 | 副作用操作、DOM 操作 |
| componentWillUnmount | 卸载前 | 清理工作 |

---

## 4.6 完整示例

```jsx
class TodoItem extends Component {
    state = {
        isEditing: false,
        editText: this.props.text
    };
    
    handleDoubleClick = () => {
        this.setState({ isEditing: true });
    };
    
    handleBlur = () => {
        this.setState({ isEditing: false });
        this.props.onUpdate(this.state.editText);
    };
    
    handleChange = (e) => {
        this.setState({ editText: e.target.value });
    };
    
    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handleBlur();
        } else if (e.key === 'Escape') {
            this.setState({ 
                isEditing: false, 
                editText: this.props.text 
            });
        }
    };
    
    render() {
        const { text, completed, onToggle, onDelete } = this.props;
        const { isEditing, editText } = this.state;
        
        return (
            <li className={`todo-item ${completed ? 'completed' : ''}`}>
                {isEditing ? (
                    <input
                        type="text"
                        value={editText}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        onKeyDown={this.handleKeyDown}
                        autoFocus
                    />
                ) : (
                    <>
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={onToggle}
                        />
                        <span onDoubleClick={this.handleDoubleClick}>
                            {text}
                        </span>
                        <button onClick={onDelete}>删除</button>
                    </>
                )}
            </li>
        );
    }
}
```

---

## 练习题

### 基础练习

**练习要求**：创建一个计数器类组件，显示当前计数，并提供增加、减少和重置三个按钮。

**参考效果**：

```jsx
class Counter extends Component {
    state = {
        count: 0
    };
    
    increment = () => {
        this.setState({ count: this.state.count + 1 });
    };
    
    decrement = () => {
        this.setState({ count: this.state.count - 1 });
    };
    
    reset = () => {
        this.setState({ count: 0 });
    };
    
    render() {
        return (
            <div>
                <p>计数: {this.state.count}</p>
                <button onClick={this.increment}>+1</button>
                <button onClick={this.decrement}>-1</button>
                <button onClick={this.reset}>重置</button>
            </div>
        );
    }
}
```

### 进阶练习

**练习要求**：创建一个用户信息类组件，包含用户名、年龄、职业。点击编辑按钮可以切换到编辑模式，编辑完成后显示更新后的信息。

### 挑战练习

**练习要求**：创建一个定时器类组件：
- 显示当前时间（每秒更新）
- 提供开始、停止、重置按钮
- 在 componentDidMount 启动定时器
- 在 componentWillUnmount 清除定时器

---

## 学习目标检查

- [ ] 理解类组件的概念和结构
- [ ] 掌握类组件的定义方法
- [ ] 理解构造函数的作用和 super(props) 的必要性
- [ ] 掌握 state 的初始化和 setState 的使用
- [ ] 了解主要生命周期方法及其用途
- [ ] 能够在类组件中处理用户交互

---

## 文件说明

本章包含以下文件：

| 文件名 | 说明 |
|--------|------|
| `README.md` | 本章教程文档 |
| `basic-class.jsx` | 类组件基础示例 |
| `constructor-demo.jsx` | 构造函数示例 |
| `practice-solution.html` | 练习题参考答案 |

---

## 参考资料

- [类组件](https://react.dev/reference/react/Component)
- [State 和生命周期](https://react.dev/learn/state-a-components-memory)
- [生命周期方法](https://react.dev/reference/react/Component#lifecycle-methods)
