// classes.ts - TypeScript 类示例

// ========================================
// 6.1 类的基础
// ========================================

console.log("=== 类的基础 ===");

// 基本类定义
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
  }
}

const person = new Person("Alice", 25);
console.log(person.greet());

// 简写属性声明
class Rectangle {
  constructor(
    public width: number,
    public height: number
  ) {}

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

const rect = new Rectangle(10, 5);
console.log(`矩形 (${rect.width}x${rect.height}): 面积=${rect.getArea()}, 周长=${rect.getPerimeter()}`);

// ========================================
// 6.2 访问修饰符
// ========================================

console.log("\n=== 访问修饰符 ===");

// public 修饰符
class Animal {
  public name: string;
  public age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public makeSound(): void {
    console.log(`${this.name} makes a sound`);
  }
}

const animal = new Animal("Dog", 3);
console.log(`Animal name: ${animal.name}`);
animal.makeSound();

// private 修饰符
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
      console.log(`Deposited ${amount}. New balance: ${this.balance}`);
    }
  }

  public withdraw(amount: number): boolean {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      console.log(`Withdrew ${amount}. New balance: ${this.balance}`);
      return true;
    }
    console.log("Insufficient funds or invalid amount");
    return false;
  }

  public getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount("123456789", 1000);
console.log(`Initial balance: ${account.getBalance()}`);
account.deposit(500);
account.withdraw(200);
// console.log(account.balance);  // 错误：private 属性

// protected 修饰符
class AnimalWithProtected {
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

class Dog extends AnimalWithProtected {
  private breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age);
    this.breed = breed;
  }

  public bark(): void {
    console.log(`${this.name} is barking!`);
  }

  public introduce(): void {
    console.log(`I'm ${this.name}, a ${this.age} year old ${this.breed}`);
  }

  public makeSound(): void {
    console.log(`${this.name} says Woof!`);
  }
}

const dog = new Dog("Buddy", 3, "Golden Retriever");
dog.bark();
dog.introduce();
// console.log(dog.name);  // 错误：protected 属性

// readonly 修饰符
class User {
  readonly id: string;
  readonly createdAt: Date;
  public name: string;
  public email: string;

  constructor(name: string, email: string) {
    this.id = `user-${Date.now()}`;
    this.createdAt = new Date();
    this.name = name;
    this.email = email;
  }
}

const user = new User("Alice", "alice@example.com");
console.log(`User ID: ${user.id}, Created: ${user.createdAt}`);
// user.id = "new-id";  // 错误：readonly 属性不能修改

// ========================================
// 6.3 继承
// ========================================

console.log("\n=== 继承 ===");

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

console.log(circle.describe());       // "A red shape"
console.log(`Circle area: ${circle.getArea().toFixed(2)}`);
console.log(rectangle.describe());    // "A blue shape"
console.log(`Rectangle area: ${rectangle.getArea()}`);

// super 关键字
class AnimalWithSuper {
  constructor(public name: string) {}

  public makeSound(): void {
    console.log("Some sound");
  }
}

class Cat extends AnimalWithSuper {
  constructor(name: string, private color: string) {
    super(name);
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

// ========================================
// 6.4 抽象类
// ========================================

console.log("\n=== 抽象类 ===");

// 抽象类
abstract class Vehicle {
  constructor(public brand: string) {}

  abstract start(): void;
  abstract stop(): void;

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
    console.log("Car engine started");
  }

  stop(): void {
    console.log("Car engine stopped");
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

// ========================================
// 6.5 静态属性和方法
// ========================================

console.log("\n=== 静态属性和方法 ===");

class MathUtils {
  static PI: number = 3.14159;
  static E: number = 2.71828;

  static add(a: number, b: number): number {
    return a + b;
  }

  static multiply(a: number, b: number): number {
    return a * b;
  }

  static circleArea(radius: number): number {
    return MathUtils.PI * radius * radius;
  }

  static {
    console.log("MathUtils class initialized");
  }
}

console.log(`PI: ${MathUtils.PI}`);
console.log(`Add: 5 + 3 = ${MathUtils.add(5, 3)}`);
console.log(`Multiply: 5 × 3 = ${MathUtils.multiply(5, 3)}`);
console.log(`Circle area (r=5): ${MathUtils.circleArea(5).toFixed(2)}`);

// 静态方法用于工具类
class StringUtils {
  static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + "...";
  }

  static isPalindrome(str: string): boolean {
    const normalized = str.toLowerCase().replace(/[^a-z0-9]/g, "");
    return normalized === normalized.split("").reverse().join("");
  }
}

console.log(`Capitalize: ${StringUtils.capitalize("hello")}`);
console.log(`Truncate: ${StringUtils.truncate("Hello World", 8)}`);
console.log(`Is palindrome "radar": ${StringUtils.isPalindrome("radar")}`);
console.log(`Is palindrome "hello": ${StringUtils.isPalindrome("hello")}`);

// ========================================
// 6.6 类的接口实现
// ========================================

console.log("\n=== 类的接口实现 ===");

// 定义接口
interface Printable {
  print(): void;
}

interface Loggable {
  log(): void;
}

interface Cloneable<T> {
  clone(): T;
}

// 实现单一接口
class Document implements Printable {
  constructor(public title: string) {}

  print(): void {
    console.log(`Printing document: ${this.title}`);
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

// 实现带泛型的接口
class User implements Cloneable<User> {
  constructor(public name: string, public email: string) {}

  clone(): User {
    return new User(this.name, this.email);
  }
}

const doc = new Document("Contract");
doc.print();

const report = new Report("Annual Report", "Content here...");
report.print();
report.log();

const user = new User("Alice", "alice@example.com");
const clonedUser = user.clone();
console.log(`Cloned user: ${clonedUser.name}, ${clonedUser.email}`);

// ========================================
// 6.7 实战示例：任务管理系统
// ========================================

console.log("\n=== 实战示例：任务管理系统 ===");

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
  console.log(`  ${task.toString()}`);
});

// 输出按状态分类的任务
console.log("\n待办任务：");
manager.getTasksByStatus(TaskStatus.TODO).forEach(task => {
  console.log(`  ${task.toString()}`);
});

console.log("\n进行中的任务：");
manager.getTasksByStatus(TaskStatus.IN_PROGRESS).forEach(task => {
  console.log(`  ${task.toString()}`);
});

// 输出统计信息
const stats = manager.getStatistics();
console.log("\n统计信息：");
console.log(`  总任务数: ${stats.total}`);
console.log(`  待办: ${stats.byStatus[TaskStatus.TODO]}`);
console.log(`  进行中: ${stats.byStatus[TaskStatus.IN_PROGRESS]}`);
console.log(`  已完成: ${stats.byStatus[TaskStatus.DONE]}`);

// ========================================
// 综合示例：员工管理系统
// ========================================

console.log("\n=== 综合示例：员工管理系统 ===");

enum EmployeeType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT"
}

interface Payable {
  calculatePay(): number;
}

abstract class Employee implements Payable {
  constructor(
    public id: string,
    public name: string,
    public department: string,
    protected salary: number
  ) {}

  abstract calculatePay(): number;

  public getDetails(): string {
    return `${this.name} (${this.department})`;
  }
}

class FullTimeEmployee extends Employee {
  constructor(
    id: string,
    name: string,
    department: string,
    salary: number,
    public bonus: number = 0
  ) {
    super(id, name, department, salary);
  }

  calculatePay(): number {
    return this.salary + this.bonus;
  }

  getDetails(): string {
    return `${super.getDetails()} - Full Time (Salary: ${this.salary}, Bonus: ${this.bonus})`;
  }
}

class PartTimeEmployee extends Employee {
  constructor(
    id: string,
    name: string,
    department: string,
    private hourlyRate: number,
    private hoursWorked: number
  ) {
    super(id, name, department, 0);
  }

  calculatePay(): number {
    return this.hourlyRate * this.hoursWorked;
  }

  getDetails(): string {
    return `${super.getDetails()} - Part Time (Rate: ${this.hourlyRate}/hr, Hours: ${this.hoursWorked})`;
  }
}

class EmployeeManager {
  private employees: Employee[] = [];

  public addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  public getAllEmployees(): Employee[] {
    return this.employees;
  }

  public getEmployeesByDepartment(department: string): Employee[] {
    return this.employees.filter(e => e.department === department);
  }

  public calculateTotalPayroll(): number {
    return this.employees.reduce((total, emp) => total + emp.calculatePay(), 0);
  }

  public printPayroll(): void {
    console.log("=== 工资单 ===");
    this.employees.forEach(emp => {
      console.log(`${emp.getDetails()}: $${emp.calculatePay()}`);
    });
    console.log(`Total Payroll: $${this.calculateTotalPayroll()}`);
  }
}

// 测试员工管理系统
const empManager = new EmployeeManager();

empManager.addEmployee(new FullTimeEmployee("1", "Alice", "Engineering", 80000, 10000));
empManager.addEmployee(new FullTimeEmployee("2", "Bob", "Marketing", 60000, 5000));
empManager.addEmployee(new PartTimeEmployee("3", "Charlie", "IT", 50, 80));
empManager.addEmployee(new PartTimeEmployee("4", "Diana", "Engineering", 45, 60));

empManager.printPayroll();

console.log("\n所有类示例执行完成！");
