// 类组件基础示例

// 1. 最基本的类组件
class HelloWorld extends React.Component {
    render() {
        return <h1>Hello, World!</h1>;
    }
}

// 2. 使用 props 的类组件
class Greeting extends React.Component {
    render() {
        return (
            <div className="greeting">
                <h1>你好，{this.props.name}！</h1>
                <p>欢迎来到 {this.props.city}！</p>
            </div>
        );
    }
}

// 3. 多元素返回的类组件
class Article extends React.Component {
    render() {
        return (
            <article className="article">
                <header>
                    <h1>{this.props.title}</h1>
                    <div className="meta">
                        <span>作者：{this.props.author}</span>
                        <span>发布时间：{this.props.date}</span>
                    </div>
                </header>
                <section className="content">
                    {this.props.children}
                </section>
                <footer>
                    <span>阅读量：{this.props.views}</span>
                </footer>
            </article>
        );
    }
}

// 4. 条件渲染的类组件
class UserStatus extends React.Component {
    render() {
        return (
            <div className="user-status">
                <h2>用户状态</h2>
                {this.props.isLoggedIn ? (
                    <div className="logged-in">
                        <p>欢迎回来，{this.props.username}！</p>
                        <button onClick={this.props.onLogout}>退出</button>
                    </div>
                ) : (
                    <div className="logged-out">
                        <p>请登录</p>
                        <button onClick={this.props.onLogin}>登录</button>
                    </div>
                )}
            </div>
        );
    }
}

// 5. 列表渲染的类组件
class ProductList extends React.Component {
    render() {
        const products = this.props.products;
        
        return (
            <div className="product-list">
                <h2>产品列表</h2>
                <ul>
                    {products.map(product => (
                        <li key={product.id} className="product-item">
                            <h3>{product.name}</h3>
                            <p>价格：¥{product.price}</p>
                            <p>库存：{product.stock}件</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

// 6. 嵌套组件的类组件
class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <header className="dashboard-header">
                    <h1>仪表盘</h1>
                    <span className="user-info">{this.props.userName}</span>
                </header>
                <main className="dashboard-content">
                    <div className="stat-card">
                        <h3>今日访问</h3>
                        <p className="stat-value">{this.props.visits.today}</p>
                    </div>
                    <div className="stat-card">
                        <h3>昨日访问</h3>
                        <p className="stat-value">{this.props.visits.yesterday}</p>
                    </div>
                    <div className="stat-card">
                        <h3>总用户</h3>
                        <p className="stat-value">{this.props.visits.total}</p>
                    </div>
                </main>
            </div>
        );
    }
}

// 7. 静态 props 默认值
class Button extends React.Component {
    static defaultProps = {
        variant: 'primary',
        size: 'medium',
        disabled: false
    };
    
    render() {
        const { children, variant, size, disabled, onClick } = this.props;
        const className = `btn btn-${variant} btn-${size}`;
        
        return (
            <button 
                className={className} 
                disabled={disabled}
                onClick={onClick}
            >
                {children}
            </button>
        );
    }
}

// 8. 使用 style 属性的类组件
class StyledCard extends React.Component {
    render() {
        const cardStyle = {
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            maxWidth: '300px'
        };
        
        const titleStyle = {
            color: '#333',
            fontSize: '20px',
            marginBottom: '10px'
        };
        
        const textStyle = {
            color: '#666',
            fontSize: '14px',
            lineHeight: '1.6'
        };
        
        return (
            <div style={cardStyle}>
                <h3 style={titleStyle}>{this.props.title}</h3>
                <p style={textStyle}>{this.props.description}</p>
            </div>
        );
    }
}

// 9. 表单元素的类组件
class SearchInput extends React.Component {
    render() {
        return (
            <div className="search-input">
                <input
                    type="text"
                    placeholder={this.props.placeholder || '搜索...'}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    className="search-field"
                />
                <button onClick={this.props.onSearch} className="search-button">
                    搜索
                </button>
            </div>
        );
    }
}

// 10. 组合使用的完整示例
class App extends React.Component {
    render() {
        const products = [
            { id: 1, name: '产品A', price: 99, stock: 10 },
            { id: 2, name: '产品B', price: 199, stock: 5 },
            { id: 3, name: '产品C', price: 299, stock: 0 }
        ];
        
        return (
            <div className="app">
                <Greeting name="用户" city="北京" />
                
                <Article 
                    title="React 入门教程"
                    author="张老师"
                    date="2024-01-30"
                    views={1000}
                >
                    <p>React 是一个用于构建用户界面的 JavaScript 库。</p>
                    <p>本教程将帮助您快速掌握 React 的基础知识。</p>
                </Article>
                
                <ProductList products={products} />
            </div>
        );
    }
}

export {
    HelloWorld,
    Greeting,
    Article,
    UserStatus,
    ProductList,
    Dashboard,
    Button,
    StyledCard,
    SearchInput,
    App
};
