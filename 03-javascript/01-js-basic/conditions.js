/**
 * JavaScript Conditional Statements
 * 演示 JavaScript 中的条件判断语句
 */

console.log("=== if...else 语句 ===");

// if...else 语句：根据条件执行不同的代码块
// 这是 JavaScript 中最常用的条件判断方式

let score = 85;

if (score >= 90) {
    console.log("Grade: A - 优秀");
} else if (score >= 80) {
    console.log("Grade: B - 良好");
} else if (score >= 70) {
    console.log("Grade: C - 中等");
} else if (score >= 60) {
    console.log("Grade: D - 及格");
} else {
    console.log("Grade: F - 不及格");
}

// 注意：条件是从上到下依次判断的，一旦某个条件为 true，就执行对应代码块
// 然后跳过后续的所有条件

console.log("\n=== 三元运算符（Ternary Operator）===");

// 三元运算符：if...else 的简写形式
// 语法：condition ? valueIfTrue : valueIfFalse
// 适用于简单的二选一情况

let message = score >= 60 ? "及格" : "不及格";
console.log("成绩状态:", message);

// 三元运算符可以嵌套（但不建议超过三层）
let grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F";
console.log("成绩等级:", grade);

// 更清晰的写法（使用 if...else）
if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else if (score >= 60) {
    grade = "D";
} else {
    grade = "F";
}

console.log("\n=== 逻辑运算符组合 ===");

// 使用逻辑运算符组合多个条件

let age = 20;
let hasLicense = true;

// &&（逻辑与）：两个条件都为 true 时才为 true
if (age >= 18 && hasLicense) {
    console.log("可以开车：年龄达标且有驾照");
} else {
    console.log("不能开车：年龄未达标或没有驾照");
}

// ||（逻辑或）：有一个条件为 true 就为 true
let hasCreditCard = true;
let hasPayPal = false;

if (hasCreditCard || hasPayPal) {
    console.log("可以在线支付：有信用卡或 PayPal");
} else {
    console.log("无法在线支付：需要支付方式");
}

// !（逻辑非）：取反
let isWeekend = false;

if (!isWeekend) {
    console.log("是工作日");
} else {
    console.log("是周末");
}

console.log("\n=== 复杂条件判断示例 ===");

// 示例 1：判断闰年
// 规则：能被 4 整除但不能被 100 整除，或者能被 400 整除
let year = 2024;

if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    console.log(`${year} 是闰年`);
} else {
    console.log(`${year} 不是闰年`);
}

// 示例 2：BMI 健康评估
let height = 1.75; // 米
let weight = 70; // 公斤
let bmi = weight / (height * height);
console.log(`BMI: ${bmi.toFixed(2)}`);

if (bmi < 18.5) {
    console.log("健康状态：偏瘦");
} else if (bmi < 24) {
    console.log("健康状态：正常");
} else if (bmi < 28) {
    console.log("健康状态：超重");
} else {
    console.log("健康状态：肥胖");
}

// 示例 3：折扣计算
let isMember = true;
let isHoliday = false;
let purchaseAmount = 500;
let discount = 0;

if (isMember && isHoliday) {
    discount = 0.3; // 会员 + 节日：30% 折扣
} else if (isMember) {
    discount = 0.15; // 会员：15% 折扣
} else if (isHoliday) {
    discount = 0.2; // 节日：20% 折扣
}

if (purchaseAmount >= 1000) {
    discount += 0.05; // 满 1000 再加 5%
}

console.log(`折扣: ${(discount * 100).toFixed(0)}%`);
console.log(`最终价格: ¥${(purchaseAmount * (1 - discount)).toFixed(2)}`);

console.log("\n=== switch 语句（在第二章详细讲解）===");

// switch 语句：适用于多个离散值的判断
let day = "星期一";

switch (day) {
    case "星期一":
    case "星期二":
    case "星期三":
    case "星期四":
    case "星期五":
        console.log("是工作日");
        break;
    case "星期六":
    case "星期日":
        console.log("是周末");
        break;
    default:
        console.log("无效的日期");
}

console.log("\n=== 条件判断最佳实践 ===");

// 最佳实践 1：使用有意义的变量名
let isEligibleForDiscount = age >= 60 || hasMembershipCard;
if (isEligibleForDiscount) {
    console.log("有资格享受折扣");
}

// 最佳实践 2：避免深层嵌套（使用提前返回）
function validateUser(user) {
    if (!user) {
        console.log("用户不存在");
        return false;
    }

    if (!user.email) {
        console.log("缺少邮箱");
        return false;
    }

    if (!user.age || user.age < 18) {
        console.log("年龄不符合要求");
        return false;
    }

    console.log("用户验证通过");
    return true;
}

validateUser({ name: "John", age: 20 });
validateUser({ email: "john@example.com", age: 16 });

// 最佳实践 3：处理所有可能的情况
let trafficLight = "绿色";

if (trafficLight === "红色") {
    console.log("停车");
} else if (trafficLight === "黄色") {
    console.log("准备停车");
} else if (trafficLight === "绿色") {
    console.log("通行");
} else {
    console.log("无效的交通灯颜色");
}

/**
 * 最佳实践总结：
 * 1. 使用有意义的变量名，让条件易于理解
 * 2. 避免深层嵌套，使用提前返回简化逻辑
 * 3. 总是处理 else 或 default 情况，避免遗漏边界情况
 * 4. 简单条件使用三元运算符，复杂条件使用 if...else
 * 5. 逻辑复杂时，使用括号明确优先级
 * 6. 避免连续比较（如 1 < x < 5），应使用逻辑运算符（x > 1 && x < 5）
 */
