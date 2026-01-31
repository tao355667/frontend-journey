# JavaScript 函数声明

// 函数声明式
function greet(name) {
    return `Hello, ${name}!`;
}

// 带默认参数的函数
function greetWithDefault(name = "Guest") {
    return `Hello, ${name}!`;
}

// 多参数函数
function add(a, b) {
    return a + b;
}

// 多参数函数（可选参数）
function greetPerson(name, age, city) {
    if (city) {
        return `${name} is ${age} years old, from ${city}`;
    }
    return `${name} is ${age} years old`;
}

// 返回对象的函数
function createPerson(name, age) {
    return {
        name: name,
        age: age,
        greet: function() {
            return `Hi, I'm ${name}`;
        },
        getAgeInDays: function() {
            return age * 365;
        }
    };
}

// 函数表达式
const multiply = function(a, b) {
    return a * b;
};

// 匿名函数作为参数
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function(num) {
    return num * 2;
});

// 立即执行函数表达式（IIFE）
(function() {
    const message = "This function runs immediately!";
    console.log(message);
})();

// 调用函数
console.log("greet:", greet("Alice"));
console.log("greetWithDefault:", greetWithDefault());
console.log("greetWithDefault:", greetWithDefault("Bob"));
console.log("add:", add(5, 3));
console.log("greetPerson:", greetPerson("Charlie", 25));
console.log("greetPerson:", greetPerson("David", 30, "Beijing"));
console.log("multiply:", multiply(4, 6));
console.log("doubled:", doubled);

const person = createPerson("John", 30);
console.log("person.greet:", person.greet());
console.log("person.getAgeInDays:", person.getAgeInDays());
