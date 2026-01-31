// 列表渲染示例

// 1. 基本数组渲染
function BasicList() {
    const fruits = ['苹果', '香蕉', '橙子', '葡萄'];
    
    return (
        <ul>
            {fruits.map((fruit, index) => (
                <li key={index}>{fruit}</li>
            ))}
        </ul>
    );
}

// 2. 对象数组渲染
function ProductList() {
    const products = [
        { id: 1, name: '笔记本电脑', price: 5999, category: '电子产品' },
        { id: 2, name: '无线鼠标', price: 99, category: '电子产品' },
        { id: 3, name: '机械键盘', price: 299, category: '电子产品' }
    ];
    
    return (
        <div>
            <h3>产品列表</h3>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ¥{product.price} ({product.category})
                    </li>
                ))}
            </ul>
        </div>
    );
}

// 3. 复杂列表项
function UserList() {
    const users = [
        { id: 1, name: '张三', avatar: 'https://via.placeholder.com/40', role: '管理员' },
        { id: 2, name: '李四', avatar: 'https://via.placeholder.com/40', role: '用户' },
        { id: 3, name: '王五', avatar: 'https://via.placeholder.com/40', role: '编辑' }
    ];
    
    return (
        <ul>
            {users.map(user => (
                <li key={user.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={user.avatar} alt={user.name} style={{ borderRadius: '50%' }} />
                    <div>
                        <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                        <div style={{ color: '#666', fontSize: '12px' }}>{user.role}</div>
                    </div>
                </li>
            ))}
        </ul>
    );
}

// 4. 嵌套列表
function NestedList() {
    const categories = [
        {
            name: '电子产品',
            items: ['手机', '电脑', '平板']
        },
        {
            name: '家用电器',
            items: ['冰箱', '洗衣机', '空调']
        }
    ];
    
    return (
        <ul>
            {categories.map((category, index) => (
                <li key={index}>
                    <strong>{category.name}</strong>
                    <ul>
                        {category.items.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
}

// 5. 带条件的列表渲染
function FilteredList() {
    const items = [
        { id: 1, name: '苹果', category: '水果', inStock: true },
        { id: 2, name: '香蕉', category: '水果', inStock: true },
        { id: 3, name: '方便面', category: '食品', inStock: false },
        { id: 4, name: '牛奶', category: '食品', inStock: true }
    ];
    
    return (
        <div>
            <h3>所有商品</h3>
            <ul>
                {items.map(item => (
                    <li key={item.id} style={{ opacity: item.inStock ? 1 : 0.5 }}>
                        {item.name} ({item.category}) - {item.inStock ? '有货' : '缺货'}
                    </li>
                ))}
            </ul>
            
            <h3>仅显示有货</h3>
            <ul>
                {items.filter(item => item.inStock).map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

// 6. 分组列表
function GroupedList() {
    const data = [
        { category: '水果', items: ['苹果', '香蕉', '橙子'] },
        { category: '蔬菜', items: ['白菜', '萝卜', '土豆'] },
        { category: '肉类', items: ['猪肉', '牛肉', '鸡肉'] }
    ];
    
    return (
        <div>
            {data.map((group, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <h4>{group.category}</h4>
                    <ul>
                        {group.items.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export {
    BasicList,
    ProductList,
    UserList,
    NestedList,
    FilteredList,
    GroupedList
};
