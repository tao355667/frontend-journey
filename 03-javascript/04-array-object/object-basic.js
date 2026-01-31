// JavaScript 对象基础

// 创建对象
const person = {
    name: "John Doe",
    age: 30,
    city: "New York",
    isStudent: false
};

// 构造函数方式
const car = new Object();
car.make = "Toyota";
car.model = "Camry";
car.year = 2022;

// 访问属性（点表示法）
console.log("person.name:", person.name);

// 访问属性（方括号表示法）
console.log("person['age']:", person["age"]);

// 修改属性
person.age = 31;
person["city"] = "Boston";
console.log("Modified person:", person);

// 添加新属性
person.email = "john@example.com";
person["phone"] = "555-1234";
console.log("Person with new properties:", person);

// 删除属性
delete person.isStudent;
console.log("Person after delete:", person);

// 对象方法
const calculator = {
    add: function(a, b) {
        return a + b;
    },
    subtract: (a, b) => a - b,
    multiply(a, b) {
        return a * b;
    }
};

console.log("calculator.add(5, 3):", calculator.add(5, 3));
console.log("calculator.subtract(10, 4):", calculator.subtract(10, 4));
console.log("calculator.multiply(7, 6):", calculator.multiply(7, 6));

// Object.keys: 获取所有键
console.log("Object.keys(person):", Object.keys(person));

// Object.values: 获取所有值
console.log("Object.values(person):", Object.values(person));

// Object.entries: 获取所有键值对
console.log("Object.entries(person):", Object.entries(person));

// 检查属性是否存在
console.log("'name' in person:", "name" in person);
console.log("person.hasOwnProperty('age'):", person.hasOwnProperty("age"));
console.log("person.hasOwnProperty('toString'):", person.hasOwnProperty("toString"));

// 对象解构
const { name, age, city } = person;
console.log("Destructured:", name, age, city);

// 解构赋值默认值
const { country = "USA" } = person;
console.log("Country with default:", country);

// 展开运算符
const personWithJob = { ...person, job: "Developer" };
console.log("Person with job:", personWithJob);

// Object.assign
const updatedPerson = Object.assign({}, person, { age: 32, status: "active" });
console.log("Updated person:", updatedPerson);

// 嵌套对象
const employee = {
    id: 1001,
    personal: {
        name: "Alice",
        contact: {
            email: "alice@company.com",
            phone: "555-9876"
        }
    },
    department: "Engineering"
};

// 访问嵌套属性
console.log("employee.personal.contact.email:", employee.personal.contact.email);

// 可选链操作符（安全访问嵌套属性）
console.log("employee?.personal?.contact?.address:", employee?.personal?.contact?.address);

// this 关键字在对象中的使用
const user = {
    name: "Bob",
    age: 25,
    greet() {
        return `Hello, I'm ${this.name} and I'm ${this.age} years old`;
    },
    celebrateBirthday() {
        this.age++;
        return `Happy birthday! Now I'm ${this.age}`;
    }
};

console.log("user.greet():", user.greet());
console.log("user.celebrateBirthday():", user.celebrateBirthday());
console.log("user after birthday:", user);

// 冻结对象（防止修改）
const frozenObj = { a: 1, b: 2 };
Object.freeze(frozenObj);
frozenObj.a = 3;
console.log("Frozen object:", frozenObj.a);

// 密封对象（防止添加和删除，但允许修改）
const sealedObj = { a: 1, b: 2 };
Object.seal(sealedObj);
sealedObj.a = 3;
sealedObj.c = 3;
console.log("Sealed object:", sealedObj);

// 获取对象属性描述符
const descriptor = Object.getOwnPropertyDescriptor(person, "name");
console.log("Property descriptor:", descriptor);

// 定义对象属性
const obj = {};
Object.defineProperty(obj, "id", {
    value: 123,
    writable: false,
    enumerable: true,
    configurable: true
});
console.log("Defined property:", obj.id);
obj.id = 456;
console.log("After modification attempt:", obj.id);

// 对象方法绑定
const obj2 = {
    name: "Charlie",
    greet: function() {
        console.log("Inside greet:", this.name);
    }
};

const greetFn = obj2.greet;
greetFn();

const boundGreet = obj2.greet.bind(obj2);
boundGreet();
