# 第五章：函数

## 本章目的

掌握 TypeScript 函数的类型定义、参数类型、返回值类型、函数重载、this 绑定、回调函数等高级特性，能够编写类型安全且灵活的函数。

---

## 5.1 函数类型基础

函数是 TypeScript 中最重要的构建块之一。正确地为函数添加类型注解可以显著提高代码的可读性和可靠性。

### 基本函数声明

```typescript
// 函数声明
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// 函数表达式
const greet2 = function(name: string): string {
  return `Hello, ${name}!`;
};

// 箭头函数
const greet3 = (name: string): string => {
  return `Hello, ${name}!`;
};

// 简化箭头函数
const greet4 = (name: string) => `Hello, ${name}!`;

console.log(greet("Alice"));  // "Hello, Alice!"
```

### 参数类型注解

```typescript
// 必需参数
function multiply(a: number, b: number): number {
  return a * b;
}

// 可选参数
function greetWithAge(name: string, age?: number): string {
  if (age !== undefined) {
    return `Hello, ${name}! You are ${age} years old.`;
  }
  return `Hello, ${name}!`;
}

// 默认参数
function createGreeting(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

// 剩余参数
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}

console.log(greetWithAge("Bob"));              // "Hello, Bob!"
console.log(greetWithAge("Charlie", 30));      // "Hello, Charlie! You are 30 years old."
console.log(createGreeting("Diana"));          // "Hello, Diana!"
console.log(createGreeting("Eve", "Hi"));      // "Hi, Eve!"
console.log(sum(1, 2, 3, 4, 5));               // 15
```

### 返回值类型注解

```typescript
// 显式返回类型
function add(a: number, b: number): number {
  return a + b;
}

// void 表示没有返回值
function logMessage(message: string): void {
  console.log(message);
}

// never 表示永远不会返回（抛出错误或无限循环）
function throwError(message: string): never {
  throw new Error(message);
}

// 推断返回类型
const double = (n: number) => n * 2;  // TypeScript 推断返回类型为 number
```

---

## 5.2 函数类型表达式

函数可以作为值传递，TypeScript 提供了多种定义函数类型的方式。

### 函数类型语法

```typescript
// 函数类型定义
type GreetFunction = (name: string) => string;

// 实现函数类型
const greet: GreetFunction = (name) => {
  return `Hello, ${name}!`;
};

// 复杂函数类型
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;

console.log("2 + 3 =", add(2, 3));        // 5
console.log("2 × 3 =", multiply(2, 3));   // 6
```

### 作为参数的函数类型

```typescript
// 高阶函数：接受函数作为参数
function processArray(
  items: number[],
  callback: (item: number) => number
): number[] {
  return items.map(callback);
}

const numbers = [1, 2, 3, 4, 5];
const doubled = processArray(numbers, (n) => n * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

// 过滤函数
function filterArray<T>(
  items: T[],
  predicate: (item: T) => boolean
): T[] {
  return items.filter(predicate);
}

const words = ["apple", "banana", "cherry", "date"];
const shortWords = filterArray(words, (word) => word.length > 5);
console.log(shortWords);  // ["banana", "cherry"]
```

---

## 5.3 函数重载

函数重载允许定义多个同名的函数，但参数列表不同。TypeScript 会根据传入的参数类型和数量选择正确的重载签名。

### 基本重载

```typescript
// 重载签名
function format(value: string): string;
function format(value: number): string;
function format(value: boolean): string;

// 实现签名
function format(value: string | number | boolean): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  return "";
}

console.log(format("hello"));   // "HELLO"
console.log(format(3.14159));   // "3.14"
console.log(format(true));      // "Yes"
```

### 多参数重载

```typescript
// 不同的参数组合
function createUser(name: string): { name: string };
function createUser(name: string, age: number): { name: string; age: number };
function createUser(name: string, age?: number): { name: string; age?: number } {
  if (age !== undefined) {
    return { name, age };
  }
  return { name };
}

const user1 = createUser("Alice");              // { name: "Alice" }
const user2 = createUser("Bob", 25);            // { name: "Bob", age: 25 }
console.log(user1, user2);
```

### 构造函数重载

```typescript
class Car {
  brand: string;
  model: string;
  year?: number;

  // 重载签名
  constructor(brand: string, model: string);
  constructor(brand: string, model: string, year: number);

  // 实现
  constructor(brand: string, model: string, year?: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  getInfo(): string {
    if (this.year) {
      return `${this.year} ${this.brand} ${this.model}`;
    }
    return `${this.brand} ${this.model}`;
  }
}

const car1 = new Car("Toyota", "Camry");
const car2 = new Car("Tesla", "Model 3", 2024);

console.log(car1.getInfo());           // "Toyota Camry"
console.log(car2.getInfo());           // "2024 Tesla Model 3"
```

---

## 5.4 this 类型

在 TypeScript 中正确处理 `this` 的类型是一个常见的问题。理解 `this` 类型对于编写正确的面向对象代码至关重要。

### 函数中的 this

```typescript
// 普通函数中的 this 需要显式注解
function printInfo(this: { name: string }, greeting: string) {
  return `${greeting}, ${this.name}!`;
}

const obj = { name: "Alice" };
console.log(printInfo.call(obj, "Hello"));  // "Hello, Alice!"
```

### 类方法中的 this

```typescript
class Counter {
  count: number = 0;

  increment(this: Counter): void {
    this.count++;
  }

  decrement(this: Counter): void {
    this.count--;
  }

  add(this: Counter, amount: number): void {
    this.count += amount;
  }
}

const counter = new Counter();
counter.add(5);
counter.increment();
console.log(counter.count);  // 6
```

### 链式调用中的 this

```typescript
class StringBuilder {
  private parts: string[] = [];

  add(this: StringBuilder, text: string): StringBuilder {
    this.parts.push(text);
    return this;
  }

  addLine(this: StringBuilder, text: string): StringBuilder {
    this.parts.push(text + "\n");
    return this;
  }

  build(this: StringBuilder): string {
    return this.parts.join("");
  }
}

const builder = new StringBuilder();
const result = builder
  .add("Hello")
  .add(" ")
  .add("World")
  .addLine("!")
  .add("This is TypeScript.")
  .build();

console.log(result);
// 输出：Hello World!
// This is TypeScript.
```

---

## 5.5 回调函数类型

回调函数是 JavaScript 异步编程的基础，TypeScript 提供了强大的类型支持。

### 基本回调类型

```typescript
// 错误优先的回调类型
type ErrorFirstCallback<T> = (error: Error | null, result?: T) => void;

// 使用回调的异步函数
function asyncOperation(
  data: string,
  callback: ErrorFirstCallback<number>
): void {
  setTimeout(() => {
    if (data.length === 0) {
      callback(new Error("Data is empty"));
    } else {
      callback(null, data.length);
    }
  }, 1000);
}

// 使用
asyncOperation("Hello", (error, result) => {
  if (error) {
    console.error("Error:", error.message);
  } else {
    console.log("Result:", result);  // 5
  }
});
```

### 事件监听回调

```typescript
// 事件处理器类型
type EventHandler = (event: { type: string; timestamp: number }) => void;

// 事件系统
class EventEmitter {
  private handlers: EventHandler[] = [];

  on(handler: EventHandler): void {
    this.handlers.push(handler);
  }

  emit(event: { type: string; timestamp: number }): void {
    this.handlers.forEach(handler => handler(event));
  }

  off(handler: EventHandler): void {
    const index = this.handlers.indexOf(handler);
    if (index !== -1) {
      this.handlers.splice(index, 1);
    }
  }
}

const emitter = new EventEmitter();

emitter.on((event) => {
  console.log(`Event: ${event.type} at ${event.timestamp}`);
});

emitter.emit({ type: "click", timestamp: Date.now() });
```

---

## 5.6 泛型函数

泛型允许函数处理多种类型的数据，同时保持类型安全。

### 基本泛型函数

```typescript
// 泛型函数
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("hello"));  // "hello"
console.log(identity<number>(42));       // 42
console.log(identity(true));             // true（类型推断）

// 多个泛型参数
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

console.log(pair<string, number>("age", 25));  // ["age", 25]
console.log(pair("name", "Alice"));            // ["name", "Alice"]（推断）
```

### 约束泛型

```typescript
// 约束泛型必须有特定属性
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

logLength("hello");           // 5
logLength([1, 2, 3]);         // 3
// logLength(123);             // 错误：number 没有 length 属性

// 约束泛型必须匹配特定类型
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 25 };
console.log(getProperty(user, "name"));  // "Alice"
console.log(getProperty(user, "age"));   // 25
```

---

## 5.7 实战示例：数据处理函数库

综合运用函数知识，构建一个实用的数据处理函数库。

```typescript
// 数据处理函数库

// 1. 数组分组
function groupBy<T>(
  array: T[],
  keyGetter: (item: T) => string | number
): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const key = keyGetter(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

// 2. 管道函数
function pipe<T>(
  ...fns: ((value: T) => T)[]
): (value: T) => T {
  return (value: T) => {
    return fns.reduce((current, fn) => fn(current), value);
  };
}

// 3. 缓存函数
function memoize<T, R>(
  fn: (arg: T) => R
): (arg: T) => R {
  const cache = new Map<T, R>();
  return (arg: T): R => {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

// 测试

// 分组测试
interface User {
  name: string;
  department: string;
}

const users: User[] = [
  { name: "Alice", department: "Engineering" },
  { name: "Bob", department: "Marketing" },
  { name: "Charlie", department: "Engineering" },
  { name: "Diana", department: "HR" }
];

const grouped = groupBy(users, (user) => user.department);
console.log("按部门分组:", grouped);

// 管道测试
const addOne = (n: number) => n + 1;
const double = (n: number) => n * 2;
const square = (n: number) => n * n;

const pipeline = pipe(addOne, double, square);
console.log("管道结果 (2+1)×2² =", pipeline(2));  // (2+1)×2² = 36

// 缓存测试
const expensiveCalc = (n: number) => {
  console.log("计算中...", n);
  return n * n;
};

const memoizedCalc = memoize(expensiveCalc);
console.log("首次调用:", memoizedCalc(5));  // 计算中... 5 → 25
console.log("缓存调用:", memoizedCalc(5));  // 直接从缓存返回 25
console.log("新参数:", memoizedCalc(3));    // 计算中... 3 → 9
```

---

## 文件说明

本章包含以下文件：

| 文件名 | 说明 |
|--------|------|
| `functions.ts` | 本章所有函数示例代码，包含完整的使用演示 |
| `practice-solution.html` | 本章练习题的参考答案 |

---

## 练习题

### 基础练习

**练习 5.1**：编写一个函数 `formatPrice`，接受一个数字参数，返回格式化的价格字符串（如 1234.56 → "¥1,234.56"）。

**练习 5.2**：编写一个函数 `filterByLength`，接受字符串数组和最小长度参数，返回符合长度要求的字符串数组。

**练习 5.3**：编写一个箭头函数 `createMultiplier`，接受一个乘数，返回一个函数，该函数接受数字并返回乘以该乘数的结果。

### 进阶练习

**练习 5.4**：使用函数重载实现 `parseInput` 函数：
- 接受字符串，返回字符串数组
- 接受数字，返回数字数组
- 接受布尔值，返回布尔值

**练习 5.5**：创建一个 `debounce` 函数，接收一个函数和延迟时间，返回一个防抖处理后的新函数。

### 挑战练习

**练习 5.6**：创建一个泛型 `Map` 数据结构，包含以下方法：
- `set(key, value)`：设置键值对
- `get(key)`：获取值
- `has(key)`：检查是否存在
- `delete(key)`：删除键
- `forEach(callback)`：遍历所有键值对

**练习 5.7**：实现一个 `compose` 函数，接受多个函数，返回一个组合函数。组合函数从右到左执行各个函数。

---

## 学习目标检查清单

- [ ] 掌握函数的基本类型注解
- [ ] 理解必需参数、可选参数和默认参数的区别
- [ ] 能够使用函数类型表达式定义函数类型
- [ ] 掌握函数重载的使用场景和实现方式
- [ ] 理解函数中 `this` 的类型处理
- [ ] 能够定义和使用回调函数类型
- [ ] 掌握泛型函数的使用
- [ ] 理解和使用泛型约束
