# 第三章：基础类型

## 本章目的

掌握 TypeScript 的基础类型系统，包括原始类型、数组类型、对象类型、联合类型、交叉类型等，能够在代码中正确使用和标注各种类型。

---

## 3.1 原始类型

原始类型是 TypeScript 类型系统中最基础的部分，它们直接对应 JavaScript 的基本数据类型。

### 数字类型（number）

数字类型用于表示数值，包括整数和浮点数。TypeScript 中的所有数字都是 64 位浮点数，与 JavaScript 保持一致。

```typescript
// 整数
const age: number = 25;
const count: number = 100;

// 浮点数
const price: number = 19.99;
const pi: number = 3.14159;

// 八进制和十六进制
const octal: number = 0o77;    // 八进制：63
const hex: number = 0xff;      // 十六进制：255

// 科学计数法
const largeNumber: number = 1e10;  // 10000000000
const smallNumber: number = 1e-5;  // 0.00001

// NaN 和 Infinity
const notANumber: number = NaN;
const infinity: number = Infinity;
const negativeInfinity: number = -Infinity;

// 数字运算
const sum: number = 10 + 20;           // 30
const product: number = 3.14 * 2;      // 6.28
const remainder: number = 17 % 5;      // 2
```

数字类型支持所有 JavaScript 的数学运算，包括算术运算符和 `Math` 对象的所有方法。

### 字符串类型（string）

字符串类型用于表示文本数据，可以使用单引号、双引号或模板字符串。

```typescript
// 单引号
const name: string = 'Alice';

// 双引号
const city: string = "Beijing";

// 模板字符串（支持插值）
const greeting: string = `Hello, ${name}!`;
const message: string = `Current year: ${2024}`;

// 多行模板字符串
const multiLine: string = `
  This is a multi-line string.
  It can span multiple lines.
  Very useful for HTML templates.
`;

// 字符串方法
const str: string = "TypeScript";
const length: number = str.length;           // 10
const upperCase: string = str.toUpperCase(); // "TYPESCRIPT"
const slice: string = str.slice(0, 4);       // "Type"
const includes: boolean = str.includes("Script"); // true
```

### 布尔类型（boolean）

布尔类型只有两个值：`true` 和 `false`，用于表示条件的真假。

```typescript
// 显式类型声明
const isActive: boolean = true;
const isCompleted: boolean = false;

// 表达式结果
const isGreater: boolean = 10 > 5;           // true
const isEqual: boolean = "a" === "a";        // true
const hasItems: boolean = [1, 2, 3].length > 0; // true

// 逻辑运算
const andResult: boolean = true && false;    // false
const orResult: boolean = true || false;     // true
const notResult: boolean = !true;            // false
```

### undefined 和 null

`undefined` 表示变量已声明但未赋值，`null` 表示变量已明确赋值为空。

```typescript
// undefined
let uninitialized: undefined = undefined;
let value: string | undefined = undefined;

// null
const emptyValue: null = null;
let result: string | null = null;

// 使用场景
interface User {
  name: string;
  email?: string;  // 可选属性，可能为 undefined
}

const user: User = { name: "Alice" };
console.log(user.email);  // undefined，不是错误

// 严格模式下需要显式处理
function processValue(value: string | null): string {
  if (value === null) {
    return "default";
  }
  return value;
}
```

### Symbol 类型

Symbol 是 ES6 引入的原始类型，表示唯一的标识符。

```typescript
// 创建 Symbol
const sym1: symbol = Symbol("key");
const sym2: symbol = Symbol("key");

console.log(sym1 === sym2);  // false，每个 Symbol 都是唯一的

// 作为对象属性键
const obj: { [key: symbol]: string } = {};
obj[sym1] = "value1";
obj[sym2] = "value2";

// 常用作唯一键
const privateKey: unique symbol = Symbol("private");
class Container {
  [privateKey]: string = "secret";
}
```

### BigInt 类型

BigInt 用于表示大于 2^53 - 1 的整数，是 ES2020 新增的类型。

```typescript
// BigInt 字面量
const bigNumber: bigint = 12345678901234567890n;

// BigInt 运算
const sum: bigint = 100n + 200n;                    // 300n
const product: bigint = 10n * 20n;                  // 200n

// 转换为字符串
const str: string = bigNumber.toString();           // "12345678901234567890"

// 不能与 number 混用
// const mixed: number = bigNumber;  // 错误
// const combined: bigint = bigNumber + 10;  // 错误
```

---

## 3.2 数组类型

数组类型用于表示一组相同类型的数据。

### 数组类型语法

```typescript
// 方式一：使用类型 + []
const numbers: number[] = [1, 2, 3, 4, 5];
const names: string[] = ["Alice", "Bob", "Charlie"];
const booleans: boolean[] = [true, false, true];

// 方式二：使用 Array 泛型
const numbers2: Array<number> = [1, 2, 3];
const names2: Array<string> = ["Alice", "Bob"];

// 空数组需要类型推断或显式声明
const emptyNumbers: number[] = [];
const emptyStrings: string[] = [];

// 多维数组
const matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// 只读数组（不可修改）
const readOnlyNumbers: ReadonlyArray<number> = [1, 2, 3];
// readOnlyNumbers.push(4);  // 错误
// readOnlyNumbers[0] = 10;  // 错误
```

### 数组常用操作

```typescript
const arr: number[] = [1, 2, 3, 4, 5];

// 添加元素
arr.push(6);          // [1, 2, 3, 4, 5, 6]
arr.unshift(0);       // [0, 1, 2, 3, 4, 5, 6]

// 删除元素
arr.pop();            // 返回 6
arr.shift();          // 返回 0

// 查找元素
const index: number = arr.indexOf(3);      // 2
const found: number | undefined = arr.find(x => x > 3);  // 4

// 遍历
arr.forEach((num, index) => {
  console.log(`arr[${index}] = ${num}`);
});

// 映射
const doubled: number[] = arr.map(x => x * 2);

// 过滤
const evens: number[] = arr.filter(x => x % 2 === 0);

// 归并
const sum: number = arr.reduce((acc, curr) => acc + curr, 0);
```

---

## 3.3 对象类型

对象类型用于描述具有多个属性的数据结构。

### 基本对象类型

```typescript
// 对象类型声明
interface Person {
  name: string;
  age: number;
  email: string;
}

// 对象实例
const person: Person = {
  name: "Alice",
  age: 25,
  email: "alice@example.com"
};

// 嵌套对象
interface Address {
  city: string;
  country: string;
  zipCode: string;
}

interface Employee {
  name: string;
  address: Address;
  department: string;
}

const employee: Employee = {
  name: "Bob",
  address: {
    city: "Shanghai",
    country: "China",
    zipCode: "200000"
  },
  department: "Engineering"
};
```

### 可选属性

```typescript
interface User {
  username: string;
  password: string;
  nickname?: string;      // 可选属性
  avatar?: string;        // 可选属性
  age?: number;           // 可选属性
}

// 可选属性可以不存在
const user1: User = {
  username: "alice",
  password: "123456"
};

const user2: User = {
  username: "bob",
  password: "password",
  nickname: "Bobby"
};
```

### 只读属性

```typescript
interface Config {
  readonly id: string;    // 只读属性
  name: string;
  value: number;
}

const config: Config = {
  id: "config-001",
  name: "Settings",
  value: 100
};

config.name = "New Name";      // 允许
// config.id = "config-002";    // 错误：只读属性不能修改
```

### 索引签名

当对象的属性名不确定但类型固定时，使用索引签名。

```typescript
interface StringDictionary {
  [key: string]: string;
}

const dict: StringDictionary = {
  hello: "你好",
  world: "世界",
  goodbye: "再见"
};

// 任意字符串属性都必须是 string 类型
// dict["anyKey"] = 123;  // 错误

// 混合类型索引签名
interface MixedDictionary {
  [key: string]: string | number;
}

const mixed: MixedDictionary = {
  name: "Alice",
  age: 25,
  city: "Beijing"
}
```

---

## 3.4 联合类型和交叉类型

联合类型和交叉类型是组合多个类型的强大工具。

### 联合类型

联合类型表示一个值可以是多种类型之一，使用竖线（`|`）分隔。

```typescript
// 字符串或数字
let value: string | number;
value = "hello";      // 正确
value = 123;          // 正确
// value = true;       // 错误

// 函数参数使用联合类型
function formatValue(input: string | number): string {
  return `Value: ${input}`;
}

// 数组元素是多种类型之一
const mixedArray: (string | number)[] = [1, "two", 3, "four"];

// 类型缩小
function processInput(input: string | number) {
  if (typeof input === "string") {
    // TypeScript 知道 input 在这里是 string 类型
    return input.toUpperCase();
  } else {
    // TypeScript 知道 input 在这里是 number 类型
    return input * 2;
  }
}

// null | undefined 的常用组合
let optionalValue: string | null | undefined;
optionalValue = "text";
optionalValue = null;
optionalValue = undefined;
```

### 交叉类型

交叉类型表示同时具有多个类型的所有特性，使用和号（`&`）组合。

```typescript
interface PartA {
  name: string;
}

interface PartB {
  age: number;
}

// 交叉类型
type Person = PartA & PartB;

const person: Person = {
  name: "Alice",
  age: 25
};

// 交叉类型用于扩展
interface Contact {
  email: string;
}

interface Phone {
  mobile: string;
}

type ContactInfo = Contact & Phone & {
  address: string;
};

const contact: ContactInfo = {
  email: "alice@example.com",
  mobile: "13800138000",
  address: "Beijing"
};
```

### 联合类型和交叉类型的区别

```typescript
// 联合类型：A 或 B
type Union = string | number;
// 值可以是 string 或 number，但不能同时是两者

// 交叉类型：A 和 B
type Intersection = string & number;
// 必须是同时满足 string 和 number 的类型（通常 never）
// const value: Intersection = "text";  // 错误
```

---

## 3.5 类型别名

类型别名用于为复杂类型创建可重用的名称。

### 基本用法

```typescript
// 为基本类型创建别名
type ID = string;
type Count = number;
type Flag = boolean;

// 为对象类型创建别名
type Point = {
  x: number;
  y: number;
};

type User = {
  id: ID;
  name: string;
  age: Count;
};

// 使用别名
const point: Point = { x: 10, y: 20 };
const user: User = { id: "user-001", name: "Alice", age: 25 };
```

### 为联合类型创建别名

```typescript
// 状态类型
type Status = "pending" | "active" | "completed" | "cancelled";

function setStatus(status: Status) {
  console.log(`Status set to: ${status}`);
}

setStatus("active");    // 正确
// setStatus("unknown"); // 错误

// 数字类型字面量
type HttpCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;

function getHttpMessage(code: HttpCode): string {
  const messages: Record<HttpCode, string> = {
    200: "OK",
    201: "Created",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error"
  };
  return messages[code];
}
```

### 为函数类型创建别名

```typescript
// 函数类型别名
type Callback = (error: Error | null, result?: string) => void;

function asyncOperation(callback: Callback) {
  // 模拟异步操作
  setTimeout(() => {
    callback(null, "Success!");
  }, 1000);
}

asyncOperation((error, result) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Result:", result);
  }
});

// 更简洁的函数类型
type MathFunction = (a: number, b: number) => number;

const add: MathFunction = (a, b) => a + b;
const multiply: MathFunction = (a, b) => a * b;
```

---

## 3.6 枚举类型

枚举类型用于定义一组命名的常量。

### 数字枚举

```typescript
// 默认从 0 开始
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right    // 3
}

// 从指定值开始
enum Status {
  Pending = 1,
  Active,  // 2
  Completed,  // 3
  Cancelled  // 4
}

// 使用枚举
const move = (direction: Direction) => {
  switch (direction) {
    case Direction.Up:
      console.log("Moving up");
      break;
    case Direction.Down:
      console.log("Moving down");
      break;
    case Direction.Left:
      console.log("Moving left");
      break;
    case Direction.Right:
      console.log("Moving right");
      break;
  }
};

move(Direction.Up);
console.log(Status.Active);  // 输出 2
```

### 字符串枚举

```typescript
enum Message {
  Success = "SUCCESS",
  Error = "ERROR",
  Warning = "WARNING",
  Info = "INFO"
}

function showMessage(type: Message): void {
  console.log(`Message type: ${type}`);
}

showMessage(Message.Success);  // Message type: SUCCESS
```

### 常量枚举

常量枚举在编译时会被内联，减少运行时代码。

```typescript
const enum Color {
  Red = "#FF0000",
  Green = "#00FF00",
  Blue = "#0000FF"
}

// 编译后 Color.Red 会被替换为 "#FF0000"
const color = Color.Red;
```

### 异构枚举

混合数字和字符串的枚举（不推荐使用）。

```typescript
enum Mixed {
  No = 0,
  Yes = "YES"
}
```

---

## 3.7 any、unknown 和 never

这三个特殊类型在 TypeScript 中有特殊的用途。

### any 类型

any 类型表示任意类型，关闭类型检查。

```typescript
let anything: any;

anything = "hello";     // string
anything = 42;          // number
anything = true;        // boolean
anything = [1, 2, 3];   // array
anything = { name: "Alice" };  // object

// any 类型可以访问任意属性和方法
console.log(anything.toString());  // 不会报错
console.log(anything.nonExistent); // 不会报错

// 慎用 any！它会失去 TypeScript 的类型安全保障
```

### unknown 类型

unknown 是类型安全的 any，在使用前必须进行类型检查。

```typescript
let unknownValue: unknown;

unknownValue = "hello";
unknownValue = 42;

// 必须进行类型检查才能使用
if (typeof unknownValue === "string") {
  console.log(unknownValue.toUpperCase());
}

if (typeof unknownValue === "number") {
  console.log(unknownValue * 2);
}

// 类型断言
const str: string = unknownValue as string;
const num: number = unknownValue as number;
```

### never 类型

never 表示永远不可能有值的类型。

```typescript
// 抛出错误的函数返回 never
function throwError(message: string): never {
  throw new Error(message);
}

// 无限循环的函数返回 never
function infiniteLoop(): never {
  while (true) {
    // 永远循环
  }
}

// 类型收窄后的 never
function processValue(value: string | number) {
  if (typeof value === "string") {
    // 这里 value 是 string 类型
  } else if (typeof value === "number") {
    // 这里 value 是 number 类型
  } else {
    // 这里 value 是 never 类型（不可能到达）
    const exhaustive: never = value;
  }
}
```

---

## 文件说明

本章包含以下文件：

| 文件名 | 说明 |
|--------|------|
| `basic-types.ts` | 本章所有类型示例代码，包含完整的类型声明和操作演示 |
| `practice-solution.html` | 本章练习题的参考答案 |

---

## 练习题

### 基础练习

**练习 3.1**：声明以下变量并标注正确类型：姓名（字符串）、年龄（数字）、是否在职（布尔值）、身高（数字，使用厘米单位）。

**练习 3.2**：创建一个字符串数组包含 5 个水果名称，使用 `forEach` 遍历并打印每个水果。

**练习 3.3**：创建一个对象表示学生信息，包含姓名、年龄、课程列表（数组）。使用可选属性表示学生的邮箱。

### 进阶练习

**练习 3.4**：创建一个类型别名 `Result`，表示可能的值：`"success"`、`"error"` 或 `{code: number, message: string}`。编写一个函数处理这个类型。

**练习 3.5**：定义一个状态枚举，包含 `Pending`、`Processing`、`Completed`、`Failed` 四个状态。编写一个函数接受状态并返回对应的描述文字。

### 挑战练习

**练习 3.6**：创建一个表示分数的类型，它可以是以下类型之一：数字、`"A"`、`"B"`、`"C"`、`"D"`、`"F"`。编写一个函数将分数转换为对应的数值（90-100→A，80-89→B，以此类推）。

**练习 3.7**：创建一个工具类型，将对象的所有属性变为可选，并创建一个函数演示其用法。

---

## 学习目标检查清单

- [ ] 掌握 TypeScript 的原始类型（number、string、boolean、undefined、null）
- [ ] 理解 Symbol 和 BigInt 类型的使用场景
- [ ] 能够正确定义和使用数组类型
- [ ] 能够定义对象类型，包括可选属性和只读属性
- [ ] 理解和使用索引签名
- [ ] 掌握联合类型和交叉类型的区别和用法
- [ ] 能够使用类型别名简化复杂类型
- [ ] 掌握枚举类型的使用
- [ ] 理解 any、unknown、never 三种特殊类型的区别和适用场景
