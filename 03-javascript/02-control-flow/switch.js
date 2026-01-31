/**
 * JavaScript Switch Statement
 * 演示 switch 语句的多种用法和特性
 */

console.log("=== 基本 switch 语句 ===");

// switch 语句：根据表达式的值，执行对应的 case 代码块
// 注意：switch 使用严格相等（===）进行比较

let day = "Monday";

switch (day) {
    case "Monday":
        console.log("新的一周开始了！");
        break;
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
        console.log("工作日的中间");
        break;
    case "Friday":
        console.log("TGIF！周末即将到来！");
        break;
    case "Saturday":
    case "Sunday":
        console.log("周末！放松时间！");
        break;
    default:
        console.log("无效的日期");
}

console.log("\n=== Case 穿透（Fallthrough）===");

// 如果省略 break，代码会继续执行下一个 case
// 这称为"穿透"，可用于多个 case 共享同一代码块

let dayNumber = 3;

switch (dayNumber) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
        console.log("工作日");
        break;
    case 6:
    case 7:
        console.log("周末");
        break;
    default:
        console.log("无效的日期");
}

// 注意：使用 break 可以立即跳出 switch
console.log("\n=== break 的重要性 ===");

let score = 85;

switch (score) {
    case 90:
        console.log("A");
        break;
    case 85:
        console.log("B+"); // 输出这个，然后跳出
        break;
    case 80:
        console.log("B");
        break;
    default:
        console.log("其他分数");
}

console.log("\n=== 使用数字范围的 switch 技巧 ===");

// switch 可以与 true 配合使用，实现范围判断
// 这种写法比多个 if...else 更清晰

let grade = 85;

switch (true) {
    case grade >= 90:
        console.log("优秀（A）");
        break;
    case grade >= 80:
        console.log("良好（B）");
        break;
    case grade >= 70:
        console.log("中等（C）");
        break;
    case grade >= 60:
        console.log("及格（D）");
        break;
    default:
        console.log("不及格（F）");
}

console.log("\n=== switch 与类型 ===");

// switch 使用严格相等（===）比较，类型必须相同
let value = 10;

switch (value) {
    case 10:
        console.log("数字 10");
        break;
    case "10":
        console.log("字符串 '10'");
        break;
    default:
        console.log("其他");
}

// 测试字符串
let stringValue = "10";

switch (stringValue) {
    case 10:
        console.log("数字 10"); // 不会匹配，类型不同
        break;
    case "10":
        console.log("字符串 '10'"); // 匹配这个
        break;
    default:
        console.log("其他");
}

console.log("\n=== 复杂示例：订单状态处理 ===");

// 实际应用：处理订单状态
let orderStatus = "shipped";

switch (orderStatus) {
    case "pending":
        console.log("订单状态：待处理");
        console.log("下一步：等待付款");
        break;
    case "paid":
        console.log("订单状态：已付款");
        console.log("下一步：准备发货");
        break;
    case "shipped":
        console.log("订单状态：已发货");
        console.log("下一步：等待收货");
        break;
    case "delivered":
        console.log("订单状态：已送达");
        console.log("下一步：评价商品");
        break;
    case "cancelled":
        console.log("订单状态：已取消");
        console.log("下一步：退款");
        break;
    default:
        console.log("未知的订单状态");
}

console.log("\n=== 多维判断示例 ===");

// 结合变量和固定值的判断
let userType = "premium";
let purchaseAmount = 1500;

let discountRate;

switch (userType) {
    case "guest":
        discountRate = 0;
        break;
    case "regular":
        discountRate = purchaseAmount > 1000 ? 0.05 : 0;
        break;
    case "premium":
        discountRate = purchaseAmount > 1000 ? 0.15 : 0.1;
        break;
    case "vip":
        discountRate = purchaseAmount > 1000 ? 0.25 : 0.2;
        break;
    default:
        discountRate = 0;
}

console.log(`用户类型: ${userType}`);
console.log(`购买金额: ¥${purchaseAmount}`);
console.log(`折扣率: ${(discountRate * 100).toFixed(0)}%`);
console.log(`折扣金额: ¥${(purchaseAmount * discountRate).toFixed(2)}`);
console.log(`最终价格: ¥${(purchaseAmount * (1 - discountRate)).toFixed(2)}`);

console.log("\n=== 季节判断示例 ===");

// 根据月份判断季节
let month = 7;

switch (month) {
    case 12:
    case 1:
    case 2:
        console.log("冬季");
        break;
    case 3:
    case 4:
    case 5:
        console.log("春季");
        break;
    case 6:
    case 7:
    case 8:
        console.log("夏季");
        break;
    case 9:
    case 10:
    case 11:
        console.log("秋季");
        break;
    default:
        console.log("无效的月份");
}

/**
 * switch 语句最佳实践：
 * 1. 始终使用 break，除非有意使用穿透
 * 2. 添加 default 分支处理所有可能的情况
 * 3. 使用有意义的 case 值
 * 4. case 值可以是表达式，但注意执行顺序
 * 5. 对于范围判断，可以使用 switch (true) 的技巧
 * 6. switch 使用严格相等（===）进行比较
 *
 * 何时使用 switch 而不是 if...else：
 * - 判断多个离散值（如星期、月份、状态等）
 * - 需要多个 case 共享同一代码块
 * - 代码更清晰易读
 */
