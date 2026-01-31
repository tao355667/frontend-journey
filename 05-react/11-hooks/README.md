# Hooks 深入

## 本章目的

深入理解常用 React Hooks（useEffect、useRef、useContext），掌握副作用处理和组件间数据共享。

---

## 内容概述

Hooks 是 React 16.8 引入的特性，让函数组件能够使用 state 和其他 React 特性。本章将深入讲解 useEffect（处理副作用）、useRef（访问 DOM 和存储可变值）、useContext（跨组件传递数据）这三个常用 Hook，以及自定义 Hook 的创建方法。

---

## 11.1 useEffect Hook

### 基本用法

```jsx
function Example() {
    const [count, setCount] = React.useState(0);
    
    React.useEffect(() => {
        // 副作用代码
        document.title = `点击了 ${count} 次`;
    });  // 不指定依赖，每次渲染都执行
    
    return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### 依赖数组

```jsx
React.useEffect(() => {
    // 只在 mount 和 count 变化时执行
    console.log('count changed:', count);
}, [count]);  // 依赖数组

React.useEffect(() => {
    // 只在 mount 时执行一次（类似 componentDidMount）
    const subscription = subscribe();
    return () => unsubscribe();  // 清理函数
}, []);  // 空数组，只执行一次
```

### 常见用途

- 数据获取（API 调用）
- 订阅事件
- 操作 DOM
- 设置定时器

---

## 11.2 useRef Hook

### 基本用法

```jsx
function TextInput() {
    const inputRef = React.useRef(null);
    
    const focusInput = () => {
        inputRef.current.focus();
    };
    
    return (
        <div>
            <input ref={inputRef} />
            <button onClick={focusInput}>聚焦</button>
        </div>
    );
}
```

### 存储可变值

```jsx
function Counter() {
    const countRef = React.useRef(0);
    const [count, setCount] = React.useState(0);
    
    const increment = () => {
        countRef.current += 1;
        // 不会触发重新渲染
    };
    
    return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

## 11.3 useContext Hook

### 基本用法

```jsx
const ThemeContext = React.createContext('light');

function ThemedButton() {
    const theme = React.useContext(ThemeContext);
    return <button className={theme}>按钮</button>;
}
```

### 多层传递

```jsx
// Provider 模式
function App() {
    return (
        <ThemeContext.Provider value="dark">
            <Toolbar />
        </ThemeContext.Provider>
    );
}
```

---

## 练习题

### 基础练习

创建一个使用 useEffect 获取数据的组件。

### 进阶练习

创建一个使用 useRef 实现自动聚焦的输入框。

### 挑战练习

创建一个使用 useContext 实现主题切换的应用。

---

## 学习目标检查

- [ ] 掌握 useEffect 的使用和清理函数
- [ ] 理解依赖数组的作用
- [ ] 掌握 useRef 的基本用法
- [ ] 学会使用 useContext 进行组件通信

---

## 文件说明

| 文件名 | 说明 |
|--------|------|
| `README.md` | 本章教程文档 |
| `use-effect-demo.jsx` | useEffect 示例 |
| `use-ref-demo.jsx` | useRef 示例 |
| `practice-solution.html` | 练习题参考答案 |
