// ES6+ 展开运算符示例

// 数组展开运算符
const originalArray = [1, 2, 3];
const copiedArray = [...originalArray];
console.log('原数组:', originalArray);
console.log('副本数组:', copiedArray);

// 验证是深拷贝
copiedArray.push(4);
console.log('修改副本后:');
console.log('原数组:', originalArray);
console.log('副本数组:', copiedArray);

// 连接数组
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const concatenated = [...array1, ...array2];
console.log('连接数组:', concatenated);

// 在数组中添加元素
const numbers = [1, 2, 3];
const withNew = [0, ...numbers, 4];
console.log('添加元素:', withNew);

// 对象展开运算符
const object1 = { name: 'John', age: 30 };
const object2 = { city: 'New York', country: 'USA' };
const merged = { ...object1, ...object2 };
console.log('合并对象:', merged);

// 复制对象
const originalObject = { name: 'John', age: 30 };
const copiedObject = { ...originalObject };
console.log('原对象:', originalObject);
console.log('副本对象:', copiedObject);

// 验证是浅拷贝
copiedObject.age = 31;
console.log('修改副本后:');
console.log('原对象:', originalObject);
console.log('副本对象:', copiedObject);

// 覆盖属性（后面的覆盖前面的）
const base = { name: 'John', age: 30, city: 'New York' };
const updated = { ...base, age: 31 };
console.log('更新属性:', updated);

// 添加新属性
const person = { name: 'John' };
const withCity = { ...person, city: 'Beijing' };
console.log('添加属性:', withCity);

// 函数参数中的展开
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log('sum(1, 2, 3, 4):', sum(1, 2, 3, 4));
console.log('sum(1, 2):', sum(1, 2));

// 函数调用时展开
const nums = [1, 2, 3, 4, 5];
const max = Math.max(...nums);
const min = Math.min(...nums);
console.log('最大值:', max);
console.log('最小值:', min);

// 条件对象属性
const isActive = true;
const hasAdmin = false;
const userStatus = {
    name: 'John',
    ...(isActive && { status: 'active' }),
    ...(hasAdmin && { role: 'admin' })
};
console.log('条件属性:', userStatus);

// 数组去重
const duplicateArray = [1, 2, 2, 3, 3, 4, 4, 5];
const uniqueArray = [...new Set(duplicateArray)];
console.log('去重:', uniqueArray);

// 字符串转数组
const str = 'Hello';
const chars = [...str];
console.log('字符串转数组:', chars);

// 合并配置对象
const defaultConfig = {
    timeout: 5000,
    retries: 3,
    ssl: false
};

const userConfig = {
    timeout: 3000,
    ssl: true
};

const finalConfig = { ...defaultConfig, ...userConfig };
console.log('合并配置:', finalConfig);

// 展开在 React 中的常见用法
const props = { name: 'John', age: 30, city: 'Beijing' };
const newProps = { ...props, age: 31 };
console.log('React 风格:', newProps);

// 数组展开用于创建新数组（避免修改原数组）
const original = [1, 2, 3];
const newArray = [...original, 4];
console.log('原数组:', original);
console.log('新数组:', newArray);

// 对象展开用于创建新对象（避免修改原对象）
const originalObj = { a: 1, b: 2 };
const newObj = { ...originalObj, c: 3 };
console.log('原对象:', originalObj);
console.log('新对象:', newObj);

// 展开运算符与 rest 参数的区别
function example(...rest) {
    console.log('rest 参数:', rest);
}

example(1, 2, 3, 4);

// 展开多个对象
const objA = { a: 1 };
const objB = { b: 2 };
const objC = { c: 3 };
const mergedAll = { ...objA, ...objB, ...objC };
console.log('合并多个对象:', mergedAll);

// 展开多个数组
const arrA = [1, 2];
const arrB = [3, 4];
const arrC = [5, 6];
const mergedArr = [...arrA, ...arrB, ...arrC];
console.log('合并多个数组:', mergedArr);

// 在对象字面量中使用展开
const baseUser = {
    id: 1,
    name: 'John',
    email: 'john@example.com'
};

const updatedUser = {
    ...baseUser,
    updatedAt: new Date().toISOString()
};

console.log('更新用户:', updatedUser);

// 数组展开用于解构赋值
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log('第一个:', first);
console.log('剩余:', rest);

// 对象展开用于解构赋值
const { a, ...restObj } = { a: 1, b: 2, c: 3 };
console.log('a:', a);
console.log('剩余对象:', restObj);
