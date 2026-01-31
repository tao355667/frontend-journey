/**
 * JavaScript Operators
 * 演示 JavaScript 中各种运算符的使用
 */

console.log("=== 算术运算符（Arithmetic Operators）===");

// 算术运算符：用于执行数学运算
let a = 10, b = 3;

// 加法（+）
console.log("10 + 3 =", a + b); // 13

// 减法（-）
console.log("10 - 3 =", a - b); // 7

// 乘法（*）
console.log("10 * 3 =", a * b); // 30

// 除法（/）
console.log("10 / 3 =", a / b); // 3.3333333333333335

// 取模/求余数（%）
console.log("10 % 3 =", a % b); // 1（10 除以 3 余 1）

// 幂运算（**）- ES6 新增
console.log("10 ** 3 =", a ** b); // 1000（10 的 3 次方）

// 自增（++）和自减（--）
let count = 5;
console.log("\ncount:", count); // 5

// 后置自增：先返回原值，再加 1
console.log("count++:", count++); // 5
console.log("count:", count); // 6

// 前置自增：先加 1，再返回新值
console.log("++count:", ++count); // 7
console.log("count:", count); // 7

console.log("\n=== 比较运算符（Comparison Operators）===");

// 比较运算符：用于比较两个值，返回布尔值

// 宽松相等（==）- 会进行类型转换
console.log("10 == 10:", 10 == 10); // true
console.log("'10' == 10:", '10' == 10); // true（类型转换后比较）
console.log("null == undefined:", null == undefined); // true

// 严格相等（===）- 不进行类型转换（推荐使用）
console.log("10 === 10:", 10 === 10); // true
console.log("'10' === 10:", '10' === 10); // false（类型不同）
console.log("null === undefined:", null === undefined); // false

// 宽松不等（!=）
console.log("10 != 3:", 10 != 3); // true

// 严格不等（!==）- 推荐
console.log("10 !== '10':", 10 !== '10'); // true

// 大于（>）
console.log("10 > 3:", a > b); // true

// 小于（<）
console.log("10 < 3:", a < b); // false

// 大于等于（>=）
console.log("10 >= 10:", 10 >= 10); // true

// 小于等于（<=）
console.log("3 <= 10:", 3 <= 10); // true

console.log("\n=== 逻辑运算符（Logical Operators）===");

// 逻辑运算符：用于组合多个条件

// 逻辑与（&&）- 两个都为 true 才返回 true
let x = true, y = false;
console.log("true && false:", x && y); // false
console.log("true && true:", true && true); // true
console.log("false && false:", false && false); // false

// 逻辑或（||）- 有一个为 true 就返回 true
console.log("true || false:", x || y); // true
console.log("false || false:", false || false); // false

// 逻辑非（!）- 取反
console.log("!true:", !x); // false
console.log("!false:", !y); // true

// 短路求值（Short-circuit Evaluation）
// &&：如果第一个值为 false，直接返回 false，不计算第二个值
console.log("false && alert('不会执行'):", false && alert('不会执行')); // false

// ||：如果第一个值为 true，直接返回 true，不计算第二个值
console.log("true || alert('不会执行'):", true || alert('不会执行')); // true

console.log("\n=== 其他运算符 ===");

// 字符串拼接（+）
console.log("'Hello' + ' World':", "Hello" + " World"); // "Hello World"
console.log("'10' + 5:", '10' + 5); // "105"（数字转换为字符串）

// 三元运算符（条件运算符）
// 语法：condition ? value1 : value2
let age = 20;
let canVote = age >= 18 ? "可以投票" : "不能投票";
console.log("年龄 20:", canVote); // 可以投票

// typeof 运算符：返回变量的类型
console.log("typeof 42:", typeof 42); // number
console.log("typeof 'hello':", typeof 'hello'); // string
console.log("typeof true:", typeof true); // boolean

// instanceof 运算符：检查对象是否是某个构造函数的实例
const arr = [1, 2, 3];
console.log("arr instanceof Array:", arr instanceof Array); // true
console.log("arr instanceof Object:", arr instanceof Object); // true

// in 运算符：检查对象是否包含某个属性
const person = { name: "John", age: 30 };
console.log("'name' in person:", "name" in person); // true
console.log("'email' in person:", "email" in person); // false

// 可选链操作符（?.）- ES2020 新增
// 安全地访问嵌套对象属性
const user = { profile: { name: "Alice" } };
console.log("user?.profile?.name:", user?.profile?.name); // "Alice"
console.log("user?.address?.city:", user?.address?.city); // undefined（不会报错）

// 空值合并操作符（??）- ES2020 新增
// 当左侧为 null 或 undefined 时，返回右侧的值
let value = null;
let result = value ?? "默认值";
console.log("null ?? '默认值':", result); // "默认值"

// 与 || 的区别：|| 会对所有假值（0、''、false 等）进行判断
value = 0;
result = value || "默认值";
console.log("0 || '默认值':", result); // "默认值"（0 是假值）

result = value ?? "默认值";
console.log("0 ?? '默认值':", result); // 0（0 不是 null 或 undefined）

/**
 * 运算符优先级（从高到低）：
 * 1. () - 括号（改变优先级）
 * 2. ! - 逻辑非
 * 3. * / % - 乘、除、取模
 * 4. + - - 加、减
 * 5. < <= > >= - 比较
 * 6. == != === !== - 相等比较
 * 7. && - 逻辑与
 * 8. || - 逻辑或
 * 9. ? : - 三元运算符
 * 10. = - 赋值
 *
 * 最佳实践：
 * 1. 不确定优先级时，使用括号明确优先级
 * 2. 始终使用严格相等（===）和严格不等（!==）
 * 3. 使用 && 和 || 的短路特性简化代码
 * 4. 使用可选链（?.）和空值合并（??）处理可能的空值
 */
