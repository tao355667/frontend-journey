// 组件通信进阶示例

// 1. 复杂状态管理
function ComplexStateApp() {
    const [state, setState] = React.useState({
        users: [
            { id: 1, name: '张三', active: true },
            { id: 2, name: '李四', active: false },
            { id: 3, name: '王五', active: true }
        ],
        filter: 'all',
        search: ''
    });
    
    const toggleUser = (id) => {
        setState(prev => ({
            ...prev,
            users: prev.users.map(user =>
                user.id === id ? { ...user, active: !user.active } : user
            )
        }));
    };
    
    const setFilter = (filter) => {
        setState(prev => ({ ...prev, filter }));
    };
    
    const setSearch = (search) => {
        setState(prev => ({ ...prev, search }));
    };
    
    const addUser = (name) => {
        setState(prev => ({
            ...prev,
            users: [...prev.users, {
                id: Date.now(),
                name,
                active: false
            }]
        }));
    };
    
    return (
        <div>
            <UserFilter
                filter={state.filter}
                search={state.search}
                onFilterChange={setFilter}
                onSearchChange={setSearch}
            />
            <UserList
                users={state.users}
                filter={state.filter}
                search={state.search}
                onToggle={toggleUser}
            />
            <UserAdder onAdd={addUser} />
        </div>
    );
}

function UserFilter({ filter, search, onFilterChange, onSearchChange }) {
    return (
        <div>
            <input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="搜索用户..."
            />
            <select value={filter} onChange={(e) => onFilterChange(e.target.value)}>
                <option value="all">全部</option>
                <option value="active">已激活</option>
                <option value="inactive">未激活</option>
            </select>
        </div>
    );
}

function UserList({ users, filter, search, onToggle }) {
    const filtered = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' ||
            (filter === 'active' && user.active) ||
            (filter === 'inactive' && !user.active);
        return matchesSearch && matchesFilter;
    });
    
    return (
        <ul>
            {filtered.map(user => (
                <li key={user.id} style={{ opacity: user.active ? 1 : 0.6 }}>
                    <input
                        type="checkbox"
                        checked={user.active}
                        onChange={() => onToggle(user.id)}
                    />
                    {user.name}
                </li>
            ))}
        </ul>
    );
}

function UserAdder({ onAdd }) {
    const [name, setName] = React.useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onAdd(name);
            setName('');
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="新用户名..."
            />
            <button type="submit">添加用户</button>
        </form>
    );
}

// 2. 购物车示例
function ShoppingCart() {
    const [cart, setCart] = React.useState([
        { id: 1, name: 'React 入门指南', price: 59, quantity: 1 },
        { id: 2, name: 'JavaScript 高级编程', price: 89, quantity: 2 }
    ]);
    
    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item =>
            item.id === id
                ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                : item
        ).filter(item => item.quantity > 0));
    };
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    return (
        <div>
            <CartItems items={cart} onUpdateQuantity={updateQuantity} />
            <CartSummary total={total} count={count} />
        </div>
    );
}

function CartItems({ items, onUpdateQuantity }) {
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>
                    <span>{item.name}</span>
                    <span>¥{item.price}</span>
                    <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                </li>
            ))}
        </ul>
    );
}

function CartSummary({ total, count }) {
    return (
        <div>
            <p>商品数量: {count}</p>
            <p>总价: ¥{total.toFixed(2)}</p>
        </div>
    );
}

// 3. 评论系统
function CommentSystem() {
    const [comments, setComments] = React.useState([
        { id: 1, author: '张三', text: '写得很好！', likes: 5 },
        { id: 2, author: '李四', text: '很有帮助', likes: 3 }
    ]);
    
    const addComment = (author, text) => {
        setComments(prev => [...prev, {
            id: Date.now(),
            author,
            text,
            likes: 0
        }]);
    };
    
    const likeComment = (id) => {
        setComments(prev => prev.map(comment =>
            comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
        ));
    };
    
    return (
        <div>
            <CommentForm onSubmit={addComment} />
            <CommentList comments={comments} onLike={likeComment} />
        </div>
    );
}

function CommentForm({ onSubmit }) {
    const [author, setAuthor] = React.useState('');
    const [text, setText] = React.useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (author.trim() && text.trim()) {
            onSubmit(author, text);
            setAuthor('');
            setText('');
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="昵称"
            />
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="评论内容"
            />
            <button type="submit">发布</button>
        </form>
    );
}

function CommentList({ comments, onLike }) {
    return (
        <ul>
            {comments.map(comment => (
                <li key={comment.id}>
                    <strong>{comment.author}</strong>
                    <p>{comment.text}</p>
                    <button onClick={() => onLike(comment.id)}>
                        👍 {comment.likes}
                    </button>
                </li>
            ))}
        </ul>
    );
}

// 4. 任务看板
function TaskBoard() {
    const [tasks, setTasks] = React.useState([
        { id: 1, title: '完成报告', status: 'todo' },
        { id: 2, title: '代码审查', status: 'doing' },
        { id: 3, title: '测试功能', status: 'done' }
    ]);
    
    const moveTask = (id, status) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, status } : task
        ));
    };
    
    const addTask = (title) => {
        setTasks(prev => [...prev, {
            id: Date.now(),
            title,
            status: 'todo'
        }]);
    };
    
    return (
        <div>
            <TaskAdder onAdd={addTask} />
            <KanbanBoard tasks={tasks} onMove={moveTask} />
        </div>
    );
}

function TaskAdder({ onAdd }) {
    const [title, setTitle] = React.useState('');
    
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            if (title.trim()) {
                onAdd(title);
                setTitle('');
            }
        }}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="新任务..."
            />
            <button type="submit">添加</button>
        </form>
    );
}

function KanbanBoard({ tasks, onMove }) {
    const columns = ['todo', 'doing', 'done'];
    const columnNames = { todo: '待办', doing: '进行中', done: '已完成' };
    
    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            {columns.map(status => (
                <div key={status} style={{ flex: 1, padding: '10px', background: '#f0f0f0' }}>
                    <h4>{columnNames[status]}</h4>
                    {tasks.filter(task => task.status === status).map(task => (
                        <div key={task.id} style={{ background: 'white', padding: '10px', margin: '5px 0' }}>
                            {task.title}
                            <select
                                value={task.status}
                                onChange={(e) => onMove(task.id, e.target.value)}
                            >
                                <option value="todo">待办</option>
                                <option value="doing">进行中</option>
                                <option value="done">已完成</option>
                            </select>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export {
    ComplexStateApp,
    UserFilter,
    UserList,
    UserAdder,
    ShoppingCart,
    CartItems,
    CartSummary,
    CommentSystem,
    CommentForm,
    CommentList,
    TaskBoard,
    TaskAdder,
    KanbanBoard
};
