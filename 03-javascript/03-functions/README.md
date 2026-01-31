# 函数

## 本章目的

掌握 JavaScript 函数的定义和使用，理解作用域和闭包的概念，学会编写可复用的代码模块。

---

## 内容概述

本章将学习 JavaScript 函数的核心概念：

1. **函数声明**：函数的各种定义方式和区别
2. **箭头函数**：现代 JavaScript 的简洁函数语法
3. **作用域**：变量的可访问范围规则
4. **闭包**：函数"记住"其创建时的环境

---

## 核心概念讲解

### 函数声明：代码的"工具"

函数就像一个"工具"或"配方"，你可以给它一些输入（参数），它会按照定义好的逻辑处理这些输入，然后返回结果。

#### 函数声明式

最基本的函数定义方式，具有"提升"特性（可以在声明前调用）。

```javascript
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet("Alice")); // "Hello, Alice!"
```

**特点**：
- 函数声明会被提升到作用域顶部
- 有名称，便于调试
- 可以在声明前调用

#### 函数表达式式

将函数赋值给变量，没有提升特性。

```javascript
const greet = function(name) {
    return `Hello, ${name}!`;
};

console.log(greet("Bob")); // "Hello, Bob!"
```

**特点**：
- 没有函数名称（匿名函数）
- 不会被提升
- 常用于回调函数

#### 立即执行函数表达式（IIFE）

定义后立即执行的函数，用于创建独立的作用域。

```javascript
(function() {
    const message = "This is private";
    console.log(message);
})();
```

**类比**：就像一次性使用的工具，用完就丢弃。

---

### 箭头函数：现代简洁写法

箭头函数是 ES6 引入的更简洁的函数语法。

#### 基本语法

```javascript
// 传统函数
const add = function(a, b) {
    return a + b;
};

// 箭头函数
const add = (a, b) => a + b;
```

#### 不同场景的写法

```javascript
// 无参数
const sayHello = () => console.log("Hello!");

// 单个参数（可省略括号）
const greet = name => console.log(`Hello, ${name}!`);

// 多个参数（需要括号）
const add = (a, b) => a + b;

// 多行代码（需要大括号和 return）
const calculate = (a, b) => {
    const sum = a + b;
    const product = a * b;
    return sum + product;
};
```

#### 重要区别

箭头函数没有自己的 `this`，它会继承外层作用域的 `this`。

```javascript
const person = {
    name: "John",
    traditional: function() {
        console.log(this.name); // "John"
    },
    arrow: () => {
        console.log(this.name); // undefined（指向全局）
    }
};
```

**类比**：传统函数有自己的"身份"，箭头函数就像"借用"别人的身份。

---

### 作用域：变量的"活动范围"

作用域决定了变量在哪里可以被访问。

#### 全局作用域

在整个程序中都可以访问的变量。

```javascript
const globalVar = "I'm global";

function showGlobal() {
    console.log(globalVar); // 可以访问
}

showGlobal();
```

#### 函数作用域

只在函数内部可以访问的变量。

```javascript
function outer() {
    const localVar = "I'm local";
    console.log(localVar); // 可以访问
}

outer();
console.log(localVar); // 报错：无法访问
```

#### 块级作用域

只在 `{}` 块内可以访问的变量（let 和 const）。

```javascript
{
    const blockVar = "I'm in a block";
    console.log(blockVar); // 可以访问
}

console.log(blockVar); // 报错：无法访问
```

#### 作用域链

当访问一个变量时，JavaScript 会从当前作用域开始查找，如果找不到就向外层作用域查找，直到全局作用域。

```javascript
const x = 10;

function outer() {
    const x = 20;
    
    function inner() {
        const x = 30;
        console.log(x); // 30（最内层）
    }
    
    inner();
    console.log(x); // 20（外层）
}

outer();
console.log(x); // 10（全局）
```

**类比**：就像查找物品，先在房间找，找不到去客厅找，再找不到去全屋找。

---

### 闭包：函数的"记忆"

闭包是指函数能够访问其创建时所在的作用域中的变量，即使该函数在其原始作用域之外执行。

#### 什么是闭包

```javascript
function createCounter() {
    let count = 0;
    
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

**工作原理**：
- `createCounter` 创建了一个局部变量 `count`
- 返回的匿名函数可以访问 `count`
- 即使 `createCounter` 执行完毕，`count` 仍然存在（被闭包"记住"）

#### 闭包的实际应用

**1. 数据私有化**

```javascript
function createBankAccount(initialBalance) {
    let balance = initialBalance;
    
    return {
        deposit: function(amount) {
            balance += amount;
            return balance;
        },
        withdraw: function(amount) {
            if (amount <= balance) {
                balance -= amount;
                return balance;
            }
            console.log("Insufficient funds");
            return balance;
        },
        getBalance: function() {
            return balance;
        }
    };
}

const account = createBankAccount(100);
console.log(account.deposit(50)); // 150
console.log(account.withdraw(30)); // 120
console.log(account.getBalance()); // 120
// balance 无法直接访问，实现了数据私有化
```

**2. 函数工厂**

```javascript
function createPower(exponent) {
    return function(base) {
        return Math.pow(base, exponent);
    };
}

const square = createPower(2);
const cube = createPower(3);

console.log(square(4)); // 16 (4²)
console.log(cube(4)); // 64 (4³)
```

**3. 防抖和节流**

```javascript
function debounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
```

**类比**：闭包就像一个"保险箱"，函数被创建时把一些东西放进保险箱，之后无论函数到哪里，都能打开保险箱拿到里面的东西。

---

## 代码示例说明

### function-declare.js

这个文件展示了函数的各种定义方式：

- 函数声明：基本的函数定义方式
- 函数表达式：将函数赋值给变量
- 默认参数：为参数提供默认值
- 多参数函数：接受多个参数的函数
- 返回对象的函数：函数返回复杂对象

### arrow-function.js

这个文件展示了箭头函数的语法和使用：

- 简单箭头函数：单行表达式
- 多参数箭头函数：接受多个参数
- 多行箭头函数：需要大括号和 return
- 箭头函数与 this：展示 this 的绑定差异

### scope.js

这个文件展示了作用域和闭包的概念：

- 全局作用域：全局变量的访问
- 函数作用域：局部变量的访问
- 块级作用域：let 和 const 的作用域
- 闭包示例：函数记住创建时的环境

---

## 最佳实践

### 函数命名

1. **使用有意义的动词**：函数名应该描述它做什么
2. **遵循命名约定**：使用驼峰命名法
3. **避免缩写**：除非是广泛使用的缩写

```javascript
// 好的做法
function calculateTotalPrice(items) { ... }
function getUserById(userId) { ... }

// 不好的做法
function calc(items) { ... }
function getUsr(uid) { ... }
```

### 函数设计

1. **单一职责**：每个函数只做一件事
2. **避免过多参数**：超过 3 个参数考虑使用对象
3. **尽早返回**：减少嵌套层级

```javascript
// 好的做法
function processUser(user) {
    if (!user) return null;
    if (!user.isActive) return null;
    return formatUserData(user);
}

// 不好的做法
function processUser(user) {
    if (user) {
        if (user.isActive) {
            return formatUserData(user);
        } else {
            return null;
        }
    } else {
        return null;
    }
}
```

### 使用箭头函数

1. **回调函数**：适合使用箭头函数
2. **对象方法**：避免使用箭头函数
3. **构造函数**：不能使用箭头函数

```javascript
// 好的做法
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);

// 不好的做法
const person = {
    name: "John",
    greet: () => console.log(`Hello, ${this.name}`); // this 绑定错误
};
```

### 避免闭包陷阱

1. **注意内存泄漏**：闭包会保留引用
2. **避免在循环中创建闭包**：使用 let 或 IIFE
3. **理解闭包的生命周期**

```javascript
// 危险：在循环中创建闭包
for (var i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 100); // 输出 5, 5, 5, 5, 5
}

// 解决方案 1：使用 let
for (let i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 100); // 输出 0, 1, 2, 3, 4
}

// 解决方案 2：使用 IIFE
for (var i = 0; i < 5; i++) {
    (function(i) {
        setTimeout(() => console.log(i), 100); // 输出 0, 1, 2, 3, 4
    })(i);
}
```

---

## 文件说明

本章节包含以下文件：

| 文件名 | 说明 | 主要内容 |
|--------|------|----------|
| function-declare.js | 函数声明示例 | 函数声明、表达式、默认参数 |
| arrow-function.js | 箭头函数示例 | 箭头函数语法、this 绑定 |
| scope.js | 作用域和闭包示例 | 全局/函数/块作用域、闭包应用 |

---

## 练习题

### 基础练习

1. **求和函数**：写一个函数，接受两个数字，返回它们的和

2. **判断奇偶**：写一个函数，接受一个数字，判断它是奇数还是偶数

3. **求平方**：写一个箭头函数，接受一个数字，返回它的平方

### 进阶练习

1. **数组求和**：写一个函数，接受一个数字数组，返回所有元素的和

2. **阶乘计算**：写一个函数，使用递归计算 n 的阶乘

3. **数组过滤**：写一个函数，接受一个数组和条件函数，返回符合条件的元素

### 挑战练习

1. **记忆化函数**：写一个高阶函数，接受一个函数，返回具有记忆功能的版本

2. **防抖函数**：实现一个防抖函数，用于优化频繁触发的事件

3. **模块模式**：使用闭包创建一个计数器模块，提供增加、减少、重置功能

---

## 学习目标检查

完成本章学习后，你应该能够：

- [ ] 使用多种方式定义函数
- [ ] 理解函数声明和函数表达式的区别
- [ ] 正确使用箭头函数
- [ ] 理解箭头函数与传统函数的区别
- [ ] 理解全局、函数、块级作用域
- [ ] 理解作用域链的工作原理
- [ ] 理解闭包的概念和工作原理
- [ ] 使用闭包实现数据私有化
- [ ] 避免常见的闭包陷阱
- [ ] 遵循最佳实践编写规范的函数代码
- [ ] 完成基础、进阶练习题

---

## 下一步

完成本章学习后，请继续学习 [第四章：数组和对象](../04-array-object/)，学习如何操作数组和对象。
