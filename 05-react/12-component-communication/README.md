# 组件通信

## 本章目的

掌握 React 中组件间通信的各种方式，包括父子组件通信、兄弟组件通信、跨层级通信。

---

## 内容概述

组件化开发中，组件间的数据传递和通信是核心问题。React 遵循单向数据流原则，数据自上而下传递。本章将讲解父子组件通信、状态提升、Context 跨组件通信等常用的组件通信方式，帮助您构建复杂的数据流。

---

## 12.1 父子组件通信

### 父传子：Props

```jsx
// 父组件
function Parent() {
    const message = '来自父组件的消息';
    return <Child message={message} />;
}

// 子组件
function Child({ message }) {
    return <p>{message}</p>;
}
```

### 子传父：回调函数

```jsx
// 父组件
function Parent() {
    const [childData, setChildData] = React.useState('');
    
    const handleChildData = (data) => {
        setChildData(data);
    };
    
    return (
        <div>
            <p>来自子组件: {childData}</p>
            <Child onData={handleChildData} />
        </div>
    );
}

// 子组件
function Child({ onData }) {
    const sendData = () => {
        onData('子组件的数据');
    };
    
    return <button onClick={sendData}>发送数据</button>;
}
```

---

## 12.2 状态提升

当多个组件需要共享状态时，将状态提升到最近的公共祖先。

```jsx
function TemperatureCalculator() {
    const [temperature, setTemperature] = React.useState('');
    const [scale, setScale] = React.useState('celsius');
    
    const celsius = scale === 'celsius' ? temperature : (temperature - 32) * 5 / 9;
    const fahrenheit = scale === 'fahrenheit' ? temperature : (temperature * 9 / 5) + 32;
    
    return (
        <div>
            <TemperatureInput
                scale="celsius"
                temperature={celsius}
                onTemperatureChange={setTemperature}
            />
            <TemperatureInput
                scale="fahrenheit"
                temperature={fahrenheit}
                onTemperatureChange={setTemperature}
            />
        </div>
    );
}
```

---

## 12.3 兄弟组件通信

通过父组件作为中介进行通信。

```jsx
function Parent() {
    const [message, setMessage] = React.useState('');
    
    return (
        <div>
            <ChildA onMessage={setMessage} />
            <ChildB message={message} />
        </div>
    );
}
```

---

## 练习题

### 基础练习

创建父子组件，实现计数器功能。

### 进阶练习

创建评论系统，父组件管理评论列表。

### 挑战练习

创建购物车，实现组件间状态共享。

---

## 学习目标检查

- [ ] 掌握父传子通信（Props）
- [ ] 掌握子传父通信（回调函数）
- [ ] 理解状态提升的概念
- [ ] 学会兄弟组件通信

---

## 文件说明

| 文件名 | 说明 |
|--------|------|
| `README.md` | 本章教程文档 |
| `parent-to-child.jsx` | 父子通信示例 |
| `child-to-parent.jsx` | 子父通信示例 |
| `practice-solution.html` | 练习题参考答案 |
