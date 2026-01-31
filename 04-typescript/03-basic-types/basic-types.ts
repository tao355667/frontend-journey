// basic-types.ts - TypeScript 基础类型示例

// ========================================
// 3.1 原始类型
// ========================================

// 数字类型（number）
const age: number = 25;
const price: number = 19.99;
const octal: number = 0o77;
const hex: number = 0xff;
const largeNumber: number = 1e10;
const notANumber: number = NaN;
const infinity: number = Infinity;

console.log("=== 数字类型 ===");
console.log(`年龄: ${age}, 价格: ${price}`);
console.log(`八进制 77: ${octal}, 十六进制 ff: ${hex}`);
console.log(`大数: ${largeNumber}, NaN: ${notANumber}`);

// 字符串类型（string）
const name: string = "Alice";
const greeting: string = `Hello, ${name}!`;
const multiLine: string = `
  这是一个
  多行字符串
`;

console.log("\n=== 字符串类型 ===");
console.log(greeting);
console.log("多行字符串:", multiLine.trim());

// 布尔类型（boolean）
const isActive: boolean = true;
const isAdult: boolean = age >= 18;
console.log("\n=== 布尔类型 ===");
console.log(`isActive: ${isActive}, isAdult: ${isAdult}`);

// undefined 和 null
let undefinedValue: undefined = undefined;
let nullValue: null = null;
console.log("\n=== undefined 和 null ===");
console.log(`undefinedValue: ${undefinedValue}, nullValue: ${nullValue}`);

// Symbol 类型
const sym1: symbol = Symbol("key");
const sym2: symbol = Symbol("key");
console.log("\n=== Symbol 类型 ===");
console.log(`sym1 === sym2: ${sym1 === sym2}`);

// BigInt 类型
const bigNumber: bigint = 12345678901234567890n;
const bigSum: bigint = 100n + 200n;
console.log("\n=== BigInt 类型 ===");
console.log(`bigNumber: ${bigNumber}, sum: ${bigSum}`);

// ========================================
// 3.2 数组类型
// ========================================

console.log("\n=== 数组类型 ===");

// 数字数组
const numbers: number[] = [1, 2, 3, 4, 5];
console.log("数字数组:", numbers);

// 字符串数组
const fruits: string[] = ["apple", "banana", "orange"];
console.log("水果数组:", fruits);

// Array 泛型语法
const names: Array<string> = ["Alice", "Bob", "Charlie"];
console.log("姓名数组:", names);

// 只读数组
const readOnlyNumbers: ReadonlyArray<number> = [1, 2, 3];
console.log("只读数组:", readOnlyNumbers);

// 数组操作
const arr: number[] = [1, 2, 3, 4, 5];

// 映射
const doubled: number[] = arr.map(x => x * 2);
console.log("映射（结果乘以2）:", doubled);

// 过滤
const evens: number[] = arr.filter(x => x % 2 === 0);
console.log("过滤结果（偶数）:", evens);

// 归并
const sum: number = arr.reduce((acc, curr) => acc + curr, 0);
console.log("数组求和:", sum);

// ========================================
// 3.3 对象类型
// ========================================

console.log("\n=== 对象类型 ===");

// 基本对象
interface Person {
  name: string;
  age: number;
  email: string;
}

const person: Person = {
  name: "Alice",
  age: 25,
  email: "alice@example.com"
};
console.log("个人信息:", person);

// 嵌套对象
interface Address {
  city: string;
  country: string;
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
    country: "China"
  },
  department: "Engineering"
};
console.log("员工信息:", employee);

// 可选属性
interface User {
  username: string;
  password: string;
  nickname?: string;
  avatar?: string;
}

const user1: User = { username: "alice", password: "123456" };
const user2: User = { username: "bob", password: "abc", nickname: "Bobby" };
console.log("用户1:", user1);
console.log("用户2:", user2);

// 只读属性
interface Config {
  readonly id: string;
  name: string;
  value: number;
}

const config: Config = {
  id: "config-001",
  name: "Settings",
  value: 100
};
// config.id = "config-002";  // 错误：只读属性不能修改
console.log("配置信息:", config);

// 索引签名
interface StringDictionary {
  [key: string]: string;
}

const dict: StringDictionary = {
  hello: "你好",
  world: "世界",
  goodbye: "再见"
};
console.log("字典:", dict);

// ========================================
// 3.4 联合类型和交叉类型
// ========================================

console.log("\n=== 联合类型和交叉类型 ===");

// 联合类型
let value: string | number;
value = "hello";
value = 123;
console.log("联合类型值:", value);

// 函数参数使用联合类型
function formatValue(input: string | number): string {
  return `Value: ${input}`;
}
console.log(formatValue("test"));
console.log(formatValue(42));

// 类型缩小
function processInput(input: string | number) {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else {
    return input * 2;
  }
}
console.log("处理字符串:", processInput("hello"));
console.log("处理数字:", processInput(5));

// 交叉类型
interface PartA {
  name: string;
}

interface PartB {
  age: number;
}

type PersonInfo = PartA & PartB;

const personInfo: PersonInfo = {
  name: "Alice",
  age: 25
};
console.log("交叉类型对象:", personInfo);

// ========================================
// 3.5 类型别名
// ========================================

console.log("\n=== 类型别名 ===");

// 基本类型别名
type ID = string;
type Count = number;
type Flag = boolean;

const userId: ID = "user-001";
const itemCount: Count = 100;
const isEnabled: Flag = true;

// 对象类型别名
type Point = {
  x: number;
  y: number;
};

const point: Point = { x: 10, y: 20 };
console.log("点坐标:", point);

// 联合类型别名
type Status = "pending" | "active" | "completed" | "cancelled";
type HttpCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;

function setStatus(status: Status) {
  console.log(`状态: ${status}`);
}

setStatus("active");

// 函数类型别名
type MathFunction = (a: number, b: number) => number;

const add: MathFunction = (a, b) => a + b;
const multiply: MathFunction = (a, b) => a * b;

console.log("加法 5 + 3 =", add(5, 3));
console.log("乘法 5 × 3 =", multiply(5, 3));

// ========================================
// 3.6 枚举类型
// ========================================

console.log("\n=== 枚举类型 ===");

// 数字枚举
enum Direction {
  Up = 0,
  Down,
  Left,
  Right
}

console.log("Direction.Up:", Direction.Up);
console.log("Direction.Down:", Direction.Down);

// 字符串枚举
enum Message {
  Success = "SUCCESS",
  Error = "ERROR",
  Warning = "WARNING",
  Info = "INFO"
}

console.log("Message.Success:", Message.Success);

// 常量枚举
const enum Color {
  Red = "#FF0000",
  Green = "#00FF00",
  Blue = "#0000FF"
}

const favoriteColor = Color.Red;
console.log("喜欢的颜色:", favoriteColor);

// ========================================
// 3.7 any、unknown 和 never
// ========================================

console.log("\n=== any、unknown 和 never ===");

// any 类型
let anything: any = "hello";
anything = 42;
anything = true;
console.log("any 类型值:", anything);

// unknown 类型
let unknownValue: unknown = "hello";
if (typeof unknownValue === "string") {
  console.log("unknown 转为大写:", unknownValue.toUpperCase());
}

// never 类型示例
function throwError(message: string): never {
  throw new Error(message);
}

// 使用 try-catch 演示
try {
  throwError("这是一个错误");
} catch (e) {
  console.log("捕获错误:", (e as Error).message);
}

// ========================================
// 综合示例
// ========================================

console.log("\n=== 综合示例 ===");

// 学生管理系统
type Student = {
  readonly id: string;
  name: string;
  age: number;
  grades: number[];
  email?: string;
  status: "active" | "inactive";
};

const students: Student[] = [
  {
    id: "S001",
    name: "Alice",
    age: 20,
    grades: [85, 90, 92],
    status: "active"
  },
  {
    id: "S002",
    name: "Bob",
    age: 22,
    grades: [78, 80, 75],
    email: "bob@example.com",
    status: "active"
  },
  {
    id: "S003",
    name: "Charlie",
    age: 19,
    grades: [95, 88, 91],
    status: "inactive"
  }
];

// 计算平均分
function calculateAverage(grades: number[]): number {
  const sum = grades.reduce((acc, grade) => acc + grade, 0);
  return sum / grades.length;
}

// 打印学生信息
students.forEach(student => {
  const average = calculateAverage(student.grades);
  console.log(`学生: ${student.name}, 平均分: ${average.toFixed(2)}, 状态: ${student.status}`);
});

console.log("\n所有示例执行完成！");
