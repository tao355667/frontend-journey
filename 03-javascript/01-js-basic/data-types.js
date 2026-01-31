/**
 * JavaScript Data Types
 * 演示 JavaScript 中的所有数据类型
 */

// 原始类型（Primitive Types）- 基本数据类型，存储在栈中

// String - 字符串类型，用单引号、双引号或反引号包裹
let str = "Hello";
console.log("Type of str:", typeof str); // string

// Number - 数字类型，包括整数和小数
let num = 42;
let floatNum = 3.14;
console.log("Type of num:", typeof num); // number

// Boolean - 布尔类型，只有两个值：true 和 false
let bool = true;
console.log("Type of bool:", typeof bool); // boolean

// Null - 空值，表示"无"或"空"，是 JavaScript 的特殊值
// 注意：typeof null 返回 "object"，这是 JavaScript 的一个历史遗留 bug
let nothing = null;
console.log("Type of null:", typeof nothing); // object (实际应该是 null)

// Undefined - 未定义，表示变量已声明但未赋值
let notDefined;
console.log("Type of undefined:", typeof notDefined); // undefined

// Symbol - 符号类型，ES6 新增，用于创建唯一的标识符
let sym = Symbol("id");
console.log("Type of symbol:", typeof sym); // symbol

// BigInt - 大整数类型，ES2020 新增，用于表示超出 Number 安全范围的整数
let bigInt = 9007199254740991n;
console.log("Type of BigInt:", typeof bigInt); // bigint

// 引用类型（Reference Types）- 复杂数据类型，存储在堆中，变量存储的是引用地址

// Object - 对象类型，键值对的集合
let obj = { name: "John", age: 30 };
console.log("Type of object:", typeof obj); // object

// Array - 数组类型，有序的数据列表（实际上也是对象的一种）
let arr = [1, 2, 3];
console.log("Type of array:", typeof arr); // object
console.log("Is array?", Array.isArray(arr)); // true

// Function - 函数类型，可执行的代码块（也是对象的一种）
let func = function() { return "Hello"; };
console.log("Type of function:", typeof func); // function

// 类型检查的最佳实践
console.log("\n=== 类型检查示例 ===");

// 使用 typeof 检查原始类型
console.log("Is string?", typeof str === "string"); // true
console.log("Is number?", typeof num === "number"); // true
console.log("Is boolean?", typeof bool === "boolean"); // true

// 使用 Array.isArray() 检查数组
console.log("Is array?", Array.isArray(arr)); // true

// 检查 null（因为 typeof null 返回 "object"）
console.log("Is null?", nothing === null); // true

// 检查 undefined
console.log("Is undefined?", notDefined === undefined); // true

// 检查对象（排除 null 和数组）
console.log("Is object?", typeof obj === "object" && obj !== null && !Array.isArray(obj)); // true

/**
 * 类型转换示例
 */
console.log("\n=== 类型转换示例 ===");

// 隐式类型转换
console.log("5 + '5':", 5 + "5"); // "55" (字符串拼接)
console.log("5 - '5':", 5 - "5"); // 0 (数字减法)
console.log("5 * '5':", 5 * "5"); // 25 (数字乘法)
console.log("'5' == 5:", '5' == 5); // true (宽松相等，会进行类型转换)
console.log("'5' === 5:", '5' === 5); // false (严格相等，不进行类型转换)

// 显式类型转换
console.log("String(123):", String(123)); // "123"
console.log("Number('123'):", Number('123')); // 123
console.log("Boolean(1):", Boolean(1)); // true
console.log("Boolean(0):", Boolean(0)); // false

/**
 * 最佳实践：
 * 1. 始终使用严格相等（===）和严格不等（!==）进行比较
 * 2. 使用 Array.isArray() 检查数组，而不是 typeof
 * 3. 检查 null 时使用 === null
 * 4. 检查 undefined 时使用 === undefined 或 typeof variable === "undefined"
 */
