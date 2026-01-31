// 组件复用示例

// 1. 可复用的按钮组件
function Button({ 
    children, 
    onClick, 
    variant = 'primary', 
    size = 'medium',
    disabled = false 
}) {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    const sizeClass = `btn-${size}`;
    const disabledClass = disabled ? 'btn-disabled' : '';
    
    const className = [baseClass, variantClass, sizeClass, disabledClass]
        .filter(Boolean)
        .join(' ');
    
    const style = {
        padding: size === 'small' ? '6px 12px' : 
                  size === 'large' ? '12px 24px' : '10px 20px',
        fontSize: size === 'small' ? '12px' : 
                  size === 'large' ? '18px' : '14px',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer'
    };
    
    return (
        <button 
            className={className} 
            onClick={onClick}
            disabled={disabled}
            style={style}
        >
            {children}
        </button>
    );
}

// 2. 可复用的卡片组件
function Card({ title, subtitle, children, footer, image }) {
    return (
        <div className="card">
            {image && (
                <div className="card-image">
                    <img src={image.src} alt={image.alt || ''} />
                </div>
            )}
            <div className="card-content">
                {title && <h3 className="card-title">{title}</h3>}
                {subtitle && <p className="card-subtitle">{subtitle}</p>}
                <div className="card-body">
                    {children}
                </div>
            </div>
            {footer && <div className="card-footer">{footer}</div>}
        </div>
    );
}

// 3. 可复用的输入框组件
function Input({ 
    label, 
    type = 'text', 
    value, 
    onChange, 
    placeholder, 
    error,
    required = false 
}) {
    return (
        <div className={`input-group ${error ? 'has-error' : ''}`}>
            {label && (
                <label className="input-label">
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="input-field"
            />
            {error && <span className="input-error">{error}</span>}
        </div>
    );
}

// 4. 可复用的模态框组件
function Modal({ isOpen, title, children, onClose, footer }) {
    if (!isOpen) return null;
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                {footer && <div className="modal-footer">{footer}</div>}
            </div>
        </div>
    );
}

// 5. 可复用的标签组件
function Badge({ text, color = 'blue', size = 'medium' }) {
    const colorMap = {
        blue: '#2196F3',
        green: '#4CAF50',
        orange: '#FF9800',
        red: '#F44336',
        purple: '#9C27B0'
    };
    
    return (
        <span style={{
            display: 'inline-block',
            padding: size === 'small' ? '2px 6px' : '4px 12px',
            borderRadius: '12px',
            backgroundColor: colorMap[color] || colorMap.blue,
            color: 'white',
            fontSize: size === 'small' ? '10px' : '12px'
        }}>
            {text}
        </span>
    );
}

// 6. 可复用的头像组件
function Avatar({ src, alt, size = 'medium', shape = 'circle' }) {
    const sizeMap = {
        small: 32,
        medium: 48,
        large: 64,
        xlarge: 96
    };
    
    const dimension = sizeMap[size] || sizeMap.medium;
    
    return (
        <img 
            src={src} 
            alt={alt || '用户头像'}
            style={{
                width: dimension,
                height: dimension,
                borderRadius: shape === 'circle' ? '50%' : '4px',
                objectFit: 'cover'
            }}
        />
    );
}

// 7. 可复用的列表组件
function List({ items, renderItem, keyExtractor }) {
    return (
        <ul className="list">
            {items.map((item, index) => (
                <li key={keyExtractor ? keyExtractor(item) : index}>
                    {renderItem(item)}
                </li>
            ))}
        </ul>
    );
}

// 8. 可复用的分页组件
function Pagination({ 
    currentPage, 
    totalPages, 
    onPageChange 
}) {
    const pages = [];
    
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    
    return (
        <div className="pagination">
            <button 
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                上一页
            </button>
            
            {pages.map(page => (
                <button
                    key={page}
                    className={page === currentPage ? 'active' : ''}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            
            <button 
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                下一页
            </button>
        </div>
    );
}

// 9. 使用复用组件构建的综合示例
function ComponentLibraryDemo() {
    const handleClick = () => alert('按钮被点击！');
    
    return (
        <div className="demo-container">
            <h2>组件库演示</h2>
            
            <section>
                <h3>按钮组件</h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Button onClick={handleClick}>主要按钮</Button>
                    <Button variant="secondary" onClick={handleClick}>次要按钮</Button>
                    <Button variant="danger" onClick={handleClick}>危险按钮</Button>
                    <Button variant="success" onClick={handleClick}>成功按钮</Button>
                    <Button disabled>禁用按钮</Button>
                </div>
            </section>
            
            <section>
                <h3>标签组件</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Badge text="新功能" color="blue" />
                    <Badge text="热门" color="red" />
                    <Badge text="促销" color="orange" />
                    <Badge text="已售罄" color="gray" />
                </div>
            </section>
            
            <section>
                <h3>卡片组件</h3>
                <Card
                    title="产品标题"
                    subtitle="副标题信息"
                    image={{ src: 'https://via.placeholder.com/300x150', alt: '产品图片' }}
                    footer={<Button size="small">查看详情</Button>}
                >
                    <p>这是产品的详细描述，包含各种信息和特点说明。</p>
                </Card>
            </section>
            
            <section>
                <h3>头像组件</h3>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <Avatar src="https://via.placeholder.com/32" size="small" />
                    <Avatar src="https://via.placeholder.com/48" size="medium" />
                    <Avatar src="https://via.placeholder.com/64" size="large" />
                    <Avatar src="https://via.placeholder.com/96" size="xlarge" />
                </div>
            </section>
        </div>
    );
}

export {
    Button,
    Card,
    Input,
    Modal,
    Badge,
    Avatar,
    List,
    Pagination,
    ComponentLibraryDemo
};
