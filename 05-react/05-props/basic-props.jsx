// Props 基础示例

// 1. 基本 Props 传递
function Greeting({ name, greeting }) {
    return (
        <div className="greeting">
            <h1>{greeting}, {name}!</h1>
        </div>
    );
}

function BasicPropsDemo() {
    return (
        <div>
            <Greeting name="张三" greeting="你好" />
            <Greeting name="李四" greeting="早上好" />
            <Greeting name="王五" greeting="欢迎" />
        </div>
    );
}

// 2. 传递不同类型数据
function DataTypesDemo() {
    const user = { name: 'React', version: '18' };
    const skills = ['JavaScript', 'HTML', 'CSS'];
    
    return (
        <div>
            <UserInfo name="张三" age={25} isActive={true} />
            <ProductList items={skills} count={skills.length} />
            <Config data={user} />
        </div>
    );
}

function UserInfo({ name, age, isActive }) {
    return (
        <div className="user-info">
            <p>姓名: {name}</p>
            <p>年龄: {age}</p>
            <p>状态: {isActive ? '在线' : '离线'}</p>
        </div>
    );
}

function ProductList({ items, count }) {
    return (
        <div className="product-list">
            <p>产品数量: {count}</p>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

function Config({ data }) {
    return (
        <div className="config">
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

// 3. 使用 children
function Card({ title, children }) {
    return (
        <div className="card">
            {title && <div className="card-header"><h3>{title}</h3></div>}
            <div className="card-body">{children}</div>
        </div>
    );
}

function CardDemo() {
    return (
        <div>
            <Card title="卡片标题">
                <p>这是卡片的内容区域。</p>
                <p>可以使用任意 JSX 元素。</p>
            </Card>
            
            <Card>
                <h3>无标题卡片</h3>
                <p>不传递 title 属性时不显示头部。</p>
            </Card>
        </div>
    );
}

// 4. 组合组件
function Layout({ header, children, footer }) {
    return (
        <div className="layout">
            <header className="layout-header">{header}</header>
            <main className="layout-main">{children}</main>
            <footer className="layout-footer">{footer}</footer>
        </div>
    );
}

function LayoutDemo() {
    return (
        <Layout
            header={<h1>我的网站</h1>}
            footer={<p>&copy; 2024 版权所有</p>}
        >
            <p>页面主要内容区域。</p>
        </Layout>
    );
}

// 5. 默认 Props
function Button({ text, variant, size, disabled }) {
    const className = `btn btn-${variant} btn-${size}`;
    return (
        <button className={className} disabled={disabled}>
            {text}
        </button>
    );
}

Button.defaultProps = {
    text: '按钮',
    variant: 'primary',
    size: 'medium',
    disabled: false
};

function ButtonDemo() {
    return (
        <div>
            <Button />
            <Button text="自定义按钮" />
            <Button text="危险按钮" variant="danger" />
            <Button text="禁用按钮" disabled={true} />
        </div>
    );
}

// 6. 函数作为 Props
function ActionPanel({ onSave, onCancel, onDelete }) {
    return (
        <div className="action-panel">
            <Button text="保存" onClick={onSave} />
            <Button text="取消" variant="secondary" onClick={onCancel} />
            <Button text="删除" variant="danger" onClick={onDelete} />
        </div>
    );
}

function ActionPanelDemo() {
    const handleSave = () => alert('保存成功！');
    const handleCancel = () => alert('已取消');
    const handleDelete = () => {
        if (confirm('确定要删除吗？')) {
            alert('已删除');
        }
    };
    
    return (
        <ActionPanel
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={handleDelete}
        />
    );
}

// 7. 传递参数
function ItemActions({ onView, onEdit, onDelete }) {
    return (
        <div className="item-actions">
            <button onClick={() => onView(1)}>查看</button>
            <button onClick={() => onEdit(1)}>编辑</button>
            <button onClick={() => onDelete(1)}>删除</button>
        </div>
    );
}

function ItemActionsDemo() {
    return (
        <ItemActions
            onView={(id) => console.log('查看', id)}
            onEdit={(id) => console.log('编辑', id)}
            onDelete={(id) => console.log('删除', id)}
        />
    );
}

// 8. 解构进阶用法
function UserProfile({ 
    user: { name, email },
    settings: { theme = 'light', language = 'zh' }
}) {
    return (
        <div className="user-profile">
            <p>用户名: {name}</p>
            <p>邮箱: {email}</p>
            <p>主题: {theme}</p>
            <p>语言: {language}</p>
        </div>
    );
}

function DestructuringDemo() {
    const user = { name: '张三', email: 'zhang@example.com' };
    const settings = { theme: 'dark' };
    
    return <UserProfile user={user} settings={settings} />;
}

export {
    Greeting,
    BasicPropsDemo,
    DataTypesDemo,
    UserInfo,
    ProductList,
    Config,
    Card,
    CardDemo,
    Layout,
    LayoutDemo,
    Button,
    ButtonDemo,
    ActionPanel,
    ActionPanelDemo,
    ItemActions,
    ItemActionsDemo,
    UserProfile,
    DestructuringDemo
};
