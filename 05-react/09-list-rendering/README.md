# 列表渲染

## 本章目的

掌握 React 中列表渲染的方法，学会使用 map 函数渲染列表，理解 key 属性的重要性。

---

## 内容概述

列表渲染是 React 中最常用的功能之一，用于根据数组数据动态生成多个相同的 UI 元素。本章将讲解如何使用 map 函数进行列表渲染、为什么需要 key 属性、以及如何处理列表中的各种场景。掌握列表渲染对于构建动态的用户界面至关重要。

---

## 9.1 使用 map 渲染列表

### 基本语法

```jsx
function ListExample() {
    const items = ['苹果', '香蕉', '橙子'];
    
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );
}
```

### 渲染对象数组

```jsx
function ProductList() {
    const products = [
        { id: 1, name: '苹果', price: 5.99 },
        { id: 2, name: '香蕉', price: 3.99 },
        { id: 3, name: '橙子', price: 4.99 }
    ];
    
    return (
        <ul>
            {products.map(product => (
                <li key={product.id}>
                    {product.name} - ¥{product.price}
                </li>
            ))}
        </ul>
    );
}
```

---

## 9.2 key 属性的重要性

### 为什么需要 key

key 帮助 React 识别哪些元素发生了变化，从而优化渲染性能。

```jsx
// 不使用 key（不推荐）
{items.map(item => <li>{item.name}</li>)}

// 使用唯一 ID（推荐）
{items.map(item => <li key={item.id}>{item.name}</li>)}

// 使用索引（仅当时使用）
{item列表稳定s.map((item, index) => <li key={index}>{item.name}</li>)}
```

### key 的规则

| 规则 | 说明 |
|------|------|
| 唯一性 | 同一父元素下的 key 必须唯一 |
| 稳定性 | key 应保持不变，不随渲染变化 |
| 可预测 | 相同的 key 应对应相同的数据项 |

---

## 9.3 完整示例

```jsx
function TodoList() {
    const [todos, setTodos] = React.useState([
        { id: 1, text: '学习 React', completed: true },
        { id: 2, text: '完成练习', completed: false }
    ]);
    
    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };
    
    return (
        <ul>
            {todos.map(todo => (
                <li
                    key={todo.id}
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                    onClick={() => toggleTodo(todo.id)}
                >
                    {todo.text}
                </li>
            ))}
        </ul>
    );
}
```

---

## 练习题

### 基础练习

渲染一个水果列表。

### 进阶练习

创建一个可编辑的联系人列表。

### 挑战练习

创建一个可排序的数据表格。

---

## 学习目标检查

- [ ] 掌握 map 渲染列表
- [ ] 理解 key 的作用
- [ ] 学会处理列表操作（添加、删除、修改）

---

## 文件说明

| 文件名 | 说明 |
|--------|------|
| `README.md` | 本章教程文档 |
| `map-rendering.jsx` | 列表渲染示例 |
| `key-importance.jsx` | key 属性重要性示例 |
| `practice-solution.html` | 练习题参考答案 |
