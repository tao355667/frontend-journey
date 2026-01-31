# State 状态管理

## 本章目的

理解 State 的概念和作用，掌握 useState Hook 的使用方法，学会在函数组件中管理组件状态。

---

## 内容概述

State 是 React 组件的"记忆"，它存储了组件的动态数据，当 State 变化时，组件会自动重新渲染以显示最新数据。本章将深入讲解 State 的概念、useState Hook 的用法、State 更新的特点，以及如何在实际应用中使用 State。通过本章的学习，您将能够创建响应用户交互的动态界面。State 是 React 组件实现交互功能的核心，理解 State 是掌握 React 的关键一步。

---

## 6.1 State 的基本概念

### 通俗解释

State 就像组件的"状态变量"。一个网页可能会有各种状态：
- 按钮是否被点击
- 输入框中的文字
- 是否显示某个弹窗
- 列表的排序方式

当这些状态改变时，网页需要更新显示的内容。State 就是用来存储这些会变化的数据的，当 State 更新时，React 会自动帮我们重新渲染页面。

可以把 State 想象成汽车仪表盘上的各种指示器：
- 车速（speed）
- 油量（fuel）
- 发动机温度（temperature）

这些数值会随着驾驶过程变化，仪表盘会实时更新显示。

### 技术定义

State 是组件的本地数据，只能在组件内部访问和修改。当 State 改变时，组件会重新渲染以反映新的状态。State 的值应该是不可变的，修改 State 应该使用 setState 方法或 state setter 函数。

```
┌─────────────────────────────────────────────────────────┐
│                     State 的生命周期                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌──────────┐                                          │
│   │ 初始化   │  useState(initialValue)                   │
│   └────┬─────┘                                          │
│        │                                                │
│        ▼                                                │
│   ┌──────────┐                                          │
│   │ 读取     │  currentState                            │
│   └────┬─────┘                                          │
│        │                                                │
│        ▼                                                │
│   ┌──────────┐                                          │
│   │ 更新     │  setState(newValue)                      │
│   └────┬─────┘                                          │
│        │                                                │
│        ▼                                                │
│   ┌──────────┐                                          │
│   │ 重新渲染 │  React 自动重新渲染组件                   │
│   └──────────┘                                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### State vs Props

| 特性 | State | Props |
|------|-------|-------|
| 作用 | 存储组件内部数据 | 从父组件接收数据 |
| 可修改性 | 可修改（使用 setter） | 只读，不能修改 |
| 作用域 | 组件私有 | 从父组件传递 |
| 触发渲染 | 变化时触发重新渲染 | 变化时由父组件决定 |

---

## 6.2 使用 useState

### 基本语法

```jsx
import { useState } from 'react';

function Counter() {
    // 声明一个名为 count 的 state，初始值为 0
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>计数: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                增加
            </button>
        </div>
    );
}
```

### 语法解析

```jsx
const [state, setState] = useState(initialValue);
```

| 部分 | 说明 |
|------|------|
| `state` | 当前状态值 |
| `setState` | 更新状态的函数 |
| `useState` | React Hook |
| `initialValue` | 初始值（可以是值或函数） |

### 初始值的两种写法

```jsx
// 1. 直接赋值初始值
const [count, setCount] = useState(0);
const [name, setName] = useState('张三');

// 2. 使用函数（适合计算成本高的初始值）
const [data, setData] = useState(() => {
    const initialData = heavyCalculation();
    return initialData;
});
```

### 完整示例

```jsx
function Counter() {
    const [count, setCount] = useState(0);
    
    const increment = () => {
        setCount(count + 1);
    };
    
    const decrement = () => {
        setCount(count - 1);
    };
    
    const reset = () => {
        setCount(0);
    };
    
    return (
        <div>
            <h2>计数器</h2>
            <p className="count">当前计数: {count}</p>
            <div>
                <button onClick={decrement}>-</button>
                <button onClick={reset}>重置</button>
                <button onClick={increment}>+</button>
            </div>
        </div>
    );
}
```

---

## 6.3 State 的特点

### State 更新是异步的

```jsx
function AsyncDemo() {
    const [count, setCount] = useState(0);
    
    const handleClick = () => {
        // setState 是异步的
        setCount(count + 1);
        console.log(count);  // 仍然是旧值！
        
        // 使用回调函数获取更新后的值
        setCount(prevCount => prevCount + 1);
    };
    
    return (
        <div>
            <p>计数: {count}</p>
            <button onClick={handleClick}>增加</button>
        </div>
    );
}
```

### State 更新会被合并

```jsx
function ObjectState() {
    const [user, setUser] = useState({
        name: '张三',
        age: 25,
        email: 'zhang@example.com'
    });
    
    // 合并更新：只更新 age，其他属性保持不变
    const updateAge = () => {
        setUser(prevUser => ({
            ...prevUser,  // 展开运算符保留其他属性
            age: prevUser.age + 1
        }));
    };
    
    return (
        <div>
            <p>姓名: {user.name}</p>
            <p>年龄: {user.age}</p>
            <p>邮箱: {user.email}</p>
            <button onClick={updateAge}>增加年龄</button>
        </div>
    );
}
```

### State 应当保持不可变性

```jsx
// 正确：创建新数组
function ArrayDemo() {
    const [items, setItems] = useState(['A', 'B', 'C']);
    
    const addItem = () => {
        setItems([...items, 'D']);  // 创建新数组
    };
    
    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));  // 创建新数组
    };
    
    return (
        <div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => removeItem(index)}>删除</button>
                    </li>
                ))}
            </ul>
            <button onClick={addItem}>添加</button>
        </div>
    );
}

// 错误：直接修改数组
// function BadArrayDemo() {
//     const [items, setItems] = useState(['A', 'B', 'C']);
//     
//     const addItem = () => {
//         items.push('D');  // 错误！直接修改 state
//         setItems(items);  // 不会触发更新！
//     };
//     
//     ...
// }
```

---

## 6.4 多个 State

```jsx
function UserForm() {
    // 多个独立的 state
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // 模拟表单提交
        setTimeout(() => {
            setIsSubmitting(false);
            alert(`提交成功！\n用户名: ${username}\n邮箱: ${email}`);
        }, 1000);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="用户名"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="邮箱"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="密码"
            />
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? '提交中...' : '提交'}
            </button>
        </form>
    );
}
```

### 对象类型的 State

```jsx
function FormWithObject() {
    // 使用单个对象 state 管理多个相关字段
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };
    
    return (
        <form>
            <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="用户名"
            />
            <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="邮箱"
            />
            <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="密码"
            />
        </form>
    );
}
```

---

## 6.5 状态更新函数

### 使用函数式更新

当新状态依赖于前一个状态时，使用函数式更新：

```jsx
function Counter() {
    const [count, setCount] = useState(0);
    
    // 依赖前一个状态进行计算
    const incrementByFive = () => {
        setCount(prevCount => prevCount + 5);
    };
    
    const decrementByThree = () => {
        setCount(prevCount => prevCount - 3);
    };
    
    // 批量更新（多次 setCount 只会触发一次重新渲染）
    const addAndDouble = () => {
        setCount(prevCount => prevCount + 1);
        setCount(prevCount => prevCount * 2);
    };
    
    return (
        <div>
            <p>计数: {count}</p>
            <button onClick={incrementByFive}>+5</button>
            <button onClick={decrementByThree}>-3</button>
            <button onClick={addAndDouble}>+1 后 ×2</button>
        </div>
    );
}
```

### 回调函数获取更新后的值

```jsx
function CallbackDemo() {
    const [value, setValue] = useState(0);
    
    const handleClick = () => {
        setValue(value + 1);
    };
    
    // 使用 useEffect 监听变化，或使用 setState 的第二个参数
    React.useEffect(() => {
        console.log('值已更新:', value);
    }, [value]);
    
    return (
        <div>
            <p>值: {value}</p>
            <button onClick={handleClick}>增加</button>
        </div>
    );
}
```

---

## 6.6 完整示例

```jsx
function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all');  // all, active, completed
    
    const addTodo = () => {
        if (inputValue.trim()) {
            setTodos([
                ...todos,
                {
                    id: Date.now(),
                    text: inputValue.trim(),
                    completed: false
                }
            ]);
            setInputValue('');
        }
    };
    
    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id
                ? { ...todo, completed: !todo.completed }
                : todo
        ));
    };
    
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };
    
    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });
    
    return (
        <div>
            <h2>待办事项</h2>
            
            <div>
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="添加新任务..."
                />
                <button onClick={addTodo}>添加</button>
            </div>
            
            <div>
                <button onClick={() => setFilter('all')}>全部</button>
                <button onClick={() => setFilter('active')}>进行中</button>
                <button onClick={() => setFilter('completed')}>已完成</button>
            </div>
            
            <ul>
                {filteredTodos.map(todo => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        <span style={{
                            textDecoration: todo.completed ? 'line-through' : 'none'
                        }}>
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>删除</button>
                    </li>
                ))}
            </ul>
            
            <p>
                {todos.filter(t => t.completed).length} / {todos.length} 已完成
            </p>
        </div>
    );
}
```

---

## 练习题

### 基础练习

**练习要求**：创建一个温度转换器，支持摄氏度转华氏度，反之亦然。

**参考公式**：
- 华氏度 = 摄氏度 × 9/5 + 32
- 摄氏度 = (华氏度 - 32) × 5/9

### 进阶练习

**练习要求**：创建一个主题切换器，支持亮色/暗色主题切换，并在页面应用相应样式。

### 挑战练习

**练习要求**：创建一个购物车应用：
- 显示商品列表
- 支持增加/减少数量
- 实时计算总价
- 支持删除商品

---

## 学习目标检查

- [ ] 理解 State 的概念和作用
- [ ] 掌握 useState 的基本用法
- [ ] 理解 State 更新的异步性
- [ ] 掌握对象类型 State 的更新方法
- [ ] 掌握数组类型 State 的更新方法
- [ ] 理解函数式更新的使用场景

---

## 文件说明

本章包含以下文件：

| 文件名 | 说明 |
|--------|------|
| `README.md` | 本章教程文档 |
| `use-state-demo.jsx` | useState 基础示例 |
| `set-state-demo.jsx` | State 更新示例 |
| `practice-solution.html` | 练习题参考答案 |

---

## 参考资料

- [State 和生命周期](https://react.dev/learn/state-a-components-memory)
- [useState Hook](https://react.dev/reference/react/useState)
- [State 管理](https://react.dev/learn/managing-state)
