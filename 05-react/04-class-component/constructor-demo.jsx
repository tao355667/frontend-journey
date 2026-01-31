// 构造函数和状态管理示例

// 1. 基本构造函数使用
class Counter1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }
    
    render() {
        return (
            <div>
                <p>计数：{this.state.count}</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    增加
                </button>
            </div>
        );
    }
}

// 2. 构造函数中绑定方法（旧写法）
class Counter2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
        // 绑定方法
        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
    }
    
    handleIncrement() {
        this.setState({ count: this.state.count + 1 });
    }
    
    handleDecrement() {
        this.setState({ count: this.state.count - 1 });
    }
    
    render() {
        return (
            <div>
                <p>计数：{this.state.count}</p>
                <button onClick={this.handleIncrement}>+1</button>
                <button onClick={this.handleDecrement}>-1</button>
            </div>
        );
    }
}

// 3. 现代写法：类属性语法（推荐）
class ModernCounter extends React.Component {
    // 直接在类属性中定义 state
    state = {
        count: 0,
        step: 1
    };
    
    // 使用箭头函数自动绑定 this
    handleIncrement = () => {
        this.setState({ count: this.state.count + this.state.step });
    };
    
    handleDecrement = () => {
        this.setState({ count: this.state.count - this.state.step });
    };
    
    handleStepChange = (e) => {
        this.setState({ step: parseInt(e.target.value) || 1 });
    };
    
    render() {
        return (
            <div>
                <p>计数：{this.state.count}</p>
                <p>步长：{this.state.step}</p>
                <button onClick={this.handleIncrement}>+{this.state.step}</button>
                <button onClick={this.handleDecrement}>-{this.state.step}</button>
                <div>
                    <label>
                        设置步长：
                        <input 
                            type="number" 
                            value={this.state.step} 
                            onChange={this.handleStepChange}
                            min="1"
                        />
                    </label>
                </div>
            </div>
        );
    }
}

// 4. 多个状态的管理
class UserForm extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        isSubmitting: false
    };
    
    handleUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    };
    
    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };
    
    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ isSubmitting: true });
        // 模拟表单提交
        setTimeout(() => {
            this.setState({ isSubmitting: false });
            alert(`提交成功！\n用户名：${this.state.username}\n邮箱：${this.state.email}`);
        }, 1000);
    };
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>用户名：</label>
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                        required
                    />
                </div>
                <div>
                    <label>邮箱：</label>
                    <input
                        type="email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        required
                    />
                </div>
                <div>
                    <label>密码：</label>
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        required
                        minLength="6"
                    />
                </div>
                <button type="submit" disabled={this.state.isSubmitting}>
                    {this.state.isSubmitting ? '提交中...' : '提交'}
                </button>
            </form>
        );
    }
}

// 5. setState 的函数形式
class ScoreBoard extends React.Component {
    state = {
        score: 0,
        history: []
    };
    
    handleScore = (delta) => {
        // 使用函数形式，依赖前一个 state
        this.setState(prevState => {
            const newScore = prevState.score + delta;
            return {
                score: newScore,
                history: [...prevState.history, {
                    delta,
                    score: newScore,
                    time: new Date().toLocaleTimeString()
                }]
            };
        });
    };
    
    render() {
        return (
            <div>
                <h2>计分板</h2>
                <p className="score">得分：{this.state.score}</p>
                <div className="buttons">
                    <button onClick={() => this.handleScore(-10)}>-10</button>
                    <button onClick={() => this.handleScore(-5)}>-5</button>
                    <button onClick={() => this.handleScore(5)}>+5</button>
                    <button onClick={() => this.handleScore(10)}>+10</button>
                </div>
                <div className="history">
                    <h3>得分历史</h3>
                    <ul>
                        {this.state.history.slice(-5).map((item, index) => (
                            <li key={index}>
                                {item.time}：{item.delta > 0 ? '+' : ''}{item.delta}（当前：{item.score}）
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

// 6. 状态更新回调
class AsyncStateDemo extends React.Component {
    state = {
        value: 0
    };
    
    handleUpdate = () => {
        // 使用回调获取更新后的值
        this.setState(
            { value: this.state.value + 1 },
            () => {
                console.log('更新后的值：', this.state.value);
            }
        );
    };
    
    render() {
        return (
            <div>
                <p>当前值：{this.state.value}</p>
                <button onClick={this.handleUpdate}>增加</button>
            </div>
        );
    }
}

// 7. 复杂状态更新
class TodoApp extends React.Component {
    state = {
        todos: [
            { id: 1, text: '学习 React', completed: true },
            { id: 2, text: '完成练习', completed: false },
            { id: 3, text: '阅读文档', completed: false }
        ],
        nextId: 4,
        filter: 'all'  // all, active, completed
    };
    
    handleToggle = (id) => {
        this.setState(prevState => ({
            todos: prevState.todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        }));
    };
    
    handleAdd = (text) => {
        this.setState(prevState => ({
            todos: [
                ...prevState.todos,
                { id: prevState.nextId, text, completed: false }
            ],
            nextId: prevState.nextId + 1
        }));
    };
    
    handleDelete = (id) => {
        this.setState(prevState => ({
            todos: prevState.todos.filter(todo => todo.id !== id)
        }));
    };
    
    handleFilterChange = (filter) => {
        this.setState({ filter });
    };
    
    render() {
        const { todos, filter } = this.state;
        const filteredTodos = todos.filter(todo => {
            if (filter === 'active') return !todo.completed;
            if (filter === 'completed') return todo.completed;
            return true;
        });
        
        return (
            <div>
                <h2>待办事项</h2>
                <div className="filters">
                    <button onClick={() => this.handleFilterChange('all')}>全部</button>
                    <button onClick={() => this.handleFilterChange('active')}>进行中</button>
                    <button onClick={() => this.handleFilterChange('completed')}>已完成</button>
                </div>
                <ul>
                    {filteredTodos.map(todo => (
                        <li key={todo.id}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => this.handleToggle(todo.id)}
                            />
                            <span style={{
                                textDecoration: todo.completed ? 'line-through' : 'none'
                            }}>
                                {todo.text}
                            </span>
                            <button onClick={() => this.handleDelete(todo.id)}>删除</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

// 8. 派生状态的处理
class DataList extends React.Component {
    // 从 props 派生 state（不推荐，可能导致问题）
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         items: props.items
    //     };
    // }
    
    // 正确做法：直接使用 props，或者使用 useMemo 等
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        );
    }
}

export {
    Counter1,
    Counter2,
    ModernCounter,
    UserForm,
    ScoreBoard,
    AsyncStateDemo,
    TodoApp,
    DataList
};
