// JavaScript 数组方法

const numbers = [1, 2, 3, 4, 5];
const users = [
    { name: "Alice", age: 25, active: true },
    { name: "Bob", age: 30, active: false },
    { name: "Charlie", age: 35, active: true },
    { name: "Diana", age: 28, active: true }
];

// Map: 转换每个元素
const doubled = numbers.map(num => num * 2);
console.log("Doubled:", doubled);

const userNames = users.map(user => user.name);
console.log("User names:", userNames);

const usersWithStatus = users.map(user => ({
    ...user,
    status: user.active ? "Active" : "Inactive"
}));
console.log("Users with status:", usersWithStatus);

// Filter: 过滤满足条件的元素
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("Even numbers:", evenNumbers);

const activeUsers = users.filter(user => user.active);
console.log("Active users:", activeUsers);

const usersOver30 = users.filter(user => user.age > 30);
console.log("Users over 30:", usersOver30);

// Reduce: 归约数组为单个值
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log("Sum:", sum);

const product = numbers.reduce((acc, num) => acc * num, 1);
console.log("Product:", product);

const totalAge = users.reduce((total, user) => total + user.age, 0);
console.log("Total age:", totalAge);

// 链式调用方法
const result = numbers
    .filter(num => num % 2 === 1)
    .map(num => num * 10)
    .reduce((sum, num) => sum + num, 0);
console.log("Chained result:", result);

// Find: 查找第一个匹配的元素
const firstUserOver30 = users.find(user => user.age > 30);
console.log("First user over 30:", firstUserOver30);

// Some: 检查是否有元素满足条件
const hasInactiveUsers = users.some(user => !user.active);
console.log("Has inactive users:", hasInactiveUsers);

// Every: 检查是否所有元素都满足条件
const allAdults = users.every(user => user.age >= 18);
console.log("All adults:", allAdults);

// Sort: 排序数组（修改原数组）
const sortedNumbers = [...numbers].sort((a, b) => b - a);
console.log("Sorted descending:", sortedNumbers);

const sortedUsers = [...users].sort((a, b) => a.age - b.age);
console.log("Users by age:", sortedUsers);

// Slice: 切片（不修改原数组）
const slicedNumbers = numbers.slice(1, 4);
console.log("Sliced numbers:", slicedNumbers);
console.log("Original numbers:", numbers);

// Splice: 剪接（修改原数组）
const splicedNumbers = [...numbers];
splicedNumbers.splice(1, 2, 10, 20);
console.log("Spliced numbers:", splicedNumbers);

// IndexOf: 查找元素索引
console.log("indexOf(3):", numbers.indexOf(3));
console.log("indexOf(10):", numbers.indexOf(10));

// Includes: 检查是否包含元素
console.log("includes(3):", numbers.includes(3));
console.log("includes(10):", numbers.includes(10));

// Join: 将数组转为字符串
const words = ["Hello", "World"];
console.log("Joined with space:", words.join(" "));
console.log("Joined with comma:", words.join(", "));

// Split: 将字符串转为数组
const sentence = "Hello World JavaScript";
console.log("Split by space:", sentence.split(" "));

// Reverse: 反转数组
const reversedNumbers = [...numbers].reverse();
console.log("Reversed numbers:", reversedNumbers);

// Concat: 连接数组
const moreNumbers = [6, 7, 8];
const combinedNumbers = numbers.concat(moreNumbers);
console.log("Combined numbers:", combinedNumbers);

// Flat: 扁平化数组
const nestedNumbers = [1, [2, 3], [4, [5, 6]]];
const flatNumbers = nestedNumbers.flat(2);
console.log("Flat numbers:", flatNumbers);

// FlatMap: 映射并扁平化
const doubledAndFlat = numbers.flatMap(num => [num, num * 2]);
console.log("Doubled and flat:", doubledAndFlat);

// ForEach: 遍历数组
console.log("ForEach iteration:");
numbers.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});
