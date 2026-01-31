# 第九章：综合实践

## 本章目的

通过完整的项目实践，综合运用 TypeScript 的各项知识，包括类型系统、接口、类、泛型、模块等，构建一个真实可用的应用程序。

---

## 9.1 项目概述：任务管理系统

在本章中，我们将构建一个完整的任务管理系统（Task Management System）。这个项目将涵盖以下 TypeScript 特性：

- **基础类型**：字符串、数字、布尔值、数组
- **接口和类型别名**：定义数据结构
- **类**：实现业务逻辑
- **泛型**：创建可复用的工具类
- **模块系统**：组织代码结构
- **函数重载和类型约束**：提供灵活的 API

### 功能需求

1. 任务的增删改查（CRUD）
2. 任务状态管理
3. 任务优先级设置
4. 用户管理
5. 任务过滤和搜索
6. 数据持久化

---

## 9.2 类型定义

首先定义项目所需的所有类型。

```typescript
// types/index.ts

// 任务状态
export type TaskStatus = "todo" | "in_progress" | "review" | "done";

// 任务优先级
export type TaskPriority = "low" | "medium" | "high" | "urgent";

// 任务类型
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  tags: string[];
}

// 创建任务的输入
export interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: TaskPriority;
  assignee?: string;
  dueDate?: Date;
  tags?: string[];
}

// 更新任务的输入
export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignee?: string;
  dueDate?: Date;
  tags?: string[];
}

// 过滤器
export interface TaskFilter {
  status?: TaskStatus;
  priority?: TaskPriority;
  assignee?: string;
  searchText?: string;
  tags?: string[];
}

// 分页
export interface Pagination {
  page: number;
  pageSize: number;
}

// 分页结果
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 用户类型
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "member" | "guest";
}

// 项目类型
export interface Project {
  id: string;
  name: string;
  description: string;
  owner: string;
  members: string[];
  createdAt: Date;
}
```

---

## 9.3 工具类和函数

创建可复用的工具类和函数。

```typescript
// utils/idGenerator.ts

// ID 生成器
export class IdGenerator {
  private static counter = 0;

  static generate(): string {
    this.counter++;
    return `${Date.now().toString(36)}_${this.counter}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// 日期格式化
export class DateFormatter {
  static format(date: Date, format: string = "YYYY-MM-DD"): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return format
      .replace("YYYY", String(year))
      .replace("MM", month)
      .replace("DD", day)
      .replace("HH", hours)
      .replace("mm", minutes)
      .replace("ss", seconds);
  }

  static isOverdue(dueDate: Date): boolean {
    return new Date() > dueDate;
  }

  static getDaysUntil(dueDate: Date): number {
    const now = new Date();
    const diff = dueDate.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}
```

```typescript
// utils/validation.ts

// 验证工具
export class Validator {
  static isEmpty(value: string): boolean {
    return value.trim().length === 0;
  }

  static minLength(value: string, min: number): boolean {
    return value.trim().length >= min;
  }

  static maxLength(value: string, max: number): boolean {
    return value.trim().length <= max;
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }
}

// 验证错误
export interface ValidationError {
  field: string;
  message: string;
}

export class ValidationResult {
  errors: ValidationError[] = [];

  get isValid(): boolean {
    return this.errors.length === 0;
  }

  addError(field: string, message: string): void {
    this.errors.push({ field, message });
  }

  getErrorsByField(field: string): string[] {
    return this.errors
      .filter(e => e.field === field)
      .map(e => e.message);
  }
}
```

```typescript
// utils/eventBus.ts

// 事件总线
type EventHandler = (data: any) => void;

export class EventBus {
  private events: Map<string, EventHandler[]> = new Map();

  on(event: string, handler: EventHandler): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(handler);

    return () => this.off(event, handler);
  }

  once(event: string, handler: EventHandler): void {
    const wrapper = (data: any) => {
      handler(data);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }

  off(event: string, handler?: EventHandler): void {
    if (!handler) {
      this.events.delete(event);
      return;
    }

    const handlers = this.events.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    }
  }

  emit(event: string, data?: any): void {
    const handlers = this.events.get(event);
    if (handlers) {
      handlers.forEach(handler => handler(data));
    }
  }
}

// 定义系统事件
export const SystemEvents = {
  TASK_CREATED: "task:created",
  TASK_UPDATED: "task:updated",
  TASK_DELETED: "task:deleted",
  TASK_STATUS_CHANGED: "task:status_changed",
  USER_LOGGED_IN: "user:logged_in",
  USER_LOGGED_OUT: "user:logged_out",
  NOTIFICATION: "notification"
};
```

---

## 9.4 存储服务

使用 localStorage 实现数据持久化。

```typescript
// services/storage.ts

// 存储服务
export class StorageService<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  save(data: T[]): void {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(this.key, serialized);
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }

  load(): T[] {
    try {
      const serialized = localStorage.getItem(this.key);
      if (!serialized) return [];
      return JSON.parse(serialized);
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
      return [];
    }
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }

  getItem(id: string): T | undefined {
    const items = this.load();
    return items.find((item: any) => item.id === id);
  }

  addItem(item: T): void {
    const items = this.load();
    items.push(item);
    this.save(items);
  }

  updateItem(id: string, updates: Partial<T>): boolean {
    const items = this.load();
    const index = items.findIndex((item: any) => item.id === id);
    if (index === -1) return false;

    items[index] = { ...items[index], ...updates };
    this.save(items);
    return true;
  }

  deleteItem(id: string): boolean {
    const items = this.load();
    const index = items.findIndex((item: any) => item.id === id);
    if (index === -1) return false;

    items.splice(index, 1);
    this.save(items);
    return true;
  }
}
```

---

## 9.5 任务服务

任务管理的核心业务逻辑。

```typescript
// services/taskService.ts

import { Task, CreateTaskInput, UpdateTaskInput, TaskFilter, Pagination, PaginatedResult, TaskStatus, TaskPriority } from "../types";
import { IdGenerator } from "../utils/idGenerator";
import { StorageService } from "./storage";
import { EventBus, SystemEvents } from "../utils/eventBus";

// 任务服务
export class TaskService {
  private storage: StorageService<Task>;
  private eventBus: EventBus;

  constructor(eventBus: EventBus = new EventBus()) {
    this.storage = new StorageService<Task>("tasks");
    this.eventBus = eventBus;
  }

  // 创建任务
  create(input: CreateTaskInput): Task {
    const now = new Date();
    const task: Task = {
      id: IdGenerator.generate(),
      title: input.title,
      description: input.description || "",
      status: "todo",
      priority: input.priority || "medium",
      assignee: input.assignee,
      createdAt: now,
      updatedAt: now,
      dueDate: input.dueDate,
      tags: input.tags || []
    };

    this.storage.addItem(task);
    this.eventBus.emit(SystemEvents.TASK_CREATED, task);

    return task;
  }

  // 获取所有任务
  getAll(): Task[] {
    return this.storage.load();
  }

  // 根据 ID 获取任务
  getById(id: string): Task | undefined {
    return this.storage.getItem(id);
  }

  // 更新任务
  update(id: string, updates: UpdateTaskInput): Task | undefined {
    const task = this.storage.getItem(id);
    if (!task) return undefined;

    const updatedTask: Task = {
      ...task,
      ...updates,
      updatedAt: new Date()
    };

    this.storage.updateItem(id, updatedTask);
    this.eventBus.emit(SystemEvents.TASK_UPDATED, updatedTask);

    if (updates.status && updates.status !== task.status) {
      this.eventBus.emit(SystemEvents.TASK_STATUS_CHANGED, {
        task: updatedTask,
        oldStatus: task.status,
        newStatus: updates.status
      });
    }

    return updatedTask;
  }

  // 删除任务
  delete(id: string): boolean {
    const deleted = this.storage.deleteItem(id);
    if (deleted) {
      this.eventBus.emit(SystemEvents.TASK_DELETED, { id });
    }
    return deleted;
  }

  // 更新任务状态
  updateStatus(id: string, status: TaskStatus): Task | undefined {
    return this.update(id, { status });
  }

  // 更新任务优先级
  updatePriority(id: string, priority: TaskPriority): Task | undefined {
    return this.update(id, { priority });
  }

  // 指派任务
  assignTask(id: string, assignee: string): Task | undefined {
    return this.update(id, { assignee });
  }

  // 添加标签
  addTag(id: string, tag: string): Task | undefined {
    const task = this.storage.getItem(id);
    if (!task) return undefined;

    const tags = [...new Set([...task.tags, tag])];
    return this.update(id, { tags });
  }

  // 移除标签
  removeTag(id: string, tag: string): Task | undefined {
    const task = this.storage.getItem(id);
    if (!task) return undefined;

    const tags = task.tags.filter(t => t !== tag);
    return this.update(id, { tags });
  }

  // 过滤任务
  filter(filter: TaskFilter): Task[] {
    let tasks = this.storage.load();

    if (filter.status) {
      tasks = tasks.filter(t => t.status === filter.status);
    }

    if (filter.priority) {
      tasks = tasks.filter(t => t.priority === filter.priority);
    }

    if (filter.assignee) {
      tasks = tasks.filter(t => t.assignee === filter.assignee);
    }

    if (filter.searchText) {
      const searchLower = filter.searchText.toLowerCase();
      tasks = tasks.filter(t =>
        t.title.toLowerCase().includes(searchLower) ||
        t.description.toLowerCase().includes(searchLower)
      );
    }

    if (filter.tags && filter.tags.length > 0) {
      tasks = tasks.filter(t =>
        filter.tags!.some(tag => t.tags.includes(tag))
      );
    }

    return tasks;
  }

  // 分页获取
  getPaginated(filter: TaskFilter, pagination: Pagination): PaginatedResult<Task> {
    const filtered = this.filter(filter);
    const total = filtered.length;
    const totalPages = Math.ceil(total / pagination.pageSize);
    const start = (pagination.page - 1) * pagination.pageSize;
    const items = filtered.slice(start, start + pagination.pageSize);

    return {
      items,
      total,
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalPages
    };
  }

  // 统计任务
  getStatistics(): {
    total: number;
    byStatus: Record<TaskStatus, number>;
    byPriority: Record<TaskPriority, number>;
    overdue: number;
  } {
    const tasks = this.storage.load();

    const byStatus: Record<TaskStatus, number> = {
      todo: 0,
      in_progress: 0,
      review: 0,
      done: 0
    };

    const byPriority: Record<TaskPriority, number> = {
      low: 0,
      medium: 0,
      high: 0,
      urgent: 0
    };

    let overdue = 0;

    tasks.forEach(task => {
      byStatus[task.status]++;
      byPriority[task.priority]++;

      if (task.dueDate && new Date() > task.dueDate && task.status !== "done") {
        overdue++;
      }
    });

    return {
      total: tasks.length,
      byStatus,
      byPriority,
      overdue
    };
  }
}
```

---

## 9.6 用户服务

用户管理服务。

```typescript
// services/userService.ts

import { User } from "../types";
import { StorageService } from "./storage";

// 用户服务
export class UserService {
  private storage: StorageService<User>;

  constructor() {
    this.storage = new StorageService<User>("users");
    this.initDefaultUser();
  }

  private initDefaultUser(): void {
    const users = this.storage.load();
    if (users.length === 0) {
      this.storage.addItem({
        id: "user-1",
        name: "Admin",
        email: "admin@example.com",
        role: "admin"
      });
    }
  }

  getCurrentUser(): User | undefined {
    // 简化实现，返回第一个用户
    const users = this.storage.load();
    return users[0];
  }

  getAll(): User[] {
    return this.storage.load();
  }

  getById(id: string): User | undefined {
    return this.storage.getItem(id);
  }

  create(user: Omit<User, "id">): User {
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}`
    };
    this.storage.addItem(newUser);
    return newUser;
  }

  update(id: string, updates: Partial<User>): User | undefined {
    return this.storage.updateItem(id, updates);
  }

  delete(id: string): boolean {
    return this.storage.deleteItem(id);
  }
}
```

---

## 9.7 主应用类

整合所有服务的主应用类。

```typescript
// App.ts

import { TaskService } from "./services/taskService";
import { UserService } from "./services/userService";
import { EventBus, SystemEvents } from "./utils/eventBus";
import { Task, User, TaskStatus, TaskPriority, TaskFilter, Pagination } from "./types";

// 主应用类
export class TaskManagementApp {
  private taskService: TaskService;
  private userService: UserService;
  private eventBus: EventBus;

  constructor() {
    this.eventBus = new EventBus();
    this.taskService = new TaskService(this.eventBus);
    this.userService = new UserService();

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    // 任务创建事件
    this.eventBus.on(SystemEvents.TASK_CREATED, (task: Task) => {
      console.log(`New task created: ${task.title}`);
    });

    // 任务状态变更事件
    this.eventBus.on(SystemEvents.TASK_STATUS_CHANGED, (data: any) => {
      console.log(`Task status changed: ${data.task.title} - ${data.oldStatus} → ${data.newStatus}`);
    });

    // 通知事件
    this.eventBus.on(SystemEvents.NOTIFICATION, (notification: any) => {
      console.log(`[${notification.type.toUpperCase()}] ${notification.message}`);
    });
  }

  // 任务相关方法
  createTask(input: Parameters<TaskService["create"]>[0]): Task {
    return this.taskService.create(input);
  }

  getTasks(filter?: TaskFilter, pagination?: Pagination) {
    if (pagination) {
      return this.taskService.getPaginated(filter || {}, pagination);
    }
    return this.taskService.filter(filter || {});
  }

  getTask(id: string): Task | undefined {
    return this.taskService.getById(id);
  }

  updateTask(id: string, updates: Parameters<TaskService["update"]>[1]): Task | undefined {
    return this.taskService.update(id, updates);
  }

  deleteTask(id: string): boolean {
    return this.taskService.delete(id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task | undefined {
    return this.taskService.updateStatus(id, status);
  }

  updateTaskPriority(id: string, priority: TaskPriority): Task | undefined {
    return this.taskService.updatePriority(id, priority);
  }

  // 用户相关方法
  getCurrentUser(): User | undefined {
    return this.userService.getCurrentUser();
  }

  getUsers(): User[] {
    return this.userService.getAll();
  }

  // 统计信息
  getStatistics() {
    return this.taskService.getStatistics();
  }

  // 事件订阅
  onTaskCreated(handler: (task: Task) => void): () => void {
    return this.eventBus.on(SystemEvents.TASK_CREATED, handler);
  }

  onTaskStatusChanged(handler: (data: any) => void): () => void {
    return this.eventBus.on(SystemEvents.TASK_STATUS_CHANGED, handler);
  }

  // 发送通知
  notify(message: string, type: "info" | "success" | "warning" | "error" = "info"): void {
    this.eventBus.emit(SystemEvents.NOTIFICATION, { message, type });
  }
}
```

---

## 9.8 使用示例

```typescript
// main.ts

import { TaskManagementApp } from "./App";
import { TaskStatus, TaskPriority } from "./types";

// 创建应用实例
const app = new TaskManagementApp();

// 获取当前用户
const currentUser = app.getCurrentUser();
console.log("Current user:", currentUser?.name);

// 创建一些任务
console.log("\n=== 创建任务 ===");
const task1 = app.createTask({
  title: "学习 TypeScript",
  description: "完成基础教程和实践项目",
  priority: "high",
  tags: ["学习", "TypeScript"]
});

const task2 = app.createTask({
  title: "实现用户认证",
  description: "实现登录和注册功能",
  priority: "urgent",
  assignee: currentUser?.id,
  tags: ["开发", "后端"]
});

const task3 = app.createTask({
  title: "编写单元测试",
  description: "为核心功能编写测试",
  priority: "medium",
  tags: ["测试", "质量"]
});

console.log("Created tasks:", [task1.title, task2.title, task3.title]);

// 更新任务状态
console.log("\n=== 更新任务状态 ===");
app.updateTaskStatus(task1.id, "in_progress");
app.updateTaskStatus(task2.id, "done");

// 获取所有任务
console.log("\n=== 所有任务 ===");
const allTasks = app.getTasks();
allTasks.forEach(task => {
  console.log(`[${task.status}] ${task.title} (${task.priority})`);
});

// 过滤任务
console.log("\n=== 高优先级任务 ===");
const highPriorityTasks = app.getTasks({ priority: "high" });
highPriorityTasks.forEach(task => {
  console.log(`${task.title} - ${task.status}`);
});

// 统计信息
console.log("\n=== 统计信息 ===");
const stats = app.getStatistics();
console.log("总任务数:", stats.total);
console.log("按状态统计:", stats.byStatus);
console.log("按优先级统计:", stats.byPriority);
console.log("逾期任务:", stats.overdue);

// 订阅事件
console.log("\n=== 事件监听 ===");
const unsubscribe = app.onTaskStatusChanged((data) => {
  console.log(`状态变更监听: ${data.task.title} 变为 ${data.newStatus}`);
});

// 触发状态变更
app.updateTaskStatus(task3.id, "review");

// 取消订阅
unsubscribe();

// 发送通知
console.log("\n=== 通知 ===");
app.notify("任务已全部完成！", "success");
```

---

## 文件说明

本章包含以下文件：

| 文件名 | 说明 |
|--------|------|
| `project.ts` | 综合实践项目的完整实现代码 |
| `practice-solution.html` | 本章练习题的参考答案 |

---

## 练习题

### 基础练习

**练习 9.1**：扩展任务服务，添加任务归档功能。归档的任务应该标记为 "archived" 状态，并且在普通查询中不显示。

**练习 9.2**：为任务添加评论功能。每个任务可以有多个评论，评论包含评论人、评论内容和评论时间。

### 进阶练习

**练习 9.3**：实现任务搜索功能，支持：
- 按标题搜索
- 按描述搜索
- 按标签搜索
- 组合搜索条件

**练习 9.4**：实现任务排序功能，支持按以下方式排序：
- 创建时间
- 截止日期
- 优先级
- 状态

### 挑战练习

**练习 9.5**：构建一个完整的 Todo 应用，包含：
- 任务 CRUD 操作
- 任务分类（使用标签或项目）
- 本地存储持久化
- 响应式 UI（可以使用 HTML/CSS）
- 任务统计和图表

**练习 9.6**：实现团队协作功能：
- 多用户支持
- 任务分配
- 权限管理
- 操作日志

---

## 学习目标检查清单

- [ ] 能够设计完整的类型系统
- [ ] 掌握工具类和函数的封装
- [ ] 理解服务层的职责划分
- [ ] 能够实现数据的持久化
- [ ] 掌握事件驱动的架构模式
- [ ] 能够整合多个服务构建完整应用
- [ ] 理解项目结构组织原则
- [ ] 具备独立设计和实现项目的能力
