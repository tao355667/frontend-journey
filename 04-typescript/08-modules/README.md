# 第八章：模块系统

## 本章目的

掌握 TypeScript 的模块系统，包括导出导入语法、模块解析、默认导出与命名导出、模块路径别名等内容，能够组织大型 TypeScript 项目的代码结构。

---

## 8.1 模块基础

TypeScript 使用 ES6 模块系统，允许你将代码分割到多个文件中，通过导出和导入进行组织。

### 导出

有两种导出方式：命名导出和默认导出。

```typescript
// math.ts - 命名导出

// 导出变量
export const PI = 3.14159;
export const E = 2.71828;

// 导出函数
export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

// 导出类
export class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
}

// 批量导出（声明后导出）
function subtract(a: number, b: number): number {
  return a - b;
}

function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

export { subtract, divide };
```

### 导入

```typescript
// main.ts - 导入

// 导入命名导出
import { add, multiply, PI } from "./math";

console.log(add(2, 3));           // 5
console.log(multiply(2, 3));      // 6
console.log(PI);                  // 3.14159

// 重命名导入
import { add as sum, multiply as product } from "./math";
console.log(sum(1, 2));           // 1 + 2 = 3
console.log(product(1, 2));       // 1 × 2 = 2

// 导入所有导出为命名空间
import * as MathUtils from "./math";
console.log(MathUtils.add(1, 2));     // 3
console.log(MathUtils.PI);            // 3.14159
```

---

## 8.2 默认导出

每个模块可以有一个默认导出。

```typescript
// user.ts - 默认导出

interface User {
  id: string;
  name: string;
  email: string;
}

class UserManager {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  getUser(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }
}

// 默认导出（只能有一个）
export default UserManager;
```

```typescript
// main.ts - 导入默认导出

// 导入默认导出（不使用花括号）
import UserManager from "./user";

const manager = new UserManager();
manager.addUser({
  id: "1",
  name: "Alice",
  email: "alice@example.com"
});

console.log(manager.getUser("1"));
```

### 混合导出

```typescript
// utilities.ts

// 默认导出
export default class Utilities {}

// 命名导出
export const formatDate = (date: Date): string => {
  return date.toISOString();
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
```

```typescript
// main.ts

import Utilities, { formatDate, capitalize } from "./utilities";

const utils = new Utilities();
console.log(formatDate(new Date()));
console.log(capitalize("hello"));
```

---

## 8.3 模块解析

TypeScript 提供了多种模块解析策略来查找导入的模块。

### 相对导入和非相对导入

```typescript
// 相对导入（以 ./ 或 ../ 开头）
import { something } from "./localModule";
import { something } from "../parentModule";

// 非相对导入
import { something } from "packageName";
import { something } from "@scope/packageName";
```

### tsconfig.json 中的模块解析配置

```json
{
  "compilerOptions": {
    // 模块解析策略
    "moduleResolution": "node",

    // 基础路径
    "baseUrl": "./",

    // 路径别名
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    },

    // 解析 JSON 模块
    "resolveJsonModule": true,

    // ES 模块互操作性
    "esModuleInterop": true,

    // 解析扩展名
    "allowSyntheticDefaultImports": true
  }
}
```

### 路径别名的使用

```typescript
// tsconfig.json 配置
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@components/*": ["./components/*"],
      "@utils/*": ["./utils/*"]
    }
  }
}
```

```typescript
// 在代码中使用别名
import Button from "@components/Button";
import { formatDate } from "@utils/date";
import { API_URL } from "@config";
```

---

## 8.4 声明文件

声明文件（.d.ts）用于为 JavaScript 库提供类型信息。

### 编写声明文件

```typescript
// my-library.d.ts

// 模块声明
declare module "my-library" {
  export function myFunction(x: number): number;
  export class MyClass {
    constructor(value: string);
    method(): void;
  }
  export interface MyInterface {
    property: string;
  }
}

// 全局声明
declare global {
  interface Window {
    myGlobal: any;
  }
}

// 全局变量声明
declare const GLOBAL_CONFIG: {
  apiUrl: string;
  debug: boolean;
};
```

### 第三方库的类型

```bash
# 安装类型定义
npm install @types/lodash
npm install @types/node

# 使用
import * as _ from "lodash";
```

---

## 8.5 实战示例：项目结构组织

创建一个完整的项目结构，展示模块的最佳实践。

```
src/
├── index.ts
├── config/
│   └── index.ts
├── utils/
│   ├── math.ts
│   └── string.ts
├── components/
│   ├── Button/
│   │   ├── index.ts
│   │   └── Button.ts
│   └── Card/
│       ├── index.ts
│       └── Card.ts
├── services/
│   ├── api.ts
│   └── auth.ts
└── types/
    └── index.ts
```

```typescript
// src/types/index.ts - 集中导出类型

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}
```

```typescript
// src/utils/math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export const PI = 3.14159;
```

```typescript
// src/utils/string.ts
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}
```

```typescript
// src/utils/index.ts - 重新导出
export * from "./math";
export * from "./string";
```

```typescript
// src/components/Button/Button.ts
export interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

export class Button {
  private element: HTMLButtonElement;

  constructor(props: ButtonProps) {
    this.element = document.createElement("button");
    this.element.textContent = props.label;
    this.element.disabled = props.disabled || false;

    if (props.onClick) {
      this.element.addEventListener("click", props.onClick);
    }
  }

  render(): HTMLButtonElement {
    return this.element;
  }
}
```

```typescript
// src/components/Button/index.ts
export { Button, ButtonProps } from "./Button";
```

```typescript
// src/components/Card/Card.ts
export interface CardProps {
  title: string;
  content: string;
}

export class Card {
  private element: HTMLDivElement;

  constructor(props: CardProps) {
    this.element = document.createElement("div");
    this.element.innerHTML = `
      <h2>${props.title}</h2>
      <p>${props.content}</p>
    `;
  }

  render(): HTMLDivElement {
    return this.element;
  }
}
```

```typescript
// src/components/Card/index.ts
export { Card, CardProps } from "./Card";
```

```typescript
// src/components/index.ts
export * from "./Button";
export * from "./Card";
```

```typescript
// src/services/api.ts
import { ApiResponse } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  return response.json();
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, data: any) =>
    request<T>(endpoint, { method: "POST", body: JSON.stringify(data) }),
  put: <T>(endpoint: string, data: any) =>
    request<T>(endpoint, { method: "PUT", body: JSON.stringify(data) }),
  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: "DELETE" }),
};
```

```typescript
// src/services/auth.ts
import { User } from "../types";

class AuthService {
  private tokenKey = "auth_token";

  login(email: string, password: string): Promise<User> {
    // 模拟登录
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: "1",
          name: "Test User",
          email,
        };
        localStorage.setItem(this.tokenKey, "mock_token");
        resolve(user);
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}

export const auth = new AuthService();
```

```typescript
// src/config/index.ts
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || "/api",
  appName: import.meta.env.VITE_APP_NAME || "My App",
  version: import.meta.env.VITE_APP_VERSION || "1.0.0",
};

export default config;
```

```typescript
// src/index.ts - 主入口文件

import { Button, Card } from "./components";
import { add, capitalize, truncate } from "./utils";
import { api } from "./services/api";
import { auth } from "./services/auth";
import { User } from "./types";
import { config } from "./config";

// 使用组件
const button = new Button({
  label: "Click me",
  onClick: () => console.log("Button clicked!"),
});

const card = new Card({
  title: "Welcome",
  content: "This is a TypeScript project!",
});

// 使用工具函数
console.log(add(1, 2));
console.log(capitalize("hello"));
console.log(truncate("Hello World", 5));

// 使用服务
async function init() {
  const isAuth = auth.isAuthenticated();
  console.log("Is authenticated:", isAuth);

  try {
    const response = await api.get<User[]>("/users");
    console.log("Users:", response.data);
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
}

init();

// 使用配置
console.log(`App: ${config.appName}, Version: ${config.version}`);
```

---

## 8.6 动态导入

动态导入可以按需加载模块，减少初始加载时间。

```typescript
// 静态导入
import { heavyFunction } from "./heavyModule";

// 动态导入
async function loadModule() {
  const module = await import("./heavyModule");
  module.heavyFunction();
}

// 条件导入
async function loadFeature(featureFlag: string) {
  if (featureFlag === "featureA") {
    const { FeatureA } = await import("./FeatureA");
    return new FeatureA();
  } else {
    const { FeatureB } = await import("./FeatureB");
    return new FeatureB();
  }
}
```

---

## 文件说明

本章包含以下文件：

| 文件名 | 说明 |
|--------|------|
| `modules.ts` | 本章所有模块示例代码，包含完整的使用演示 |
| `practice-solution.html` | 本章练习题的参考答案 |

---

## 练习题

### 基础练习

**练习 8.1**：创建一个 `utils` 模块，包含以下函数并导出：
- `isEven(n)`：判断是否为偶数
- `isPrime(n)`：判断是否为质数
- `factorial(n)`：计算阶乘

**练习 8.2**：创建一个 `User` 类，包含 `name` 和 `age` 属性，以及 `introduce` 方法。使用默认导出。

**练习 8.3**：创建两个模块，一个导出 `Rectangle` 类，一个导出 `Circle` 类，然后在主模块中导入并使用它们。

### 进阶练习

**练习 8.4**：为以下场景设计模块结构：
- 用户认证模块
- 产品管理模块
- 订单处理模块
- 支付模块

要求使用合理的目录结构和导出导入方式。

**练习 8.5**：配置 `tsconfig.json`，添加以下路径别名：
- `@src/*` → `src/*`
- `@components/*` → `src/components/*`
- `@utils/*` → `src/utils/*`

### 挑战练习

**练习 8.6**：创建一个工具库，包含以下模块：
- `arrayUtils`：数组工具函数
- `objectUtils`：对象工具函数
- `stringUtils`：字符串工具函数
- `typeUtils`：类型检查工具

使用 barrel file（index.ts）统一导出所有功能。

**练习 8.7**：为一个待办事项应用设计模块结构，包括：
- 类型定义
- 状态管理
- API 服务
- UI 组件
- 工具函数

创建必要的声明文件和模块配置。

---

## 学习目标检查清单

- [ ] 理解模块的概念和作用域
- [ ] 掌握命名导出和导入的语法
- [ ] 掌握默认导出和导入的语法
- [ ] 理解相对导入和非 Relative Import 的区别
- [ ] 掌握模块解析配置选项
- [ ] 能够配置和使用路径别名
- [ ] 理解声明文件的作用和编写方法
- [ ] 掌握动态导入的使用场景
- [ ] 能够组织大型项目的模块结构
