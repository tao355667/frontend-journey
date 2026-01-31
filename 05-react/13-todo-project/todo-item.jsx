<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React 待办事项应用</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        * {
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
        .todo-app {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            overflow: hidden;
        }
        .app-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .app-header h1 {
            margin: 0;
            font-size: 36px;
            font-weight: 700;
        }
        .app-subtitle {
            margin: 10px 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .app-main {
            padding: 30px;
        }
        .todo-form {
            display: flex;
            gap: 10px;
            margin-bottom: 25px;
        }
        .todo-input {
            flex: 1;
            padding: 14px 18px;
            font-size: 16px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            outline: none;
            transition: border-color 0.2s;
        }
        .todo-input:focus {
            border-color: #667eea;
        }
        .add-button {
            padding: 14px 28px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .add-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        .filter-section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            flex-wrap: wrap;
            gap: 10px;
        }
        .toggle-all {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            color: #666;
            font-size: 14px;
        }
        .toggle-all input {
            width: 18px;
            height: 18px;
            cursor: pointer;
        }
        .filter-buttons {
            display: flex;
            gap: 8px;
        }
        .filter-button {
            padding: 8px 16px;
            border: 1px solid #e0e0e0;
            background: white;
            border-radius: 20px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .filter-button:hover {
            background: #f5f5f5;
        }
        .filter-button.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-color: transparent;
        }
        .clear-completed {
            padding: 8px 16px;
            background: #dc3545;
            color: white;
            border: none;
            border-radius: 20px;
            font-size: 14px;
            cursor: pointer;
            transition: background 0.2s;
        }
        .clear-completed:hover {
            background: #c82333;
        }
        .todo-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .todo-item {
            display: flex;
            align-items: center;
            padding: 16px;
            border-bottom: 1px solid #f0f0f0;
            transition: background 0.2s;
        }
        .todo-item:hover {
            background: #fafafa;
        }
        .todo-item.completed .todo-text {
            text-decoration: line-through;
            color: #999;
        }
        .todo-checkbox {
            width: 22px;
            height: 22px;
            margin-right: 15px;
            cursor: pointer;
            accent-color: #667eea;
        }
        .todo-text {
            flex: 1;
            font-size: 16px;
            color: #333;
            cursor: pointer;
            line-height: 1.4;
        }
        .todo-item-content {
            display: flex;
            align-items: center;
            flex: 1;
        }
        .todo-actions {
            display: flex;
            gap: 8px;
            opacity: 0;
            transition: opacity 0.2s;
        }
        .todo-item:hover .todo-actions {
            opacity: 1;
        }
        .action-btn {
            width: 36px;
            height: 36px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s, opacity 0.2s;
        }
        .action-btn:hover {
            transform: scale(1.1);
        }
        .edit-btn {
            background: #ffc107;
        }
        .delete-btn {
            background: #fee2e2;
            color: #dc3545;
        }
        .edit-input {
            flex: 1;
            padding: 8px 12px;
            font-size: 16px;
            border: 2px solid #667eea;
            border-radius: 6px;
            outline: none;
        }
        .todo-date {
            font-size: 12px;
            color: #999;
            margin-left: 15px;
            white-space: nowrap;
        }
        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #999;
        }
        .empty-icon {
            font-size: 64px;
            margin-bottom: 20px;
            opacity: 0.5;
        }
        .empty-hint {
            font-size: 14px;
            margin-top: 10px;
        }
        .stats {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-top: 25px;
            padding: 20px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            border-radius: 12px;
        }
        .stat-item {
            text-align: center;
        }
        .stat-value {
            font-size: 28px;
            font-weight: 700;
            color: #333;
        }
        .stat-label {
            font-size: 12px;
            color: #666;
            margin-top: 4px;
        }
        .app-footer {
            text-align: center;
            padding: 15px;
            background: #f8f9fa;
            color: #999;
            font-size: 13px;
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        // 待办事项应用组件
        function TodoApp() {
            // 从 localStorage 读取初始数据
            const [todos, setTodos] = React.useState(() => {
                try {
                    const saved = localStorage.getItem('todos');
                    return saved ? JSON.parse(saved) : [];
                } catch {
                    return [];
                }
            });
            
            const [inputValue, setInputValue] = React.useState('');
            const [filter, setFilter] = React.useState('all');
            const [editingId, setEditingId] = React.useState(null);
            const [editText, setEditText] = React.useState('');
            
            // 保存到 localStorage
            React.useEffect(() => {
                localStorage.setItem('todos', JSON.stringify(todos));
            }, [todos]);
            
            // 添加待办
            const addTodo = () => {
                if (inputValue.trim()) {
                    const newTodo = {
                        id: Date.now(),
                        text: inputValue.trim(),
                        completed: false,
                        createdAt: new Date().toISOString()
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
            
            // 开始编辑
            const startEdit = (todo) => {
                setEditingId(todo.id);
                setEditText(todo.text);
            };
            
            // 保存编辑
            const saveEdit = () => {
                if (editingId !== null && editText.trim()) {
                    setTodos(todos.map(todo =>
                        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
                    ));
                }
                setEditingId(null);
                setEditText('');
            };
            
            // 取消编辑
            const cancelEdit = () => {
                setEditingId(null);
                setEditText('');
            };
            
            // 编辑框按键处理
            const handleEditKeyDown = (e) => {
                if (e.key === 'Enter') {
                    saveEdit();
                } else if (e.key === 'Escape') {
                    cancelEdit();
                }
            };
            
            // 清除已完成
            const clearCompleted = () => {
                if (confirm('确定要清除所有已完成的待办事项吗？')) {
                    setTodos(todos.filter(todo => !todo.completed));
                }
            };
            
            // 全选/取消全选
            const toggleAll = () => {
                const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);
                setTodos(todos.map(todo => ({
                    ...todo,
                    completed: !allCompleted
                })));
            };
            
            // 获取筛选后的待办
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
            const activeCount = todos.filter(todo => !todo.completed).length;
            const completedCount = todos.filter(todo => todo.completed).length;
            const hasCompleted = completedCount > 0;
            
            return (
                <div className="todo-app">
                    <header className="app-header">
                        <h1>📝 待办事项</h1>
                        <p className="app-subtitle">管理您的日常任务，提高工作效率</p>
                    </header>
                    
                    <main className="app-main">
                        {/* 添加表单 */}
                        <div className="todo-form">
                            <input
                                type="text"
                                className="todo-input"
                                placeholder="添加新的待办事项..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                            />
                            <button className="add-button" onClick={addTodo}>
                                添加
                            </button>
                        </div>
                        
                        {/* 筛选和操作区 */}
                        <div className="filter-section">
                            {todos.length > 0 && (
                                <label className="toggle-all">
                                    <input
                                        type="checkbox"
                                        checked={todos.length > 0 && todos.every(t => t.completed)}
                                        onChange={toggleAll}
                                    />
                                    <span>全选</span>
                                </label>
                            )}
                            
                            <div className="filter-buttons">
                                {['all', 'active', 'completed'].map(f => (
                                    <button
                                        key={f}
                                        className={`filter-button ${filter === f ? 'active' : ''}`}
                                        onClick={() => setFilter(f)}
                                    >
                                        {f === 'all' ? '全部' : f === 'active' ? '进行中' : '已完成'}
                                    </button>
                                ))}
                            </div>
                            
                            {hasCompleted && (
                                <button
                                    className="clear-completed"
                                    onClick={clearCompleted}
                                >
                                    清除已完成
                                </button>
                            )}
                        </div>
                        
                        {/* 待办列表 */}
                        <ul className="todo-list">
                            {filteredTodos.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-icon">
                                        {filter === 'all' ? '📋' : filter === 'active' ? '🎯' : '✅'}
                                    </div>
                                    <p>
                                        {filter === 'all' ? '暂无待办事项' : 
                                         filter === 'active' ? '没有进行中的任务' : 
                                         '没有已完成的任务'}
                                    </p>
                                    <p className="empty-hint">
                                        {filter === 'all' ? '添加一个新任务开始吧！' : '完成任务后再来吧！'}
                                    </p>
                                </div>
                            ) : (
                                filteredTodos.map(todo => (
                                    <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                                        <div className="todo-item-content">
                                            <input
                                                type="checkbox"
                                                className="todo-checkbox"
                                                checked={todo.completed}
                                                onChange={() => toggleTodo(todo.id)}
                                            />
                                            {editingId === todo.id ? (
                                                <input
                                                    type="text"
                                                    className="edit-input"
                                                    value={editText}
                                                    onChange={(e) => setEditText(e.target.value)}
                                                    onBlur={saveEdit}
                                                    onKeyDown={handleEditKeyDown}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span
                                                    className="todo-text"
                                                    onDoubleClick={() => startEdit(todo)}
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
                                                className="action-btn edit-btn"
                                                onClick={() => startEdit(todo)}
                                                title="编辑"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className="action-btn delete-btn"
                                                onClick={() => deleteTodo(todo.id)}
                                                title="删除"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                        
                        {/* 统计信息 */}
                        <div className="stats">
                            <div className="stat-item">
                                <div className="stat-value">{todos.length}</div>
                                <div className="stat-label">总计</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">{activeCount}</div>
                                <div className="stat-label">进行中</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">{completedCount}</div>
                                <div className="stat-label">已完成</div>
                            </div>
                        </div>
                    </main>
                    
                    <footer className="app-footer">
                        <p>💡 提示：双击任务可以编辑内容</p>
                    </footer>
                </div>
            );
        }

        // 渲染应用
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<TodoApp />);
    </script>
</body>
</html>
