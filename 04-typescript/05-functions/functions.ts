// functions.ts - TypeScript 函数示例

// ========================================
// 5.1 函数类型基础
// ========================================

console.log("=== 函数类型基础 ===");

// 基本函数声明
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

console.log(greet("Alice"));
console.log(greet2("Bob"));
console.log(greet3("Charlie"));
console.log(greet4("Diana"));

// 参数类型注解
function multiply(a: number, b: number): number {
  return a * b;
}

function greetWithAge(name: string, age?: number): string {
  if (age !== undefined) {
    return `Hello, ${name}! You are ${age} years old.`;
  }
  return `Hello, ${name}!`;
}

function createGreeting(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

function sum(...numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}

console.log("\n参数测试：");
console.log(greetWithAge("Bob"));
console.log(greetWithAge("Charlie", 30));
console.log(createGreeting("Diana"));
console.log(createGreeting("Eve", "Hi"));
console.log("求和:", sum(1, 2, 3, 4, 5));

// 返回值类型注解
function add(a: number, b: number): number {
  return a + b;
}

function logMessage(message: string): void {
  console.log(message);
}

function throwError(message: string): never {
  throw new Error(message);
}

console.log("\n返回值测试：");
console.log("add(2, 3) =", add(2, 3));
logMessage("This is a log message");

// ========================================
// 5.2 函数类型表达式
// ========================================

console.log("\n=== 函数类型表达式 ===");

// 函数类型定义
type GreetFunction = (name: string) => string;

const greetUser: GreetFunction = (name) => {
  return `Hello, ${name}!`;
};

console.log(greetUser("Frank"));

// 复杂函数类型
type MathOperation = (a: number, b: number) => number;

const addOp: MathOperation = (a, b) => a + b;
const multiplyOp: MathOperation = (a, b) => a * b;
const subtractOp: MathOperation = (a, b) => a - b;
const divideOp: MathOperation = (a, b) => a / b;

console.log("数学运算：");
console.log(`  加法: 10 + 5 = ${addOp(10, 5)}`);
console.log(`  乘法: 10 × 5 = ${multiplyOp(10, 5)}`);
console.log(`  减法: 10 - 5 = ${subtractOp(10, 5)}`);
console.log(`  除法: 10 / 5 = ${divideOp(10, 5)}`);

// 作为参数的函数类型
function processArray(
  items: number[],
  callback: (item: number) => number
): number[] {
  return items.map(callback);
}

const numbers = [1, 2, 3, 4, 5];
const doubled = processArray(numbers, (n) => n * 2);
console.log("处理数组:", doubled);

function filterArray<T>(
  items: T[],
  predicate: (item: T) => boolean
): T[] {
  return items.filter(predicate);
}

const words = ["apple", "banana", "cherry", "date", "elderberry"];
const longWords = filterArray(words, (word) => word.length > 5);
console.log("过滤单词:", longWords);

// ========================================
// 5.3 函数重载
// ========================================

console.log("\n=== 函数重载 ===");

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

console.log("格式化字符串:", format("hello"));
console.log("格式化数字:", format(3.14159));
console.log("格式化布尔值:", format(true));

// 多参数重载
function createUser(name: string): { name: string };
function createUser(name: string, age: number): { name: string; age: number };
function createUser(name: string, age?: number): { name: string; age?: number } {
  if (age !== undefined) {
    return { name, age };
  }
  return { name };
}

const user1 = createUser("Alice");
const user2 = createUser("Bob", 25);
console.log("用户1:", user1);
console.log("用户2:", user2);

// 构造函数重载
class Car {
  brand: string;
  model: string;
  year?: number;

  constructor(brand: string, model: string);
  constructor(brand: string, model: string, year: number);

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
console.log("汽车1:", car1.getInfo());
console.log("汽车2:", car2.getInfo());

// ========================================
// 5.4 this 类型
// ========================================

console.log("\n=== this 类型 ===");

// 普通函数中的 this
function printInfo(this: { name: string }, greeting: string) {
  return `${greeting}, ${this.name}!`;
}

const obj = { name: "Alice" };
console.log(printInfo.call(obj, "Hello"));

// 类方法中的 this
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
counter.increment();
console.log("计数器:", counter.count);

// 链式调用中的 this
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

console.log("字符串构建器结果:");
console.log(result);

// ========================================
// 5.5 回调函数类型
// ========================================

console.log("\n=== 回调函数类型 ===");

// 错误优先的回调类型
type ErrorFirstCallback<T> = (error: Error | null, result?: T) => void;

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
  }, 500);
}

asyncOperation("Hello", (error, result) => {
  if (error) {
    console.error("Error:", error.message);
  } else {
    console.log("Result:", result);
  }
});

// 事件监听回调
type EventHandler = (event: { type: string; timestamp: number }) => void;

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
const handler1 = (event) => console.log(`Handler1: ${event.type}`);
const handler2 = (event) => console.log(`Handler2: ${event.type}`);

emitter.on(handler1);
emitter.on(handler2);

emitter.emit({ type: "click", timestamp: Date.now() });
emitter.off(handler1);
emitter.emit({ type: "scroll", timestamp: Date.now() });

// ========================================
// 5.6 泛型函数
// ========================================

console.log("\n=== 泛型函数 ===");

// 泛型函数
function identity<T>(value: T): T {
  return value;
}

console.log("identity<string>('hello'):", identity<string>("hello"));
console.log("identity<number>(42):", identity<number>(42));
console.log("identity(true):", identity(true));

// 多个泛型参数
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

console.log("pair<string, number>('age', 25):", pair<string, number>("age", 25));
console.log("pair('name', 'Alice'):", pair("name", "Alice"));

// 约束泛型
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(`Length: ${item.length}`);
}

logLength("hello");
logLength([1, 2, 3]);
logLength({ length: 10, width: 5 });

// 键值约束
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 25, city: "Beijing" };
console.log("getProperty(user, 'name'):", getProperty(user, "name"));
console.log("getProperty(user, 'age'):", getProperty(user, "age"));

// ========================================
// 5.7 实战示例：数据处理函数库
// ========================================

console.log("\n=== 实战示例：数据处理函数库 ===");

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

interface User {
  name: string;
  department: string;
}

const users: User[] = [
  { name: "Alice", department: "Engineering" },
  { name: "Bob", department: "Marketing" },
  { name: "Charlie", department: "Engineering" },
  { name: "Diana", department: "HR" },
  { name: "Eve", department: "Marketing" }
];

const groupedUsers = groupBy(users, (user) => user.department);
console.log("按部门分组:", groupedUsers);

// 2. 管道函数
function pipe<T>(
  ...fns: ((value: T) => T)[]
): (value: T) => T {
  return (value: T) => {
    return fns.reduce((current, fn) => fn(current), value);
  };
}

const addOne = (n: number) => n + 1;
const double = (n: number) => n * 2;
const square = (n: number) => n * n;

const pipeline = pipe(addOne, double, square);
console.log("管道 (2+1)×2² =", pipeline(2));

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

const expensiveCalc = (n: number) => {
  console.log(`计算 ${n} 的平方...`);
  return n * n;
};

const memoizedCalc = memoize(expensiveCalc);
console.log("首次调用 memoizedCalc(5):", memoizedCalc(5));
console.log("缓存调用 memoizedCalc(5):", memoizedCalc(5));
console.log("新参数 memoizedCalc(3):", memoizedCalc(3));

// 4. 排序函数
function sortBy<T>(
  array: T[],
  keyGetter: (item: T) => number | string,
  direction: "asc" | "desc" = "asc"
): T[] {
  const sorted = [...array].sort((a, b) => {
    const aKey = keyGetter(a);
    const bKey = keyGetter(b);

    if (aKey < bKey) return -1;
    if (aKey > bKey) return 1;
    return 0;
  });

  return direction === "desc" ? sorted.reverse() : sorted;
}

interface Product {
  name: string;
  price: number;
}

const products: Product[] = [
  { name: "Laptop", price: 999 },
  { name: "Mouse", price: 29 },
  { name: "Keyboard", price: 79 },
  { name: "Monitor", price: 299 }
];

console.log("\n按价格排序（升序）:", sortBy(products, (p) => p.price));
console.log("按价格排序（降序）:", sortBy(products, (p) => p.price, "desc"));

// 5. 柯里化函数
function curry<T, U, V>(
  fn: (a: T, b: U) => V
): (a: T) => (b: U) => V {
  return (a: T) => (b: U) => fn(a, b);
}

const curriedAdd = curry((a: number, b: number) => a + b);
const add5 = curriedAdd(5);
console.log("柯里化: add5(3) =", add5(3));
console.log("柯里化: curriedAdd(10)(20) =", curriedAdd(10)(20));

console.log("\n所有函数示例执行完成！");
