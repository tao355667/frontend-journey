/**
 * JavaScript Variables
 * 演示 var、let、const 三种变量声明方式的区别和使用场景
 */

// var - 函数作用域，可以重复声明（不推荐使用）
// var 存在变量提升，可能在声明前就能使用
var name = "John";
var name = "Jane"; // 可以重复声明，但会覆盖之前的值

// let - 块级作用域，不能重复声明，可以重新赋值（推荐使用）
// let 是 ES6 引入的，解决了 var 的很多问题
let age = 25;
age = 26; // 可以重新赋值
// let age = 30; // 报错：SyntaxError: Identifier 'age' has already been declared

// const - 块级作用域，不能重复声明，不能重新赋值（推荐用于常量）
// 声明时必须初始化，否则会报错
const PI = 3.14159;
// PI = 3.14; // 报错：TypeError: Assignment to constant variable.

// 注意：const 声明的对象可以修改其属性
const person = { name: "Alice", age: 30 };
person.age = 31; // 可以修改对象的属性
// person = { name: "Bob" }; // 报错：不能重新赋值

console.log("Name:", name); // 输出: Jane（被覆盖了）
console.log("Age:", age); // 输出: 26
console.log("PI:", PI); // 输出: 3.14159
console.log("Person:", person); // 输出: { name: 'Alice', age: 31 }

/**
 * 最佳实践：
 * 1. 优先使用 const - 如果变量的值不会改变
 * 2. 其次使用 let - 只有需要重新赋值时才使用
 * 3. 避免使用 var - var 存在作用域问题，容易导致 bug
 */
