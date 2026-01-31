/**
 * 流程控制练习题答案
 * 包含基础、进阶、挑战练习的参考实现
 */

console.log("=== 基础练习 ===");

// 基础练习 1：星期判断
console.log("\n基础练习 1：星期判断");
function getWeekdayName(dayNumber) {
    switch (dayNumber) {
        case 1:
            return "星期一";
        case 2:
            return "星期二";
        case 3:
            return "星期三";
        case 4:
            return "星期四";
        case 5:
            return "星期五";
        case 6:
            return "星期六";
        case 7:
            return "星期日";
        default:
            return "无效的日期";
    }
}

for (let i = 0; i <= 8; i++) {
    console.log(`数字 ${i}: ${getWeekdayName(i)}`);
}

// 基础练习 2：数字求和
console.log("\n基础练习 2：数字求和");
let sum = 0;
for (let i = 1; i <= 100; i++) {
    sum += i;
}
console.log("1 到 100 的和:", sum);

// 更高效的求和公式：n(n+1)/2
const n = 100;
const sumFormula = n * (n + 1) / 2;
console.log("使用公式计算:", sumFormula);

// 基础练习 3：偶数输出
console.log("\n基础练习 3：偶数输出");
console.log("1 到 20 之间的偶数:");
for (let i = 1; i <= 20; i++) {
    if (i % 2 === 0) {
        console.log(i);
    }
}

// 使用 while 循环实现
console.log("\n使用 while 循环输出偶数:");
let evenNum = 2;
while (evenNum <= 20) {
    console.log(evenNum);
    evenNum += 2;
}

console.log("\n=== 进阶练习 ===");

// 进阶练习 1：计算阶乘
console.log("\n进阶练习 1：计算阶乘");
function factorial(n) {
    if (n < 0) {
        return "负数没有阶乘";
    }
    if (n === 0 || n === 1) {
        return 1;
    }

    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

for (let i = 0; i <= 10; i++) {
    console.log(`${i}! = ${factorial(i)}`);
}

// 使用递归实现阶乘
function factorialRecursive(n) {
    if (n < 0) {
        return "负数没有阶乘";
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorialRecursive(n - 1);
}

console.log("\n使用递归计算阶乘:");
console.log("5! =", factorialRecursive(5));

// 进阶练习 2：九九乘法表
console.log("\n进阶练习 2：九九乘法表");
function multiplicationTable() {
    for (let i = 1; i <= 9; i++) {
        let row = "";
        for (let j = 1; j <= i; j++) {
            row += `${j}×${i}=${i * j}\t`;
        }
        console.log(row);
    }
}

multiplicationTable();

// 完整的九九乘法表（所有格子）
console.log("\n完整的九九乘法表:");
function fullMultiplicationTable() {
    for (let i = 1; i <= 9; i++) {
        let row = "";
        for (let j = 1; j <= 9; j++) {
            const product = i * j;
            row += `${j}×${i}=${product}\t`;
        }
        console.log(row);
    }
}

fullMultiplicationTable();

// 进阶练习 3：斐波那契数列
console.log("\n进阶练习 3：斐波那契数列");
function fibonacci(count) {
    if (count <= 0) return [];

    const fib = [1, 1];

    for (let i = 2; i < count; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }

    return fib.slice(0, count);
}

const fibSequence = fibonacci(10);
console.log("前 10 个斐波那契数:", fibSequence.join(", "));

// 使用 while 循环实现
function fibonacciWhile(count) {
    if (count <= 0) return [];
    if (count === 1) return [1];

    const fib = [1, 1];
    let i = 2;

    while (i < count) {
        fib[i] = fib[i - 1] + fib[i - 2];
        i++;
    }

    return fib;
}

console.log("使用 while 实现:", fibonacciWhile(10).join(", "));

console.log("\n=== 挑战练习 ===");

// 挑战练习 1：水仙花数
console.log("\n挑战练习 1：水仙花数（三位数）");
function findNarcissisticNumbers() {
    const narcissisticNumbers = [];

    for (let num = 100; num <= 999; num++) {
        const hundreds = Math.floor(num / 100);
        const tens = Math.floor((num % 100) / 10);
        const ones = num % 10;

        const sumOfCubes = Math.pow(hundreds, 3) + Math.pow(tens, 3) + Math.pow(ones, 3);

        if (sumOfCubes === num) {
            narcissisticNumbers.push(num);
        }
    }

    return narcissisticNumbers;
}

const narcissisticNumbers = findNarcissisticNumbers();
console.log("所有的三位水仙花数:", narcissisticNumbers);
narcissisticNumbers.forEach(num => {
    const hundreds = Math.floor(num / 100);
    const tens = Math.floor((num % 100) / 10);
    const ones = num % 10;
    console.log(`${num} = ${hundreds}³ + ${tens}³ + ${ones}³ = ${Math.pow(hundreds, 3) + Math.pow(tens, 3) + Math.pow(ones, 3)}`);
});

// 挑战练习 2：素数判断
console.log("\n挑战练习 2：素数判断");
function isPrime(n) {
    if (n <= 1) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;

    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}

// 测试素数判断
console.log("测试素数判断:");
console.log("2 是素数:", isPrime(2));
console.log("3 是素数:", isPrime(3));
console.log("4 是素数:", isPrime(4));
console.log("17 是素数:", isPrime(17));
console.log("18 是素数:", isPrime(18));
console.log("997 是素数:", isPrime(997));

// 找出 1-100 之间的所有素数
console.log("\n1-100 之间的素数:");
const primes = [];
for (let i = 1; i <= 100; i++) {
    if (isPrime(i)) {
        primes.push(i);
    }
}
console.log(primes.join(", "));

// 挑战练习 3：猜数字游戏
console.log("\n挑战练习 3：猜数字游戏");
function guessNumberGame() {
    const target = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    const maxAttempts = 10;

    console.log("=== 猜数字游戏 ===");
    console.log("我已经想好了一个 1-100 之间的数字");
    console.log(`你有 ${maxAttempts} 次机会来猜这个数字`);
    console.log(`答案：${target}（测试用）`);

    // 模拟玩家猜测
    const guesses = [50, 75, 87, 93, 96, 95]; // 示例猜测

    for (let i = 0; i < guesses.length; i++) {
        attempts++;
        const guess = guesses[i];
        console.log(`\n第 ${attempts} 次猜测: ${guess}`);

        if (guess === target) {
            console.log(`恭喜！你猜对了！答案就是 ${target}`);
            console.log(`你用了 ${attempts} 次猜对`);
            return attempts;
        } else if (guess < target) {
            console.log("太小了！");
        } else {
            console.log("太大了！");
        }

        if (attempts >= maxAttempts) {
            console.log(`\n游戏结束！你已经用完了 ${maxAttempts} 次机会`);
            console.log(`正确答案是: ${target}`);
            return -1;
        }
    }
}

guessNumberGame();

// 交互式版本（在浏览器中使用）
console.log("\n交互式版本（在浏览器中运行）:");
console.log(`
// 在浏览器控制台中运行以下代码：

function interactiveGuessNumberGame() {
    const target = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    const maxAttempts = 10;

    console.log("=== 猜数字游戏 ===");
    console.log("我已经想好了一个 1-100 之间的数字");
    console.log(\`你有 \${maxAttempts} 次机会来猜这个数字\`);

    function askForGuess() {
        const guess = prompt(\`第 \${attempts + 1} 次猜测，请输入 1-100 之间的数字:\`);
        const numGuess = parseInt(guess);

        if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
            alert("请输入有效的 1-100 之间的数字！");
            return askForGuess();
        }

        attempts++;

        if (numGuess === target) {
            alert(\`恭喜！你猜对了！答案就是 \${target}\`);
            alert(\`你用了 \${attempts} 次猜对\`);
        } else if (numGuess < target) {
            alert("太小了！");
        } else {
            alert("太大了！");
        }

        if (attempts >= maxAttempts && numGuess !== target) {
            alert(\`游戏结束！你已经用完了 \${maxAttempts} 次机会\`);
            alert(\`正确答案是: \${target}\`);
        } else if (numGuess !== target) {
            askForGuess();
        }
    }

    askForGuess();
}

interactiveGuessNumberGame();
`);

console.log("\n=== 额外练习：数字反转 ===");

// 额外练习：数字反转
function reverseNumber(num) {
    let reversed = 0;
    const original = num;

    while (num !== 0) {
        reversed = reversed * 10 + (num % 10);
        num = Math.floor(num / 10);
    }

    return reversed;
}

console.log("数字反转:");
console.log("12345 反转:", reverseNumber(12345));
console.log("100 反转:", reverseNumber(100));

console.log("\n=== 额外练习：回文数判断 ===");

// 额外练习：回文数判断
function isPalindrome(num) {
    return num === reverseNumber(num);
}

console.log("回文数判断:");
console.log("121 是回文数:", isPalindrome(121));
console.log("123 是回文数:", isPalindrome(123));
console.log("1221 是回文数:", isPalindrome(1221));

console.log("\n100-1000 之间的回文数:");
for (let i = 100; i < 1000; i++) {
    if (isPalindrome(i)) {
        console.log(i);
    }
}

/**
 * 总结：
 * 本练习涵盖了流程控制的所有知识点：
 * 1. switch 语句：多值条件判断
 * 2. for 循环：固定次数循环
 * 3. while 循环：条件循环
 * 4. do...while 循环：至少执行一次
 * 5. for...of：遍历数组的值
 * 6. for...in：遍历对象的键
 * 7. break 和 continue：控制循环流程
 * 8. 嵌套循环：处理复杂逻辑
 *
 * 通过这些练习，你应该能够熟练运用流程控制语句解决实际问题。
 */
