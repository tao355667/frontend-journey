# 流程控制

## 本章目的

掌握 JavaScript 的流程控制语句，学会使用 switch 语句和各种循环来控制程序的执行流程。

---

## 内容概述

本章将学习 JavaScript 中的流程控制语句：

1. **switch 语句**：处理多个离散值的条件判断
2. **for 循环**：固定次数的循环
3. **while 循环**：条件满足时循环
4. **do...while 循环**：至少执行一次的循环
5. **for...of 循环**：遍历可迭代对象的值
6. **for...in 循环**：遍历对象的键
7. **break 和 continue**：控制循环的执行

---

## 核心概念讲解

### switch 语句：多选一的决策工具

当你需要根据一个变量的值执行不同的代码时，switch 语句比多个 if...else 更清晰。

#### 基本语法

```javascript
switch (表达式) {
    case 值1:
        // 代码块
        break;
    case 值2:
        // 代码块
        break;
    default:
        // 默认代码块
}
```

#### 重要概念

- **case**：每个可能的值
- **break**：跳出 switch 语句（很重要！）
- **default**：没有匹配时的默认处理

**类比**：就像电梯的按钮，按不同的楼层按钮，电梯就去不同的楼层。

#### 穿透（Fallthrough）

如果省略 break，代码会继续执行下一个 case：

```javascript
let day = 2;
switch (day) {
    case 1:
    case 2:
    case 3:
        console.log("工作日");
        break;
    case 6:
    case 7:
        console.log("周末");
        break;
}
```

---

### for 循环：固定次数的重复执行

for 循环适用于知道要循环多少次的情况。

#### 基本语法

```javascript
for (初始化; 条件; 更新) {
    // 循环体
}
```

#### 执行顺序

1. 初始化（只执行一次）
2. 检查条件
3. 如果条件为 true，执行循环体
4. 更新变量
5. 回到步骤 2

**类比**：就像跑步比赛，你要跑 10 圈，每跑完一圈就记一次数，直到跑完 10 圈。

---

### while 循环：条件满足时循环

while 循环在条件为 true 时持续执行。

#### 基本语法

```javascript
while (条件) {
    // 循环体
}
```

#### 注意事项

- 确保循环体内有改变条件的代码，否则会无限循环
- 适用于不确定循环次数的情况

**类比**：就像等待公交车，车不来就一直等，车来了就结束等待。

---

### do...while 循环：至少执行一次

do...while 循环保证循环体至少执行一次。

#### 基本语法

```javascript
do {
    // 循环体
} while (条件);
```

**类比**：就像先尝一口再决定是否继续吃，无论味道如何至少尝一口。

---

### for...of 循环：遍历值

for...of 循环用于遍历可迭代对象（数组、字符串等）的值。

```javascript
const fruits = ["apple", "banana", "orange"];
for (const fruit of fruits) {
    console.log(fruit);
}
```

**类比**：就像从盒子里一个接一个地拿出水果，你只关心拿出的是什么水果。

---

### for...in 循环：遍历键

for...in 循环用于遍历对象的键（属性名）。

```javascript
const person = { name: "John", age: 30 };
for (const key in person) {
    console.log(key, person[key]);
}
```

**类比**：就像检查一个袋子里的所有标签，你只关心标签上的文字。

---

### break 和 continue：控制循环执行

- **break**：立即跳出循环
- **continue**：跳过当前迭代，继续下一次

```javascript
// break 示例
for (let i = 0; i < 10; i++) {
    if (i === 5) break;
    console.log(i); // 0, 1, 2, 3, 4
}

// continue 示例
for (let i = 0; i < 5; i++) {
    if (i === 2) continue;
    console.log(i); // 0, 1, 3, 4
}
```

**类比**：
- break：就像吃饭吃到一半突然有事离开
- continue：就像吃饭时跳过不好吃的菜，继续吃下一道菜

---

## 代码示例说明

### switch.js

这个文件展示了 switch 语句的多种用法：

- 基本 switch 语句
- case 穿透（多个 case 共享代码）
- switch 与数字范围的配合
- 使用 true 作为 switch 表达式实现范围判断

### loops.js

这个文件展示了各种循环的使用：

- for 循环：固定次数的循环
- while 循环：条件满足时循环
- do...while 循环：至少执行一次
- for...of：遍历数组的值
- for...in：遍历对象的键
- break 和 continue：控制循环流程

---

## 最佳实践

### switch 语句

1. **始终使用 break**：除非有意使用穿透
2. **记得添加 default**：处理所有可能的情况
3. **使用 === 比较**：switch 使用严格相等比较

```javascript
// 好的做法
switch (day) {
    case 1:
        console.log("周一");
        break;
    default:
        console.log("其他");
}
```

### 循环选择

1. **for 循环**：知道循环次数
2. **while 循环**：不知道循环次数，根据条件决定
3. **for...of**：遍历数组的值
4. **for...in**：遍历对象的键（注意数组慎用）

```javascript
// 遍历数组 - 推荐 for...of
for (const item of array) { ... }

// 遍历对象 - 推荐 for...in
for (const key in object) { ... }

// 遍历数组索引 - 使用 for 循环或 forEach
for (let i = 0; i < array.length; i++) { ... }
array.forEach((item, index) => { ... });
```

### 避免无限循环

1. **while 和 do...while**：确保循环体内有改变条件的代码
2. **添加循环计数器**：限制最大循环次数

```javascript
// 危险：可能无限循环
while (condition) {
    // 如果 condition 永远为 true，就会无限循环
}

// 安全：添加计数器
let count = 0;
while (condition && count < 1000) {
    count++;
    // ...
}
```

---

## 文件说明

本章节包含以下文件：

| 文件名 | 说明 | 主要内容 |
|--------|------|----------|
| switch.js | switch 语句示例 | 基本 switch、case 穿透、数字范围判断 |
| loops.js | 循环语句示例 | for、while、do...while、for...of、for...in |

---

## 练习题

### 基础练习

1. **星期判断**：使用 switch 语句，根据数字（1-7）输出对应的星期名称

2. **数字求和**：使用 for 循环计算 1 到 100 的和

3. **偶数输出**：使用 while 循环输出 1 到 20 之间的所有偶数

### 进阶练习

1. **计算阶乘**：写一个函数，使用循环计算 n 的阶乘（n!）

2. **九九乘法表**：使用嵌套循环输出九九乘法表

3. **斐波那契数列**：输出前 10 个斐波那契数（1, 1, 2, 3, 5, 8, 13...）

### 挑战练习

1. **水仙花数**：找出所有三位数的水仙花数（各位数字的立方和等于数字本身）
   - 例：153 = 1³ + 5³ + 3³ = 153

2. **素数判断**：写一个函数，判断一个数字是否是素数

3. **猜数字游戏**：生成 1-100 的随机数，让用户猜测，给出"大了"或"小了"的提示

---

## 学习目标检查

完成本章学习后，你应该能够：

- [ ] 理解 switch 语句的语法和使用场景
- [ ] 知道何时使用 switch，何时使用 if...else
- [ ] 理解 case 穿透的机制
- [ ] 掌握 for、while、do...while 循环的区别和使用场景
- [ ] 能够使用 for...of 遍历数组
- [ ] 能够使用 for...in 遍历对象
- [ ] 理解 break 和 continue 的作用
- [ ] 能够避免无限循环
- [ ] 选择合适的循环类型解决问题
- [ ] 完成基础、进阶练习题

---

## 下一步

完成本章学习后，请继续学习 [第三章：函数](../03-functions/)，学习如何定义和使用函数。
