// State 更新示例

// 1. 异步更新演示
function AsyncUpdateDemo() {
    const [count, setCount] = React.useState(0);
    
    const handleClick = () => {
        console.log('点击前:', count);
        setCount(count + 1);
        console.log('点击后:', count);  // 仍是旧值，因为 setState 是异步的
    };
    
    // 使用 useEffect 监听变化
    React.useEffect(() => {
        console.log('State 已更新:', count);
    }, [count]);
    
    return (
        <div>
            <p>计数: {count}</p>
            <button onClick={handleClick}>增加</button>
        </div>
    );
}

// 2. 合并更新（对象）
function ObjectUpdateDemo() {
    const [user, setUser] = React.useState({
        name: '张三',
        age: 25,
        city: '北京'
    });
    
    const updateAge = () => {
        setUser(prevUser => ({
            ...prevUser,
            age: prevUser.age + 1
        }));
    };
    
    const updateCity = () => {
        setUser(prevUser => ({
            ...prevUser,
            city: '上海'
        }));
    };
    
    // 同时更新多个字段
    const updateAll = () => {
        setUser({
            name: '李四',
            age: 30,
            city: '广州'
        });
    };
    
    return (
        <div>
            <p>姓名: {user.name}</p>
            <p>年龄: {user.age}</p>
            <p>城市: {user.city}</p>
            <button onClick={updateAge}>增加年龄</button>
            <button onClick={updateCity}>切换城市</button>
            <button onClick={updateAll}>更新全部</button>
        </div>
    );
}

// 3. 合并更新（数组）
function ArrayUpdateDemo() {
    const [items, setItems] = React.useState(['A', 'B', 'C', 'D']);
    
    const addToEnd = () => {
        setItems([...items, 'E']);
    };
    
    const addToStart = () => {
        setItems(['X', ...items]);
    };
    
    const removeLast = () => {
        setItems(items.slice(0, -1));
    };
    
    const updateSecond = () => {
        setItems(items.map((item, index) => 
            index === 1 ? 'B新' : item
        ));
    };
    
    return (
        <div>
            <p>数组: {items.join(', ')}</p>
            <button onClick={addToEnd}>末尾添加</button>
            <button onClick={addToStart}>开头添加</button>
            <button onClick={removeLast}>删除末尾</button>
            <button onClick={updateSecond}>修改第二个</button>
        </div>
    );
}

// 4. 函数式更新
function FunctionalUpdateDemo() {
    const [count, setCount] = React.useState(0);
    
    const increment = () => {
        // 使用函数式更新，依赖前一个状态
        setCount(c => c + 1);
    };
    
    const incrementBy = (delta) => {
        setCount(c => c + delta);
    };
    
    const double = () => {
        setCount(c => c * 2);
    };
    
    return (
        <div>
            <p>计数: {count}</p>
            <button onClick={increment}>+1</button>
            <button onClick={() => incrementBy(5)}>+5</button>
            <button onClick={double}>×2</button>
            <button onClick={() => setCount(0)}>重置</button>
        </div>
    );
}

// 5. 批量更新
function BatchUpdateDemo() {
    const [stats, setStats] = React.useState({
        clicks: 0,
        renders: 0
    });
    
    const updateBoth = () => {
        // 多次 setState 会被批量处理，只触发一次重新渲染
        setStats({ ...stats, clicks: stats.clicks + 1 });
        setStats(prev => ({ ...prev, renders: prev.renders + 1 }));
    };
    
    return (
        <div>
            <p>点击次数: {stats.clicks}</p>
            <p>渲染次数: {stats.renders}</p>
            <button onClick={updateBoth}>更新两个值</button>
        </div>
    );
}

// 6. 条件更新
function ConditionalUpdateDemo() {
    const [value, setValue] = React.useState(0);
    const [maxReached, setMaxReached] = React.useState(false);
    
    const increment = () => {
        setValue(v => {
            const newValue = v + 1;
            if (newValue >= 10 && !maxReached) {
                setMaxReached(true);
            }
            return newValue;
        });
    };
    
    const decrement = () => {
        setValue(v => {
            const newValue = v - 1;
            if (newValue < 10 && maxReached) {
                setMaxReached(false);
            }
            return newValue;
        });
    };
    
    return (
        <div>
            <p>值: {value}</p>
            <p>{maxReached && '已达到最大值！'}</p>
            <button onClick={decrement} disabled={value <= 0}>-</button>
            <button onClick={increment} disabled={value >= 10}>+</button>
        </div>
    );
}

// 7. 复杂状态管理
function ComplexStateDemo() {
    const [form, setForm] = React.useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: {},
        isSubmitting: false
    });
    
    const [submittedData, setSubmittedData] = React.useState(null);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
            errors: {
                ...prev.errors,
                [name]: ''  // 清除该字段的错误
            }
        }));
    };
    
    const validate = () => {
        const errors = {};
        if (!form.username.trim()) errors.username = '用户名不能为空';
        if (!form.email.includes('@')) errors.email = '邮箱格式不正确';
        if (form.password.length < 6) errors.password = '密码至少6位';
        if (form.password !== form.confirmPassword) errors.confirmPassword = '两次密码不一致';
        return errors;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        
        if (Object.keys(errors).length > 0) {
            setForm(prev => ({ ...prev, errors }));
            return;
        }
        
        setForm(prev => ({ ...prev, isSubmitting: true }));
        
        setTimeout(() => {
            setSubmittedData({
                username: form.username,
                email: form.email
            });
            setForm(prev => ({ ...prev, isSubmitting: false }));
        }, 1000);
    };
    
    if (submittedData) {
        return (
            <div>
                <h3>提交成功！</h3>
                <p>用户名: {submittedData.username}</p>
                <p>邮箱: {submittedData.email}</p>
                <button onClick={() => setSubmittedData(null)}>重新填写</button>
            </div>
        );
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="用户名"
                />
                {form.errors.username && <span>{form.errors.username}</span>}
            </div>
            <div>
                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="邮箱"
                />
                {form.errors.email && <span>{form.errors.email}</span>}
            </div>
            <div>
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="密码"
                />
                {form.errors.password && <span>{form.errors.password}</span>}
            </div>
            <div>
                <input
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="确认密码"
                />
                {form.errors.confirmPassword && <span>{form.errors.confirmPassword}</span>}
            </div>
            <button type="submit" disabled={form.isSubmitting}>
                {form.isSubmitting ? '提交中...' : '提交'}
            </button>
        </form>
    );
}

// 8. 状态回退
function HistoryDemo() {
    const [count, setCount] = React.useState(0);
    const [history, setHistory] = React.useState([0]);
    
    const increment = () => {
        const newValue = count + 1;
        setCount(newValue);
        setHistory([...history, newValue]);
    };
    
    const decrement = () => {
        const newValue = count - 1;
        setCount(newValue);
        setHistory([...history, newValue]);
    };
    
    const goTo = (value) => {
        setCount(value);
        setHistory(history.slice(0, history.indexOf(value) + 1));
    };
    
    return (
        <div>
            <p>当前值: {count}</p>
            <button onClick={decrement}>-</button>
            <button onClick={increment}>+</button>
            <button onClick={() => setCount(0)}>重置</button>
            <div>
                <p>历史记录:</p>
                {history.map((value, index) => (
                    <button key={index} onClick={() => goTo(value)}>
                        {value}
                    </button>
                ))}
            </div>
        </div>
    );
}

export {
    AsyncUpdateDemo,
    ObjectUpdateDemo,
    ArrayUpdateDemo,
    FunctionalUpdateDemo,
    BatchUpdateDemo,
    ConditionalUpdateDemo,
    ComplexStateDemo,
    HistoryDemo
};
