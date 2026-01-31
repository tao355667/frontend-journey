# 浏览器存储

## 本章目的

掌握浏览器的本地存储技术，学会使用 localStorage 和 sessionStorage 存储和管理客户端数据。

---

## 内容概述

本章将学习浏览器的客户端存储技术：

1. **localStorage**：持久化本地存储
2. **sessionStorage**：会话级临时存储
3. **存储操作**：读取、写入、删除、清空

---

## 核心概念讲解

### 浏览器存储：客户端的数据保存

浏览器存储允许你在用户的浏览器中保存数据，无需将数据发送到服务器。

#### 两种存储方式

| 特性 | localStorage | sessionStorage |
|------|--------------|-----------------|
| 生命周期 | 永久（除非手动删除） | 会话结束（关闭标签页） |
| 作用域 | 同源的所有标签页 | 仅当前标签页 |
| 存储量 | ~5-10MB | ~5-10MB |
| 访问 | 同源可访问 | 仅当前会话 |

**类比**：
- localStorage 就像你在家里的书架上存的书，一直都在
- sessionStorage 就像你从图书馆借的书，还了就没了

---

### localStorage：持久化存储

localStorage 存储的数据没有过期时间，除非手动删除，否则永久存在。

#### 基本操作

```javascript
// 存储数据
localStorage.setItem('name', 'John');
localStorage.setItem('age', '30');

// 读取数据
const name = localStorage.getItem('name');
const age = localStorage.getItem('age');
console.log(name); // 'John'
console.log(age); // '30'

// 删除数据
localStorage.removeItem('age');

// 清空所有数据
localStorage.clear();
```

#### 存储对象和数组

localStorage 只能存储字符串，存储对象和数组需要先序列化：

```javascript
// 存储对象
const user = { name: 'John', age: 30 };
localStorage.setItem('user', JSON.stringify(user));

// 读取对象
const storedUser = JSON.parse(localStorage.getItem('user'));
console.log(storedUser); // { name: 'John', age: 30 }

// 存储数组
const todos = ['Task 1', 'Task 2', 'Task 3'];
localStorage.setItem('todos', JSON.stringify(todos));

// 读取数组
const storedTodos = JSON.parse(localStorage.getItem('todos'));
console.log(storedTodos); // ['Task 1', 'Task 2', 'Task 3']
```

#### 检查存储是否存在

```javascript
// 检查某个键是否存在
if (localStorage.getItem('user')) {
    console.log('用户数据存在');
} else {
    console.log('用户数据不存在');
}

// 获取所有键的数量
console.log(localStorage.length);

// 获取指定索引的键名
const key1 = localStorage.key(0);
console.log('第一个键:', key1);

// 遍历所有键值对
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
}
```

---

### sessionStorage：会话级存储

sessionStorage 存储的数据仅在当前会话期间有效，关闭标签页后数据会被清除。

#### 基本操作

```javascript
// 存储数据
sessionStorage.setItem('sessionUser', 'John');
sessionStorage.setItem('sessionId', '12345');

// 读取数据
const sessionUser = sessionStorage.getItem('sessionUser');
console.log(sessionUser); // 'John'

// 删除数据
sessionStorage.removeItem('sessionId');

// 清空所有数据
sessionStorage.clear();
```

**使用场景**：
- 临时保存表单数据
- 保存分页状态
- 保存用户会话信息

---

### 存储事件

当 localStorage 或 sessionStorage 发生变化时，会触发 storage 事件：

```javascript
window.addEventListener('storage', (event) => {
    console.log('存储变化:', event);
    console.log('键:', event.key);
    console.log('旧值:', event.oldValue);
    console.log('新值:', event.newValue);
    console.log('URL:', event.url);
});
```

**注意**：
- storage 事件只在其他标签页触发
- 同一标签页内的变化不会触发事件

---

## 代码示例说明

### localStorage.html

这个文件展示了 localStorage 的用法：

- 基本存储操作
- 存储对象和数组
- 检查存储状态

### sessionStorage.html

这个文件展示了 sessionStorage 的用法：

- 基本存储操作
- 会话级存储特点
- 与 localStorage 的区别

---

## 最佳实践

### 数据存储

1. **使用 JSON 序列化复杂类型**：存储对象和数组时
2. **检查存储空间**：localStorage 有大小限制
3. **处理存储失败**：try-catch 捕获错误

```javascript
// 好的做法
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.log('存储失败:', error);
    }
}

// 不好的做法
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, data);
}
```

### 数据读取

1. **检查数据是否存在**：避免 undefined
2. **处理解析错误**：JSON.parse 可能失败
3. **提供默认值**：数据不存在时使用默认值

```javascript
// 好的做法
function loadFromLocalStorage(key, defaultValue) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.log('读取失败:', error);
        return defaultValue;
    }
}

// 不好的做法
function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
```

### 安全考虑

1. **不要存储敏感信息**：localStorage 不安全
2. **清理过期数据**：定期清理不需要的数据
3. **使用唯一键名**：避免键名冲突

```javascript
// 好的做法
const storage = {
    save(key, data) {
        localStorage.setItem(`myapp_${key}`, JSON.stringify(data));
    },
    load(key, defaultValue) {
        const data = localStorage.getItem(`myapp_${key}`);
        return data ? JSON.parse(data) : defaultValue;
    },
    remove(key) {
        localStorage.removeItem(`myapp_${key}`);
    }
};

// 不好的做法
localStorage.setItem('user', sensitiveData);
```

---

## 文件说明

本章节包含以下文件：

| 文件名 | 说明 | 主要内容 |
|--------|------|----------|
| localStorage.html | localStorage 示例 | 存储、读取、删除数据 |
| sessionStorage.html | sessionStorage 示例 | 会话级存储操作 |

---

## 练习题

### 基础练习

1. **保存用户名**：使用 localStorage 保存用户名，刷新页面后读取

2. **计数器持久化**：使用 localStorage 保存计数器值

3. **待办事项列表**：使用 localStorage 保存待办事项

### 进阶练习

1. **表单数据保存**：自动保存表单数据到 localStorage

2. **存储空间检查**：检查 localStorage 的使用情况

3. **过期数据清理**：实现带过期时间的存储

### 挑战练习

1. **存储封装**：创建一个存储工具类

2. **跨标签页通信**：使用 storage 事件实现跨标签页通信

3. **分页状态保存**：保存列表的分页状态

---

## 学习目标检查

完成本章学习后，你应该能够：

- [ ] 理解 localStorage 和 sessionStorage 的区别
- [ ] 使用 localStorage 存储和读取数据
- [ ] 使用 sessionStorage 存储和读取数据
- [ ] 使用 JSON 序列化对象和数组
- [ ] 删除单个存储项和清空所有存储
- [ ] 检查存储项是否存在
- [ ] 遍历所有存储项
- [ ] 处理存储操作错误
- [ ] 监听存储变化事件
- [ ] 遵循最佳实践编写安全的存储代码
- [ ] 完成基础、进阶练习题

---

## 下一步

完成本章学习后，请继续学习 [第九章：JavaScript 实践](../09-js-practice/)，通过实战项目巩固所学知识。
