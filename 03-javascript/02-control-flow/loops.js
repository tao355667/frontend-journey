/**
 * JavaScript Loops
 * 演示 JavaScript 中各种循环语句的用法和区别
 */

console.log("=== for 循环（固定次数循环）===");

// for 循环：适用于知道要循环多少次的情况
// 语法：for (初始化; 条件; 更新) { 循环体 }

console.log("输出 1-5：");
for (let i = 1; i <= 5; i++) {
    console.log(i);
}

// for 循环执行顺序：
// 1. 初始化：let i = 1（只执行一次）
// 2. 检查条件：i <= 5
// 3. 如果条件为 true，执行循环体
// 4. 更新：i++
// 5. 回到步骤 2

console.log("\n倒序输出 5-1：");
for (let i = 5; i >= 1; i--) {
    console.log(i);
}

console.log("\n步长为 2：");
for (let i = 0; i <= 10; i += 2) {
    console.log(i);
}

console.log("\n=== while 循环（条件循环）===");

// while 循环：在条件为 true 时持续执行
// 适用于不确定循环次数的情况

console.log("计数到 3：");
let count = 0;
while (count < 3) {
    console.log(`count: ${count}`);
    count++;
}

// 注意：while 循环可能在条件一开始就为 false，一次都不执行
let notStarted = false;
while (notStarted) {
    console.log("这段代码不会执行");
}

console.log("\n=== do...while 循环（至少执行一次）===");

// do...while 循环：保证循环体至少执行一次
// 语法：do { 循环体 } while (条件);

console.log("至少执行一次：");
let doCount = 0;
do {
    console.log(`doCount: ${doCount}`);
    doCount++;
} while (doCount < 2);

// 即使条件为 false，也会执行一次
let notStarted2 = false;
do {
    console.log("这段代码会执行一次");
} while (notStarted2);

console.log("\n=== for...of 循环（遍历值）===");

// for...of：遍历可迭代对象的值（数组、字符串等）
// 适用于只需要值的情况

const fruits = ["apple", "banana", "orange", "grape"];
console.log("水果列表：");
for (const fruit of fruits) {
    console.log(fruit);
}

// 遍历字符串
const str = "Hello";
console.log("\n字符串字符：");
for (const char of str) {
    console.log(char);
}

// 获取索引和值
console.log("\n带索引的水果列表：");
for (const [index, fruit] of fruits.entries()) {
    console.log(`${index}: ${fruit}`);
}

console.log("\n=== for...in 循环（遍历键）===");

// for...in：遍历对象的键（属性名）
// 注意：不要用于遍历数组（会包含原型链上的属性）

const person = { name: "John", age: 30, city: "New York" };
console.log("对象的键和值：");
for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}

// for...in 遍历数组（不推荐）
const numbers = [10, 20, 30];
console.log("\n数组遍历（不推荐使用 for...in）：");
for (const index in numbers) {
    console.log(`${index}: ${numbers[index]}`);
}

// 使用 for...of 遍历数组（推荐）
console.log("\n数组遍历（推荐使用 for...of）：");
for (const num of numbers) {
    console.log(num);
}

console.log("\n=== break 和 continue ===");

// break：立即跳出循环
// continue：跳过当前迭代，继续下一次

console.log("break 示例（跳到 5 时停止）：");
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        break;
    }
    console.log(i);
}

console.log("\ncontinue 示例（跳过 3）：");
for (let i = 0; i < 5; i++) {
    if (i === 3) {
        continue;
    }
    console.log(i);
}

console.log("\n=== 嵌套循环 ===");

// 嵌套循环：一个循环在另一个循环内部

console.log("九九乘法表：");
for (let i = 1; i <= 9; i++) {
    let row = "";
    for (let j = 1; j <= i; j++) {
        row += `${j}×${i}=${i * j}\t`;
    }
    console.log(row);
}

console.log("\n=== 循环实际应用 ===");

// 示例 1：计算数组中数字的总和
const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sum = 0;

for (const num of numbersArray) {
    sum += num;
}

console.log(`1-10 的总和：${sum}`);

// 示例 2：查找数组中的最大值
const values = [15, 3, 27, 8, 19, 4];
let max = values[0];

for (const val of values) {
    if (val > max) {
        max = val;
    }
}

console.log(`数组中的最大值：${max}`);

// 示例 3：过滤偶数
const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = [];

for (const num of allNumbers) {
    if (num % 2 === 0) {
        evenNumbers.push(num);
    }
}

console.log(`偶数：${evenNumbers.join(", ")}`);

// 示例 4：统计字符出现次数
const text = "hello world";
const charCount = {};

for (const char of text) {
    if (char !== ' ') {
        charCount[char] = (charCount[char] || 0) + 1;
    }
}

console.log("字符统计：");
for (const [char, count] of Object.entries(charCount)) {
    console.log(`'${char}': ${count} 次`);
}

console.log("\n=== 循环控制技巧 ===");

// 示例 5：带标签的 break
console.log("带标签的 break 示例：");

outer: for (let i = 0; i < 3; i++) {
    console.log(`外层循环 i = ${i}`);

    for (let j = 0; j < 3; j++) {
        console.log(`  内层循环 j = ${j}`);

        if (i === 1 && j === 1) {
            console.log("  跳出外层循环！");
            break outer;
        }
    }
}

// 示例 6：限制最大循环次数（避免无限循环）
console.log("\n带安全计数器的循环：");
let counter = 0;
let safetyCount = 0;
const maxIterations = 1000;

while (counter < 10 && safetyCount < maxIterations) {
    counter++;
    safetyCount++;

    console.log(`计数: ${counter}`);
}

if (safetyCount >= maxIterations) {
    console.log("警告：达到最大迭代次数！");
}

/**
 * 循环最佳实践：
 * 1. 选择合适的循环类型：
 *    - for：知道循环次数
 *    - while：不知道循环次数，根据条件决定
 *    - for...of：遍历数组的值
 *    - for...in：遍历对象的键（不推荐用于数组）
 * 2. 避免无限循环：确保循环体内有改变条件的代码
 * 3. 添加安全计数器：对于不确定的循环，限制最大迭代次数
 * 4. 使用 continue 和 break：使循环逻辑更清晰
 * 5. 嵌套循环要注意性能：尽量避免过深的嵌套
 * 6. 优先使用数组方法：forEach、map、filter、reduce 等（后面章节会学）
 */
