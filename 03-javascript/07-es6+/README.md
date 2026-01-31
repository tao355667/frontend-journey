# ES6+ 新特性

## 本章目的

掌握现代 JavaScript 的核心特性，学会使用解构、展开运算符和模块系统编写更优雅的代码。

---

## 内容概述

本章将学习 JavaScript 的现代语法特性：

1. **解构赋值**：从数组或对象中提取值
2. **展开运算符**：展开数组或对象
3. **模块系统**：代码组织和复用

---

## 核心概念讲解

### 解构赋值：快速提取值

解构赋值允许你从数组或对象中提取值，并赋值给变量。

#### 数组解构

```javascript
// 基本解构
const numbers = [1, 2, 3];
const [a, b, c] = numbers;
console.log(a, b, c); // 1 2 3

// 跳过某些值
const [first, , third] = numbers;
console.log(first, third); // 1 3

// 默认值
const [x, y, z = 3] = [1, 2];
console.log(x, y, z); // 1 2 3

// 剩余元素
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]
```

**类比**：就像拆快递，一个包裹里有多个物品，解构就是把它们一个个拿出来。

#### 对象解构

```javascript
// 基本解构
const person = { name: "John", age: 30, city: "Beijing" };
const { name, age } = person;
console.log(name, age); // "John" 30

// 重命名
const { name: userName, age: userAge } = person;
console.log(userName, userAge); // "John" 30

// 默认值
const { country = "China" } = person;
console.log(country); // "China"

// 嵌套解构
const user = {
    name: "John",
    address: {
        city: "Beijing",
        country: "China"
    }
};
const { address: { city, country } } = user;
console.log(city, country); // "Beijing" "China"
```

#### 函数参数解构

```javascript
// 对象参数解构
function greet({ name, age }) {
    console.log(`你好 ${name}，你 ${age} 岁了`);
}

greet({ name: "John", age: 30 });

// 带默认值的解构
function createConfig({ timeout = 5000, retries = 3 } = {}) {
    return { timeout, retries };
}

console.log(createConfig({ timeout: 3000 }));
console.log(createConfig());
```

---

### 展开运算符：快速展开

展开运算符（...）允许你展开数组或对象。

#### 数组展开

```javascript
// 合并数组
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// 复制数组
const original = [1, 2, 3];
const copy = [...original];
console.log(copy); // [1, 2, 3]

// 在数组中添加元素
const numbers = [1, 2, 3];
const withNew = [0, ...numbers, 4];
console.log(withNew); // [0, 1, 2, 3, 4]

// 函数调用时展开
const nums = [1, 2, 3];
const max = Math.max(...nums);
console.log(max); // 3
```

#### 对象展开

```javascript
// 合并对象
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 2, c: 3, d: 4 }

// 复制对象
const original = { name: "John", age: 30 };
const copy = { ...original };
console.log(copy); // { name: "John", age: 30 }

// 覆盖属性（后面的覆盖前面的）
const base = { name: "John", age: 30 };
const updated = { ...base, age: 31 };
console.log(updated); // { name: "John", age: 31 }

// 添加新属性
const person = { name: "John" };
const withCity = { ...person, city: "Beijing" };
console.log(withCity); // { name: "John", city: "Beijing" }
```

**类比**：展开运算符就像复印机，把原内容完整复制一份，或者像胶水，把多个部分粘在一起。

---

### 模块系统：代码组织

ES6 模块系统允许你将代码拆分成多个文件，提高代码的可维护性和复用性。

#### 导出

```javascript
// named export（命名导出）
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

// default export（默认导出）
export default class Calculator {
    add(a, b) { return a + b; }
    multiply(a, b) { return a * b; }
}
```

#### 导入

```javascript
// 导入命名导出
import { PI, add, multiply } from './math.js';

// 导入默认导出
import Calculator from './calculator.js';

// 重命名导入
import { add as sum } from './math.js';

// 导入所有导出
import * as Math from './math.js';

// 同时导入命名和默认导出
import Calculator, { PI } from './math.js';
```

#### 动态导入

```javascript
async function loadModule() {
    const module = await import('./math.js');
    console.log(module.PI);
}
```

**类比**：模块就像工具箱，你可以把相关的工具放在一个箱子里，使用时只取需要的工具。

---

## 代码示例说明

### destructuring.js

这个文件展示了解构赋值的用法：

- 数组解构
- 对象解构
- 嵌套解构
- 函数参数解构

### spread.js

这个文件展示了展开运算符的用法：

- 数组展开
- 对象展开
- 合并数组和对象

### module.js

这个文件展示了模块系统的用法：

- 导出和导入
- 命名导出和默认导出
- 动态导入

---

## 最佳实践

### 解构赋值

1. **使用有意义的变量名**：解构时使用清晰的变量名
2. **提供默认值**：为可能不存在的属性提供默认值
3. **避免深层嵌套解构**：超过两层时可读性下降

```javascript
// 好的做法
const { name, age = 0, city = "Unknown" } = user;

// 不好的做法
const { profile: { personal: { details: { name } } } } = user;
```

### 展开运算符

1. **使用展开复制对象**：避免引用问题
2. **注意展开顺序**：后面的属性覆盖前面的
3. **不要过度使用**：简单情况使用普通赋值即可

```javascript
// 好的做法
const updated = { ...base, newProp: value };

// 不好的做法（不必要）
const arr = [1, 2, 3];
const newArr = [...arr];
```

### 模块系统

1. **明确导出方式**：使用命名导出或默认导出
2. **避免循环依赖**：模块间不要相互导入
3. **按需导入**：只导入需要的内容

```javascript
// 好的做法
import { specificFunction } from './utils.js';

// 不好的做法
import * as Utils from './utils.js';
```

---

## 文件说明

本章节包含以下文件：

| 文件名 | 说明 | 主要内容 |
|--------|------|----------|
| destructuring.js | 解构赋值示例 | 数组、对象、函数参数解构 |
| spread.js | 展开运算符示例 | 数组、对象展开和合并 |
| module.js | 模块系统示例 | 导出、导入、动态导入 |

---

## 练习题

### 基础练习

1. **数组解构**：从数组中提取第一个和最后一个元素

2. **对象解构**：从对象中提取 name 和 age 属性

3. **数组展开**：合并两个数组

### 进阶练习

1. **对象合并**：使用展开运算符合并多个对象

2. **函数参数解构**：创建一个函数，接受配置对象并设置默认值

3. **模块导出**：创建一个工具模块，导出多个函数

### 挑战练习

1. **深度解构**：从嵌套对象中提取特定值

2. **条件合并**：根据条件合并对象

3. **动态导入**：实现按需加载模块

---

## 学习目标检查

完成本章学习后，你应该能够：

- [ ] 理解解构赋值的概念
- [ ] 使用数组解构提取值
- [ ] 使用对象解构提取属性
- [ ] 在函数参数中使用解构
- [ ] 理解展开运算符的概念
- [ ] 使用展开运算符合并数组
- [ ] 使用展开运算符合并对象
- [ ] 理解 ES6 模块系统
- [ ] 使用 export 导出模块
- [ ] 使用 import 导入模块
- [ ] 遵循最佳实践编写现代 JavaScript 代码
- [ ] 完成基础、进阶练习题

---

## 下一步

完成本章学习后，请继续学习 [第八章：浏览器存储](../08-browser/)，学习如何使用 localStorage 和 sessionStorage。
