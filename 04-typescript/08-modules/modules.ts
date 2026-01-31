// modules.ts - TypeScript 模块系统示例

// ========================================
// 8.1 模块基础
// ========================================

console.log("=== 模块基础 ===");

// 注意：在实际项目中，这些导入需要从对应的模块文件导入
// 这里我们使用模拟的方式展示模块的使用

// 模拟 math 模块的导出
const MathModule = {
  PI: 3.14159,
  E: 2.71828,
  add: (a: number, b: number) => a + b,
  multiply: (a: number, b: number) => a * b,
  subtract: (a: number, b: number) => a - b,
  divide: (a: number, b: number) => b === 0 ? NaN : a / b
};

console.log("Math.PI:", MathModule.PI);
console.log("add(2, 3):", MathModule.add(2, 3));
console.log("multiply(2, 3):", MathModule.multiply(2, 3));

// 命名导入
const { add, multiply } = MathModule;
console.log("Named imports - add(5, 3):", add(5, 3));
console.log("Named imports - multiply(5, 3):", multiply(5, 3));

// 重命名导入
const { add as sum, multiply as product } = MathModule;
console.log("Renamed imports - sum(10, 20):", sum(10, 20));
console.log("Renamed imports - product(10, 20):", product(10, 20));

// 命名空间导入
const MathUtils = MathModule;
console.log("Namespace import - MathUtils.PI:", MathUtils.PI);

// ========================================
// 8.2 默认导出
// ========================================

console.log("\n=== 默认导出 ===");

// 模拟 UserManager 类（默认导出）
class UserManager {
  private users: { id: string; name: string; email: string }[] = [];

  addUser(user: { id: string; name: string; email: string }): void {
    this.users.push(user);
  }

  getUser(id: string): { id: string; name: string; email: string } | undefined {
    return this.users.find(u => u.id === id);
  }

  getAllUsers(): { id: string; name: string; email: string }[] {
    return [...this.users];
  }
}

// 默认导出实例
const userManager = new UserManager();

// 模拟导入
const ImportedUserManager = UserManager;
const manager = new ImportedUserManager();

manager.addUser({ id: "1", name: "Alice", email: "alice@example.com" });
manager.addUser({ id: "2", name: "Bob", email: "bob@example.com" });

console.log("User Manager Users:", manager.getAllUsers());

// 混合导出
const MixedModule = {
  default: class Utilities {
    static format(data: any): string {
      return JSON.stringify(data, null, 2);
    }
  },
  formatDate: (date: Date): string => date.toISOString(),
  capitalize: (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)
};

// 模拟混合导入
const Utilities = MixedModule.default;
console.log("Default import:", Utilities.format({ test: true }));
console.log("Named imports:", MixedModule.capitalize("hello"));
console.log("Named imports:", MixedModule.formatDate(new Date()));

// ========================================
// 8.3 模块解析配置
// ========================================

console.log("\n=== 模块解析配置 ===");

// 路径别名示例（在实际项目中需要配置 tsconfig.json）
const pathsExample = {
  "@src/*": ["./src/*"],
  "@components/*": ["./src/components/*"],
  "@utils/*": ["./src/utils/*"],
  "@config/*": ["./src/config/*"]
};

console.log("Path aliases configured:", JSON.stringify(pathsExample, null, 2));

// 模拟使用路径别名
const aliasImports = {
  "@utils/math": MathModule,
  "@utils/string": {
    capitalize: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
    lowercase: (s: string) => s.toLowerCase()
  }
};

console.log("Alias import @utils/math:", aliasImports["@utils/math"].add(1, 2));
console.log("Alias import @utils/string:", aliasImports["@utils/string"].capitalize("test"));

// ========================================
// 8.4 声明文件
// ========================================

console.log("\n=== 声明文件 ===");

// 模拟 declare module
declare module "my-library" {
  export function myFunction(x: number): number;
  export class MyClass {
    constructor(value: string);
    method(): void;
  }
}

// 使用模拟的声明
const MyLibraryShim = {
  myFunction: (x: number) => x * 2,
  MyClass: class {
    constructor(public value: string) {}
    method() {
      console.log(`MyClass: ${this.value}`);
    }
  }
};

console.log("myLibrary.myFunction(5):", MyLibraryShim.myFunction(5));
const myInstance = new MyLibraryShim.MyClass("test");
myInstance.method();

// 全局声明模拟
interface GlobalConfig {
  apiUrl: string;
  debug: boolean;
}

const GLOBAL_CONFIG: GlobalConfig = {
  apiUrl: "https://api.example.com",
  debug: true
};

console.log("Global config:", GLOBAL_CONFIG);

// ========================================
// 8.5 实战示例：项目结构组织
// ========================================

console.log("\n=== 实战示例：项目结构组织 ===");

// 类型定义
interface User {
  id: string;
  name: string;
  email: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

// 工具函数
const StringUtils = {
  capitalize: (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1),

  truncate: (str: string, maxLength: number): string =>
    str.length <= maxLength ? str : str.slice(0, maxLength) + "...",

  slugify: (str: string): string =>
    str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "")
};

const ArrayUtils = {
  chunk: <T>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  },

  unique: <T>(arr: T[]): T[] => [...new Set(arr)],

  shuffle: <T>(arr: T[]): T[] => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
};

console.log("StringUtils.capitalize('hello'):", StringUtils.capitalize("hello"));
console.log("StringUtils.truncate('Hello World', 5):", StringUtils.truncate("Hello World", 5));
console.log("ArrayUtils.chunk([1,2,3,4,5,6], 2):", ArrayUtils.chunk([1,2,3,4,5,6], 2));
console.log("ArrayUtils.unique([1,2,2,3,3,3]):", ArrayUtils.unique([1,2,2,3,3,3]));

// 服务层
const api = {
  get: async <T>(url: string): Promise<ApiResponse<T>> => {
    console.log(`GET ${url}`);
    return { data: {} as T, success: true, message: "OK" };
  },
  post: async <T>(url: string, data: any): Promise<ApiResponse<T>> => {
    console.log(`POST ${url}`, data);
    return { data: {} as T, success: true, message: "Created" };
  }
};

class AuthService {
  private token: string | null = null;

  login(email: string, password: string): Promise<User> {
    console.log(`Login: ${email}`);
    return Promise.resolve({
      id: "1",
      name: "Test User",
      email
    });
  }

  logout(): void {
    this.token = null;
    console.log("Logged out");
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }
}

const auth = new AuthService();

// 配置
const config = {
  apiUrl: import.meta.env?.VITE_API_URL || "/api",
  appName: import.meta.env?.VITE_APP_NAME || "My App",
  version: import.meta.env?.VITE_APP_VERSION || "1.0.0"
};

console.log("Config:", config);

// ========================================
// 8.6 动态导入
// ========================================

console.log("\n=== 动态导入 ===");

// 模拟动态导入
async function loadModule(modulePath: string) {
  console.log(`Dynamically loading: ${modulePath}`);
  // 在实际项目中：const module = await import(modulePath);
  return {
    default: class DynamicModule {
      constructor() {
        console.log(`Dynamic module initialized: ${modulePath}`);
      }
    },
    exportedFunction: () => `Function from ${modulePath}`
  };
}

// 使用动态导入
async function dynamicImportExample() {
  try {
    const module = await loadModule("./dynamicModule");
    const instance = new module.default();
    console.log(module.exportedFunction());
  } catch (error) {
    console.error("Failed to load module:", error);
  }
}

dynamicImportExample();

// 条件导入示例
async function loadFeature(featureFlag: string) {
  console.log(`Loading feature: ${featureFlag}`);

  if (featureFlag === "featureA") {
    // 模拟 FeatureA
    return {
      name: "Feature A",
      render: () => console.log("Rendering Feature A")
    };
  } else {
    // 模拟 FeatureB
    return {
      name: "Feature B",
      render: () => console.log("Rendering Feature B")
    };
  }
}

async function featureLoader() {
  const feature = await loadFeature("featureA");
  console.log("Loaded feature:", feature.name);
  feature.render();
}

featureLoader();

// ========================================
// 综合示例：模块化待办应用
// ========================================

console.log("\n=== 综合示例：模块化待办应用 ===");

// types/todo.ts
interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

// store/todoStore.ts
class TodoStore {
  private todos: Todo[] = [];
  private listeners: (() => void)[] = [];

  add(todo: Omit<Todo, "id" | "completed" | "createdAt">): Todo {
    const newTodo: Todo = {
      ...todo,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date()
    };
    this.todos.push(newTodo);
    this.notify();
    return newTodo;
  }

  toggle(id: string): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.notify();
    }
  }

  delete(id: string): void {
    this.todos = this.todos.filter(t => t.id !== id);
    this.notify();
  }

  getAll(): Todo[] {
    return [...this.todos];
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach(listener => listener());
  }
}

// services/todoService.ts
class TodoService {
  private store = new TodoStore();

  getTodos(): Todo[] {
    return this.store.getAll();
  }

  addTodo(title: string): Todo {
    return this.store.add({ title });
  }

  toggleTodo(id: string): void {
    this.store.toggle(id);
  }

  deleteTodo(id: string): void {
    this.store.delete(id);
  }

  subscribe(listener: () => void): () => void {
    return this.store.subscribe(listener);
  }
}

// 模拟运行
const todoService = new TodoService();

// 添加待办事项
todoService.addTodo("学习 TypeScript");
todoService.addTodo("完成项目");
todoService.addTodo("阅读文档");

console.log("Initial todos:", todoService.getTodos().map(t => t.title));

// 切换完成状态
const todos = todoService.getTodos();
if (todos.length > 0) {
  todoService.toggleTodo(todos[0].id);
}

console.log("After toggle:", todoService.getTodos().map(t => ({ title: t.title, completed: t.completed })));

// 删除待办事项
todoService.deleteTodo(todos[1].id);
console.log("After delete:", todoService.getTodos().map(t => t.title));

console.log("\n所有模块示例执行完成！");
