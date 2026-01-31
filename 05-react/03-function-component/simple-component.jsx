// 简单函数组件示例

// 1. 最基本的函数组件
function HelloWorld() {
    return <h1>Hello, World!</h1>;
}

// 2. 返回多元素的组件（使用 Fragment）
function MultiElement() {
    return (
        <>
            <h2>标题</h2>
            <p>段落内容</p>
            <span>行内文本</span>
        </>
    );
}

// 3. 返回嵌套结构的组件
function NestedStructure() {
    return (
        <article className="post">
            <header className="post-header">
                <h1>文章标题</h1>
                <div className="meta">
                    <span>作者：张三</span>
                    <span>发布时间：2024-01-30</span>
                </div>
            </header>
            <section className="post-content">
                <p>这是一段文章内容，包含了重要的信息。</p>
                <p>这是第二段内容。</p>
            </section>
            <footer className="post-footer">
                <span>阅读量：100</span>
                <span>评论数：20</span>
            </footer>
        </article>
    );
}

// 4. 接收参数的函数组件
function Greeting({ name, age }) {
    return (
        <div className="greeting">
            <h2>你好，{name}！</h2>
            <p>你今年{age}岁了。</p>
        </div>
    );
}

// 5. 带默认参数的函数组件
function Button({ text = '按钮', onClick }) {
    return (
        <button className="btn" onClick={onClick}>
            {text}
        </button>
    );
}

// 6. 根据条件渲染不同内容的组件
function StatusBadge({ status }) {
    const statusConfig = {
        active: { color: 'green', text: '已激活' },
        pending: { color: 'yellow', text: '待审核' },
        disabled: { color: 'gray', text: '已禁用' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
        <span style={{
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: config.color,
            color: 'white'
        }}>
            {config.text}
        </span>
    );
}

// 7. 渲染列表的组件
function ProductList({ products }) {
    return (
        <ul className="product-list">
            {products.map(product => (
                <li key={product.id} className="product-item">
                    <h3>{product.name}</h3>
                    <p>价格：¥{product.price}</p>
                    <p>库存：{product.stock}件</p>
                </li>
            ))}
        </ul>
    );
}

// 8. 综合示例：用户卡片组件
function UserCard({ user }) {
    const { name, avatar, email, role } = user;
    
    return (
        <div className="user-card">
            <div className="user-avatar">
                <img src={avatar} alt={`${name}的头像`} />
            </div>
            <div className="user-info">
                <h3 className="user-name">{name}</h3>
                <p className="user-email">{email}</p>
                <span className="user-role">{role}</span>
            </div>
        </div>
    );
}

// 9. 组合多个组件的页面组件
function UserPage() {
    const user = {
        name: '李明',
        avatar: 'https://via.placeholder.com/100',
        email: 'liming@example.com',
        role: '管理员'
    };
    
    const products = [
        { id: 1, name: '产品A', price: 99, stock: 10 },
        { id: 2, name: '产品B', price: 199, stock: 5 },
        { id: 3, name: '产品C', price: 299, stock: 0 }
    ];
    
    return (
        <div className="page">
            <h1>用户页面</h1>
            
            <section className="user-section">
                <h2>用户信息</h2>
                <UserCard user={user} />
            </section>
            
            <section className="product-section">
                <h2>产品列表</h2>
                <ProductList products={products} />
            </section>
            
            <section className="action-section">
                <h2>操作</h2>
                <Button text="编辑资料" onClick={() => alert('编辑')} />
                <Button text="消息" onClick={() => alert('消息')} />
            </section>
        </div>
    );
}

// 10. 导出所有组件
export {
    HelloWorld,
    MultiElement,
    NestedStructure,
    Greeting,
    Button,
    StatusBadge,
    ProductList,
    UserCard,
    UserPage
};
