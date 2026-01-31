// interfaces.ts - TypeScript 接口示例

// ========================================
// 4.1 接口基础
// ========================================

// 定义用户接口
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

console.log("=== 接口基础 ===");
console.log("用户信息:", user);

// 函数接口
interface SearchFunc {
  (source: string, subString: string): boolean;
}

const mySearch: SearchFunc = (source, subString) => {
  return source.indexOf(subString) > -1;
};

console.log("搜索 'world':", mySearch("hello world", "world"));  // true
console.log("搜索 'test':", mySearch("hello world", "test"));    // false

// ========================================
// 4.2 可选属性与只读属性
// ========================================

console.log("\n=== 可选属性与只读属性 ===");

// 联系人接口
interface Contact {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

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

console.log("联系人1:", printContact(contact1));
console.log("联系人2:", printContact(contact2));

// 只读属性
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

config.name = "New Name";
console.log("配置信息:", config);
// config.id = "config-002";  // 错误：只读

// ========================================
// 4.3 函数类型接口
// ========================================

console.log("\n=== 函数类型接口 ===");

// 比较函数接口
interface CompareFunc {
  (a: number, b: number): number;
}

const compare: CompareFunc = (a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
};

console.log("比较 5 和 3:", compare(5, 3));
console.log("比较 3 和 5:", compare(3, 5));
console.log("比较 5 和 5:", compare(5, 5));

// 泛型函数接口
interface PairCompareFunc<T> {
  (a: T, b: T): number;
}

const compareStrings: PairCompareFunc<string> = (a, b) => {
  return a.localeCompare(b);
};

console.log("比较 'apple' 和 'banana':", compareStrings("apple", "banana"));

// 数据处理函数接口
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
console.log("处理结果:", result);

// ========================================
// 4.4 索引签名
// ========================================

console.log("\n=== 索引签名 ===");

// 字符串索引签名
interface StringMap {
  [key: string]: string;
}

const dictionary: StringMap = {
  hello: "你好",
  world: "世界",
  goodbye: "再见"
};

dictionary["greeting"] = "问候";
console.log("字典:", dictionary);

// 数字索引签名（类似数组）
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = ["Apple", "Banana", "Orange"];
console.log("数组元素:", myArray[0], myArray[1]);

// 混合索引签名
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

console.log("混合索引:", mixed["name"], mixed[0]);

// ========================================
// 4.5 接口继承
// ========================================

console.log("\n=== 接口继承 ===");

// 单继承
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

console.log("狗的信息:", myDog);
myDog.bark();

// 多重继承
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

const frog = new Frog(true);
frog.walk();
frog.swim();
console.log("两栖动物:", frog);

// ========================================
// 4.6 接口与类型别名的比较
// ========================================

console.log("\n=== 接口与类型别名 ===");

// 相同点
interface Point1 {
  x: number;
  y: number;
}

type Point2 = {
  x: number;
  y: number;
};

const p1: Point1 = { x: 1, y: 2 };
const p2: Point2 = { x: 3, y: 4 };
console.log("Point1:", p1);
console.log("Point2:", p2);

// 不同点：同名接口合并
interface Box {
  width: number;
}

interface Box {
  height: number;
}

const box: Box = {
  width: 10,
  height: 20
};
console.log("合并的 Box:", box);

// 不同点：类型别名可以创建联合类型
type ID = string | number;
type Status = "active" | "inactive" | "pending";

const userId: ID = "user-001";
const productId: ID = 12345;
const userStatus: Status = "active";
console.log("ID 类型:", userId, productId);
console.log("Status 类型:", userStatus);

// ========================================
// 4.7 实战示例：构建用户系统
// ========================================

console.log("\n=== 实战示例：用户系统 ===");

// 用户基本信息接口
interface User {
  readonly id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

// 用户详细信息接口
interface UserProfile extends User {
  bio?: string;
  followers: number;
  following: number;
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

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }
}

// 测试用户系统
const manager = new SimpleUserManager();

// 创建用户
const user1 = manager.createUser({
  username: "alice",
  email: "alice@example.com"
});

const user2 = manager.createUser({
  username: "bob",
  email: "bob@example.com",
  avatar: "bob.jpg"
});

console.log("创建的用户:", user1.username, user2.username);

// 更新用户
const updatedUser = manager.updateUser(user1.id, {
  avatar: "alice_new.jpg"
});

console.log("更新后的用户:", updatedUser?.avatar);

// 获取所有用户
console.log("所有用户:", manager.getAllUsers().map(u => u.username));

// 删除用户
console.log("删除用户:", manager.deleteUser(user2.id));
console.log("删除后用户数:", manager.getAllUsers().length);

// ========================================
// 综合示例：产品目录系统
// ========================================

console.log("\n=== 综合示例：产品目录系统 ===");

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

interface ProductWithRating extends Product {
  rating: number;
  reviewCount: number;
}

interface ProductManager {
  products: ProductWithRating[];

  addProduct(product: Omit<ProductWithRating, "id">): ProductWithRating;
  getProduct(id: string): ProductWithRating | undefined;
  getProductsByCategory(category: string): ProductWithRating[];
  getTopRatedProducts(minRating: number): ProductWithRating[];
  updateStock(id: string, inStock: boolean): boolean;
}

class SimpleProductManager implements ProductManager {
  products: ProductWithRating[] = [];

  addProduct(product: Omit<ProductWithRating, "id">): ProductWithRating {
    const newProduct: ProductWithRating = {
      ...product,
      id: `prod-${Date.now()}`
    };
    this.products.push(newProduct);
    return newProduct;
  }

  getProduct(id: string): ProductWithRating | undefined {
    return this.products.find(p => p.id === id);
  }

  getProductsByCategory(category: string): ProductWithRating[] {
    return this.products.filter(p => p.category === category);
  }

  getTopRatedProducts(minRating: number): ProductWithRating[] {
    return this.products.filter(p => p.rating >= minRating);
  }

  updateStock(id: string, inStock: boolean): boolean {
    const product = this.getProduct(id);
    if (!product) return false;
    product.inStock = inStock;
    return true;
  }
}

// 测试产品系统
const productManager = new SimpleProductManager();

// 添加产品
const laptop = productManager.addProduct({
  name: "Laptop",
  price: 999.99,
  category: "Electronics",
  inStock: true,
  rating: 4.5,
  reviewCount: 128
});

const book = productManager.addProduct({
  name: "TypeScript Guide",
  price: 49.99,
  category: "Books",
  inStock: true,
  rating: 4.8,
  reviewCount: 256
});

const phone = productManager.addProduct({
  name: "Smartphone",
  price: 699.99,
  category: "Electronics",
  inStock: false,
  rating: 4.2,
  reviewCount: 89
});

console.log("所有产品:", productManager.products.map(p => `${p.name} - $${p.price}`));
console.log("电子产品:", productManager.getProductsByCategory("Electronics").map(p => p.name));
console.log("高评分产品:", productManager.getTopRatedProducts(4.5).map(p => p.name));

console.log("\n所有接口示例执行完成！");
