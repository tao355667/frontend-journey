// 事件对象示例

// 1. 事件对象基本属性
function EventPropertiesDemo() {
    const handleEvent = (e) => {
        console.log('事件类型:', e.type);
        console.log('目标元素:', e.target);
        console.log('当前元素:', e.currentTarget);
        console.log('时间戳:', e.timeStamp);
        console.log('是否阻止默认:', e.defaultPrevented);
    };
    
    return (
        <button onClick={handleEvent}>
            点击查看事件对象属性
        </button>
    );
}

// 2. 阻止默认行为
function PreventDefaultDemo() {
    const handleLinkClick = (e) => {
        e.preventDefault();
        console.log('默认行为已被阻止');
        alert('链接跳转已被阻止！');
    };
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('表单提交已被阻止');
        alert('表单提交已被阻止！');
    };
    
    return (
        <div>
            <a href="https://google.com" onClick={handleLinkClick}>
                点击我不会跳转到 Google
            </a>
            <form onSubmit={handleFormSubmit} style={{ marginTop: '10px' }}>
                <input type="text" placeholder="测试输入" />
                <button type="submit">提交表单</button>
            </form>
        </div>
    );
}

// 3. 停止事件冒泡
function StopPropagationDemo() {
    const handleButtonClick = (e) => {
        e.stopPropagation();
        console.log('按钮点击事件 - 已停止冒泡');
        alert('按钮被点击（冒泡已停止）');
    };
    
    const handleDivClick = () => {
        console.log('div 点击事件');
        alert('div 被点击');
    };
    
    return (
        <div
            onClick={handleDivClick}
            style={{
                padding: '40px',
                backgroundColor: '#f0f0f0'
            }}
        >
            <p>点击 div 会触发警告</p>
            <button onClick={handleButtonClick}>
                点击按钮（不会触发 div 的点击事件）
            </button>
        </div>
    );
}

// 4. 鼠标事件属性
function MouseEventPropertiesDemo() {
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    
    const handleMouseMove = (e) => {
        setPosition({
            x: e.clientX,
            y: e.clientY
        });
    };
    
    return (
        <div
            onMouseMove={handleMouseMove}
            style={{
                height: '200px',
                border: '2px solid #ddd',
                position: 'relative'
            }}
        >
            <p>鼠标位置: ({position.x}, {position.y})</p>
            <p>在区域内移动鼠标</p>
        </div>
    );
}

// 5. 键盘事件属性
function KeyboardEventPropertiesDemo() {
    const [keyInfo, setKeyInfo] = React.useState(null);
    
    const handleKeyDown = (e) => {
        setKeyInfo({
            key: e.key,
            code: e.code,
            keyCode: e.keyCode,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            altKey: e.altKey,
            metaKey: e.metaKey
        });
    };
    
    return (
        <div>
            <input
                onKeyDown={handleKeyDown}
                placeholder="按下任意按键..."
                style={{ width: '100%', padding: '10px' }}
            />
            {keyInfo && (
                <div style={{ marginTop: '10px' }}>
                    <p>按键: {keyInfo.key}</p>
                    <p>代码: {keyInfo.code}</p>
                    <p>键码: {keyInfo.keyCode}</p>
                    <p>Ctrl: {keyInfo.ctrlKey ? '是' : '否'}</p>
                    <p>Shift: {keyInfo.shiftKey ? '是' : '否'}</p>
                    <p>Alt: {keyInfo.altKey ? '是' : '否'}</p>
                    <p>Meta: {keyInfo.metaKey ? '是' : '否'}</p>
                </div>
            )}
        </div>
    );
}

// 6. 拖拽事件
function DragEventDemo() {
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    
    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', '拖拽数据');
        console.log('开始拖拽');
    };
    
    const handleDrag = (e) => {
        console.log('拖拽中');
    };
    
    const handleDragEnd = (e) => {
        setPosition({
            x: e.clientX,
            y: e.clientY
        });
        console.log('拖拽结束');
    };
    
    return (
        <div>
            <div
                draggable
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'move',
                    marginBottom: '20px'
                }}
            >
                拖拽我
            </div>
            <p>最后拖拽位置: ({position.x}, {position.y})</p>
        </div>
    );
}

// 7. 触摸事件
function TouchEventDemo() {
    const [touches, setTouches] = React.useState([]);
    
    const handleTouchStart = (e) => {
        const touchList = Array.from(e.touches).map(t => ({
            x: t.clientX,
            y: t.clientY
        }));
        setTouches(touchList);
    };
    
    const handleTouchMove = (e) => {
        e.preventDefault();  // 防止滚动
        const touchList = Array.from(e.touches).map(t => ({
            x: t.clientX,
            y: t.clientY
        }));
        setTouches(touchList);
    };
    
    const handleTouchEnd = () => {
        setTouches([]);
    };
    
    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
                height: '200px',
                border: '2px solid #ddd',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <p>触摸点数量: {touches.length}</p>
            {touches.map((t, i) => (
                <p key={i}>触摸点 {i + 1}: ({t.x}, {t.y})</p>
            ))}
            <p>在触摸屏上触摸查看效果</p>
        </div>
    );
}

// 8. 剪贴板事件
function ClipboardEventDemo() {
    const [clipboardText, setClipboardText] = React.useState('');
    
    const handleCopy = (e) => {
        const text = '这是复制的内容！';
        e.clipboardData.setData('text/plain', text);
        alert('自定义内容已复制到剪贴板！');
    };
    
    const handlePaste = (e) => {
        const text = e.clipboardData.getData('text');
        setClipboardText(text);
    };
    
    return (
        <div>
            <p onCopy={handleCopy} style={{ cursor: 'pointer' }}>
                复制这段文字（会复制自定义内容）
            </p>
            <input
                onPaste={handlePaste}
                placeholder="粘贴内容到这里..."
                style={{ width: '100%', padding: '8px', marginTop: '10px' }}
            />
            {clipboardText && <p>粘贴的内容: {clipboardText}</p>}
        </div>
    );
}

// 9. 滚动事件
function ScrollEventDemo() {
    const [scrollInfo, setScrollInfo] = React.useState({ x: 0, y: 0 });
    
    const handleScroll = (e) => {
        setScrollInfo({
            x: e.currentTarget.scrollLeft,
            y: e.currentTarget.scrollTop
        });
    };
    
    return (
        <div
            onScroll={handleScroll}
            style={{
                height: '150px',
                overflow: 'auto',
                border: '2px solid #ddd'
            }}
        >
            <div style={{ height: '300px', padding: '10px' }}>
                <p>滚动区域 - 向下滚动查看位置变化</p>
                {[...Array(20)].map((_, i) => (
                    <p key={i}>第 {i + 1} 行</p>
                ))}
            </div>
            <p>滚动位置: X={scrollInfo.x}, Y={scrollInfo.y}</p>
        </div>
    );
}

// 10. 焦点事件
function FocusEventDemo() {
    const [focusInfo, setFocusInfo] = React.useState('');
    
    const handleFocus = (e) => {
        setFocusInfo(`聚焦到: ${e.target.placeholder || e.target.name || '输入框'}`);
    };
    
    const handleBlur = (e) => {
        setFocusInfo(`离开: ${e.target.placeholder || e.target.name || '输入框'}`);
    };
    
    return (
        <div>
            <input
                name="username"
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="用户名"
                style={{ display: 'block', marginBottom: '10px' }}
            />
            <input
                name="email"
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="邮箱"
                style={{ display: 'block', marginBottom: '10px' }}
            />
            <input
                name="password"
                type="password"
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="密码"
                style={{ display: 'block' }}
            />
            <p>{focusInfo}</p>
        </div>
    );
}

export {
    EventPropertiesDemo,
    PreventDefaultDemo,
    StopPropagationDemo,
    MouseEventPropertiesDemo,
    KeyboardEventPropertiesDemo,
    DragEventDemo,
    TouchEventDemo,
    ClipboardEventDemo,
    ScrollEventDemo,
    FocusEventDemo
};
