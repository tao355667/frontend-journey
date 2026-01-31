# 第六章：类

## 本章目的

掌握 TypeScript 类的定义、属性、方法、继承、访问修饰符、抽象类和接口实现等面向对象编程特性，能够使用类构建结构化的代码。

---

## 6.1 类的基础

类是 TypeScript 面向对象编程的核心，它提供了创建对象的蓝图。

### 基本类定义

```typescript
// 定义一个简单的类
class Person {
  // 属性声明
  name: string;
  age: number;

  // 构造函数
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // 方法
  greet(): string {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
  }
}

// 创建类的实例
const person = new Person("Alice", 25);
console.log(person.greet());
console.log(person.name);
console.log(person.age);
```

### 属性类型注解

```typescript
class Car {
  // 在类中声明属性时需要类型注解
  brand: string;
  model: string;
  year: number;
  private mileage: number;  // 私有属性

  constructor(brand: string, model: string, year: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.mileage = 0;
  }

  // 方法
  drive(distance: number): void {
    this.mileage += distance;
  }

  getMileage(): number {
    return this.mileage;
  }
}

const car = new Car("Toyota", "Camry", 2024);
car.drive(100);
console.log(`Mileage: ${car.getMileage()} km`);
```

### 简写属性声明

```typescript
class Rectangle {
  // 构造函数参数直接声明为属性
  constructor(
    public width: number,
    public height: number
  ) {}

  getArea(): number {
    return this.width * this.height;
  }
}

const rect = new Rectangle(10, 5);
console.log(`Area: ${rect.getArea()}`);
```

---

## 6.2 访问修饰符

TypeScript 提供了三个访问修饰符来控制属性的可见性。

### public

`public` 是默认的访问修饰符，表示属性或方法可以被任何地方访问。

```typescript
class Animal {
  public name: string;
  public age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public makeSound(): void {
    console.log("Some sound");
  }
}

const animal = new Animal("Dog", 3);
console.log(animal.name);  // 可以访问
animal.makeSound();        // 可以调用
```

### private

`private` 表示属性或方法只能在类的内部访问，外部无法直接访问。

```typescript
class BankAccount {
  private balance: number;
  private accountNumber: string;

  constructor(accountNumber: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
  }

  public deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    }
  }

  public withdraw(amount: number): boolean {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

  public getBalance(): number {
    return this.balance;
  }

  // 私有方法
  private validateAmount(amount: number): boolean {
    return amount > 0 && amount <= this.balance;
  }
}

const account = new BankAccount("123456789", 1000);
account.deposit(500);
console.log(`Balance: ${account.getBalance()}`);
// console.log(account.balance);  // 错误：private 属性
```

### protected

`protected` 表示属性或方法可以在类的内部以及子类中访问，但不能在外部访问。

```typescript
class Animal {
  protected name: string;
  protected age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  protected makeSound(): void {
    console.log("Some sound");
  }
}

class Dog extends Animal {
  private breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age);
    this.breed = breed;
  }

  public bark(): void {
    console.log(`${this.name} is barking!`);  // 可以访问 protected 属性
  }

  public introduce(): void {
    console.log(`I'm ${this.name}, a ${this.age} year old ${this.breed}`);
  }
}

const dog = new Dog("Buddy", 3, "Golden Retriever");
dog.bark();
dog.introduce();
// console.log(dog.name);  // 错误：protected 属性不能在外部访问
```

### readonly

`readonly` 表示属性只能在声明时或构造函数中赋值，之后不能修改。

```typescript
class User {
  readonly id: string;
  readonly createdAt: Date;
  public name: string;
  public email: string;

  constructor(name: string, email: string) {
    this.id = `user-${Date.now()}`;  // 可以在构造函数中赋值
    this.createdAt = new Date();
    this.name = name;
    this.email = email;
  }
}

const user = new User("Alice", "alice@example.com");
console.log(user.id);
console.log(user.createdAt);
// user.id = "new-id";  // 错误：readonly 属性不能修改
```

---

## 6.3 继承

继承是面向对象编程的重要概念，允许一个类继承另一个类的属性和方法。

### 基本继承

```typescript
// 父类
class Shape {
  constructor(public color: string) {}

  public describe(): string {
    return `A ${this.color} shape`;
  }
}

// 子类
class Circle extends Shape {
  constructor(public radius: number, color: string) {
    super(color);
  }

  public getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(public width: number, public height: number, color: string) {
    super(color);
  }

  public getArea(): number {
    return this.width * this.height;
  }
}

const circle = new Circle(5, "red");
const rectangle = new Rectangle(10, 5, "blue");

console.log(circle.describe());      // "A red shape"
console.log(circle.getArea());       // 78.54
console.log(rectangle.describe());   // "A blue shape"
console.log(rectangle.getArea());    // 50
```

### super 关键字

`super` 关键字用于在子类中调用父类的方法或构造函数。

```typescript
class Animal {
  constructor(public name: string) {}

  public makeSound(): void {
    console.log("Some sound");
  }
}

class Cat extends Animal {
  constructor(name: string, private color: string) {
    super(name);  // 调用父类构造函数
  }

  public makeSound(): void {
    console.log("Meow!");
  }

  public makeCatSound(): void {
    this.makeSound();        // 调用子类方法
    super.makeSound();       // 调用父类方法
  }
}

const cat = new Cat("Whiskers", "orange");
cat.makeCatSound();
// 输出：Meow!
//       Some sound
```

---

## 6.4 抽象类

抽象类是不能被直接实例化的类，它用作其他类的基类。抽象类可以包含抽象方法（没有实现的方法）。

```typescript
// 抽象类
abstract class Vehicle {
  constructor(public brand: string) {}

  // 抽象方法（没有实现）
  abstract start(): void;
  abstract stop(): void;

  // 具体方法
  public describe(): string {
    return `A ${this.brand} vehicle`;
  }
}

// 具体子类
class Car extends Vehicle {
  constructor(brand: string, private wheels: number) {
    super(brand);
  }

  start(): void {
    console.log("Engine started");
  }

  stop(): void {
    console.log("Engine stopped");
  }

  public drive(): void {
    console.log("Driving the car");
  }
}

class Motorcycle extends Vehicle {
  constructor(brand: string) {
    super(brand);
  }

  start(): void {
    console.log("Motorcycle engine started");
  }

  stop(): void {
    console.log("Motorcycle engine stopped");
  }
}

const car = new Car("Toyota", 4);
car.start();
car.drive();
console.log(car.describe());

const motorcycle = new Motorcycle("Honda");
motorcycle.start();
// const vehicle = new Vehicle("Generic");  // 错误：不能实例化抽象类
```

---

## 6.5 静态属性和方法

静态属性和方法属于类本身，而不是类的实例。

```typescript
class MathUtils {
  // 静态属性
  static PI: number = 3.14159;
  static E: number = 2.71828;

  // 静态方法
  static add(a: number, b: number): number {
    return a + b;
  }

  static multiply(a: number, b: number): number {
    return a * b;
  }

  static circleArea(radius: number): number {
    return MathUtils.PI * radius * radius;
  }

  // 静态块（初始化静态属性）
  static {
    console.log("MathUtils class initialized");
  }
}

console.log(MathUtils.PI);              // 3.14159
console.log(MathUtils.add(5, 3));       // 8
console.log(MathUtils.multiply(5, 3));  // 15
console.log(MathUtils.circleArea(5));   // 78.54
```

---

## 6.6 类的接口实现

类可以实现一个或多个接口，这确保了类遵循特定的契约。

```typescript
// 定义接口
interface Printable {
  print(): void;
}

interface Loggable {
  log(): void;
}

// 实现单一接口
class Document implements Printable {
  constructor(public title: string) {}

  print(): void {
    console.log(`Printing: ${this.title}`);
  }
}

// 实现多个接口
class Report implements Printable, Loggable {
  constructor(public title: string, public content: string) {}

  print(): void {
    console.log(`Printing report: ${this.title}`);
  }

  log(): void {
    console.log(`Log: Created report "${this.title}"`);
  }
}

const doc = new Document("Contract");
doc.print();

const report = new Report("Annual Report", "Content here...");
report.print();
report.log();
```

---

## 6.7 实战示例：任务管理系统

综合运用类知识，构建一个简单的任务管理系统。

```typescript
// 任务状态枚举
enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE"
}

// 任务类
class Task {
  constructor(
    public id: string,
    public title: string,
    public description: string = "",
    public status: TaskStatus = TaskStatus.TODO,
    public priority: "low" | "medium" | "high" = "medium",
    public assignee?: string,
    public readonly createdAt: Date = new Date()
  ) {}

  public assignTo(person: string): void {
    this.assignee = person;
  }

  public start(): void {
    this.status = TaskStatus.IN_PROGRESS;
  }

  public complete(): void {
    this.status = TaskStatus.DONE;
  }

  public isOverdue(): boolean {
    // 简化的逾期检查（创建超过 7 天）
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return this.createdAt < sevenDaysAgo && this.status !== TaskStatus.DONE;
  }

  public toString(): string {
    const statusIcon = {
      [TaskStatus.TODO]: "📋",
      [TaskStatus.IN_PROGRESS]: "🔄",
      [TaskStatus.DONE]: "✅"
    }[this.status];

    return `${statusIcon} [${this.priority.toUpperCase()}] ${this.title}`;
  }
}

// 任务管理器类
class TaskManager {
  private tasks: Map<string, Task> = new Map();

  public addTask(task: Task): void {
    this.tasks.set(task.id, task);
  }

  public getTask(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  public getAllTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  public getTasksByStatus(status: TaskStatus): Task[] {
    return this.getAllTasks().filter(task => task.status === status);
  }

  public getTasksByAssignee(assignee: string): Task[] {
    return this.getAllTasks().filter(task => task.assignee === assignee);
  }

  public completeTask(id: string): boolean {
    const task = this.tasks.get(id);
    if (task) {
      task.complete();
      return true;
    }
    return false;
  }

  public deleteTask(id: string): boolean {
    return this.tasks.delete(id);
  }

  public getStatistics(): {
    total: number;
    byStatus: Record<TaskStatus, number>;
    overdue: number;
  } {
    const tasks = this.getAllTasks();
    return {
      total: tasks.length,
      byStatus: {
        [TaskStatus.TODO]: tasks.filter(t => t.status === TaskStatus.TODO).length,
        [TaskStatus.IN_PROGRESS]: tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
        [TaskStatus.DONE]: tasks.filter(t => t.status === TaskStatus.DONE).length
      },
      overdue: tasks.filter(t => t.isOverdue()).length
    };
  }
}

// 测试任务管理系统
const manager = new TaskManager();

// 创建任务
const task1 = new Task("1", "学习 TypeScript", "完成基础教程", TaskStatus.TODO, "high");
const task2 = new Task("2", "实现功能模块", "用户管理功能", TaskStatus.IN_PROGRESS, "medium");
const task3 = new Task("3", "编写测试", "单元测试覆盖");
const task4 = new Task("4", "修复 Bug", "登录问题修复", TaskStatus.DONE, "high");

// 添加任务
manager.addTask(task1);
manager.addTask(task2);
manager.addTask(task3);
manager.addTask(task4);

// 指派任务
task1.assignTo("Alice");
task2.assignTo("Bob");

// 完成一些任务
manager.completeTask("3");

// 输出任务列表
console.log("所有任务：");
manager.getAllTasks().forEach(task => {
  console.log(task.toString());
});

// 输出统计信息
const stats = manager.getStatistics();
console.log("\n统计信息：", stats);
```

---

## 文件说明

本章包含以下文件：

| 文件名 | 说明 |
|--------|------|
| `classes.ts` | 本章所有类示例代码，包含完整的使用演示 |
| `practice-solution.html` | 本章练习题的参考答案 |

---

## 练习题

### 基础练习

**练习 6.1**：创建一个 `BankAccount` 类，包含私有属性 `balance`，公共方法 `deposit`、`withdraw` 和 `getBalance`。

**练习 6.2**：创建一个 `Rectangle` 类，包含属性 `width` 和 `height`，以及方法 `getArea` 和 `getPerimeter`。

**练习 6.3**：创建一个 `Person` 类，包含属性 `name` 和 `age`，以及方法 `introduce` 返回自我介绍字符串。

### 进阶练习

**练习 6.4**：创建一个 `Animal` 父类，包含 `name` 和 `age` 属性，以及 `makeSound` 方法。创建 `Dog` 和 `Cat` 子类，重写 `makeSound` 方法。

**练习 6.5**：创建一个抽象类 `Shape`，包含抽象方法 `getArea`。创建 `Circle` 和 `Rectangle` 子类实现这个方法。

### 挑战练习

**练习 6.6**：创建一个图书管理系统，包含以下类：
- `Book`：图书类，包含书名、作者、ISBN、是否可借阅
- `Member`：会员类，包含姓名、会员ID、已借阅图书列表
- `Library`：图书馆类，管理图书和会员

要求：
- 会员可以借阅和归还图书
- 图书馆可以添加图书和会员
- 图书不可借阅时不能被借阅
- 会员有最大借阅数量限制

---

## 学习目标检查清单

- [ ] 理解类的概念和基本结构
- [ ] 掌握类的属性和方法定义
- [ ] 理解和使用访问修饰符（public、private、protected）
- [ ] 掌握 readonly 修饰符的使用
- [ ] 理解类的继承机制
- [ ] 掌握 super 关键字的使用
- [ ] 理解抽象类和抽象方法
- [ ] 掌握静态属性和静态方法
- [ ] 理解类实现接口的语法和意义
