// 待办事项应用 - 完整示例（含样式）

function TodoApp() {
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
    
    React.useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);
    
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
    
    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };
    
    const deleteTodo = (id) => {
        if (confirm('确定要删除这个待办事项吗？')) {
            setTodos(todos.filter(todo => todo.id !== id));
        }
    };
    
    const startEdit = (todo) => {
        setEditingId(todo.id);
        setEditText(todo.text);
    };
    
    const saveEdit = () => {
        if (editingId !== null && editText.trim()) {
            setTodos(todos.map(todo =>
                todo.id === editingId ? { ...todo, text: editText.trim() } : todo
            ));
        }
        setEditingId(null);
        setEditText('');
    };
    
    const cancelEdit = () => {
        setEditingId(null);
        setEditText('');
    };
    
    const handleEditKeyDown = (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            cancelEdit();
        }
    };
    
    const clearCompleted = () => {
        if (confirm('确定要清除所有已完成的待办事项吗？')) {
            setTodos(todos.filter(todo => !todo.completed));
        }
    };
    
    const toggleAll = () => {
        const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);
        setTodos(todos.map(todo => ({
            ...todo,
            completed: !allCompleted
        })));
    };
    
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
        <div className="todo-container">
            <style>{`
                .todo-container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                .todo-header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .todo-header h1 {
                    margin: 0;
                    color: #333;
                    font-size: 36px;
                }
                .todo-header p {
                    color: #666;
                    margin-top: 5px;
                }
                .todo-form {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 20px;
                }
                .todo-input {
                    flex: 1;
                    padding: 12px 16px;
                    font-size: 16px;
                    border: 2px solid #e0e0e0;
                    border-radius: 8px;
                    outline: none;
                    transition: border-color 0.2s;
                }
                .todo-input:focus {
                    border-color: #007bff;
                }
                .add-button {
                    padding: 12px 24px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .add-button:hover {
                    background: #0056b3;
                }
                .filter-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                    flex-wrap: wrap;
                    gap: 10px;
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
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .filter-button:hover {
                    background: #f5f5f5;
                }
                .filter-button.active {
                    background: #007bff;
                    color: white;
                    border-color: #007bff;
                }
                .toggle-all {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    color: #666;
                }
                .clear-completed {
                    padding: 8px 16px;
                    background: #dc3545;
                    color: white;
                    border: none;
                    border-radius: 20px;
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
                    padding: 15px;
                    border-bottom: 1px solid #eee;
                    transition: background 0.2s;
                }
                .todo-item:hover {
                    background: #f9f9f9;
                }
                .todo-item.completed .todo-text {
                    text-decoration: line-through;
                    color: #999;
                }
                .todo-checkbox {
                    width: 20px;
                    height: 20px;
                    margin-right: 15px;
                    cursor: pointer;
                }
                .todo-text {
                    flex: 1;
                    font-size: 16px;
                    cursor: pointer;
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
                .edit-button, .delete-button {
                    padding: 6px 10px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: background 0.2s;
                }
                .edit-button {
                    background: #ffc107;
                }
                .edit-button:hover {
                    background: #e0a800;
                }
                .delete-button {
                    background: #dc3545;
                    color: white;
                }
                .delete-button:hover {
                    background: #c82333;
                }
                .edit-input {
                    flex: 1;
                    padding: 8px 12px;
                    font-size: 16px;
                    border: 2px solid #007bff;
                    border-radius: 4px;
                    outline: none;
                }
                .empty-state {
                    text-align: center;
                    padding: 40px 20px;
                    color: #999;
                }
                .empty-hint {
                    font-size: 14px;
                    margin-top: 10px;
                }
                .stats {
                    display: flex;
                    justify-content: center;
                    gap: 30px;
                    margin-top: 20px;
                    padding: 15px;
                    background: #f8f9fa;
                    border-radius: 8px;
                    color: #666;
                }
                .stats span {
                    font-weight: 500;
                }
                .todo-date {
                    font-size: 12px;
                    color: #999;
                    margin-left: 15px;
                }
            `}</style>
            
            <header className="todo-header">
                <h1>📝 待办事项</h1>
                <p>管理您的日常任务，提高工作效率</p>
            </header>
            
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
            
            <ul className="todo-list">
                {filteredTodos.length === 0 ? (
                    <div className="empty-state">
                        <p>{filter === 'all' ? '暂无待办事项' : 
                           filter === 'active' ? '没有进行中的任务' : 
                           '没有已完成的任务'}</p>
                        <p className="empty-hint">
                            {filter === 'all' ? '添加一个新任务开始吧！' : '完成任务后再来吧！'}
                        </p>
                    </div>
                ) : (
                    filteredTodos.map(todo => (
                        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
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
                            <div className="todo-actions">
                                <button
                                    className="edit-button"
                                    onClick={() => startEdit(todo)}
                                    title="编辑"
                                >
                                    ✏️
                                </button>
                                <button
                                    className="delete-button"
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
            
            <div className="stats">
                <span>总计: {todos.length}</span>
                <span>已完成: {completedCount}</span>
                <span>进行中: {activeCount}</span>
            </div>
        </div>
    );
}

export default TodoApp;
