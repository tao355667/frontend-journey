// useEffect Hook 示例

// 1. 基础使用
function BasicEffect() {
    const [count, setCount] = React.useState(0);
    
    React.useEffect(() => {
        document.title = `点击了 ${count} 次`;
    });
    
    return <button onClick={() => setCount(count + 1)}>点击 {count}</button>;
}

// 2. 带依赖的 effect
function EffectWithDeps() {
    const [count, setCount] = React.useState(0);
    const [data, setData] = React.useState(null);
    
    React.useEffect(() => {
        console.log('count 变化:', count);
        setData({ count, timestamp: Date.now() });
    }, [count]);
    
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>点击 {count}</button>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

// 3. 模拟数据获取
function DataFetcher() {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    
    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setData({ message: '数据加载成功！', time: new Date().toLocaleTimeString() });
                setError(null);
            } catch (err) {
                setError('加载失败');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);
    
    if (loading) return <p>加载中...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    return (
        <div>
            <p>{data.message}</p>
            <p>时间: {data.time}</p>
        </div>
    );
}

// 4. 订阅和清理
function Subscription() {
    const [message, setMessage] = React.useState('等待消息...');
    
    React.useEffect(() => {
        const handleMessage = (msg) => setMessage(msg);
        
        // 模拟订阅
        const timer = setInterval(() => {
            handleMessage(`消息 ${Date.now()}`);
        }, 3000);
        
        // 清理函数
        return () => {
            clearInterval(timer);
        };
    }, []);
    
    return <p>{message}</p>;
}

// 5. 操作 DOM
function DOMManipulator() {
    const [color, setColor] = React.useState('#007bff');
    
    React.useEffect(() => {
        document.body.style.backgroundColor = color;
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [color]);
    
    return (
        <div>
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
            <p>背景颜色: {color}</p>
        </div>
    );
}

// 6. 定时器
function Timer() {
    const [seconds, setSeconds] = React.useState(0);
    
    React.useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
        
        return () => clearInterval(timer);
    }, []);
    
    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    
    return <p style={{ fontSize: '48px' }}>{formatTime(seconds)}</p>;
}

// 7. 监听窗口大小
function WindowSize() {
    const [size, setSize] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    
    React.useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return (
        <p>
            窗口大小: {size.width} × {size.height}
        </p>
    );
}

// 8. 表单验证
function FormWithValidation() {
    const [value, setValue] = React.useState('');
    const [isValid, setIsValid] = React.useState(false);
    
    React.useEffect(() => {
        setIsValid(value.length >= 3);
    }, [value]);
    
    return (
        <div>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <p>{isValid ? '✓ 有效' : '✗ 至少3个字符'}</p>
        </div>
    );
}

// 9. 动画效果
function AnimatedCounter() {
    const [count, setCount] = React.useState(0);
    const [isAnimating, setIsAnimating] = React.useState(false);
    
    React.useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);
    
    const increment = () => {
        setCount(c => c + 1);
        setIsAnimating(true);
    };
    
    return (
        <div>
            <p style={{
                fontSize: '48px',
                transform: isAnimating ? 'scale(1.2)' : 'scale(1)',
                transition: 'transform 0.3s'
            }}>
                {count}
            </p>
            <button onClick={increment}>增加</button>
        </div>
    );
}

// 10. 模拟生命周期
function LifecycleDemo() {
    const [count, setCount] = React.useState(0);
    const [logs, setLogs] = React.useState(['Mounted']);
    
    React.useEffect(() => {
        setLogs(prev => [...prev, 'Updated']);
    }, [count]);
    
    React.useEffect(() => {
        setLogs(prev => [...prev, 'Effect Ran']);
        return () => setLogs(prev => [...prev, 'Cleanup']);
    }, []);
    
    return (
        <div>
            <button onClick={() => setCount(c => c + 1)}>{count}</button>
            <ul>
                {logs.map((log, i) => <li key={i}>{log}</li>)}
            </ul>
        </div>
    );
}

export {
    BasicEffect,
    EffectWithDeps,
    DataFetcher,
    Subscription,
    DOMManipulator,
    Timer,
    WindowSize,
    FormWithValidation,
    AnimatedCounter,
    LifecycleDemo
};
