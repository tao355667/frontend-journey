// Props 类型检查示例

// 注意：以下示例假设已导入 PropTypes
// import PropTypes from 'prop-types';

// 1. 基本类型检查
function UserCard({ name, age, email, isActive }) {
    return (
        <div className="user-card">
            <h3>{name}</h3>
            <p>年龄: {age}</p>
            <p>邮箱: {email}</p>
            <p>状态: {isActive ? '在线' : '离线'}</p>
        </div>
    );
}

// UserCard.propTypes = {
//     name: PropTypes.string.isRequired,
//     age: PropTypes.number,
//     email: PropTypes.string,
//     isActive: PropTypes.bool
// };

// 2. 复杂类型检查
function ProductList({ items, category, sortBy }) {
    return (
        <div className="product-list">
            <h3>{category}</h3>
            <p>排序方式: {sortBy}</p>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name} - ¥{item.price}</li>
                ))}
            </ul>
        </div>
    );
}

// ProductList.propTypes = {
//     items: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.number.isRequired,
//             name: PropTypes.string.isRequired,
//             price: PropTypes.number.isRequired
//         })
//     ).isRequired,
//     category: PropTypes.string,
//     sortBy: PropTypes.oneOf(['price', 'name', 'rating'])
// };

// 3. 函数类型检查
function Button({ label, onClick, onMouseEnter }) {
    return (
        <button 
            onClick={onClick}
            onMouseEnter={onMouseEnter}
        >
            {label}
        </button>
    );
}

// Button.propTypes = {
//     label: PropTypes.string.isRequired,
//     onClick: PropTypes.func.isRequired,
//     onMouseEnter: PropTypes.func
// };

// 4. 元素类型检查
function Modal({ title, children, footer }) {
    return (
        <div className="modal">
            <header><h3>{title}</h3></header>
            <div className="modal-body">{children}</div>
            {footer && <footer>{footer}</footer>}
        </div>
    );
}

// Modal.propTypes = {
//     title: PropTypes.string.isRequired,
//     children: PropTypes.node.isRequired,
//     footer: PropTypes.node
// };

// 5. 枚举类型检查
function StatusBadge({ status }) {
    const colors = {
        success: 'green',
        warning: 'yellow',
        error: 'red',
        info: 'blue'
    };
    
    return (
        <span style={{ color: colors[status] }}>
            {status.toUpperCase()}
        </span>
    );
}

// StatusBadge.propTypes = {
//     status: PropTypes.oneOf(['success', 'warning', 'error', 'info'])
// };

// 6. 数组类型检查
function TagList({ tags, maxDisplay }) {
    const displayTags = tags.slice(0, maxDisplay);
    
    return (
        <div className="tag-list">
            {displayTags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
            ))}
            {tags.length > maxDisplay && <span>...</span>}
        </div>
    );
}

// TagList.propTypes = {
//     tags: PropTypes.arrayOf(PropTypes.string).isRequired,
//     maxDisplay: PropTypes.number
// };

// 7. 对象类型检查
function UserSettings({ user, preferences, stats }) {
    return (
        <div className="user-settings">
            <h3>用户设置</h3>
            <pre>{JSON.stringify({ user, preferences, stats }, null, 2)}</pre>
        </div>
    );
}

// UserSettings.propTypes = {
//     user: PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         name: PropTypes.string.isRequired,
//         email: PropTypes.string.isRequired
//     }).isRequired,
//     preferences: PropTypes.shape({
//         theme: PropTypes.oneOf(['light', 'dark']),
//         language: PropTypes.string,
//         notifications: PropTypes.bool
//     }),
//     stats: PropTypes.shape({
//         loginCount: PropTypes.number,
//         lastLogin: PropTypes.instanceOf(Date)
//     })
// };

// 8. 自定义验证器
function EmailInput({ value, onChange }) {
    return (
        <input 
            type="email" 
            value={value} 
            onChange={onChange}
            placeholder="请输入邮箱"
        />
    );
}

// EmailInput.propTypes = {
//     value: PropTypes.string,
//     onChange: PropTypes.func.isRequired,
//     // 自定义验证器：必须是有效的邮箱格式
//     // 注意：PropTypes 18+ 不再包含自定义验证器功能
// };

// 9. 完整组件示例（带类型检查）
function DataTable({ 
    data, 
    columns, 
    sortable = true, 
    pageSize = 10 
}) {
    const [sortColumn, setSortColumn] = React.useState(null);
    const [sortDirection, setSortDirection] = React.useState('asc');
    
    const handleSort = (column) => {
        if (!sortable) return;
        if (sortColumn === column) {
            setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };
    
    const sortedData = [...data].sort((a, b) => {
        if (!sortColumn) return 0;
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
    
    const displayData = sortedData.slice(0, pageSize);
    
    return (
        <table className="data-table">
            <thead>
                <tr>
                    {columns.map(col => (
                        <th 
                            key={col.key}
                            onClick={() => handleSort(col.key)}
                            style={{ cursor: sortable ? 'pointer' : 'default' }}
                        >
                            {col.title}
                            {sortColumn === col.key && (
                                <span>{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
                            )}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {displayData.map((row, index) => (
                    <tr key={index}>
                        {columns.map(col => (
                            <td key={col.key}>{row[col.key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

// DataTable.propTypes = {
//     data: PropTypes.arrayOf(PropTypes.object).isRequired,
//     columns: PropTypes.arrayOf(
//         PropTypes.shape({
//             key: PropTypes.string.isRequired,
//             title: PropTypes.string.isRequired
//         })
//     ).isRequired,
//     sortable: PropTypes.bool,
//     pageSize: PropTypes.number
// };

// DataTable.defaultProps = {
//     sortable: true,
//     pageSize: 10
// };

// 10. 验证器示例
function ComponentWithValidation({ items, onSelect }) {
    return (
        <div className="validation-demo">
            <select onChange={(e) => onSelect(e.target.value)}>
                <option value="">请选择...</option>
                {items.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

// ComponentWithValidation.propTypes = {
//     // 数组，每个元素需要有 id 和 name
//     items: PropTypes.arrayOf(
//         PropTypes.exact({
//             id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//             name: PropTypes.string
//         })
//     ),
//     onSelect: PropTypes.func.isRequired
// };

export {
    UserCard,
    ProductList,
    Button,
    Modal,
    StatusBadge,
    TagList,
    UserSettings,
    EmailInput,
    DataTable,
    ComponentWithValidation
};
