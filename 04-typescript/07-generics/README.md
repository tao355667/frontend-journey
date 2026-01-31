# 第七章：泛型

## 本章目的

掌握 TypeScript 泛型的基本概念、使用方法和高级特性，包括泛型函数、泛型类、泛型接口、泛型约束和类型映射等，能够编写灵活且类型安全的通用代码。

---

## 7.1 泛型基础

泛型是 TypeScript 最强大的特性之一，它允许我们编写可复用的代码，同时保持完整的类型信息。

### 为什么需要泛型

在传统编程中，我们经常需要编写处理不同类型的函数。如果没有泛型，我们可能需要使用 `any` 类型，但这会失去类型安全性：

```typescript
// 使用 any - 失去了类型信息
function identity(value: any): any {
  return value;
}

const result = identity("hello");  // result 是 any 类型
const num = identity(42);          // num 是 any 类型
console.log(result.toUpperCase());  // 运行时可能出错
```

使用泛型可以保持类型安全：

```typescript
// 使用泛型 - 保持类型信息
function identity<T>(value: T): T {
  return value;
}

const result = identity("hello");  // result 是 string 类型
const num = identity(42);          // result 是 number 类型
console.log(result.toUpperCase());  // TypeScript 会检查
```

### 泛型函数

```typescript
// 基本泛型函数
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const numbers = [1, 2, 3, 4, 5];
const strings = ["a", "b", "c"];

console.log(firstElement(numbers));  // 1
console.log(firstElement(strings));  // "a"

// 多个泛型参数
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

const p1 = pair("age", 25);
const p2 = pair(true, "yes");
console.log(p1);  // ["age", 25]
console.log(p2);  // [true, "yes"]
```

### 泛型类型推断

TypeScript 可以自动推断泛型类型：

```typescript
function createPair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

// 显式指定类型
const explicitPair = createPair<string, number>("score", 100);

// 自动推断类型
const inferredPair = createPair("name", "Alice");
console.log(inferredPair);  // ["name", "Alice"] - 类型为 [string, number]
```

---

## 7.2 泛型接口

泛型可以与接口结合，创建灵活的接口定义。

### 基本泛型接口

```typescript
// 泛型容器接口
interface Container<T> {
  value: T;
  getValue(): T;
}

class StringContainer implements Container<string> {
  constructor(public value: string) {}

  getValue(): string {
    return this.value;
  }
}

class NumberContainer implements Container<number> {
  constructor(public value: number) {}

  getValue(): number {
    return this.value;
  }
}

const stringContainer = new StringContainer("Hello");
const numberContainer = new NumberContainer(42);
console.log(stringContainer.getValue());  // "Hello"
console.log(numberContainer.getValue());  // 42
```

### 多参数泛型接口

```typescript
// 键值对接口
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

const pair1: KeyValuePair<string, number> = {
  key: "age",
  value: 25
};

const pair2: KeyValuePair<number, string> = {
  key: 1,
  value: "one"
};

console.log(pair1);  // { key: "age", value: 25 }
console.log(pair2);  // { key: 1, value: "one" }

// 函数接口
interface Processor<T, R> {
  (input: T): R;
}

const upperCaseProcessor: Processor<string, string> = (input) => {
  return input.toUpperCase();
};

const lengthProcessor: Processor<string, number> = (input) => {
  return input.length;
};

console.log(upperCaseProcessor("hello"));  // "HELLO"
console.log(lengthProcessor("hello"));     // 5
```

---

## 7.3 泛型类

泛型类可以处理不同类型的对象。

### 基本泛型类

```typescript
// 泛型栈
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  getSize(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);
console.log(numberStack.pop());  // 3
console.log(numberStack.peek()); // 2
console.log(numberStack.getSize()); // 2

const stringStack = new Stack<string>();
stringStack.push("a");
stringStack.push("b");
console.log(stringStack.pop());  // "b"
```

### 泛型类的高级用法

```typescript
// 泛型数据库类
class Database<T extends { id: string | number }> {
  private records: Map<string | number, T> = new Map();

  insert(record: T): void {
    this.records.set(record.id, record);
  }

  findById(id: string | number): T | undefined {
    return this.records.get(id);
  }

  findAll(): T[] {
    return Array.from(this.records.values());
  }

  delete(id: string | number): boolean {
    return this.records.delete(id);
  }
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const userDb = new Database<User>();
userDb.insert({ id: "1", name: "Alice", email: "alice@example.com" });
userDb.insert({ id: "2", name: "Bob", email: "bob@example.com" });
console.log(userDb.findById("1"));  // User 对象

const productDb = new Database<Product>();
productDb.insert({ id: 1, name: "Laptop", price: 999 });
console.log(productDb.findById(1)); // Product 对象
```

---

## 7.4 泛型约束

泛型约束用于限制泛型参数必须满足特定条件。

### 基本约束

```typescript
// 约束泛型必须具有 length 属性
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

logLength("hello");      // 5
logLength([1, 2, 3]);    // 3
logLength({ length: 10 }); // 10
// logLength(123);       // 错误：number 没有 length 属性

// 约束泛型必须继承自特定类型
class Animal {
  name: string;
}

class Dog extends Animal {
  breed: string;
}

function printAnimalName<T extends Animal>(animal: T): void {
  console.log(animal.name);
}

const dog = new Dog();
dog.name = "Buddy";
dog.breed = "Golden Retriever";
printAnimalName(dog);  // "Buddy"
```

### keyof 约束

```typescript
// 约束泛型必须是对象的键
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = {
  name: "Alice",
  age: 25,
  email: "alice@example.com"
};

console.log(getProperty(user, "name"));    // "Alice"
console.log(getProperty(user, "age"));     // 25
// console.log(getProperty(user, "phone")); // 错误：phone 不是 user 的键

// 复杂的 keyof 约束
function setProperty<T, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K]
): void {
  obj[key] = value;
}

setProperty(user, "age", 26);
console.log(user.age);  // 26
```

---

## 7.5 泛型工具类型

TypeScript 提供了一些内置的工具类型，用于操作和转换类型。

### Partial 和 Required

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// Partial<T> - 所有属性变为可选
type PartialTodo = Partial<Todo>;
const todo1: PartialTodo = {
  title: "Learn TypeScript"
};

// Required<T> - 所有属性变为必需
interface PartialTodo2 {
  title?: string;
  description?: string;
  completed?: boolean;
}

type RequiredTodo = Required<PartialTodo2>;
// title 现在是必需属性
```

### Pick 和 Omit

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Pick<T, K> - 从 T 中选择属性 K
type UserPreview = Pick<User, "id" | "name" | "email">;
const preview: UserPreview = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};

// Omit<T, K> - 从 T 中排除属性 K
type UserWithoutPassword = Omit<User, "password">;
const safeUser: UserWithoutPassword = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  createdAt: new Date()
};
```

### Record

```typescript
// Record<K, V> - 创建键值对类型
type RolePermissions = Record<string, boolean>;

const permissions: RolePermissions = {
  read: true,
  write: false,
  delete: false
};

type UserDict = Record<string, User>;
const users: UserDict = {
  "1": { id: 1, name: "Alice" },
  "2": { id: 2, name: "Bob" }
};
```

### ReturnType 和 Parameters

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// ReturnType<T> - 获取函数返回值类型
type GreetReturn = ReturnType<typeof greet>;  // string

// Parameters<T> - 获取函数参数类型
type GreetParams = Parameters<typeof greet>;  // [string]

const params: GreetParams = ["Alice"];
console.log(greet(...params));  // "Hello, Alice!"
```

---

## 7.6 实战示例：通用数据处理工具

综合运用泛型知识，构建一个通用的数据处理工具库。

```typescript
// 通用数据处理工具

// 1. 缓存工具
class Cache<T> {
  private cache: Map<string, { value: T; expireAt: number }> = new Map();
  private defaultTTL: number;  // Time to live in milliseconds

  constructor(defaultTTL: number = 60000) {
    this.defaultTTL = defaultTTL;
  }

  set(key: string, value: T, ttl?: number): void {
    const expireAt = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, { value, expireAt });
  }

  get(key: string): T | undefined {
    const item = this.cache.get(key);
    if (!item) return undefined;

    if (Date.now() > item.expireAt) {
      this.cache.delete(key);
      return undefined;
    }

    return item.value;
  }

  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

// 2. 事件总线
type EventHandler<T = void> = (data: T) => void;

class EventBus<T extends Record<string, unknown>> {
  private handlers: {
    [K in keyof T]?: EventHandler<T[K]>[];
  } = {};

  on<K extends keyof T>(event: K, handler: EventHandler<T[K]>): void {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event]!.push(handler);
  }

  off<K extends keyof T>(event: K, handler: EventHandler<T[K]>): void {
    const handlers = this.handlers[event];
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    }
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    const handlers = this.handlers[event];
    if (handlers) {
      handlers.forEach(handler => handler(data));
    }
  }
}

// 3. API 响应包装器
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
  timestamp: number;
}

function createResponse<T>(
  data: T,
  success: boolean = true,
  message: string = ""
): ApiResponse<T> {
  return {
    data,
    success,
    message,
    timestamp: Date.now()
  };
}

// 测试
console.log("=== 泛型工具测试 ===\n");

// 缓存测试
const numberCache = new Cache<number>(5000);
numberCache.set("key1", 100);
console.log("Cache get key1:", numberCache.get("key1"));
numberCache.set("key2", 200, 1000);
setTimeout(() => {
  console.log("After timeout, key2:", numberCache.get("key2"));  // undefined
}, 2000);

// 事件总线测试
interface Events {
  userLoggedIn: { userId: string };
  userLoggedOut: { userId: string };
  notification: { message: string; level: "info" | "warning" | "error" };
}

const bus = new EventBus<Events>();

bus.on("userLoggedIn", (data) => {
  console.log(`用户登录: ${data.userId}`);
});

bus.on("notification", (data) => {
  console.log(`通知 [${data.level}]: ${data.message}`);
});

bus.emit("userLoggedIn", { userId: "user-123" });
bus.emit("notification", { message: "Hello!", level: "info" });

// API 响应测试
const response = createResponse({ name: "Alice", age: 25 });
console.log("API Response:", response);
```

---

## 文件说明

本章包含以下文件：

| 文件名 | 说明 |
|--------|------|
| `generics.ts` | 本章所有泛型示例代码，包含完整的使用演示 |
| `practice-solution.html` | 本章练习题的参考答案 |

---

## 练习题

### 基础练习

**练习 7.1**：编写一个泛型函数 `getFirst`，接受数组参数，返回第一个元素。

**练习 7.2**：编写一个泛型函数 `swap`，接受两个参数，返回交换后的元组。

**练习 7.3**：创建一个泛型类 `Queue`，包含 `enqueue`、`dequeue`、`peek`、`isEmpty` 方法。

### 进阶练习

**练习 7.4**：创建一个泛型函数 `groupBy`，接受数组和分组函数，返回按分组函数结果组织的对象。

**练习 7.5**：创建一个泛型工具类型 `DeepPartial`，可以将对象的所有嵌套属性都变为可选。

### 挑战练习

**练习 7.6**：实现一个泛型 `Observable` 类，支持以下功能：
- `subscribe`：订阅事件
- `unsubscribe`：取消订阅
- `next`：发布事件
- 支持不同的事件类型

**练习 7.7**：创建一个泛型表单验证器类 `FormValidator`，包含：
- 验证规则定义
- 添加验证规则
- 验证表单数据
- 返回验证结果和错误信息

---

## 学习目标检查清单

- [ ] 理解泛型的概念和作用
- [ ] 能够定义和使用泛型函数
- [ ] 能够定义和使用泛型接口
- [ ] 能够定义和使用泛型类
- [ ] 掌握泛型约束的使用
- [ ] 理解 keyof 约束的应用场景
- [ ] 掌握常用工具类型（Partial、Required、Pick、Omit、Record）
- [ ] 能够使用 ReturnType 和 Parameters 获取函数类型
