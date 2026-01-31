// 父子组件通信示例

// 1. 父传子：通过 Props
function ParentToChild() {
    const title = '用户管理';
    const users = [
        { id: 1, name: '张三', role: '管理员' },
        { id: 2, name: '李四', role: '用户' }
    ];
    
    return (
        <div>
            <UserList title={title} users={users} />
        </div>
    );
}

function UserList({ title, users }) {
    return (
        <div>
            <h3>{title}</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// 2. 子传父：通过回调函数
function ChildToParent() {
    const [message, setMessage] = React.useState('');
    
    const handleMessage = (msg) => {
        setMessage(msg);
    };
    
    return (
        <div>
            <p>子组件消息: {message || '暂无'}</p>
            <MessageSender onMessage={handleMessage} />
        </div>
    );
}

function MessageSender({ onMessage }) {
    const [input, setInput] = React.useState('');
    
    const send = () => {
        if (input.trim()) {
            onMessage(input);
            setInput('');
        }
    };
    
    return (
        <div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入消息..."
            />
            <button onClick={send}>发送</button>
        </div>
    );
}

// 3. 双向通信
function TwoWayCommunication() {
    const [count, setCount] = React.useState(0);
    const [history, setHistory] = React.useState([]);
    
    const handleIncrement = () => {
        const newCount = count + 1;
        setCount(newCount);
        setHistory([...history, { action: '增加', value: newCount, time: new Date().toLocaleTimeString() }]);
    };
    
    const handleDecrement = () => {
        const newCount = count - 1;
        setCount(newCount);
        setHistory([...history, { action: '减少', value: newCount, time: new Date().toLocaleTimeString() }]);
    };
    
    const handleReset = () => {
        setCount(0);
        setHistory([...history, { action: '重置', value: 0, time: new Date().toLocaleTimeString() }]);
    };
    
    return (
        <div>
            <CounterDisplay count={count} />
            <CounterControls
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onReset={handleReset}
            />
            <CounterHistory history={history} />
        </div>
    );
}

function CounterDisplay({ count }) {
    return (
        <div style={{ fontSize: '48px', textAlign: 'center' }}>
            {count}
        </div>
    );
}

function CounterControls({ onIncrement, onDecrement, onReset }) {
    return (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={onDecrement}>-</button>
            <button onClick={onReset}>重置</button>
            <button onClick={onIncrement}>+</button>
        </div>
    );
}

function CounterHistory({ history }) {
    return (
        <ul>
            {history.slice(-5).map((item, i) => (
                <li key={i}>
                    {item.time} - {item.action}: {item.value}
                </li>
            ))}
        </ul>
    );
}

// 4. 状态提升示例
function TemperatureApp() {
    const [temperature, setTemperature] = React.useState(25);
    const [scale, setScale] = React.useState('celsius');
    
    const celsius = scale === 'celsius' ? temperature : (temperature - 32) * 5 / 9;
    const fahrenheit = scale === 'fahrenheit' ? temperature : (temperature * 9 / 5) + 32;
    
    return (
        <div>
            <TemperatureInput
                scale="celsius"
                temperature={celsius}
                onTemperatureChange={(temp) => {
                    setScale('celsius');
                    setTemperature(temp);
                }}
            />
            <TemperatureInput
                scale="fahrenheit"
                temperature={fahrenheit}
                onTemperatureChange={(temp) => {
                    setScale('fahrenheit');
                    setTemperature(temp);
                }}
            />
            <BoilingVerdict celsius={celsius} />
        </div>
    );
}

function TemperatureInput({ scale, temperature, onTemperatureChange }) {
    return (
        <div>
            <label>输入温度 ({scale === 'celsius' ? '摄氏' : '华氏'}): </label>
            <input
                type="number"
                value={temperature}
                onChange={(e) => onTemperatureChange(Number(e.target.value))}
            />
        </div>
    );
}

function BoilingVerdict({ celsius }) {
    return (
        <p>
            {celsius >= 100 ? '水会沸腾！' : '水不会沸腾。'}
        </p>
    );
}

// 5. 兄弟组件通信
function SiblingCommunication() {
    const [message, setMessage] = React.useState('');
    const [notifications, setNotifications] = React.useState([]);
    
    const addNotification = (msg) => {
        const newNotif = { id: Date.now(), text: msg };
        setNotifications([...notifications, newNotif]);
        setMessage('');
    };
    
    return (
        <div>
            <MessageInput onSubmit={addNotification} />
            <MessageDisplay notifications={notifications} />
        </div>
    );
}

function MessageInput({ onSubmit }) {
    const [text, setText] = React.useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onSubmit(text);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="输入消息..."
            />
            <button type="submit">发送</button>
        </form>
    );
}

function MessageDisplay({ notifications }) {
    return (
        <ul>
            {notifications.map(notif => (
                <li key={notif.id}>{notif.text}</li>
            ))}
        </ul>
    );
}

export {
    ParentToChild,
    UserList,
    ChildToParent,
    MessageSender,
    TwoWayCommunication,
    CounterDisplay,
    CounterControls,
    CounterHistory,
    TemperatureApp,
    TemperatureInput,
    BoilingVerdict,
    SiblingCommunication,
    MessageInput,
    MessageDisplay
};
