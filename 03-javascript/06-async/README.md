# 异步编程

## 本章目的

掌握 JavaScript 的异步编程模式，学会使用 Promise、async/await 和 Fetch API 处理异步操作和网络请求。

---

## 内容概述

本章将学习 JavaScript 异步编程的核心技术：

1. **Promise**：处理异步操作的标准方式
2. **async/await**：更简洁的异步代码写法
3. **Fetch API**：发送网络请求获取数据

---

## 核心概念讲解

### 异步编程：不阻塞的执行方式

JavaScript 是单线程的，但可以处理异步操作。异步操作不会阻塞主线程，让程序在等待某些操作完成时继续执行其他代码。

**类比**：就像在餐厅点餐，你点完餐后可以找个座位坐下，等待期间可以做其他事情（看手机、聊天），不用一直站在柜台前等。

---

### Promise：承诺的结果

Promise 是一个表示异步操作最终完成或失败的对象。

#### Promise 的三种状态

| 状态 | 说明 |
|------|------|
| Pending | 进行中，既没有完成也没有失败 |
| Fulfilled | 已完成，操作成功 |
| Rejected | 已拒绝，操作失败 |

#### 创建 Promise

```javascript
const promise = new Promise((resolve, reject) => {
    // 异步操作
    const success = true;

    if (success) {
        resolve("操作成功！");
    } else {
        reject("操作失败！");
    }
});
```

**类比**：就像订机票，Promise 就是你的订单状态：待确认、已确认（出票）、已取消（出票失败）。

#### 使用 Promise

```javascript
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("数据加载完成");
    }, 1000);
});

promise
    .then(result => {
        console.log("成功:", result);
    })
    .catch(error => {
        console.log("失败:", error);
    })
    .finally(() => {
        console.log("无论如何都会执行");
    });
```

#### Promise 链式调用

```javascript
fetchUser(1)
    .then(user => {
        console.log("用户:", user);
        return fetchUserPosts(user.id);
    })
    .then(posts => {
        console.log("帖子:", posts);
        return processPosts(posts);
    })
    .then(result => {
        console.log("处理结果:", result);
    })
    .catch(error => {
        console.log("错误:", error);
    });
```

**类比**：就像生产流水线，产品从一个环节传到下一个环节，每个环节处理完再传给下一个。

#### Promise 静态方法

```javascript
// Promise.all：所有 Promise 都成功才成功
Promise.all([
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
]).then(users => {
    console.log("所有用户:", users);
});

// Promise.race：哪个先完成就返回哪个
Promise.race([
    fetchFromServer1(),
    fetchFromServer2()
]).then(result => {
    console.log("最快的结果:", result);
});

// Promise.allSettled：等待所有 Promise 完成（无论成功失败）
Promise.allSettled([
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
]).then(results => {
    console.log("所有结果:", results);
});
```

---

### async/await：更优雅的异步写法

async/await 是基于 Promise 的语法糖，让异步代码看起来像同步代码。

#### async 函数

```javascript
async function fetchData() {
    return "数据";
}

// 等同于
function fetchData() {
    return Promise.resolve("数据");
}
```

#### await 等待 Promise

```javascript
async function getUserData() {
    const user = await fetchUser(1);
    console.log("用户:", user);
    
    const posts = await fetchUserPosts(user.id);
    console.log("帖子:", posts);
    
    return posts;
}

getUserData().then(posts => console.log(posts));
```

**注意**：await 只能在 async 函数中使用。

#### 错误处理

```javascript
async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("发生错误:", error);
    }
}
```

**类比**：就像 try-catch 是安全网，await 是暂停键，等待结果后再继续。

#### 并行执行

```javascript
async function fetchAllData() {
    const [user, posts, comments] = await Promise.all([
        fetchUser(1),
        fetchUserPosts(1),
        fetchUserComments(1)
    ]);
    
    return { user, posts, comments };
}
```

---

### Fetch API：发送网络请求

Fetch API 是现代浏览器提供的发送网络请求的标准接口。

#### 基本 GET 请求

```javascript
async function getData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log("请求失败:", error);
    }
}
```

#### POST 请求

```javascript
async function postData(data) {
    try {
        const response = await fetch('https://api.example.com/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.log("请求失败:", error);
    }
}
```

#### 其他 HTTP 方法

```javascript
// PUT 请求
fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});

// DELETE 请求
fetch(url, {
    method: 'DELETE'
});
```

#### 处理响应

```javascript
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('网络响应错误');
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.log("错误:", error));
```

#### 超时处理

```javascript
async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('请求超时');
        }
        throw error;
    }
}
```

---

## 代码示例说明

### promise.js

这个文件展示了 Promise 的基本用法：

- 创建 Promise
- 使用 then、catch、finally
- Promise 链式调用
- Promise 静态方法

### async-await.js

这个文件展示了 async/await 的用法：

- async 函数定义
- await 等待 Promise
- 错误处理
- 并行执行

### fetch-demo.html

这个文件展示了 Fetch API 的实际应用：

- GET 请求
- POST 请求
- 处理响应
- 错误处理

---

## 最佳实践

### Promise 使用

1. **始终处理错误**：使用 catch 或 try-catch
2. **避免回调地狱**：使用 Promise 链或 async/await
3. **合理使用 Promise.all**：并行执行独立操作

```javascript
// 好的做法
async function fetchAll() {
    const [user, posts] = await Promise.all([
        fetchUser(),
        fetchPosts()
    ]);
    return { user, posts };
}

// 不好的做法（串行执行，速度慢）
async function fetchAll() {
    const user = await fetchUser();
    const posts = await fetchPosts();
    return { user, posts };
}
```

### async/await 使用

1. **使用 async 函数**：比 Promise 链更清晰
2. **及时处理错误**：使用 try-catch
3. **并行执行**：使用 Promise.all

```javascript
// 好的做法
async function getData() {
    try {
        const data = await fetch(url);
        return data.json();
    } catch (error) {
        console.log(error);
    }
}

// 不好的做法（没有错误处理）
async function getData() {
    const data = await fetch(url);
    return data.json();
}
```

### Fetch API 使用

1. **检查响应状态**：使用 response.ok
2. **设置正确的 Content-Type**：POST 请求时
3. **处理 JSON 响应**：使用 response.json()

```javascript
// 好的做法
async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error('请求失败');
    }
    
    return response.json();
}

// 不好的做法（没有检查响应）
async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return response.json();
}
```

---

## 文件说明

本章节包含以下文件：

| 文件名 | 说明 | 主要内容 |
|--------|------|----------|
| promise.js | Promise 示例 | 创建、使用 Promise，链式调用 |
| async-await.js | async/await 示例 | async 函数、await、错误处理 |
| fetch-demo.html | Fetch API 示例 | GET/POST 请求、响应处理 |

---

## 练习题

### 基础练习

1. **延迟执行**：写一个函数，延迟指定毫秒后执行

2. **获取用户数据**：使用 Fetch API 获取用户数据并显示

3. **链式调用**：使用 Promise 链连续执行多个异步操作

### 进阶练习

1. **并行请求**：同时获取多个用户的数据

2. **重试机制**：实现一个带重试功能的请求函数

3. **请求缓存**：实现一个简单的请求缓存机制

### 挑战练习

1. **进度追踪**：实现一个带进度条的文件上传功能

2. **并发控制**：限制同时发送的请求数量

3. **取消请求**：实现可以取消的 Fetch 请求

---

## 学习目标检查

完成本章学习后，你应该能够：

- [ ] 理解 JavaScript 异步编程的概念
- [ ] 创建和使用 Promise
- [ ] 使用 then、catch、finally 处理 Promise
- [ ] 进行 Promise 链式调用
- [ ] 使用 Promise.all、Promise.race 等静态方法
- [ ] 定义和使用 async 函数
- [ ] 使用 await 等待 Promise
- [ ] 使用 try-catch 处理 async/await 错误
- [ ] 使用 Fetch API 发送 GET 和 POST 请求
- [ ] 处理 Fetch 响应和错误
- [ ] 遵循最佳实践编写高效的异步代码
- [ ] 完成基础、进阶练习题

---

## 下一步

完成本章学习后，请继续学习 [第七章：ES6+ 新特性](../07-es6+/)，学习 JavaScript 的现代语法特性。
