// useState Hook 示例

// 1. 基本计数器
function BasicCounter() {
    const [count, setCount] = React.useState(0);
    
    return (
        <div>
            <p>计数: {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setCount(count - 1)}>-1</button>
            <button onClick={() => setCount(0)}>重置</button>
        </div>
    );
}

// 2. 多个独立的 state
function MultipleStates() {
    const [name, setName] = React.useState('张三');
    const [age, setAge] = React.useState(25);
    const [city, setCity] = React.useState('北京');
    
    return (
        <div>
            <p>姓名: {name}</p>
            <p>年龄: {age}</p>
            <p>城市: {city}</p>
            <input value={name} onChange={e => setName(e.target.value)} />
            <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} />
            <select value={city} onChange={e => setCity(e.target.value)}>
                <option value="北京">北京</option>
                <option value="上海">上海</option>
                <option value="广州">广州</option>
            </select>
        </div>
    );
}

// 3. 对象类型的 state
function UserProfile() {
    const [user, setUser] = React.useState({
        name: '李四',
        email: 'li@example.com',
        age: 30
    });
    
    const updateName = () => {
        setUser({ ...user, name: '李明' });
    };
    
    const updateEmail = () => {
        setUser({ ...user, email: 'liming@example.com' });
    };
    
    return (
        <div>
            <p>姓名: {user.name}</p>
            <p>邮箱: {user.email}</p>
            <p>年龄: {user.age}</p>
            <button onClick={updateName}>修改姓名</button>
            <button onClick={updateEmail}>修改邮箱</button>
        </div>
    );
}

// 4. 数组类型的 state
function TodoList() {
    const [todos, setTodos] = React.useState([
        { id: 1, text: '学习 React', completed: true },
        { id: 2, text: '完成练习', completed: false },
        { id: 3, text: '阅读文档', completed: false }
    ]);
    
    const addTodo = (text) => {
        setTodos([...todos, {
            id: Date.now(),
            text,
            completed: false
        }]);
    };
    
    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };
    
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };
    
    return (
        <div>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>删除</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => addTodo('新任务')}>添加任务</button>
        </div>
    );
}

// 5. 初始值函数（惰性初始化）
function HeavyComponent() {
    // 只在组件首次渲染时执行
    const [data, setData] = React.useState(() => {
        console.log('初始化数据...');
        const initialData = localStorage.getItem('data') || '默认值';
        return initialData;
    });
    
    return (
        <div>
            <p>数据: {data}</p>
            <button onClick={() => setData('新数据')}>更新数据</button>
        </div>
    );
}

// 6. 表单处理
function SimpleForm() {
    const [formData, setFormData] = React.useState({
        username: '',
        email: '',
        password: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('表单数据:', formData);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="用户名"
            />
            <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="邮箱"
            />
            <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="密码"
            />
            <button type="submit">提交</button>
        </form>
    );
}

// 7. 开关组件
function ToggleSwitch() {
    const [isOn, setIsOn] = React.useState(false);
    
    return (
        <div>
            <button
                onClick={() => setIsOn(!isOn)}
                style={{
                    backgroundColor: isOn ? '#4CAF50' : '#f44336',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '4px'
                }}
            >
                {isOn ? '开启' : '关闭'}
            </button>
            <p>状态: {isOn ? 'ON' : 'OFF'}</p>
        </div>
    );
}

// 8. 计数器（使用函数式更新）
function CounterWithFunction() {
    const [count, setCount] = React.useState(0);
    
    // 多次更新会合并，只触发一次重新渲染
    const incrementBy3 = () => {
        setCount(c => c + 1);
        setCount(c => c + 1);
        setCount(c => c + 1);
    };
    
    return (
        <div>
            <p>计数: {count}</p>
            <button onClick={() => setCount(c => c + 1)}>+1</button>
            <button onClick={incrementBy3}>+3</button>
            <button onClick={() => setCount(0)}>重置</button>
        </div>
    );
}

// 9. 选项卡切换
function Tabs() {
    const [activeTab, setActiveTab] = React.useState('tab1');
    
    const tabs = [
        { id: 'tab1', label: '标签1', content: '内容1' },
        { id: 'tab2', label: '标签2', content: '内容2' },
        { id: 'tab3', label: '标签3', content: '内容3' }
    ];
    
    return (
        <div>
            <div style={{ display: 'flex', gap: '10px' }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            backgroundColor: activeTab === tab.id ? '#007bff' : '#fff',
                            color: activeTab === tab.id ? '#fff' : '#000'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div style={{ padding: '20px', border: '1px solid #ddd' }}>
                {tabs.find(tab => tab.id === activeTab)?.content}
            </div>
        </div>
    );
}

// 10. 搜索过滤
function SearchableList() {
    const [query, setQuery] = React.useState('');
    const [items] = React.useState([
        '苹果', '香蕉', '橙子', '葡萄', '西瓜',
        '菠萝', '芒果', '草莓', '樱桃', '桃子'
    ]);
    
    const filteredItems = items.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
    );
    
    return (
        <div>
            <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="搜索..."
            />
            <ul>
                {filteredItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <p>找到 {filteredItems.length} 个结果</p>
        </div>
    );
}

export {
    BasicCounter,
    MultipleStates,
    UserProfile,
    TodoList,
    HeavyComponent,
    SimpleForm,
    ToggleSwitch,
    CounterWithFunction,
    Tabs,
    SearchableList
};
