// generics.ts - TypeScript 泛型示例

// ========================================
// 7.1 泛型基础
// ========================================

console.log("=== 泛型基础 ===");

// 基本泛型函数
function identity<T>(value: T): T {
  return value;
}

console.log("identity('hello'):", identity("hello"));
console.log("identity(42):", identity(42));
console.log("identity(true):", identity(true));

// 泛型数组函数
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const numbers = [1, 2, 3, 4, 5];
const strings = ["a", "b", "c"];

console.log("firstElement(numbers):", firstElement(numbers));
console.log("firstElement(strings):", firstElement(strings));

// 多个泛型参数
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

const p1 = pair("age", 25);
const p2 = pair(true, "yes");
const p3 = pair("user", { name: "Alice" });

console.log("pair('age', 25):", p1);
console.log("pair(true, 'yes'):", p2);
console.log("pair('user', {...}):", p3);

// 泛型类型推断
function createPair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

const explicitPair = createPair<string, number>("score", 100);
const inferredPair = createPair("name", "Alice");
console.log("推断类型:", inferredPair);

// ========================================
// 7.2 泛型接口
// ========================================

console.log("\n=== 泛型接口 ===");

// 泛型容器接口
interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

class StringContainer implements Container<string> {
  constructor(public value: string) {}

  getValue(): string {
    return this.value;
  }

  setValue(value: string): void {
    this.value = value;
  }
}

class NumberContainer implements Container<number> {
  constructor(public value: number) {}

  getValue(): number {
    return this.value;
  }

  setValue(value: number): void {
    this.value = value;
  }
}

const stringContainer = new StringContainer("Hello");
const numberContainer = new NumberContainer(42);

console.log("StringContainer:", stringContainer.getValue());
console.log("NumberContainer:", numberContainer.getValue());

// 多参数泛型接口
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

const pair1: KeyValuePair<string, number> = { key: "age", value: 25 };
const pair2: KeyValuePair<number, string> = { key: 1, value: "one" };
console.log("pair1:", pair1);
console.log("pair2:", pair2);

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

const doubleProcessor: Processor<number, number> = (input) => {
  return input * 2;
};

console.log("upperCaseProcessor('hello'):", upperCaseProcessor("hello"));
console.log("lengthProcessor('hello'):", lengthProcessor("hello"));
console.log("doubleProcessor(5):", doubleProcessor(5));

// ========================================
// 7.3 泛型类
// ========================================

console.log("\n=== 泛型类 ===");

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

  toArray(): T[] {
    return [...this.items];
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);
console.log("Stack pop:", numberStack.pop());
console.log("Stack peek:", numberStack.peek());
console.log("Stack size:", numberStack.getSize());
console.log("Stack toArray:", numberStack.toArray());

const stringStack = new Stack<string>();
stringStack.push("a");
stringStack.push("b");
console.log("String stack:", stringStack.toArray());

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

  findBy(predicate: (item: T) => boolean): T[] {
    return this.findAll().filter(predicate);
  }

  delete(id: string | number): boolean {
    return this.records.delete(id);
  }

  update(id: string | number, data: Partial<T>): T | undefined {
    const existing = this.records.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...data };
    this.records.set(id, updated);
    return updated;
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
console.log("User DB findById('1'):", userDb.findById("1"));

const productDb = new Database<Product>();
productDb.insert({ id: 1, name: "Laptop", price: 999 });
console.log("Product DB findById(1):", productDb.findById(1));

// ========================================
// 7.4 泛型约束
// ========================================

console.log("\n=== 泛型约束 ===");

// 约束具有 length 属性
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(`Length: ${item.length}`);
}

logLength("hello");
logLength([1, 2, 3]);
logLength({ length: 10, width: 5 });
// logLength(123);  // 错误

// 约束继承自特定类型
class Animal {
  name: string;
}

class Dog extends Animal {
  breed: string;
}

class Cat extends Animal {
  color: string;
}

function printAnimalName<T extends Animal>(animal: T): void {
  console.log(`Animal name: ${animal.name}`);
}

const dog: Dog = { name: "Buddy", breed: "Golden" };
printAnimalName(dog);

const cat: Cat = { name: "Whiskers", color: "Orange" };
printAnimalName(cat);

// keyof 约束
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = {
  name: "Alice",
  age: 25,
  email: "alice@example.com"
};

console.log("getProperty(user, 'name'):", getProperty(user, "name"));
console.log("getProperty(user, 'age'):", getProperty(user, "age"));

function setProperty<T, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K]
): void {
  obj[key] = value;
}

setProperty(user, "age", 26);
console.log("Updated user:", user);

// ========================================
// 7.5 泛型工具类型
// ========================================

console.log("\n=== 泛型工具类型 ===");

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// Partial - 所有属性变为可选
type PartialTodo = Partial<Todo>;
const todo1: PartialTodo = {
  title: "Learn TypeScript"
};

// Required - 所有属性变为必需
type RequiredTodo = Required<PartialTodo>;

// Pick - 选择属性
type TodoPreview = Pick<Todo, "title" | "completed">;
const todo2: TodoPreview = {
  title: "Buy milk",
  completed: false
};

// Omit - 排除属性
type UserWithoutPassword = Omit<User, "email">;
const safeUser: UserWithoutPassword = {
  id: "1",
  name: "Alice"
};

// Record - 创建键值对类型
type Role = "admin" | "user" | "guest";
type Permission = Record<Role, boolean>;
const permissions: Permission = {
  admin: true,
  user: true,
  guest: false
};

type UserDict = Record<string, User>;
const users: UserDict = {
  "1": { id: "1", name: "Alice", email: "alice@example.com" },
  "2": { id: "2", name: "Bob", email: "bob@example.com" }
};

// ReturnType 和 Parameters
function greet(name: string, age: number): string {
  return `Hello, ${name}! You are ${age} years old.`;
}

type GreetReturn = ReturnType<typeof greet>;  // string
type GreetParams = Parameters<typeof greet>;  // [string, number]

const params: GreetParams = ["Alice", 25];
console.log("Parameters:", params);
console.log("Result:", greet(...params));

// ========================================
// 7.6 实战示例：通用数据处理工具
// ========================================

console.log("\n=== 实战示例：通用数据处理工具 ===");

// 1. 缓存工具
class Cache<T> {
  private cache: Map<string, { value: T; expireAt: number }> = new Map();
  private defaultTTL: number;

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

  getSize(): number {
    return this.cache.size;
  }
}

const numberCache = new Cache<number>(5000);
numberCache.set("key1", 100);
numberCache.set("key2", 200, 1000);
console.log("Cache get key1:", numberCache.get("key1"));
console.log("Cache has key2:", numberCache.has("key2"));

// 2. 事件总线
type EventHandler<T> = (data: T) => void;

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

interface Events {
  userLoggedIn: { userId: string; username: string };
  userLoggedOut: { userId: string };
  notification: { message: string; level: "info" | "warning" | "error" };
}

const bus = new EventBus<Events>();

const loginHandler = (data: { userId: string; username: string }) => {
  console.log(`用户登录: ${data.username} (${data.userId})`);
};

bus.on("userLoggedIn", loginHandler);
bus.emit("userLoggedIn", { userId: "user-123", username: "Alice" });

bus.on("notification", (data) => {
  console.log(`通知 [${data.level.toUpperCase()}]: ${data.message}`);
});
bus.emit("notification", { message: "系统更新完成", level: "info" });

// 3. 延迟队列
class DelayedQueue<T> {
  private queue: T[] = [];
  private processing = false;

  async add(item: T, delay: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.queue.push(item);
        this.process();
        resolve();
      }, delay);
    });
  }

  private async process(): Promise<void> {
    if (this.processing || this.queue.length === 0) return;

    this.processing = true;
    const item = this.queue.shift();
    if (item) {
      console.log("Processing item:", item);
      // 模拟处理时间
      await new Promise(r => setTimeout(r, 1000));
    }
    this.processing = false;

    if (this.queue.length > 0) {
      await this.process();
    }
  }

  getSize(): number {
    return this.queue.length;
  }
}

// 4. 组合工具
class Combiner<T> {
  private items: T[] = [];

  add(item: T): this {
    this.items.push(item);
    return this;
  }

  combine<U>(
    combiner: (a: T, b: T) => U
  ): U[] {
    const results: U[] = [];
    for (let i = 0; i - 1; < this.items.length i++) {
      results.push(combiner(this.items[i], this.items[i + 1]));
    }
    return results;
  }

  getAll(): T[] {
    return [...this.items];
  }
}

const numberCombiner = new Combiner<number>();
numberCombiner.add(1).add(2).add(3).add(4).add(5);
console.log("Number combiner items:", numberCombiner.getAll());
console.log("Adjacent sums:", numberCombiner.combine((a, b) => a + b));

console.log("\n所有泛型示例执行完成！");
