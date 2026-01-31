// JSX 属性设置示例

// 1. 基本属性
function BasicAttributes() {
    return (
        <div>
            <h2>基本属性示例</h2>
            
            <label htmlFor="username">用户名:</label>
            <input
                id="username"
                type="text"
                placeholder="请输入用户名"
                maxLength={20}
                required
            />
            
            <label htmlFor="password">密码:</label>
            <input
                id="password"
                type="password"
                placeholder="请输入密码"
                minLength={6}
            />
        </div>
    );
}

// 2. 类名操作
function ClassNameExample() {
    const isActive = true;
    const hasError = false;
    
    // 使用模板字符串组合类名
    const buttonClass = `btn ${isActive ? 'btn-primary' : 'btn-secondary'} ${hasError ? 'btn-error' : ''}`;
    
    return (
        <div>
            <h2>className 示例</h2>
            
            <button className="btn btn-primary">主要按钮</button>
            <button className="btn btn-secondary">次要按钮</button>
            <button className="btn" disabled>禁用按钮</button>
            
            <p className={`message ${isActive ? 'success' : 'error'}`}>
                动态类名示例
            </p>
        </div>
    );
}

// 3. style 属性
function StyleExample() {
    // 内联样式对象
    const containerStyle = {
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        marginBottom: '20px'
    };
    
    const titleStyle = {
        color: '#333',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '16px'
    };
    
    const textStyle = {
        color: '#666',
        fontSize: '14px',
        lineHeight: '1.6'
    };
    
    return (
        <div style={containerStyle}>
            <h3 style={titleStyle}>style 属性示例</h3>
            <p style={textStyle}>
                style 属性接收一个 JavaScript 对象，
                属性名使用 camelCase 命名。
            </p>
            
            <div style={{
                display: 'flex',
                gap: '10px',
                marginTop: '16px'
            }}>
                <button style={{
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    确定
                </button>
                <button style={{
                    padding: '8px 16px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    取消
                </button>
            </div>
        </div>
    );
}

// 4. 动态属性
function DynamicAttributes() {
    const isRequired = true;
    const maxValue = 100;
    const inputMode = 'numeric';
    
    return (
        <div>
            <h2>动态属性示例</h2>
            
            <label>数量（必填）:</label>
            <input
                type="number"
                required={isRequired}
                max={maxValue}
                min={1}
                inputMode={inputMode}
            />
            
            <label>可选输入:</label>
            <input
                type="text"
                required={false}
                placeholder="可选内容"
            />
        </div>
    );
}

// 5. data-* 和 aria-* 属性
function AccessibilityAttributes() {
    return (
        <div>
            <h2>可访问性属性示例</h2>
            
            <button
                aria-label="关闭对话框"
                data-modal="confirm-dialog"
                data-action="close"
            >
                ✕
            </button>
            
            <input
                type="text"
                aria-describedby="email-help"
                aria-required="true"
                data-validation="email"
            />
            <p id="email-help" style={{ fontSize: '12px', color: '#666' }}>
                请输入有效的电子邮箱地址
            </p>
            
            <div
                role="alert"
                aria-live="polite"
                data-component="notification"
            >
                这是一个通知消息
            </div>
        </div>
    );
}

// 6. 事件处理属性
function EventAttributes() {
    const handleClick = () => {
        alert('按钮被点击了！');
    };
    
    const handleChange = (event) => {
        console.log('输入值:', event.target.value);
    };
    
    const handleMouseEnter = () => {
        console.log('鼠标进入');
    };
    
    const handleMouseLeave = () => {
        console.log('鼠标离开');
    };
    
    return (
        <div>
            <h2>事件属性示例</h2>
            
            <button onClick={handleClick}>点击我</button>
            
            <input
                type="text"
                onChange={handleChange}
                placeholder="输入时控制台输出"
            />
            
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    padding: '20px',
                    backgroundColor: '#e0e0e0'
                }}
            >
                鼠标悬停测试
            </div>
        </div>
    );
}

// 7. 图片和链接属性
function MediaAttributes() {
    const imageUrl = 'https://via.placeholder.com/300x200';
    const linkUrl = 'https://www.example.com';
    
    return (
        <div>
            <h2>媒体属性示例</h2>
            
            <a
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                访问示例网站
            </a>
            
            <br /><br />
            
            <img
                src={imageUrl}
                alt="示例图片"
                width="300"
                height="200"
                loading="lazy"
            />
        </div>
    );
}

// 8. 综合示例：表单组件
function FormExample() {
    const inputStyle = {
        display: 'block',
        width: '100%',
        padding: '8px 12px',
        marginBottom: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px'
    };
    
    const labelStyle = {
        display: 'block',
        marginBottom: '4px',
        fontWeight: 'bold',
        color: '#333'
    };
    
    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '10px'
    };
    
    return (
        <form
            style={{ maxWidth: '400px', padding: '20px' }}
            onSubmit={(e) => {
                e.preventDefault();
                alert('表单提交！');
            }}
        >
            <h3>用户注册</h3>
            
            <label htmlFor="email" style={labelStyle}>
                邮箱地址 *
            </label>
            <input
                id="email"
                type="email"
                style={inputStyle}
                required
                placeholder="请输入邮箱"
            />
            
            <label htmlFor="password" style={labelStyle}>
                密码 *
            </label>
            <input
                id="password"
                type="password"
                style={inputStyle}
                required
                minLength={6}
                placeholder="至少6个字符"
            />
            
            <label htmlFor="confirm-password" style={labelStyle}>
                确认密码 *
            </label>
            <input
                id="confirm-password"
                type="password"
                style={inputStyle}
                required
                placeholder="再次输入密码"
            />
            
            <div style={{ marginTop: '20px' }}>
                <button type="submit" style={buttonStyle}>
                    注册
                </button>
                <button type="reset" style={{
                    ...buttonStyle,
                    backgroundColor: '#6c757d'
                }}>
                    重置
                </button>
            </div>
        </form>
    );
}

export {
    BasicAttributes,
    ClassNameExample,
    StyleExample,
    DynamicAttributes,
    AccessibilityAttributes,
    EventAttributes,
    MediaAttributes,
    FormExample
};
