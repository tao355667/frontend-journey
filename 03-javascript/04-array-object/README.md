# 数组和对象

## 本章目的

掌握 JavaScript 数组和对象的常用操作方法，学会高效地处理和操作数据。

---

## 内容概述

本章将学习 JavaScript 中的两种核心数据结构：

1. **数组操作**：创建、访问、修改数组，以及常用的数组方法
2. **对象操作**：创建、访问、修改对象，以及对象的高级用法

---

## 核心概念讲解

### 数组：有序的数据列表

数组就像一个"有序的柜子"，每个格子都有一个编号（索引），可以按编号存放和取回物品。

#### 创建数组

```javascript
// 字面量方式（推荐）
let fruits = ["apple", "banana", "orange"];
let numbers = [1, 2, 3, 4, 5];
let mixed = ["hello", 42, true, null];

// 构造函数方式
let arr = new Array(1, 2, 3);
```

**类比**：就像购买一个柜子，可以直接买现成的（字面量），也可以定制（构造函数）。

#### 访问和修改数组元素

```javascript
const fruits = ["apple", "banana", "orange"];

// 访问元素（索引从 0 开始）
console.log(fruits[0]); // "apple"
console.log(fruits[1]); // "banana"
console.log(fruits[fruits.length - 1]); // "orange"（最后一个元素）

// 修改元素
fruits[0] = "grape";
console.log(fruits); // ["grape", "banana", "orange"]
```

#### 数组常用方法

**添加和删除元素**

```javascript
const fruits = ["apple", "banana"];

// push：在末尾添加元素
fruits.push("orange");
console.log(fruits); // ["apple", "banana", "orange"]

// unshift：在开头添加元素
fruits.unshift("grape");
console.log(fruits); // ["grape", "apple", "banana", "orange"]

// pop：删除末尾元素
let last = fruits.pop();
console.log(last); // "orange"
console.log(fruits); // ["grape", "apple", "banana"]

// shift：删除开头元素
let first = fruits.shift();
console.log(first); // "grape"
console.log(fruits); // ["apple", "banana"]
```

**查找元素**

```javascript
const numbers = [1, 3, 5, 7, 9];

// indexOf：查找元素索引
console.log(numbers.indexOf(5)); // 2
console.log(numbers.indexOf(6)); // -1（不存在）

// includes：检查是否包含元素
console.log(numbers.includes(5)); // true
console.log(numbers.includes(6)); // false

// find：查找满足条件的第一个元素
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];
const user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: "Bob" }
```

**转换数组**

```javascript
const numbers = [1, 2, 3, 4, 5];

// map：转换每个元素
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter：过滤元素
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// reduce：归约数组
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15
```

---

### 对象：键值对集合

对象就像一个"字典"或"文件夹"，每页都有一个标签（键），对应一份内容（值）。

#### 创建对象

```javascript
// 字面量方式（推荐）
const person = {
    name: "John",
    age: 30,
    city: "Beijing"
};

// 构造函数方式
const person2 = new Object();
person2.name = "Jane";
person2.age = 25;
```

**类比**：就像填写个人信息表，每个空格对应一个信息。

#### 访问和修改对象属性

```javascript
const person = {
    name: "John",
    age: 30,
    "full name": "John Doe" // 带空格的键
};

// 点表示法（推荐）
console.log(person.name); // "John"

// 方括号表示法（必须用于特殊键）
console.log(person["age"]); // 30
console.log(person["full name"]); // "John Doe"

// 修改属性
person.age = 31;
console.log(person.age); // 31
```

#### 对象常用方法

**对象操作**

```javascript
const person = {
    name: "John",
    age: 30
};

// Object.keys：获取所有键
console.log(Object.keys(person)); // ["name", "age"]

// Object.values：获取所有值
console.log(Object.values(person)); // ["John", 30]

// Object.entries：获取所有键值对
console.log(Object.entries(person)); // [["name", "John"], ["age", 30]]

// Object.assign：复制对象
const person2 = Object.assign({}, person);
person2.name = "Jane";
console.log(person.name); // "John"（原对象不受影响）

// 展开运算符（推荐）
const person3 = { ...person, city: "Beijing" };
console.log(person3); // { name: "John", age: 30, city: "Beijing" }
```

**对象遍历**

```javascript
const person = {
    name: "John",
    age: 30,
    city: "Beijing"
};

// for...in：遍历键
for (const key in person) {
    console.log(key, person[key]);
}

// Object.keys + forEach
Object.keys(person).forEach(key => {
    console.log(key, person[key]);
});
```

---

## 代码示例说明

### array-basic.js

这个文件展示了数组的基本操作：

- 创建数组：字面量和构造函数方式
- 访问元素：通过索引访问
- 修改元素：通过索引修改
- 数组属性：length 属性
- 添加元素：push 和 unshift
- 删除元素：pop 和 shift

### array-methods.js

这个文件展示了数组的常用方法：

- 查找方法：indexOf、includes、find
- 转换方法：map、filter、reduce
- 切片方法：slice、splice
- 排序方法：sort
- 迭代方法：forEach

### object-basic.js

这个文件展示了对象的基本操作：

- 创建对象：字面量和构造函数方式
- 访问属性：点表示法和方括号表示法
- 添加和删除属性
- 对象方法：Object.keys、Object.values、Object.entries
- 对象遍历：for...in 和 Object.keys

---

## 最佳实践

### 数组操作

1. **使用字面量创建数组**：简洁高效
2. **避免稀疏数组**：尽量填充所有位置
3. **使用数组方法而非 for 循环**：代码更清晰

```javascript
// 好的做法
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);

// 不好的做法
const numbers = new Array(5);
doubled = [];
for (let i = 0; i < numbers.length; i++) {
    doubled.push(numbers[i] * 2);
}
```

### 对象操作

1. **使用字面量创建对象**：简洁高效
2. **使用展开运算符复制对象**：避免引用问题
3. **使用可选链操作符**：安全访问嵌套属性

```javascript
// 好的做法
const person = { name: "John", age: 30 };
const person2 = { ...person, city: "Beijing" };
const city = person?.address?.city; // 安全访问

// 不好的做法
const person = new Object();
person.name = "John";
const city = person.address && person.address.city;
```

### 性能考虑

1. **数组末尾操作更快**：push/pop 比 shift/unshift 快
2. **查找元素时使用 Set 或 Map**：大数组时性能更好

```javascript
// 好的做法：使用 Set 查找
const set = new Set([1, 2, 3, 4, 5]);
console.log(set.has(3)); // O(1) 时间复杂度

// 不好的做法：使用数组查找
const arr = [1, 2, 3, 4, 5];
console.log(arr.includes(3)); // O(n) 时间复杂度
```

---

## 文件说明

本章节包含以下文件：

| 文件名 | 说明 | 主要内容 |
|--------|------|----------|
| array-basic.js | 数组基础示例 | 创建、访问、修改数组 |
| array-methods.js | 数组方法示例 | 常用数组方法的使用 |
| object-basic.js | 对象基础示例 | 创建、访问、操作对象 |

---

## 练习题

### 基础练习

1. **数组求和**：写一个函数，接受一个数字数组，返回所有元素的和

2. **查找最大值**：写一个函数，接受一个数字数组，返回最大值

3. **对象属性**：写一个函数，接受一个对象，返回它的所有属性值组成的数组

### 进阶练习

1. **数组去重**：写一个函数，接受一个数组，返回去重后的数组

2. **对象合并**：写一个函数，接受两个对象，返回合并后的对象（后面对象的属性优先）

3. **数组排序**：写一个函数，接受一个对象数组，按照指定属性排序

### 挑战练习

1. **深度克隆对象**：写一个函数，能够深度克隆一个对象（包括嵌套对象和数组）

2. **数组分组**：写一个函数，接受一个数组和分组函数，返回分组后的对象

3. **对象路径访问**：写一个函数，接受一个对象和路径字符串（如 "user.address.city"），返回对应值

---

## 学习目标检查

完成本章学习后，你应该能够：

- [ ] 使用多种方式创建数组
- [ ] 通过索引访问和修改数组元素
- [ ] 使用 push、pop、shift、unshift 操作数组
- [ ] 使用 indexOf、includes、find 查找元素
- [ ] 使用 map、filter、reduce 转换数组
- [ ] 使用字面量创建对象
- [ ] 使用点表示法和方括号表示法访问属性
- [ ] 添加、删除、修改对象属性
- [ ] 使用 Object.keys、Object.values、Object.entries
- [ ] 遍历对象的键和值
- [ ] 遵循最佳实践编写规范的数组和对象代码
- [ ] 完成基础、进阶练习题

---

## 下一步

完成本章学习后，请继续学习 [第五章：DOM 操作](../05-dom/)，学习如何操作网页元素。
