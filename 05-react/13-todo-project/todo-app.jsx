// 待办事项应用 - 主应用组件

import React, { useState, useEffect } from 'react';

// TodoForm 子组件
function TodoForm({ value, onChange, onSubmit }) {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="todo-form">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="添加新的待办事项..."
                className="todo-input"
            />
            <button type="submit" className="add-button">添加</button>
        </form>
    );
}

// TodoItem 子组件
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    
    const handleEdit = () => {
        setIsEditing(true);
        setEditText(todo.text);
    };
    
    const saveEdit = () => {
        if (editText.trim()) {
            onEdit(todo.id, editText.trim());
            setIsEditing(false);
        } else {
            setEditText(todo.text);
            setIsEditing(false);
        }
    };
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            setEditText(todo.text);
            setIsEditing(false);
        }
    };
    
    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-item-content">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="todo-checkbox"
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        className="edit-input"
                    />
                ) : (
                    <span
                        className="todo-text"
                        onDoubleClick={handleEdit}
                    >
                        {todo.text}
                    </span>
                )}
                <span className="todo-date">
                    {new Date(todo.id).toLocaleDateString()}
                </span>
            </div>
            <div className="todo-actions">
                <button
                    onClick={handleEdit}
                    className="edit-button"
                    title="编辑"
                >
                    ✏️
                </button>
                <button
                    onClick={() => onDelete(todo.id)}
                    className="delete-button"
                    title="删除"
                >
                    🗑️
                </button>
            </div>
        </li>
    );
}

// FilterButtons 子组件
function FilterButtons({ filter, onFilterChange }) {
    const filters = [
        { value: 'all', label: '全部' },
        { value: 'active', label: '进行中' },
        { value: 'completed', label: '已完成' }
    ];
    
    return (
        <div className="filter-buttons">
            {filters.map(f => (
                <button
                    key={f.value}
                    className={`filter-button ${filter === f.value ? 'active' : ''}`}
                    onClick={() => onFilterChange(f.value)}
                >
                    {f.label}
                </button>
            ))}
        </div>
    );
}

// Stats 子组件
function Stats({ todos }) {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    
    return (
        <div className="stats">
            <span>总计: {total}</span>
            <span>已完成: {completed}</span>
            <span>进行中: {active}</span>
        </div>
    );
}

// TodoList 子组件
function TodoList({ todos, onToggle, onDelete, onEdit }) {
    if (todos.length === 0) {
        return (
            <div className="empty-state">
                <p>暂无待办事项</p>
                <p className="empty-hint">添加一个新任务开始吧！</p>
            </div>
        );
    }
    
    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    );
}

// 主应用组件
function TodoApp() {
    // 从 localStorage 读取初始数据
    const [todos, setTodos] = useState(() => {
        try {
            const saved = localStorage.getItem('todos');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all');
    
    // 保存到 localStorage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);
    
    // 添加待办
    const addTodo = () => {
        if (inputValue.trim()) {
            const newTodo = {
                id: Date.now(),
                text: inputValue.trim(),
                completed: false
            };
            setTodos([newTodo, ...todos]);
            setInputValue('');
        }
    };
    
    // 切换完成状态
    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };
    
    // 删除待办
    const deleteTodo = (id) => {
        if (confirm('确定要删除这个待办事项吗？')) {
            setTodos(todos.filter(todo => todo.id !== id));
        }
    };
    
    // 编辑待办
    const editTodo = (id, newText) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, text: newText } : todo
        ));
    };
    
    // 批量操作
    const clearCompleted = () => {
        if (confirm('确定要清除所有已完成的待办事项吗？')) {
            setTodos(todos.filter(todo => !todo.completed));
        }
    };
    
    const toggleAll = () => {
        const allCompleted = todos.every(todo => todo.completed);
        setTodos(todos.map(todo => ({
            ...todo,
            completed: !allCompleted
        })));
    };
    
    // 筛选待办
    const getFilteredTodos = () => {
        switch (filter) {
            case 'active':
                return todos.filter(todo => !todo.completed);
            case 'completed':
                return todos.filter(todo => todo.completed);
            default:
                return todos;
        }
    };
    
    const filteredTodos = getFilteredTodos();
    const hasCompleted = todos.some(todo => todo.completed);
    
    return (
        <div className="todo-app">
            <header className="app-header">
                <h1>📝 待办事项</h1>
                <p className="app-subtitle">管理您的日常任务</p>
            </header>
            
            <main className="app-main">
                <TodoForm
                    value={inputValue}
                    onChange={setInputValue}
                    onSubmit={addTodo}
                />
                
                <div className="filter-section">
                    {todos.length > 0 && (
                        <label className="toggle-all">
                            <input
                                type="checkbox"
                                onChange={toggleAll}
                                checked={todos.length > 0 && todos.every(t => t.completed)}
                            />
                            <span>全选/取消全选</span>
                        </label>
                    )}
                    <FilterButtons
                        filter={filter}
                        onFilterChange={setFilter}
                    />
                    {hasCompleted && (
                        <button
                            className="clear-completed"
                            onClick={clearCompleted}
                        >
                            清除已完成
                        </button>
                    )}
                </div>
                
                <TodoList
                    todos={filteredTodos}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                />
                
                <Stats todos={todos} />
            </main>
            
            <footer className="app-footer">
                <p>双击任务可以编辑内容</p>
            </footer>
        </div>
    );
}

// 导出主组件
export default TodoApp;

// 导出子组件（便于测试）
export {
    TodoForm,
    TodoItem,
    TodoList,
    FilterButtons,
    Stats
};
