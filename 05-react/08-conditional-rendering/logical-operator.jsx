// 逻辑运算符条件渲染示例

// 1. 使用 && 运算符
function Notification({ message, show }) {
    return (
        <div className="notification">
            {show && <p className="message">{message}</p>}
        </div>
    );
}

function NotificationDemo() {
    const [show, setShow] = React.useState(true);
    const [message, setMessage] = React.useState('有新消息！');
    
    return (
        <div>
            <Notification message={message} show={show} />
            <button onClick={() => setShow(!show)}>
                {show ? '隐藏' : '显示'}消息
            </button>
        </div>
    );
}

// 2. 使用 || 运算符提供默认值
function UserGreeting({ user }) {
    const displayName = user && user.name || '游客';
    return <h1>欢迎, {displayName}!</h1>;
}

function DisplayNameDemo() {
    const [user, setUser] = React.useState({ name: '张三' });
    
    return (
        <div>
            <UserGreeting user={user} />
            <UserGreeting user={null} />
            <UserGreeting user={{}} />
            <button onClick={() => setUser(null)}>设为 null</button>
        </div>
    );
}

// 3. 消息数量提示
function Mailbox({ unreadMessages, name }) {
    return (
        <div className="mailbox">
            <h1>你好, {name || '用户'}!</h1>
            {unreadMessages.length > 0 && (
                <div className="unread-badge">
                    您有 {unreadMessages.length} 条未读消息
                </div>
            )}
        </div>
    );
}

function MailboxDemo() {
    const [messages, setMessages] = React.useState([
        { id: 1, read: false, content: '消息1' },
        { id: 2, read: false, content: '消息2' },
        { id: 3, read: true, content: '消息3' }
    ]);
    
    const unreadCount = messages.filter(m => !m.read).length;
    
    return (
        <div>
            <Mailbox unreadMessages={messages} name="李明" />
            <p>未读消息数量: {unreadCount}</p>
        </div>
    );
}

// 4. 空状态显示
function EmptyStateDemo() {
    const [items, setItems] = React.useState([]);
    
    return (
        <div className="list-container">
            <h3>商品列表</h3>
            {items.length === 0 && (
                <div className="empty-state">
                    <p>暂无商品</p>
                    <button onClick={() => setItems(['商品1', '商品2'])}>
                        添加示例商品
                    </button>
                </div>
            )}
            {items.length > 0 && (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// 5. 条件显示/隐藏
function TogglePanel({ isOpen, title, children }) {
    return (
        <div className="panel">
            <h3>{title}</h3>
            {isOpen && <div className="panel-content">{children}</div>}
        </div>
    );
}

function TogglePanelDemo() {
    const [isOpen, setIsOpen] = React.useState(true);
    
    return (
        <div>
            <TogglePanel isOpen={isOpen} title="可折叠面板">
                <p>这是面板的详细内容。</p>
               放置任意内容。</p>
            </TogglePanel>
            <button <p>可以 onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '收起' : '展开'}
            </button>
        </div>
    );
}

// 6. 加载状态
function DataLoader({ isLoading, data, error }) {
    return (
        <div className="data-loader">
            {isLoading && <div className="loading">加载中...</div>}
            
            {error && <div className="error">错误: {error}</div>}
            
            {data && !error && !isLoading && (
                <div className="data">
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

function DataLoaderDemo() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);
    
    const loadData = () => {
        setIsLoading(true);
        setError(null);
        setData(null);
        
        setTimeout(() => {
            setIsLoading(false);
            setData({ message: '数据加载成功！', timestamp: Date.now() });
        }, 1500);
    };
    
    return (
        <div>
            <button onClick={loadData}>加载数据</button>
            <DataLoader isLoading={isLoading} data={data} error={error} />
        </div>
    );
}

// 7. 权限控制
function PermissionDemo() {
    const [user, setUser] = React.useState({
        name: '张三',
        role: 'user'
    });
    
    return (
        <div className="permission-demo">
            <h3>权限控制示例</h3>
            <p>当前用户: {user.name} ({user.role})</p>
            
            {/* 普通用户可见 */}
            {user.role === 'user' && (
                <div className="user-content">
                    <p>这是普通用户内容</p>
                </div>
            )}
            
            {/* 管理员可见 */}
            {user.role === 'admin' && (
                <div className="admin-content">
                    <p>这是管理员内容</p>
                    <button>管理面板</button>
                </div>
            )}
            
            <div style={{ marginTop: '10px' }}>
                <button onClick={() => setUser({ ...user, role: 'user' })}>
                    设为普通用户
                </button>
                <button onClick={() => setUser({ ...user, role: 'admin' })}>
                    设为管理员
                </button>
            </div>
        </div>
    );
}

// 8. 组合条件
function FeatureFlagsDemo() {
    const [features, setFeatures] = React.useState({
        showBanner: true,
        showSidebar: true,
        showNotifications: false,
        darkMode: false
    });
    
    return (
        <div className={`app ${features.darkMode ? 'dark' : 'light'}`}>
            {/* 多个条件组合 */}
            {features.showBanner && (
                <header className="banner">
                    <h1>应用标题</h1>
                </header>
            )}
            
            <div className="main-container">
                {features.showSidebar && (
                    <aside className="sidebar">
                        <nav>
                            <a href="#">首页</a>
                            <a href="#">关于</a>
                            <a href="#">联系</a>
                        </nav>
                    </aside>
                )}
                
                <main className="content">
                    <p>主内容区域</p>
                </main>
            </div>
            
            {features.showNotifications && (
                <div className="notifications">
                    <p>通知区域</p>
                </div>
            )}
        </div>
    );
}

// 9. 表格行样式
function TableWithConditionalStyles() {
    const [data] = React.useState([
        { id: 1, name: '产品A', price: 99, stock: 0 },
        { id: 2, name: '产品B', price: 199, stock: 5 },
        { id: 3, name: '产品C', price: 299, stock: 10 }
    ]);
    
    return (
        <table>
            <thead>
                <tr>
                    <th>名称</th>
                    <th>价格</th>
                    <th>库存</th>
                    <th>状态</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr
                        key={item.id}
                        style={{
                            backgroundColor: item.stock === 0 ? '#ffebee' :
                                           item.stock < 10 ? '#fff3e0' : 'white'
                        }}
                    >
                        <td>{item.name}</td>
                        <td>¥{item.price}</td>
                        <td>{item.stock}</td>
                        <td>
                            {item.stock === 0 ? '缺货' :
                             item.stock < 10 ? '库存紧张' : '有货'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

// 10. 动态类名
function DynamicClassDemo() {
    const [isActive, setIsActive] = React.useState(false);
    const [isDisabled, setIsDisabled] = React.useState(false);
    
    return (
        <div>
            <button
                className={`btn ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                onClick={() => setIsActive(!isActive)}
                disabled={isDisabled}
            >
                按钮
            </button>
            
            <div style={{ marginTop: '10px' }}>
                <label>
                    <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                    />
                    激活状态
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={isDisabled}
                        onChange={(e) => setIsDisabled(e.target.checked)}
                    />
                    禁用状态
                </label>
            </div>
        </div>
    );
}

export {
    Notification,
    NotificationDemo,
    UserGreeting,
    DisplayNameDemo,
    Mailbox,
    MailboxDemo,
    EmptyStateDemo,
    TogglePanel,
    TogglePanelDemo,
    DataLoader,
    DataLoaderDemo,
    PermissionDemo,
    FeatureFlagsDemo,
    TableWithConditionalStyles,
    DynamicClassDemo
};
