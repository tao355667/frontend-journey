// useRef Hook 示例

// 1. 访问 DOM 元素
function TextInput() {
    const inputRef = React.useRef(null);
    
    const focusInput = () => {
        inputRef.current.focus();
    };
    
    const selectText = () => {
        inputRef.current.select();
    };
    
    return (
        <div>
            <input
                ref={inputRef}
                defaultValue="可以选中我"
            />
            <button onClick={focusInput}>聚焦</button>
            <button onClick={selectText}>全选</button>
        </div>
    );
}

// 2. 自动聚焦输入框
function AutoFocusInput() {
    const inputRef = React.useRef(null);
    
    React.useEffect(() => {
        inputRef.current.focus();
    }, []);
    
    return <input ref={inputRef} placeholder="自动聚焦" />;
}

// 3. 测量元素尺寸
function Measurer() {
    const boxRef = React.useRef(null);
    const [size, setSize] = React.useState({ width: 0, height: 0 });
    
    React.useEffect(() => {
        const measure = () => {
            if (boxRef.current) {
                setSize({
                    width: boxRef.current.offsetWidth,
                    height: boxRef.current.offsetHeight
                });
            }
        };
        
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);
    
    return (
        <div>
            <div
                ref={boxRef}
                style={{
                    width: '200px',
                    height: '100px',
                    background: '#007bff',
                    color: 'white',
                    padding: '20px'
                }}
            >
                测量这个盒子
            </div>
            <p>宽度: {size.width}px, 高度: {size.height}px</p>
        </div>
    );
}

// 4. 存储可变值
function CounterWithRef() {
    const countRef = React.useRef(0);
    const [renderCount, setRenderCount] = React.useState(0);
    
    const incrementRef = () => {
        countRef.current += 1;
        console.log('Ref 计数:', countRef.current);
        // 不会触发重新渲染
    };
    
    const forceRender = () => {
        setRenderCount(c => c + 1);
    };
    
    return (
        <div>
            <p>Ref 计数（不触发渲染）: {countRef.current}</p>
            <p>渲染次数: {renderCount}</p>
            <button onClick={incrementRef}>增加 Ref</button>
            <button onClick={forceRender}>强制渲染</button>
        </div>
    );
}

// 5. 上一帧的值
function PreviousValue() {
    const [count, setCount] = React.useState(0);
    const prevCountRef = React.useRef();
    
    React.useEffect(() => {
        prevCountRef.current = count;
    }, [count]);
    
    const prevCount = prevCountRef.current;
    
    return (
        <div>
            <p>当前: {count}</p>
            <p>上一帧: {prevCount !== undefined ? prevCount : '-'}</p>
            <button onClick={() => setCount(c => c + 1)}>增加</button>
        </div>
    );
}

// 6. 实现防抖
function DebouncedInput() {
    const [value, setValue] = React.useState('');
    const [debouncedValue, setDebouncedValue] = React.useState('');
    const timeoutRef = React.useRef();
    
    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
            setDebouncedValue(newValue);
        }, 500);
    };
    
    React.useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    
    return (
        <div>
            <input value={value} onChange={handleChange} placeholder="防抖输入" />
            <p>当前输入: {value}</p>
            <p>防抖值（500ms后）: {debouncedValue}</p>
        </div>
    );
}

// 7. 实现节流
function ThrottledButton() {
    const [clickCount, setClickCount] = React.useState(0);
    const [canClick, setCanClick] = React.useState(true);
    const lastClickRef = React.useRef(Date.now());
    
    const handleClick = () => {
        const now = Date.now();
        if (now - lastClickRef.current >= 2000) {
            setClickCount(c => c + 1);
            lastClickRef.current = now;
            setCanClick(false);
            setTimeout(() => setCanClick(true), 2000);
        }
    };
    
    return (
        <div>
            <button onClick={handleClick} disabled={!canClick}>
                {canClick ? '点击我（2秒冷却）' : '冷却中...'}
            </button>
            <p>点击次数: {clickCount}</p>
        </div>
    );
}

// 8. 存储上一轮 Props
function PreviousPropsDemo({ value }) {
    const prevValueRef = React.useRef();
    
    React.useEffect(() => {
        prevValueRef.current = value;
    }, [value]);
    
    return (
        <div>
            <p>当前 Props: {value}</p>
            <p>上一轮 Props: {prevValueRef.current ?? '-'}</p>
        </div>
    );
}

// 9. 实现倒计时
function CountdownTimer() {
    const [seconds, setSeconds] = React.useState(10);
    const timerRef = React.useRef();
    
    React.useEffect(() => {
        timerRef.current = setInterval(() => {
            setSeconds(s => {
                if (s <= 1) {
                    clearInterval(timerRef.current);
                    return 0;
                }
                return s - 1;
            });
        }, 1000);
        
        return () => clearInterval(timerRef.current);
    }, []);
    
    return (
        <div>
            <p style={{ fontSize: '48px' }}>{seconds}</p>
            {seconds === 0 && <p>倒计时结束！</p>}
        </div>
    );
}

// 10. 组合使用：表单聚焦和验证
function FormWithRefs() {
    const nameRef = React.useRef(null);
    const emailRef = React.useRef(null);
    const [errors, setErrors] = React.useState({});
    
    const validateAndFocus = () => {
        const newErrors = {};
        if (!nameRef.current?.value.trim()) {
            newErrors.name = '姓名不能为空';
        }
        if (!emailRef.current?.value.includes('@')) {
            newErrors.email = '邮箱格式不正确';
        }
        
        setErrors(newErrors);
        
        if (newErrors.name) {
            nameRef.current.focus();
        } else if (newErrors.email) {
            emailRef.current.focus();
        }
        
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateAndFocus()) {
            alert('表单验证通过！');
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input ref={nameRef} placeholder="姓名" />
                {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
            </div>
            <div>
                <input ref={emailRef} placeholder="邮箱" />
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
            </div>
            <button type="submit">提交</button>
        </form>
    );
}

export {
    TextInput,
    AutoFocusInput,
    Measurer,
    CounterWithRef,
    PreviousValue,
    DebouncedInput,
    ThrottledButton,
    PreviousPropsDemo,
    CountdownTimer,
    FormWithRefs
};
