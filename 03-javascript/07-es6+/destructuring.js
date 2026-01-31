// ES6+ 解构赋值示例

// 数组解构
const fruits = ['apple', 'banana', 'orange', 'grape'];

// 基本数组解构
const [first, second, third] = fruits;
console.log('基本解构:', first, second, third);

// 跳过元素
const [firstFruit, , thirdFruit] = fruits;
console.log('跳过元素:', firstFruit, thirdFruit);

// 使用剩余运算符
const [fruit1, fruit2, ...restOfFruits] = fruits;
console.log('剩余元素:', fruit1, fruit2);
console.log('restOfFruits:', restOfFruits);

// 默认值
const colors = ['red', 'green'];
const [color1, color2, color3 = 'blue'] = colors;
console.log('默认值:', color1, color2, color3);

// 交换变量
let a = 10, b = 20;
[a, b] = [b, a];
console.log('交换后:', a, b);

// 对象解构
const person = {
    name: 'John Doe',
    age: 30,
    city: 'New York',
    country: 'USA',
    email: 'john@example.com'
};

// 基本对象解构
const { name, age, city } = person;
console.log('基本解构:', name, age, city);

// 解构时重命名
const { name: fullName, age: years, city: location } = person;
console.log('重命名:', fullName, years, location);

// 默认值
const { name: personName, zipCode = '10001' } = person;
console.log('默认值:', personName, zipCode);

// 嵌套对象解构
const user = {
    id: 1,
    profile: {
        firstName: 'Jane',
        lastName: 'Smith',
        address: {
            street: '123 Main St',
            city: 'Boston',
            state: 'MA'
        }
    },
    settings: {
        theme: 'dark',
        notifications: true
    }
};

const { 
    profile: { 
        firstName, 
        lastName, 
        address: { city: userCity } 
    },
    settings: { theme }
} = user;

console.log('嵌套解构:', firstName, lastName, userCity, theme);

// 函数参数解构
function displayUser({ name, age, city = 'Unknown' }) {
    console.log(`${name} 今年 ${age} 岁，住在 ${city}`);
}

displayUser(person);
displayUser({ name: 'Alice', age: 25 });

// 对象数组解构
const users = [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'user' },
    { id: 3, name: 'Charlie', role: 'user' }
];

const [, { name: secondUserName, role }, { name: thirdUserName }] = users;
console.log('数组对象解构:', secondUserName, role, thirdUserName);

// 循环中的解构
for (const { name, role } of users) {
    console.log(`${name} 是 ${role}`);
}

// 解构函数返回值
function getUserInfo() {
    return {
        id: 42,
        username: 'johndoe',
        email: 'john@example.com',
        isActive: true
    };
}

const { username, email, isActive } = getUserInfo();
console.log('解构返回值:', username, email, isActive);

// 计算属性名解构
const key = 'name';
const { [key]: userName } = person;
console.log('计算属性名:', userName);

// 实际示例

// 1. 处理坐标
const coordinates = { x: 10, y: 20, z: 30 };
const { x, y, z } = coordinates;
console.log(`坐标 (${x}, ${y}, ${z})`);

// 2. 提取 API 响应数据
const apiResponse = {
    data: {
        users: [
            { id: 1, name: '用户 1' },
            { id: 2, name: '用户 2' }
        ]
    },
    meta: {
        total: 2,
        page: 1
    }
};

const { 
    data: { users: apiUsers }, 
    meta: { total } 
} = apiResponse;

console.log(`找到 ${total} 个用户:`, apiUsers);

// 3. 配置对象解构
function createServer(config = {}) {
    const {
        host = 'localhost',
        port = 3000,
        ssl = false,
        timeout = 5000
    } = config;
    
    console.log(`服务器: ${host}:${port}, SSL: ${ssl}, 超时: ${timeout}ms`);
}

createServer({ port: 8080, ssl: true });
createServer();

// 4. React 风格的 props 解构
const props = {
    title: 'Hello World',
    author: 'John Doe',
    date: '2023-01-01',
    content: '这是内容...'
};

function BlogPost({ title, author, date }) {
    console.log(`${title} 作者 ${author} 于 ${date}`);
}

BlogPost(props);

// 5. 多重赋值解构
const numbers = [1, 2, 3, 4, 5];
const [firstNum, ...middleNumbers] = numbers;
const lastNum = middleNumbers.pop();
console.log('首尾元素:', firstNum, lastNum);
