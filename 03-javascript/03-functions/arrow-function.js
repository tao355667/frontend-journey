// JavaScript 箭头函数

// 简单的箭头函数
const sayHello = () => {
    console.log("Hello!");
};

// 单参数箭头函数（可以省略括号）
const greet = name => {
    console.log(`Hello, ${name}!`);
};

// 单行箭头函数（隐式返回）
const add = (a, b) => a + b;

// 单参数单行箭头函数（可省略括号）
const square = x => x * x;

// 多参数箭头函数（需要括号）
const multiply = (a, b, c) => a * b * c;

// 多行箭头函数（需要大括号和 return）
const calculate = (a, b, operation) => {
    switch (operation) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        default:
            return 0;
    }
};

// 箭头函数与数组方法
const numbers = [1, 2, 3, 4, 5];

// map：转换数组
const doubled = numbers.map(num => num * 2);
console.log("doubled:", doubled);

// filter：过滤数组
const evens = numbers.filter(n => n % 2 === 0);
console.log("evens:", evens);

// reduce：归约数组
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("sum:", sum);

// find：查找元素
const found = numbers.find(n => n > 3);
console.log("found:", found);

// every：检查所有元素
const allPositive = numbers.every(n => n > 0);
console.log("allPositive:", allPositive);

// some：检查是否有元素满足条件
const hasEven = numbers.some(n => n % 2 === 0);
console.log("hasEven:", hasEven);

// 箭头函数与 this
const person = {
    name: "John",
    age: 30,
    // 传统函数 - this 指向对象
    greetRegular: function() {
        console.log(`Regular: Hi, I'm ${this.name}`);
    },
    // 箭头函数 - this 继承外层作用域
    greetArrow: () => {
        console.log(`Arrow: Hi, I'm ${this.name}`); // this.name 是 undefined
    }
};

person.greetRegular();
person.greetArrow();

// 使用箭头函数解决 this 问题（在回调中）
const timer = {
    count: 0,
    start: function() {
        setInterval(() => {
            this.count++;
            console.log("timer.count:", this.count);
        }, 1000);
    }
};

// 注意：以下代码需要在浏览器环境中运行
// timer.start();

// 箭头函数作为对象方法的问题
const calculator = {
    value: 0,
    add: (num) => {
        this.value += num; // this 不指向 calculator
        return this.value;
    }
};

console.log("calculator.add(5):", calculator.add(5)); // NaN

// 正确的做法：使用方法简写
const calculator2 = {
    value: 0,
    add(num) {
        this.value += num;
        return this.value;
    }
};

console.log("calculator2.add(5):", calculator2.add(5)); // 5
console.log("calculator2.add(3):", calculator2.add(3)); // 8

// 箭头函数不能用作构造函数
const Person = (name) => {
    this.name = name;
};

// const person = new Person("John"); // TypeError: Person is not a constructor

// 箭头函数没有 arguments 对象
const traditionalArgs = function() {
    console.log("traditionalArgs arguments:", arguments);
};

traditionalArgs(1, 2, 3);

// const arrowArgs = () => {
//     console.log("arrowArgs arguments:", arguments);
// };

// arrowArgs(1, 2, 3); // ReferenceError: arguments is not defined

// 使用剩余参数代替
const restParams = (...args) => {
    console.log("restParams args:", args);
};

restParams(1, 2, 3);

// 调用示例
console.log("sayHello:");
sayHello();

console.log("greet:");
greet("World");

console.log("add:", add(5, 3));
console.log("square:", square(4));
console.log("multiply:", multiply(2, 3, 4));
console.log("calculate add:", calculate(10, 5, 'add'));
console.log("calculate multiply:", calculate(10, 5, 'multiply'));
