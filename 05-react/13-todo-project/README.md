# 待办事项应用

## 本章目的

综合运用所学知识，创建一个功能完整的待办事项应用，掌握 React 应用开发完整流程。

---

## 项目概述

待办事项应用是最经典的 React 学习项目，它涵盖了 React 开发的核心理念：

- **组件化**：将应用拆分为独立的组件
- **状态管理**：使用 useState 管理待办列表
- **用户交互**：处理点击、输入等事件
- **条件渲染**：根据状态显示不同内容
- **列表渲染**：动态渲染待办事项列表
- **数据持久化**：使用 localStorage 保存数据

---

## 功能需求

| 功能 | 描述 |
|------|------|
| 添加待办 | 输入内容并添加新的待办事项 |
| 标记完成 | 勾选复选框标记完成状态 |
| 删除待办 | 删除不需要的待办事项 |
| 筛选视图 | 查看全部/进行中/已完成的待办 |
| 统计信息 | 显示待办总数和完成数 |
| 数据持久化 | 刷新页面后数据不丢失 |

---

## 项目结构

```
13-todo-project/
├── README.md           # 项目说明文档
├── todo-app.jsx        # 主应用组件
├── todo-list.jsx       # 列表组件
├── todo-item.jsx       # 单项组件
└── todo-form.jsx       # 添加表单组件
```

---

## 组件设计

### App（根组件）
- 管理全部状态（todos 数组、filter 筛选条件）
- 处理所有操作函数
- 向下传递必要的数据和回调

### TodoForm（表单组件）
- 输入新待办内容
- 处理表单提交

### TodoList（列表组件）
- 接收待办数组
- 渲染 TodoItem 列表

### TodoItem（单项组件）
- 显示待办内容
- 完成/未完成状态切换
- 删除按钮

---

## 核心代码

### 主应用组件

```jsx
function TodoApp() {
    const [todos, setTodos] = React.useState(() => {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    });
    const [inputValue, setInputValue] = React.useState('');
    const [filter, setFilter] = React.useState('all');
    
    React.useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);
    
    const addTodo = () => {
        if (inputValue.trim()) {
            setTodos([...todos, {
                id: Date.now(),
                text: inputValue.trim(),
                completed: false
            }]);
            setInputValue('');
        }
    };
    
    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };
    
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };
    
    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });
    
    return (
        <div>
            <h1>待办事项</h1>
            <TodoForm
                value={inputValue}
                onChange={setInputValue}
                onSubmit={addTodo}
            />
            <FilterButtons filter={filter} onFilterChange={setFilter} />
            <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
            />
            <Stats todos={todos} />
        </div>
    );
}
```

---

## 功能实现

### 1. 添加待办

使用受控组件绑定输入框，提交时添加到状态数组。

### 2. 完成状态切换

点击复选框切换 completed 属性，使用 map 更新对应项。

### 3. 删除待办

使用 filter 方法过滤掉指定 id 的待办。

### 4. 筛选功能

根据 filter 状态过滤显示不同范围的待办。

### 5. 统计信息

计算并显示总数和已完成数。

### 6. 数据持久化

使用 useEffect 监听 todos 变化，保存到 localStorage。

---

## 练习题

### 基础任务

完成基本待办事项功能。

### 进阶任务

添加编辑功能，支持修改待办内容。

### 挑战任务

添加批量操作（全选/全不选/清除已完成）。

---

## 学习目标检查

- [ ] 能够独立设计和实现 React 应用
- [ ] 掌握状态管理和数据流
- [ ] 理解组件间通信方式
- [ ] 学会使用 Hooks 处理副作用
- [ ] 掌握数据持久化方法

---

## 文件说明

| 文件名 | 说明 |
|--------|------|
| `README.md` | 本章教程文档 |
| `todo-app.jsx` | 主应用组件 |
| `todo-list.jsx` | 列表组件 |
| `todo-item.jsx` | 单项组件 |
| `todo-form.jsx` | 表单组件 |

---

## 运行项目

使用以下命令运行项目：

```bash
# 使用 Create React App
npx create-react-app todo-app
cd todo-app
npm start

# 或使用 Vite
npm create vite@latest todo-app -- --template react
cd todo-app
npm install
npm run dev
```

---

## 扩展思路

完成基础功能后，可以尝试：

- 添加优先级（高/中/低）
- 添加截止日期
- 添加分类/标签
- 添加提醒功能
- 添加撤销功能
- 实现拖拽排序

---

## 参考资料

- [React 官方教程](https://react.dev/learn)
- [React Hooks](https://react.dev/reference/react)
- [Todo MVC](http://todomvc.com/)
