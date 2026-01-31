# 第二章：安装与配置

## 本章目的

掌握 TypeScript 的本地安装、项目初始化和配置文件创建，能够独立搭建 TypeScript 开发环境。

---

## 2.1 安装 TypeScript

TypeScript 可以通过多种方式安装，最常用的是通过 npm（Node Package Manager）安装。这一节将详细介绍不同场景下的安装方法。

### 全局安装

全局安装意味着 TypeScript 编译器可以在任何目录下使用，适合经常使用 TypeScript 的开发者。打开终端（Windows 上是 CMD 或 PowerShell，macOS 和 Linux 上是 Terminal），执行以下命令：

```bash
npm install -g typescript
```

安装完成后，验证安装是否成功：

```bash
tsc --version
```

如果输出类似 `TypeScript version 5.3.3`，说明安装成功。全局安装后，你可以在任何目录下使用 `tsc` 命令来编译 TypeScript 文件。

全局安装的优点是方便，缺点是不同项目可能需要不同版本的 TypeScript，全局安装可能造成版本冲突。

### 本地安装

在项目中使用本地安装是更好的实践，它可以确保项目使用特定版本的 TypeScript，不会与其他项目产生冲突。在项目根目录下执行：

```bash
npm init -y
npm install typescript --save-dev
```

本地安装后，TypeScript 编译器位于 `node_modules/.bin/tsc`，你可以通过以下方式运行：

```bash
# Linux/macOS
./node_modules/.bin/tsc --version

# Windows
node_modules\.bin\tsc --version
```

### 使用 npx 运行

npx 是 npm 5.2.0 引入的工具，它可以自动查找并运行本地安装的包，无需指定完整路径：

```bash
npx tsc --version
```

npx 会自动在当前项目的 `node_modules` 中查找 `tsc`，如果找不到，会临时下载并运行指定版本的 TypeScript。

### 使用 pnpm

如果你使用 pnpm 作为包管理器，安装命令是：

```bash
pnpm add typescript --save-dev
```

pnpm 的安装速度和磁盘占用都比 npm 优化很多，适合大型项目。

---

## 2.2 创建 TypeScript 项目

创建一个新的 TypeScript 项目需要几个步骤。这一节将详细介绍如何从零开始创建一个完整的 TypeScript 项目。

### 初始化项目

首先创建一个新目录并进入：

```bash
mkdir my-typescript-project
cd my-typescript-project
```

初始化 npm 项目：

```bash
npm init -y
```

这会创建一个 `package.json` 文件，它是 npm 项目的配置文件。

### 安装 TypeScript

将 TypeScript 作为开发依赖安装：

```bash
npm install typescript --save-dev
```

### 初始化 TypeScript 配置

使用 TypeScript 编译器自带的功能初始化配置文件：

```bash
npx tsc --init
```

这个命令会创建一个 `tsconfig.json` 文件，这是 TypeScript 项目的核心配置文件。默认生成的配置已经包含了常用的选项，你可以根据需要进行修改。

### 创建示例文件

创建第一个 TypeScript 文件 `src/index.ts`：

```typescript
// src/index.ts - 项目入口文件

// 欢迎消息
const welcome: string = "欢迎来到 TypeScript 项目！";
console.log(welcome);

// 简单的加法函数
function add(a: number, b: number): number {
  return a + b;
}

console.log(`1 + 2 = ${add(1, 2)}`);
console.log(`10 + 20 = ${add(10, 20)}`);
```

### 编译运行

在项目根目录下运行编译命令：

```bash
npx tsc
```

这会编译所有 TypeScript 文件并在同一目录下生成对应的 JavaScript 文件。编译成功后，运行生成的文件：

```bash
node src/index.js
```

你应该能看到以下输出：

```
欢迎来到 TypeScript 项目！
1 + 2 = 3
10 + 20 = 30
```

---

## 2.3 tsconfig.json 详解

`tsconfig.json` 是 TypeScript 项目的配置文件，它告诉编译器如何编译你的代码。理解这个文件是掌握 TypeScript 的重要一步。

### 基本结构

一个典型的 `tsconfig.json` 文件包含以下几个部分：

```json
{
  // 编译器选项
  "compilerOptions": {
    /* 基本选项 */
    "target": "ES2020",                    // 指定 ECMAScript 目标版本
    "module": "commonjs",                  // 指定模块系统
    "lib": ["ES2020"],                     // 指定要包含的库文件
    "outDir": "./dist",                    // 输出目录
    "rootDir": "./src",                    // 源文件目录

    /* 严格类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 禁止隐式 any 类型
    "strictNullChecks": true,              // 严格空值检查

    /* 模块解析选项 */
    "moduleResolution": "node",            // 模块解析策略
    "esModuleInterop": true,               // 启用 ES 模块互操作性
    "resolveJsonModule": true,             // 允许导入 JSON 文件

    /* 源代码映射 */
    "sourceMap": true,                     // 生成 sourceMap 文件
    "declaration": true,                   // 生成声明文件

    /* 其他选项 */
    "skipLibCheck": true,                  // 跳过库文件类型检查
    "forceConsistentCasingInFileNames": true // 强制文件名大小写一致
  },

  // 包含的文件
  "include": ["src/**/*"],

  // 排除的文件
  "exclude": ["node_modules", "dist"]
}
```

### 常用 compilerOptions 详解

**target 选项**

`target` 选项指定编译后的 JavaScript 版本。更高的版本支持更多的现代特性，但兼容性可能较差。

```json
"target": "ES2020"
```

常用值：
- `"ES5"`：支持所有现代浏览器
- `"ES2015"`（或 `"ES6"`）：ES6 标准
- `"ES2020"`：ES2020 标准，支持可选链操作符等特性
- `"ESNext"`：最新版本

**module 选项**

`module` 选项指定使用的模块系统。

```json
"module": "commonjs"
```

常用值：
- `"commonjs"`：Node.js 传统模块系统
- `"esnext"`：ES6 模块系统
- `"amd"`：RequireJS 模块系统
- `"umd"`：通用模块系统

**strict 选项**

`strict` 选项启用所有严格类型检查选项，这是推荐的做法。

```json
"strict": true
```

启用 strict 后，以下选项自动为 true：
- `noImplicitAny`：禁止隐式 any 类型
- `strictNullChecks`：严格空值检查
- `strictFunctionTypes`：严格函数类型检查
- `strictBindCallApply`：严格 bind/call/apply 检查
- `strictPropertyInitialization`：严格属性初始化检查
- `noImplicitThis`：禁止隐式 this

**outDir 和 rootDir**

```json
"outDir": "./dist",        // 输出目录
"rootDir": "./src"         // 源文件目录
```

这两个选项控制编译输出目录结构。确保 `rootDir` 包含所有源文件，否则编译器会报错。

### 包含和排除

```json
"include": ["src/**/*"],           // 包含 src 目录下所有文件
"exclude": ["node_modules", "dist"] // 排除 node_modules 和 dist 目录
```

`include` 使用 glob 模式匹配文件：
- `*` 匹配任意文件名
- `**` 匹配任意目录深度
- `?` 匹配单个字符

### 配置文件继承

TypeScript 支持配置文件继承，可以使用 `extends` 选项：

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    // 覆盖或添加选项
  }
}
```

这在大型项目中很有用，可以创建基础配置供多个项目共享。

---

## 2.4 使用 IDE 开发 TypeScript

选择一个好的 IDE 可以大幅提升 TypeScript 开发效率。这一节将介绍主流的 TypeScript 开发工具。

### Visual Studio Code

VS Code 是 TypeScript 开发的最佳选择，它由微软开发，与 TypeScript 的集成非常紧密。

**安装和配置**

VS Code 是免费的，可以从官网下载安装。安装完成后，建议安装以下扩展：

- **TypeScript Hero**：提供更好的导入管理和代码补全
- **ESLint**：代码风格检查
- **Prettier**：代码格式化

**配置 TypeScript 版本**

VS Code 自带 TypeScript 编译器，但它可能与项目本地安装的版本不同。可以按 `Ctrl+Shift+P`（Windows/Linux）或 `Cmd+Shift+P`（macOS），输入 "TypeScript: Select TypeScript Version"，选择 "Use Workspace Version"。

### WebStorm

WebStorm 是 JetBrains 开发的强大 IDE，对 TypeScript 有很好的支持。它提供了智能代码补全、重构工具、调试器等功能。WebStorm 是付费软件，但提供 30 天免费试用。

### 使用 tsc 监视模式

在开发过程中，每次修改代码后手动编译很繁琐。使用 `--watch` 选项可以让编译器监视文件变化并自动重新编译：

```bash
npx tsc --watch
# 或简写
npx tsc -w
```

开启监视模式后，编译器会持续监视项目中的 TypeScript 文件，一旦检测到变化就会自动重新编译。这在开发过程中非常有用。

### 配置 npm 脚本

在 `package.json` 中添加 npm 脚本，方便运行常用命令：

```json
{
  "scripts": {
    "build": "tsc",
    "build:watch": "tsc -w",
    "lint": "eslint src --ext .ts",
    "format": "prettier --write src/**/*.ts"
  }
}
```

添加脚本后，可以使用以下命令：

```bash
npm run build        # 编译项目
npm run build:watch  # 监视模式编译
npm run lint         # 检查代码风格
npm run format       # 格式化代码
```

---

## 2.5 常见配置问题

在使用 TypeScript 过程中，可能会遇到一些配置问题。这一节总结了最常见的问题及其解决方法。

### 找不到模块

错误信息：`Cannot find module 'xxx'. Consider using '--resolveJsonModule' to import it with an 'xxx' extension.`

解决方法：确保 `moduleResolution` 设置为 `"node"`，并安装对应的类型定义包：

```bash
npm install @types/node --save-dev
```

### 类型声明冲突

如果遇到类型声明冲突，可能是不同版本的类型定义包导致的。可以使用 `skipLibCheck` 选项跳过库文件的类型检查：

```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

### 输出目录为空

如果编译后输出目录为空，检查以下配置：

1. 确保 `include` 正确配置了源文件路径
2. 确保 `outDir` 是有效的路径
3. 检查 `rootDir` 是否包含了所有源文件

### ES 模块互操作

导入 CommonJS 模块时出现错误，启用 `esModuleInterop`：

```json
{
  "compilerOptions": {
    "esModuleInterop": true
  }
}
```

---

## 文件说明

本章包含以下文件：

| 文件名 | 说明 |
|--------|------|
| `tsconfig.json` | TypeScript 编译器配置文件，包含常用配置选项 |
| `practice-solution.html` | 本章练习题的参考答案 |

---

## 练习题

### 基础练习

**练习 2.1**：安装 TypeScript 编译器，并使用 `tsc --version` 查看版本号，将版本号截图保存。

**练习 2.2**：创建一个新的 TypeScript 项目，初始化 `package.json`，安装 TypeScript，并创建 `src/index.ts` 文件，包含一个计算圆面积的函数。

### 进阶练习

**练习 2.3**：配置 `tsconfig.json`，满足以下要求：
- 编译目标为 ES2020
- 启用严格模式
- 输出目录为 `./dist`
- 源文件目录为 `./src`
- 生成声明文件（`.d.ts`）

**练习 2.4**：在 `package.json` 中添加 npm 脚本：
- `build`：编译项目
- `build:watch`：监视模式编译
- `start`：运行编译后的文件

### 挑战练习

**练习 2.5**：创建一个多文件的 TypeScript 项目，包含以下结构：
```
my-project/
├── src/
│   ├── utils/
│   │   ├── math.ts
│   │   └── string.ts
│   └── index.ts
├── dist/
├── tsconfig.json
└── package.json
```

要求：
- `math.ts` 包含数学运算函数
- `string.ts` 包含字符串处理函数
- `index.ts` 导入并使用这两个模块的功能
- 正确配置模块解析，确保能正确导入

---

## 学习目标检查清单

- [ ] 掌握 TypeScript 的全局安装和本地安装方法
- [ ] 理解全局安装和本地安装的区别
- [ ] 能够创建 TypeScript 项目并初始化配置
- [ ] 理解 `tsconfig.json` 的基本结构和常用选项
- [ ] 能够根据项目需求配置编译器选项
- [ ] 掌握使用 `--watch` 模式进行开发
- [ ] 能够在 `package.json` 中配置 npm 脚本
- [ ] 能够解决常见的配置问题
