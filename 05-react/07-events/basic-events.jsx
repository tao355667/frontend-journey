// 基础事件处理示例

// 1. 点击事件
function ClickEventDemo() {
    const handleClick = () => {
        alert('按钮被点击了！');
    };
    
    const handleClickWithMessage = (message) => {
        alert(message);
    };
    
    return (
        <div>
            <button onClick={handleClick}>基本点击</button>
            <button onClick={() => handleClickWithMessage('带参数的点击')}>
                带参数点击
            </button>
        </div>
    );
}

// 2. 鼠标事件
function MouseEventDemo() {
    const handleMouseEnter = (e) => {
        e.target.style.backgroundColor = '#f0f0f0';
    };
    
    const handleMouseLeave = (e) => {
        e.target.style.backgroundColor = 'white';
    };
    
    const handleMouseMove = (e) => {
        console.log(`位置: ${e.clientX}, ${e.clientY}`);
    };
    
    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            style={{
                padding: '40px',
                border: '2px solid #ddd',
                textAlign: 'center'
            }}
        >
            鼠标悬停并移动查看效果
        </div>
    );
}

// 3. 键盘事件
function KeyboardEventDemo() {
    const [keys, setKeys] = React.useState([]);
    
    const handleKeyDown = (e) => {
        setKeys(prev => [...prev.slice(-4), {
            key: e.key,
            code: e.code,
            time: new Date().toLocaleTimeString()
        }]);
    };
    
    return (
        <div>
            <input
                onKeyDown={handleKeyDown}
                placeholder="按下任意按键..."
                style={{ width: '100%', padding: '10px' }}
            />
            <div>
                <h4>最近按下的按键:</h4>
                {keys.map((k, i) => (
                    <p key={i}>
                        {k.time} - 按键: {k.key} ({k.code})
                    </p>
                ))}
            </div>
        </div>
    );
}

// 4. 表单事件
function FormEventDemo() {
    const [formData, setFormData] = React.useState({
        username: '',
        email: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleFocus = (e) => {
        e.target.style.borderColor = '#007bff';
    };
    
    const handleBlur = (e) => {
        e.target.style.borderColor = '#ddd';
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`表单数据:\n用户名: ${formData.username}\n邮箱: ${formData.email}`);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
                <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="用户名"
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="邮箱"
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <button type="submit">提交</button>
            <p>用户名: {formData.username}</p>
            <p>邮箱: {formData.email}</p>
        </form>
    );
}

// 5. 复选框和单选框
function CheckboxDemo() {
    const [agreed, setAgreed] = React.useState(false);
    const [color, setColor] = React.useState('blue');
    
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                />
                我同意条款
            </label>
            <p>选中状态: {agreed ? '是' : '否'}</p>
            
            <div>
                <p>选择颜色:</p>
                <label>
                    <input
                        type="radio"
                        name="color"
                        value="red"
                        checked={color === 'red'}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    红色
                </label>
                <label>
                    <input
                        type="radio"
                        name="color"
                        value="green"
                        checked={color === 'green'}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    绿色
                </label>
                <label>
                    <input
                        type="radio"
                        name="color"
                        value="blue"
                        checked={color === 'blue'}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    蓝色
                </label>
            </div>
            <p>选择: {color}</p>
        </div>
    );
}

// 6. 选择器事件
function SelectDemo() {
    const [selected, setSelected] = React.useState('');
    
    const handleChange = (e) => {
        setSelected(e.target.value);
    };
    
    return (
        <div>
            <select
                value={selected}
                onChange={handleChange}
                style={{ padding: '8px' }}
            >
                <option value="">请选择</option>
                <option value="apple">苹果</option>
                <option value="banana">香蕉</option>
                <option value="orange">橙子</option>
                <option value="grape">葡萄</option>
            </select>
            <p>选择: {selected || '未选择'}</p>
        </div>
    );
}

// 7. 阻止默认行为
function PreventDefaultDemo() {
    const handleLinkClick = (e) => {
        e.preventDefault();
        alert('链接点击被阻止，不跳转页面');
    };
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert('表单提交被阻止');
    };
    
    return (
        <div>
            <a href="https://example.com" onClick={handleLinkClick}>
                点击我不会跳转
            </a>
            
            <form onSubmit={handleFormSubmit} style={{ marginTop: '20px' }}>
                <input type="text" placeholder="表单输入" />
                <button type="submit">提交</button>
            </form>
        </div>
    );
}

// 8. 事件冒泡
function EventBubblingDemo() {
    const handleInnerClick = (e) => {
        e.stopPropagation();
        alert('内部按钮被点击');
    };
    
    const handleOuterClick = () => {
        alert('外部容器被点击');
    };
    
    return (
        <div
            onClick={handleOuterClick}
            style={{
                padding: '40px',
                backgroundColor: '#f0f0f0',
                cursor: 'pointer'
            }}
        >
            <p>点击外部容器</p>
            <button onClick={handleInnerClick}>内部按钮</button>
        </div>
    );
}

// 9. 双击事件
function DoubleClickDemo() {
    const [count, setCount] = React.useState(0);
    
    const handleDoubleClick = () => {
        setCount(c => c + 1);
    };
    
    return (
        <div
            onDoubleClick={handleDoubleClick}
            style={{
                padding: '40px',
                textAlign: 'center',
                border: '2px dashed #ddd',
                cursor: 'pointer'
            }}
        >
            <p>双击我！</p>
            <p>双击次数: {count}</p>
        </div>
    );
}

// 10. 综合示例：交互式组件
function InteractiveComponent() {
    const [clicks, setClicks] = React.useState(0);
    const [hovered, setHovered] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    
    const handleClick = () => {
        setClicks(c => c + 1);
    };
    
    const handleMouseEnter = () => {
        setHovered(true);
    };
    
    const handleMouseLeave = () => {
        setHovered(false);
    };
    
    const handleReset = () => {
        setClicks(0);
        setInputValue('');
    };
    
    return (
        <div
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                padding: '30px',
                backgroundColor: hovered ? '#e3f2fd' : '#f5f5f5',
                border: '2px solid #007bff',
                borderRadius: '8px',
                transition: 'all 0.3s'
            }}
        >
            <h3>交互式组件</h3>
            <p>点击次数: {clicks}</p>
            <p>悬停状态: {hovered ? '是' : '否'}</p>
            
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="输入内容..."
                style={{ marginTop: '10px' }}
            />
            
            <button onClick={(e) => { e.stopPropagation(); handleReset(); }} style={{ marginLeft: '10px' }}>
                重置
            </button>
        </div>
    );
}

export {
    ClickEventDemo,
    MouseEventDemo,
    KeyboardEventDemo,
    FormEventDemo,
    CheckboxDemo,
    SelectDemo,
    PreventDefaultDemo,
    EventBubblingDemo,
    DoubleClickDemo,
    InteractiveComponent
};
