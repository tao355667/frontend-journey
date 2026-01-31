// hello.ts - 第一个 TypeScript 程序

// 定义一个字符串变量，指定类型为 string
const message: string = "Hello, TypeScript!";

// 定义一个数字变量
const year: number = 2024;

// 在控制台输出信息
console.log(`${message} Welcome to the year ${year}!`);

// 定义一个函数，参数和返回值都有类型注解
function greet(name: string): string {
  return `Welcome, ${name}!`;
}

// 调用函数并输出结果
const greeting: string = greet("Developer");
console.log(greeting);

// 数组类型示例
const numbers: number[] = [1, 2, 3, 4, 5];
console.log("Numbers array:", numbers);

// 对象类型示例
interface Person {
  name: string;
  age: number;
  city: string;
}

const person: Person = {
  name: "Alice",
  age: 25,
  city: "Beijing"
};

console.log(`Person info: ${person.name}, ${person.age} years old, from ${person.city}`);
