// project.ts - 综合实践：任务管理系统

// ========================================
// 9.2 类型定义
// ========================================

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
  archived?: boolean;
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
  archived?: boolean;
}

// 过滤器
export interface TaskFilter {
  status?: TaskStatus;
  priority?: TaskPriority;
  assignee?: string;
  searchText?: string;
  tags?: string[];
  archived?: boolean;
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

// 评论类型
export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

// ========================================
// 9.3 工具类
// ========================================

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
}

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

// ========================================
// 9.4 存储服务
// ========================================

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
    return (items as any[]).find((item: any) => item.id === id);
  }

  addItem(item: T): void {
    const items = this.load();
    items.push(item);
    this.save(items);
  }

  updateItem(id: string, updates: Partial<T>): boolean {
    const items = this.load();
    const index = (items as any[]).findIndex((item: any) => item.id === id);
    if (index === -1) return false;

    items[index] = { ...items[index], ...updates };
    this.save(items);
    return true;
  }

  deleteItem(id: string): boolean {
    const items = this.load();
    const index = (items as any[]).findIndex((item: any) => item.id === id);
    if (index === -1) return false;

    items.splice(index, 1);
    this.save(items);
    return true;
  }
}

// ========================================
// 9.5 任务服务
// ========================================

export class TaskService {
  private storage: StorageService<Task>;
  private eventBus: EventBus;

  constructor(eventBus?: EventBus) {
    this.storage = new StorageService<Task>("tasks");
    this.eventBus = eventBus || new EventBus();
  }

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
      tags: input.tags || [],
      archived: false
    };

    this.storage.addItem(task);
    this.eventBus.emit(SystemEvents.TASK_CREATED, task);

    return task;
  }

  getAll(): Task[] {
    return this.storage.load();
  }

  getById(id: string): Task | undefined {
    return this.storage.getItem(id);
  }

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

  delete(id: string): boolean {
    const deleted = this.storage.deleteItem(id);
    if (deleted) {
      this.eventBus.emit(SystemEvents.TASK_DELETED, { id });
    }
    return deleted;
  }

  archive(id: string): Task | undefined {
    return this.update(id, { archived: true });
  }

  unarchive(id: string): Task | undefined {
    return this.update(id, { archived: false });
  }

  filter(filter: TaskFilter): Task[] {
    let tasks = this.storage.load();

    // 默认排除已归档任务
    if (filter.archived === undefined) {
      filter.archived = false;
    }

    if (filter.status !== undefined) {
      tasks = tasks.filter(t => t.status === filter.status);
    }

    if (filter.priority !== undefined) {
      tasks = tasks.filter(t => t.priority === filter.priority);
    }

    if (filter.assignee !== undefined) {
      tasks = tasks.filter(t => t.assignee === filter.assignee);
    }

    if (filter.archived !== undefined) {
      tasks = tasks.filter(t => t.archived === filter.archived);
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

  search(query: string): Task[] {
    return this.filter({ searchText: query });
  }

  sort(tasks: Task[], by: "created" | "dueDate" | "priority" | "status", order: "asc" | "desc" = "asc"): Task[] {
    const sorted = [...tasks].sort((a, b) => {
      let comparison = 0;

      switch (by) {
        case "created":
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        case "dueDate":
          if (!a.dueDate && !b.dueDate) comparison = 0;
          else if (!a.dueDate) comparison = 1;
          else if (!b.dueDate) comparison = -1;
          else comparison = a.dueDate.getTime() - b.dueDate.getTime();
          break;
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case "status":
          const statusOrder = { todo: 0, in_progress: 1, review: 2, done: 3 };
          comparison = statusOrder[a.status] - statusOrder[b.status];
          break;
      }

      return order === "asc" ? comparison : -comparison;
    });

    return sorted;
  }

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

  getStatistics(): {
    total: number;
    byStatus: Record<TaskStatus, number>;
    byPriority: Record<TaskPriority, number>;
    overdue: number;
    archived: number;
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
    let archived = 0;

    tasks.forEach(task => {
      byStatus[task.status]++;
      byPriority[task.priority]++;

      if (task.archived) {
        archived++;
      }

      if (task.dueDate && new Date() > task.dueDate && task.status !== "done" && !task.archived) {
        overdue++;
      }
    });

    return {
      total: tasks.length,
      byStatus,
      byPriority,
      overdue,
      archived
    };
  }
}

// ========================================
// 9.6 用户服务
// ========================================

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

// ========================================
// 9.7 评论服务
// ========================================

export class CommentService {
  private storage: StorageService<Comment>;
  private eventBus: EventBus;

  constructor(eventBus: EventBus) {
    this.storage = new StorageService<Comment>("comments");
    this.eventBus = eventBus;
  }

  create(taskId: string, userId: string, content: string): Comment {
    const comment: Comment = {
      id: IdGenerator.generate(),
      taskId,
      userId,
      content,
      createdAt: new Date()
    };

    this.storage.addItem(comment);
    return comment;
  }

  getByTaskId(taskId: string): Comment[] {
    return this.storage.load().filter(c => c.taskId === taskId);
  }

  delete(id: string): boolean {
    return this.storage.deleteItem(id);
  }
}

// ========================================
// 9.8 主应用类
// ========================================

export class TaskManagementApp {
  private taskService: TaskService;
  private userService: UserService;
  private commentService: CommentService;
  private eventBus: EventBus;

  constructor() {
    this.eventBus = new EventBus();
    this.taskService = new TaskService(this.eventBus);
    this.userService = new UserService();
    this.commentService = new CommentService(this.eventBus);

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.eventBus.on(SystemEvents.TASK_CREATED, (task: Task) => {
      console.log(`New task created: ${task.title}`);
    });

    this.eventBus.on(SystemEvents.TASK_STATUS_CHANGED, (data: any) => {
      console.log(`Task status changed: ${data.task.title} - ${data.oldStatus} → ${data.newStatus}`);
    });

    this.eventBus.on(SystemEvents.NOTIFICATION, (notification: any) => {
      console.log(`[${notification.type.toUpperCase()}] ${notification.message}`);
    });
  }

  // 任务相关方法
  createTask(input: CreateTaskInput): Task {
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

  updateTask(id: string, updates: UpdateTaskInput): Task | undefined {
    return this.taskService.update(id, updates);
  }

  deleteTask(id: string): boolean {
    return this.taskService.delete(id);
  }

  archiveTask(id: string): Task | undefined {
    return this.taskService.archive(id);
  }

  unarchiveTask(id: string): Task | undefined {
    return this.taskService.unarchive(id);
  }

  // 搜索和排序
  searchTasks(query: string): Task[] {
    return this.taskService.search(query);
  }

  sortTasks(tasks: Task[], by: "created" | "dueDate" | "priority" | "status", order: "asc" | "desc" = "asc"): Task[] {
    return this.taskService.sort(tasks, by, order);
  }

  // 用户相关方法
  getCurrentUser(): User | undefined {
    return this.userService.getCurrentUser();
  }

  getUsers(): User[] {
    return this.userService.getAll();
  }

  // 评论相关方法
  addComment(taskId: string, content: string): Comment {
    const user = this.getCurrentUser();
    return this.commentService.create(taskId, user?.id || "anonymous", content);
  }

  getComments(taskId: string): Comment[] {
    return this.commentService.getByTaskId(taskId);
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

  // 清除所有数据
  clearAll(): void {
    localStorage.clear();
    console.log("All data cleared");
  }
}

// ========================================
// 9.9 使用示例
// ========================================

console.log("=== 任务管理系统示例 ===\n");

// 创建应用实例
const app = new TaskManagementApp();

// 获取当前用户
const currentUser = app.getCurrentUser();
console.log("当前用户:", currentUser?.name);

// 创建任务
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
  tags: ["开发", "后端"]
});

const task3 = app.createTask({
  title: "编写单元测试",
  description: "为核心功能编写测试",
  priority: "medium",
  tags: ["测试", "质量"]
});

console.log("创建的任务:", [task1.title, task2.title, task3.title]);

// 更新任务状态
console.log("\n=== 更新任务状态 ===");
app.updateTask(task1.id, { status: "in_progress" });
app.updateTask(task2.id, { status: "done" });

// 添加评论
console.log("\n=== 添加评论 ===");
app.addComment(task1.id, "这是第一个评论");
app.addComment(task1.id, "这是第二个评论");
const comments = app.getComments(task1.id);
console.log("任务1的评论:", comments.length);

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

// 搜索任务
console.log("\n=== 搜索任务 ===");
const searchResults = app.searchTasks("认证");
console.log("搜索'认证'的结果:", searchResults.map(t => t.title));

// 排序任务
console.log("\n=== 按优先级排序 ===");
const sortedTasks = app.sortTasks(allTasks, "priority", "desc");
sortedTasks.forEach(task => {
  console.log(`[${task.priority}] ${task.title}`);
});

// 统计信息
console.log("\n=== 统计信息 ===");
const stats = app.getStatistics();
console.log("总任务数:", stats.total);
console.log("按状态统计:", stats.byStatus);
console.log("按优先级统计:", stats.byPriority);
console.log("逾期任务:", stats.overdue);
console.log("已归档:", stats.archived);

// 订阅事件
console.log("\n=== 事件监听 ===");
const unsubscribe = app.onTaskStatusChanged((data) => {
  console.log(`状态变更: ${data.task.title} 从 ${data.oldStatus} 变为 ${data.newStatus}`);
});

// 触发状态变更
app.updateTask(task3.id, { status: "review" });

// 取消订阅
unsubscribe();

// 归档任务
console.log("\n=== 归档任务 ===");
app.archiveTask(task3.id);
console.log("归档后的任务（排除归档）:", app.getTasks().map(t => t.title));
console.log("包括归档的任务:", app.getTasks({ archived: true }).map(t => t.title));

// 发送通知
console.log("\n=== 通知 ===");
app.notify("任务已全部完成！", "success");
app.notify("请注意：有一个任务已逾期", "warning");

console.log("\n=== 示例运行完成 ===");
