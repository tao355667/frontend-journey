// JavaScript 表达式嵌入示例

// 1. 嵌入变量
function VariableExample() {
    const name = "React";
    const version = "18";
    
    return (
        <div>
            <h1>Hello, {name}!</h1>
            <p>当前版本: {version}</p>
        </div>
    );
}

// 2. 嵌入计算表达式
function ExpressionExample() {
    const a = 10;
    const b = 5;
    
    return (
        <div>
            <p>加法: {a} + {b} = {a + b}</p>
            <p>减法: {a} - {b} = {a - b}</p>
            <p>乘法: {a} × {b} = {a * b}</p>
            <p>除法: {a} ÷ {b} = {a / b}</p>
            <p>模运算: {a} % {b} = {a % b}</p>
        </div>
    );
}

// 3. 嵌入函数调用
function FunctionExample() {
    const now = new Date();
    
    const formatDate = (date) => {
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    
    const formatTime = (date) => {
        return date.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    
    return (
        <div>
            <p>日期: {formatDate(now)}</p>
            <p>时间: {formatTime(now)}</p>
            <p>时间戳: {now.getTime()}</p>
        </div>
    );
}

// 4. 三元运算符（条件渲染）
function TernaryExample() {
    const isLoggedIn = true;
    const isPremium = false;
    
    return (
        <div>
            <p>登录状态: {isLoggedIn ? '已登录' : '未登录'}</p>
            <p>会员等级: {isPremium ? '高级会员' : '普通会员'}</p>
            <p>状态: {isLoggedIn ? (isPremium ? '欢迎 VIP 用户' : '欢迎回来') : '请登录'}</p>
        </div>
    );
}

// 5. 逻辑与运算符
function LogicalAndExample() {
    const unreadMessages = ['消息1', '消息2', '消息3'];
    const emptyMessages = [];
    
    return (
        <div>
            <p>有消息时显示: {unreadMessages.length > 0 && <span>您有 {unreadMessages.length} 条新消息</span>}</p>
            <p>无消息时不显示: {emptyMessages.length > 0 && <span>您有新消息</span>}</p>
            <p>显示默认文本: {unreadMessages.length > 0 || '暂无消息'}</p>
        </div>
    );
}

// 6. 数组操作
function ArrayExample() {
    const fruits = ['苹果', '香蕉', '橙子', '葡萄'];
    const numbers = [1, 2, 3, 4, 5];
    
    return (
        <div>
            <h3>水果列表</h3>
            <ul>
                {fruits.map((fruit, index) => (
                    <li key={index}>{fruit}</li>
                ))}
            </ul>
            
            <h3>数字平方</h3>
            <p>{numbers.map(n => n * n).join(', ')}</p>
            
            <h3>过滤偶数</h3>
            <p>{numbers.filter(n => n % 2 === 0).join(', ')}</p>
            
            <h3>数组求和</h3>
            <p>{numbers.reduce((sum, n) => sum + n, 0)}</p>
        </div>
    );
}

// 7. 对象属性
function ObjectExample() {
    const user = {
        name: '张三',
        age: 25,
        city: '北京',
        skills: ['HTML', 'CSS', 'JavaScript']
    };
    
    const style = {
        color: 'green',
        fontSize: '14px'
    };
    
    return (
        <div>
            <p style={style}>用户名: {user.name}</p>
            <p>年龄: {user.age} 岁</p>
            <p>城市: {user.city}</p>
            <p>技能: {user.skills.join('、')}</p>
        </div>
    );
}

// 8. 模板字符串
function TemplateStringExample() {
    const product = {
        name: '笔记本电脑',
        price: 5999,
        brand: '某品牌'
    };
    
    return (
        <div>
            <p>产品: {`${product.brand} ${product.name}`}</p>
            <p>价格: ¥{product.price}</p>
            <p>描述: {`这是一台${product.brand}的${product.name}`}</p>
        </div>
    );
}

// 9. 综合示例
function ExpressionDemo() {
    const cart = {
        items: [
            { name: '商品1', price: 100, quantity: 2 },
            { name: '商品2', price: 50, quantity: 3 },
            { name: '商品3', price: 200, quantity: 1 }
        ],
        discount: 0.1  // 10% 折扣
    };
    
    // 计算总价
    const subtotal = cart.items.reduce((sum, item) => 
        sum + item.price * item.quantity, 0
    );
    const discountAmount = subtotal * cart.discount;
    const total = subtotal - discountAmount;
    
    // 格式化价格
    const formatPrice = (price) => `¥${price.toFixed(2)}`;
    
    return (
        <div className="cart-summary">
            <h3>购物车摘要</h3>
            <div className="cart-items">
                {cart.items.map((item, index) => (
                    <div key={index} className="cart-item">
                        <span>{item.name} × {item.quantity}</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                ))}
            </div>
            <div className="cart-total">
                <p>小计: {formatPrice(subtotal)}</p>
                <p>折扣: -{formatPrice(discountAmount)}</p>
                <p className="total">总计: {formatPrice(total)}</p>
            </div>
            <p>节省: {formatPrice(discountAmount)} ({(cart.discount * 100).toFixed(0)}%)</p>
        </div>
    );
}

export {
    VariableExample,
    ExpressionExample,
    FunctionExample,
    TernaryExample,
    LogicalAndExample,
    ArrayExample,
    ObjectExample,
    TemplateStringExample,
    ExpressionDemo
};
