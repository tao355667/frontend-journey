# 第四章：接口

## 本章目的

掌握 TypeScript 接口的定义、使用和高级特性，包括可选属性、只读属性、函数接口、索引签名、接口继承等，能够使用接口构建类型安全的代码。

---

## 4.1 接口基础

接口是 TypeScript 中最重要的类型定义工具之一，它用于描述对象的结构。接口就像是一份合同，规定了对象应该具有哪些属性以及每个属性的类型。

### 基本语法

```typescript
// 定义一个简单的接口
interface User {
  name: string;
  age: number;
  email: string;
}

// 使用接口
const user: User = {
  name: "Alice",
  age: 25,
  email: "alice@example.com"
};

console.log(user.name);  // "Alice"
```

在上面的例子中，`User` 接口定义了对象必须包含 `name`、`age` 和 `email` 三个属性，且每个属性都有明确的类型。任何赋值给 `user` 变量的对象都必须符合 `User` 接口的结构，否则 TypeScript 会报错。

### 类型检查

```typescript
// 符合接口的对象
const validUser: User = {
  name: "Bob",
  age: 30,
  email: "bob@example.com"
};

// ❌ 错误示例
const invalidUser: User = {
  name: "Charlie",
  age: "25",           // 类型错误：应该是 number
  email: "charlie@example.com"
};
```

### 接口描述函数

```typescript
// 函数接口
interface SearchFunc {
  (source: string, subString: string): boolean;
}

// 使用函数接口
const mySearch: SearchFunc = (source, subString) => {
  return source.indexOf(subString) > -1;
};

console.log(mySearch("hello world", "world"));  // true
console.log(mySearch("hello world", "test"));   // false
```

---

## 4.2 可选属性与只读属性

接口的属性可以标记为可选或只读，以提供更大的灵活性。

### 可选属性

可选属性表示该属性可能不存在，使用问号（`?`）标记。

```typescript
interface Contact {
  name: string;
  email: string;
  phone?: string;      // 可选属性
  address?: string;    // 可选属性
}

// 两种方式都有效
const contact1: Contact = {
  name: "Alice",
  email: "alice@example.com"
};

const contact2: Contact = {
  name: "Bob",
  email: "bob@example.com",
  phone: "13800138000",
  address: "Beijing"
};

// 访问可选属性时需要处理 undefined
function printContact(contact: Contact): string {
  let info = `Name: ${contact.name}, Email: ${contact.email}`;
  if (contact.phone) {
    info += `, Phone: ${contact.phone}`;
  }
  if (contact.address) {
    info += `, Address: ${contact.address}`;
  }
  return info;
}
```

### 只读属性

只读属性只能在对象初始化时赋值，之后不能修改，使用 `readonly` 关键字标记。

```typescript
interface Config {
  readonly id: string;
  name: string;
  value: number;
}

const config: Config = {
  id: "config-001",
  name: "Settings",
  value: 100
};

config.name = "New Name";    // 允许
// config.id = "config-002"; // 错误：只读属性不能修改
```

### 同时使用可选和只读

```typescript
interface UserProfile {
  readonly userId: string;
  username: string;
  avatar?: string;
  bio?: string;
  readonly createdAt: Date;
}

const profile: UserProfile = {
  userId: "user-001",
  username: "alice",
  createdAt: new Date()
};

profile.username = "alice_new";  // 允许
// profile.userId = "user-002";  // 错误：只读
// profile.avatar = "new.jpg";   // 可以添加可选属性
```

---

## 4.3 函数类型接口

接口可以描述函数的类型，这在使用回调函数和高阶函数时非常有用。

### 基本函数接口

```typescript
// 定义函数接口
interface CompareFunc {
  (a: number, b: number): number;
}

// 实现函数接口
const compare: CompareFunc = (a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
};

// 使用
console.log(compare(5, 3));   // 1
console.log(compare(3, 5));   // -1
console.log(compare(5, 5));   // 0

// 泛型函数接口
interface PairCompareFunc<T> {
  (a: T, b: T): number;
}

const compareStrings: PairCompareFunc<string> = (a, b) => {
  return a.localeCompare(b);
};

console.log(compareStrings("apple", "banana"));  // -1
```

### 复杂函数类型

```typescript
// 处理数据的函数接口
interface DataProcessor {
  (data: string[], transform: (item: string) => string): string[];
}

const process: DataProcessor = (data, transform) => {
  return data.map(transform);
};

const result = process(
  ["hello", "world", "typescript"],
  (item) => item.toUpperCase()
);
console.log(result);  // ["HELLO", "WORLD", "TYPESCRIPT"]
```

---

## 4.4 索引签名

索引签名允许对象拥有动态的属性名，只要属性值符合指定的类型。

### 字符串索引签名

```typescript
// 允许任意字符串属性，值为 string 类型
interface StringMap {
  [key: string]: string;
}

const dictionary: StringMap = {
  hello: "你好",
  world: "世界",
  goodbye: "再见"
};

// 任意字符串都可以作为属性名
dictionary["anyKey"] = "任意值";
```

### 数字索引签名

```typescript
// 数组-like 对象
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = ["Apple", "Banana", "Orange"];
console.log(myArray[0]);  // "Apple"
console.log(myArray[1]);  // "Banana"
```

### 混合索引签名

```typescript
// 同时支持字符串和数字索引
interface MixedIndex {
  [key: string]: string | number;
  [index: number]: string | number;
}

const mixed: MixedIndex = {
  name: "Alice",
  age: 25,
  0: "first",
  1: "second"
};

console.log(mixed["name"]);  // "Alice"
console.log(mixed.age);      // 25
console.log(mixed[0]);       // "first"
```

### 索引签名的限制

```typescript
// 属性类型必须兼容索引签名类型
interface IndexRestriction {
  [key: string]: string;
  // age: number;  // 错误：索引签名类型是 string，age 类型必须是 string
}

// 解决方案：使用联合类型
interface FlexibleObject {
  [key: string]: string | number;
  name: string;        // 兼容
  age: number;         // 兼容
}
```

---

## 4.5 接口继承

接口可以继承其他接口，实现代码复用和类型组合。

### 单继承

```typescript
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

const myDog: Dog = {
  name: "Buddy",
  age: 3,
  breed: "Golden Retriever",
  bark() {
    console.log("Woof! Woof!");
  }
};
```

### 多重继承

```typescript
interface Walkable {
  walk(): void;
}

interface Swimmable {
  swim(): void;
}

interface Amphibious extends Walkable, Swimmable {
  canLiveOnLand: boolean;
}

class Frog implements Amphibious {
  canLiveOnLand: boolean;

  constructor(canLiveOnLand: boolean) {
    this.canLiveOnLand = canLiveOnLand;
  }

  walk() {
    console.log("Frog is walking");
  }

  swim() {
    console.log("Frog is swimming");
  }
}
```

### 部分继承

```typescript
interface Shape {
  color: string;
}

interface Point {
  x: number;
  y: number;
}

interface Circle extends Shape, Point {
  radius: number;
}

const circle: Circle = {
  color: "red",
  x: 100,
  y: 100,
  radius: 50
};
```

---

## 4.6 接口与类型别名的比较

接口和类型别名都可以用来描述对象类型，但有一些重要的区别。

### 相同点

```typescript
// 接口
interface Point1 {
  x: number;
  y: number;
}

// 类型别名
type Point2 = {
  x: number;
  y: number;
};

// 两者都可以用于类型标注
const p1: Point1 = { x: 1, y: 2 };
const p2: Point2 = { x: 3, y: 4 };
```

### 不同点

**1. 扩展方式不同**

```typescript
// 接口使用 extends 继承
interface Person {
  name: string;
}

interface Employee extends Person {
  employeeId: string;
}

// 类型别名使用交叉类型
type PersonType = {
  name: string;
};

type EmployeeType = PersonType & {
  employeeId: string;
};
```

**2. 同名接口会合并**

```typescript
interface Box {
  width: number;
}

interface Box {
  height: number;
}

// 合并后的 Box
const box: Box = {
  width: 10,
  height: 20
};
```

**3. 类型别名可以创建原始类型和联合类型**

```typescript
// 类型别名可以做到
type ID = string | number;
type Status = "active" | "inactive";

// 接口无法直接表示这些类型
```

**4. 类只能实现接口，不能实现类型别名（除非是对象类型）**

```typescript
interface Printable {
  print(): void;
}

type PrintType = {
  print(): void;
};

class Document implements Printable {
  print() {
    console.log("Printing document");
  }
}

// 类型别名在某些情况下也可以
class Report implements PrintType {
  print() {
    console.log("Printing report");
  }
}
```

### 使用建议

- **使用接口**：当需要描述对象结构、类实现或需要接口合并时
- **使用类型别名**：当需要描述原始类型、联合类型、函数类型或元组时

---

## 4.7 实战示例：构建用户系统

综合运用接口知识，构建一个简单的用户系统。

```typescript
// 用户基本信息接口
interface User {
  readonly id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

// 用户详细信息接口，继承 User
interface UserProfile extends User {
  bio?: string;
  followers: number;
  following: number;
  posts: Post[];
}

// 帖子接口
interface Post {
  id: string;
  title: string;
  content: string;
  publishedAt: Date;
  tags: string[];
}

// 用户管理器接口
interface UserManager {
  createUser(user: Omit<User, "id" | "createdAt">): User;
  getUser(id: string): User | undefined;
  updateUser(id: string, updates: Partial<User>): User | undefined;
  deleteUser(id: string): boolean;
}

// 实现用户管理器
class SimpleUserManager implements UserManager {
  private users: Map<string, User> = new Map();

  createUser(userData: Omit<User, "id" | "createdAt">): User {
    const user: User = {
      id: `user-${Date.now()}`,
      ...userData,
      createdAt: new Date()
    };
    this.users.set(user.id, user);
    return user;
  }

  getUser(id: string): User | undefined {
    return this.users.get(id);
  }

  updateUser(id: string, updates: Partial<User>): User | undefined {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  deleteUser(id: string): boolean {
    return this.users.delete(id);
  }
}

// 测试
const manager = new SimpleUserManager();

const newUser = manager.createUser({
  username: "alice",
  email: "alice@example.com"
});

console.log("创建用户:", newUser);

const updated = manager.updateUser(newUser.id, {
  avatar: "alice.jpg"
});

console.log("更新用户:", updated);
```

---

## 文件说明

本章包含以下文件：

| 文件名 | 说明 |
|--------|------|
| `interfaces.ts` | 本章所有接口示例代码，包含完整的使用演示 |
| `practice-solution.html` | 本章练习题的参考答案 |

---

## 练习题

### 基础练习

**练习 4.1**：定义一个 `Book` 接口，包含书名（string）、作者（string）、出版年份（number）、是否已读（boolean，可选）。创建两个 Book 实例，一个包含所有属性，一个只包含必需属性。

**练习 4.2**：创建一个 `Rectangle` 接口，包含宽度和高度（都是 number）。编写一个函数计算矩形的面积。

**练习 4.3**：创建一个函数接口 `ProcessFunc`，接受一个字符串参数，返回布尔值。使用这个接口定义一个验证邮箱格式的函数。

### 进阶练习

**练习 4.4**：创建一个 `Vehicle` 接口，然后创建 `Car` 和 `Motorcycle` 接口继承 `Vehicle`。`Vehicle` 包含品牌和年份，`Car` 额外包含车门数量，`Motorcycle` 额外包含最大速度。

**练习 4.5**：创建一个动态配置接口 `Config`，允许任意字符串键，值可以是 string、number 或 boolean。创建配置对象并验证类型安全。

### 挑战练习

**练习 4.6**：构建一个简单的电商产品系统，包含以下接口：
- `Product`：产品基本信息
- `ProductWithDiscount`：继承 Product，添加折扣相关属性
- `CartItem`：购物车项，包含产品引用和数量
- `ShoppingCart`：购物车，包含购物车项列表

编写函数实现添加商品到购物车、计算总价等功能。

---

## 学习目标检查清单

- [ ] 理解接口的概念和用途
- [ ] 能够定义和使用基本接口
- [ ] 掌握可选属性和只读属性的使用
- [ ] 能够定义和使用函数类型接口
- [ ] 理解和使用索引签名
- [ ] 掌握接口的单继承和多重继承
- [ ] 理解接口和类型别名的区别
- [ ] 能够在实际项目中合理使用接口
