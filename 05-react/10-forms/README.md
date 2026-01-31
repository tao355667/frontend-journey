# 表单处理

## 本章目的

掌握 React 中的表单处理方法，学会使用受控组件，理解表单验证的实现方式。

---

## 内容概述

表单是 Web 应用中最常用的交互元素之一。React 中的表单处理与普通 HTML 表单有所不同，React 采用"受控组件"模式，将表单数据存储在组件的 state 中。本章将讲解受控组件的创建、表单验证的实现、以及各种表单元素的处理方法。

---

## 10.1 受控组件

### 基本概念

受控组件的值由 React state 控制，每次变化都会更新 state。

```jsx
function SimpleForm() {
    const [value, setValue] = React.useState('');
    
    return (
        <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}
```

### 文本输入框

```jsx
function TextInput() {
    const [text, setText] = React.useState('');
    
    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="输入文本..."
            />
            <p>输入内容: {text}</p>
        </div>
    );
}
```

---

## 10.2 多元素表单

```jsx
function MultiFieldForm() {
    const [form, setForm] = React.useState({
        username: '',
        email: '',
        password: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    return (
        <form>
            <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="用户名"
            />
            <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="邮箱"
            />
            <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="密码"
            />
        </form>
    );
}
```

---

## 10.3 表单验证

```jsx
function ValidatedForm() {
    const [form, setForm] = React.useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = React.useState({});
    
    const validate = () => {
        const newErrors = {};
        if (!form.email.includes('@')) {
            newErrors.email = '请输入有效的邮箱地址';
        }
        if (form.password.length < 6) {
            newErrors.password = '密码至少6个字符';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            alert('表单提交成功！');
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <span>{errors.email}</span>}
            
            <input
                name="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {errors.password && <span>{errors.password}</span>}
            
            <button type="submit">提交</button>
        </form>
    );
}
```

---

## 练习题

### 基础练习

创建一个用户注册表单，包含用户名、邮箱、密码。

### 进阶练习

创建一个带实时验证的联系表单。

### 挑战练习

创建一个多步骤注册表单。

---

## 学习目标检查

- [ ] 掌握受控组件的创建方法
- [ ] 学会处理各种表单元素
- [ ] 掌握表单验证的实现

---

## 文件说明

| 文件名 | 说明 |
|--------|------|
| `README.md` | 本章教程文档 |
| `controlled-component.jsx` | 受控组件示例 |
| `form-validation.jsx` | 表单验证示例 |
| `practice-solution.html` | 练习题参考答案 |
