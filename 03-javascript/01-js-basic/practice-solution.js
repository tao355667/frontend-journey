/**
 * JavaScript 基础练习题答案
 * 包含基础、进阶、挑战练习的参考实现
 */

console.log("=== 基础练习 ===");

// 基础练习 1：声明变量
console.log("\n基础练习 1：声明变量");
const name = "张三";
let age = 25;
const isStudent = true;
const PI = 3.14159;

console.log("姓名:", name);
console.log("年龄:", age);
console.log("是否是学生:", isStudent);
console.log("圆周率:", PI);

// 基础练习 2：类型检查
console.log("\n基础练习 2：类型检查");
function checkType(value) {
    return typeof value;
}

console.log("checkType(42):", checkType(42)); // number
console.log("checkType('hello'):", checkType('hello')); // string
console.log("checkType(true):", checkType(true)); // boolean
console.log("checkType(null):", checkType(null)); // object（注意这是 JavaScript 的 bug）
console.log("checkType(undefined):", checkType(undefined)); // undefined
console.log("checkType([1, 2, 3]):", checkType([1, 2, 3])); // object
console.log("checkType({a: 1}):", checkType({ a: 1 })); // object

// 更精确的类型检查
function checkTypeExact(value) {
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    return typeof value;
}

console.log("\n精确的类型检查:");
console.log("checkTypeExact(null):", checkTypeExact(null)); // null
console.log("checkTypeExact([1, 2, 3]):", checkTypeExact([1, 2, 3])); // array

// 基础练习 3：温度转换
console.log("\n基础练习 3：温度转换");
function celsiusToFahrenheit(celsius) {
    const fahrenheit = (celsius * 9 / 5) + 32;
    return fahrenheit;
}

function fahrenheitToCelsius(fahrenheit) {
    const celsius = (fahrenheit - 32) * 5 / 9;
    return celsius;
}

const tempC = 25;
const tempF = celsiusToFahrenheit(tempC);
console.log(`${tempC}°C = ${tempF.toFixed(1)}°F`);

const tempF2 = 77;
const tempC2 = fahrenheitToCelsius(tempF2);
console.log(`${tempF2}°F = ${tempC2.toFixed(1)}°C`);

console.log("\n=== 进阶练习 ===");

// 进阶练习 1：成绩评级
console.log("\n进阶练习 1：成绩评级");
function getGrade(score) {
    if (score < 0 || score > 100) {
        return "无效分数";
    }

    if (score >= 90) {
        return "A";
    } else if (score >= 80) {
        return "B";
    } else if (score >= 70) {
        return "C";
    } else if (score >= 60) {
        return "D";
    } else {
        return "F";
    }
}

console.log("getGrade(95):", getGrade(95)); // A
console.log("getGrade(85):", getGrade(85)); // B
console.log("getGrade(75):", getGrade(75)); // C
console.log("getGrade(65):", getGrade(65)); // D
console.log("getGrade(55):", getGrade(55)); // F
console.log("getGrade(105):", getGrade(105)); // 无效分数

// 进阶练习 2：闰年判断
console.log("\n进阶练习 2：闰年判断");
function isLeapYear(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return true;
    }
    return false;
}

// 更简洁的写法
function isLeapYearConcise(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

console.log("isLeapYear(2024):", isLeapYear(2024)); // true
console.log("isLeapYear(2023):", isLeapYear(2023)); // false
console.log("isLeapYear(2000):", isLeapYear(2000)); // true（能被 400 整除）
console.log("isLeapYear(1900):", isLeapYear(1900)); // false（能被 100 整除但不能被 400 整除）

// 进阶练习 3：BMI 计算
console.log("\n进阶练习 3：BMI 计算");
function calculateBMI(height, weight) {
    const bmi = weight / (height * height);
    return {
        bmi: bmi.toFixed(2),
        status: getBMIStatus(bmi)
    };
}

function getBMIStatus(bmi) {
    if (bmi < 18.5) {
        return "偏瘦";
    } else if (bmi < 24) {
        return "正常";
    } else if (bmi < 28) {
        return "超重";
    } else {
        return "肥胖";
    }
}

const result1 = calculateBMI(1.75, 70);
console.log(`身高 1.75m, 体重 70kg: BMI=${result1.bmi}, 状态=${result1.status}`);

const result2 = calculateBMI(1.60, 45);
console.log(`身高 1.60m, 体重 45kg: BMI=${result2.bmi}, 状态=${result2.status}`);

const result3 = calculateBMI(1.70, 85);
console.log(`身高 1.70m, 体重 85kg: BMI=${result3.bmi}, 状态=${result3.status}`);

console.log("\n=== 挑战练习 ===");

// 挑战练习 1：密码强度检测
console.log("\n挑战练习 1：密码强度检测");
function checkPasswordStrength(password) {
    if (!password || password.length < 6) {
        return "弱（少于 6 位）";
    }

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasOnlyLetter = /^[a-zA-Z]+$/.test(password);

    if (hasOnlyLetter) {
        return "弱（只包含字母）";
    }

    if (password.length >= 8 && hasLetter && hasNumber && hasSpecial) {
        return "强";
    }

    if (hasLetter && hasNumber || hasLetter && hasSpecial || hasNumber && hasSpecial) {
        return "中";
    }

    return "弱";
}

console.log("checkPasswordStrength('abc'):", checkPasswordStrength("abc")); // 弱（少于 6 位）
console.log("checkPasswordStrength('abcdef'):", checkPasswordStrength("abcdef")); // 弱（只包含字母）
console.log("checkPasswordStrength('abc123'):", checkPasswordStrength("abc123")); // 中
console.log("checkPasswordStrength('abc123!'):", checkPasswordStrength("abc123!")); // 中
console.log("checkPasswordStrength('Abc123!@'):", checkPasswordStrength("Abc123!@")); // 强

// 挑战练习 2：简单的计算器
console.log("\n挑战练习 2：简单的计算器");
function calculate(a, b, operator) {
    const validOperators = ['+', '-', '*', '/'];

    if (!validOperators.includes(operator)) {
        return "无效的运算符";
    }

    if (operator === '/' && b === 0) {
        return "错误：除数不能为 0";
    }

    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return "无效的运算符";
    }
}

console.log("calculate(10, 5, '+'):", calculate(10, 5, '+')); // 15
console.log("calculate(10, 5, '-'):", calculate(10, 5, '-')); // 5
console.log("calculate(10, 5, '*'):", calculate(10, 5, '*')); // 50
console.log("calculate(10, 5, '/'):", calculate(10, 5, '/')); // 2
console.log("calculate(10, 0, '/'):", calculate(10, 0, '/')); // 错误：除数不能为 0
console.log("calculate(10, 5, '%'):", calculate(10, 5, '%')); // 无效的运算符

// 挑战练习 3：数字转换（数字转中文）
console.log("\n挑战练习 3：数字转中文");
function numberToChinese(num) {
    const chineseNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const chineseUnits = ['', '十', '百', '千', '万', '十万', '百万', '千万'];

    if (num === 0) {
        return '零';
    }

    if (num < 0) {
        return '负' + numberToChinese(-num);
    }

    let result = '';
    let str = num.toString();
    const len = str.length;

    for (let i = 0; i < len; i++) {
        const digit = parseInt(str[i]);
        const unit = len - i - 1;

        if (digit !== 0) {
            result += chineseNums[digit] + (unit > 0 ? chineseUnits[unit] : '');
        } else {
            if (result[result.length - 1] !== '零' && unit > 0) {
                result += '零';
            }
        }
    }

    // 处理末尾的零
    result = result.replace(/零+$/, '');

    // 处理"一十"为"十"
    if (result.startsWith('一十')) {
        result = result.substring(1);
    }

    return result;
}

console.log("numberToChinese(0):", numberToChinese(0)); // 零
console.log("numberToChinese(5):", numberToChinese(5)); // 五
console.log("numberToChinese(10):", numberToChinese(10)); // 十
console.log("numberToChinese(15):", numberToChinese(15)); // 十五
console.log("numberToChinese(100):", numberToChinese(100)); // 一百
console.log("numberToChinese(123):", numberToChinese(123)); // 一百二十三
console.log("numberToChinese(1000):", numberToChinese(1000)); // 一千
console.log("numberToChinese(1234):", numberToChinese(1234)); // 一千二百三十四

// 简化版本：只处理 0-999 的数字
function numberToChineseSimple(num) {
    if (num < 0 || num > 999) {
        return "超出范围（仅支持 0-999）";
    }

    const chineseNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const units = ['', '十', '百'];

    if (num === 0) {
        return '零';
    }

    let result = '';
    let temp = num;

    for (let i = 0; temp > 0; i++) {
        const digit = temp % 10;
        if (digit !== 0) {
            result = chineseNums[digit] + units[i] + result;
        }
        temp = Math.floor(temp / 10);
    }

    if (result.startsWith('一十')) {
        result = result.substring(1);
    }

    return result;
}

console.log("\n简化版本（0-999）：");
console.log("numberToChineseSimple(5):", numberToChineseSimple(5)); // 五
console.log("numberToChineseSimple(15):", numberToChineseSimple(15)); // 十五
console.log("numberToChineseSimple(123):", numberToChineseSimple(123)); // 一百二十三
console.log("numberToChineseSimple(999):", numberToChineseSimple(999)); // 九百九十九

/**
 * 总结：
 * 本练习涵盖了本章学习的所有知识点：
 * 1. 变量声明（let、const）
 * 2. 数据类型（string、number、boolean、null、undefined）
 * 3. 类型检查（typeof、Array.isArray）
 * 4. 运算符（算术、比较、逻辑）
 * 5. 条件判断（if...else、switch、三元运算符）
 *
 * 通过这些练习，你应该能够熟练运用 JavaScript 的基础知识解决实际问题。
 */
