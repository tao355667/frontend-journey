// 三元表达式条件渲染示例

// 1. 基本三元表达式
function LoginButton({ isLoggedIn }) {
    return (
        <button>
            {isLoggedIn ? '退出' : '登录'}
        </button>
    );
}

function LoginButtonDemo() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    
    return (
        <div>
            <LoginButton isLoggedIn={isLoggedIn} />
            <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
                切换登录状态
            </button>
        </div>
    );
}

// 2. 在线状态指示器
function OnlineStatus({ isOnline }) {
    return (
        <div className="user-status">
            <span className={`status-dot ${isOnline ? 'online' : 'offline'}`}></span>
            <span>{isOnline ? '在线' : '离线'}</span>
        </div>
    );
}

// 3. 价格显示
function PriceDisplay({ price, hasDiscount }) {
    return (
        <div className="price-display">
            {hasDiscount ? (
                <span className="discounted">
                    <span className="original">¥{price.toFixed(2)}</span>
                    <span className="current">¥{(price * 0.8).toFixed(2)}</span>
                </span>
            ) : (
                <span className="normal">¥{price.toFixed(2)}</span>
            )}
        </div>
    );
}

function PriceDisplayDemo() {
    const [hasDiscount, setHasDiscount] = React.useState(true);
    
    return (
        <div>
            <PriceDisplay price={99.00} hasDiscount={hasDiscount} />
            <label>
                <input
                    type="checkbox"
                    checked={hasDiscount}
                    onChange={(e) => setHasDiscount(e.target.checked)}
                />
                有折扣
            </label>
        </div>
    );
}

// 4. 嵌套三元表达式
function PermissionGate({ role }) {
    return (
        <div className="permission-gate">
            {role === 'admin' ? (
                <div className="admin-panel">
                    <h3>管理员面板</h3>
                    <button>管理用户</button>
                    <button>系统设置</button>
                </div>
            ) : role === 'editor' ? (
                <div className="editor-panel">
                    <h3>编辑面板</h3>
                    <button>编辑文章</button>
                    <button>发布内容</button>
                </div>
            ) : role === 'user' ? (
                <div className="user-panel">
                    <h3>用户面板</h3>
                    <p>欢迎回来！</p>
                </div>
            ) : (
                <div className="guest-panel">
                    <h3>访客</h3>
                    <p>请登录以继续</p>
                </div>
            )}
        </div>
    );
}

function PermissionGateDemo() {
    const [role, setRole] = React.useState('user');
    
    return (
        <div>
            <PermissionGate role={role} />
            <div style={{ marginTop: '10px' }}>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="guest">访客</option>
                    <option value="user">普通用户</option>
                    <option value="editor">编辑者</option>
                    <option value="admin">管理员</option>
                </select>
            </div>
        </div>
    );
}

// 5. 表单验证状态
function FormField({ label, value, error, required }) {
    return (
        <div className={`form-field ${error ? 'has-error' : ''}`}>
            <label>
                {label}
                {required && <span className="required">*</span>}
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => {}}
            />
            {error ? (
                <span className="error-message">{error}</span>
            ) : (
                <span className="success-message">✓</span>
            )}
        </div>
    );
}

function FormValidationDemo() {
    const [form, setForm] = React.useState({
        username: '',
        email: '',
        password: ''
    });
    
    const [errors, setErrors] = React.useState({
        username: '',
        email: '',
        password: ''
    });
    
    const validate = () => {
        const newErrors = {};
        newErrors.username = form.username.length < 3 ? '用户名至少3个字符' : '';
        newErrors.email = !form.email.includes('@') ? '邮箱格式不正确' : '';
        newErrors.password = form.password.length < 6 ? '密码至少6位' : '';
        setErrors(newErrors);
    };
    
    return (
        <form onSubmit={(e) => { e.preventDefault(); validate(); }}>
            <FormField
                label="用户名"
                value={form.username}
                error={errors.username}
                required
            />
            <FormField
                label="邮箱"
                value={form.email}
                error={errors.email}
                required
            />
            <FormField
                label="密码"
                value={form.password}
                error={errors.password}
                required
            />
            <button type="submit">验证</button>
        </form>
    );
}

// 6. 进度条
function ProgressBar({ progress }) {
    return (
        <div className="progress-container">
            <div
                className="progress-bar"
                style={{
                    width: `${Math.min(100, Math.max(0, progress))}%`,
                    backgroundColor: progress >= 100 ? '#4CAF50' : '#2196F3'
                }}
            >
                {progress >= 100 ? '完成!' : `${progress}%`}
            </div>
        </div>
    );
}

function ProgressBarDemo() {
    const [progress, setProgress] = React.useState(50);
    
    return (
        <div>
            <ProgressBar progress={progress} />
            <div style={{ marginTop: '10px' }}>
                <button onClick={() => setProgress(p => Math.max(0, p - 10))}>-10%</button>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                />
                <button onClick={() => setProgress(p => Math.min(100, p + 10))}>+10%</button>
            </div>
        </div>
    );
}

// 7. 评分组件
function StarRating({ rating, maxRating = 5 }) {
    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map(star => (
                <span
                    key={star}
                    className={`star ${star <= rating ? 'filled' : 'empty'}`}
                >
                    ★
                </span>
            ))}
            <span className="rating-text">
                {rating}/{maxRating}
            </span>
        </div>
    );
}

function StarRatingDemo() {
    const [rating, setRating] = React.useState(3);
    
    return (
        <div>
            <StarRating rating={rating} />
            <div style={{ marginTop: '10px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                    <button
                        key={star}
                        onClick={() => setRating(star)}
                        style={{
                            backgroundColor: rating >= star ? '#ffc107' : '#ddd',
                            border: 'none',
                            padding: '5px 10px',
                            margin: '2px',
                            cursor: 'pointer'
                        }}
                    >
                        {star} 星
                    </button>
                ))}
            </div>
        </div>
    );
}

// 8. 主题切换
function ThemeSwitcher() {
    const [theme, setTheme] = React.useState('light');
    
    return (
        <div className={`theme-container ${theme}`}>
            <div className="theme-content">
                <h3>当前主题: {theme === 'light' ? '亮色' : '暗色'}</h3>
                <p>这是{theme === 'light' ? '亮色' : '暗色'}主题的内容。</p>
                <button
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                    切换到{theme === 'light' ? '暗色' : '亮色'}主题
                </button>
            </div>
        </div>
    );
}

// 9. 多状态切换
function TabContainer() {
    const [activeTab, setActiveTab] = React.useState('tab1');
    
    const tabs = {
        tab1: { title: '标签1', content: '这是标签1的内容' },
        tab2: { title: '标签2', content: '这是标签2的内容' },
        tab3: { title: '标签3', content: '这是标签3的内容' }
    };
    
    return (
        <div className="tab-container">
            <div className="tab-headers">
                {Object.entries(tabs).map(([key, tab]) => (
                    <button
                        key={key}
                        className={activeTab === key ? 'active' : ''}
                        onClick={() => setActiveTab(key)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {activeTab === 'tab1' ? (
                    <p>{tabs.tab1.content}</p>
                ) : activeTab === 'tab2' ? (
                    <p>{tabs.tab2.content}</p>
                ) : (
                    <p>{tabs.tab3.content}</p>
                )}
            </div>
        </div>
    );
}

// 10. 综合示例：用户卡片
function UserCard({ user }) {
    return (
        <div className="user-card">
            <div className="user-avatar">
                <img
                    src={user.avatar || 'https://via.placeholder.com/80'}
                    alt={user.name}
                />
            </div>
            <div className="user-info">
                <h3>{user.name}</h3>
                <p className="user-role">
                    {user.role === 'vip' ? '⭐ VIP 用户' : '普通用户'}
                </p>
                <p className="user-status">
                    {user.isOnline ? (
                        <span style={{ color: 'green' }}>● 在线</span>
                    ) : (
                        <span style={{ color: 'gray' }}>● 离线</span>
                    )}
                </p>
                <button className={user.isFriend ? 'friend' : 'stranger'}>
                    {user.isFriend ? '已添加好友' : '添加好友'}
                </button>
            </div>
        </div>
    );
}

function UserCardDemo() {
    const [user, setUser] = React.useState({
        name: '张三',
        role: 'vip',
        isOnline: true,
        isFriend: false,
        avatar: 'https://via.placeholder.com/80'
    });
    
    return (
        <div>
            <UserCard user={user} />
            <div style={{ marginTop: '10px' }}>
                <button onClick={() => setUser({ ...user, isOnline: !user.isOnline })}>
                    切换在线状态
                </button>
                <button onClick={() => setUser({ ...user, isFriend: !user.isFriend })}>
                    切换好友状态
                </button>
            </div>
        </div>
    );
}

export {
    LoginButton,
    LoginButtonDemo,
    OnlineStatus,
    PriceDisplay,
    PriceDisplayDemo,
    PermissionGate,
    PermissionGateDemo,
    FormField,
    FormValidationDemo,
    ProgressBar,
    ProgressBarDemo,
    StarRating,
    StarRatingDemo,
    ThemeSwitcher,
    TabContainer,
    UserCard,
    UserCardDemo
};
