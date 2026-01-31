# 条件渲染

## 本章目的

掌握 React 中的条件渲染方法，学会使用逻辑运算符、三元表达式等方式根据条件显示不同内容。

---

## 内容概述

条件渲染是 React 中根据不同条件显示不同 UI 的机制。它允许组件根据状态、数据或 props 的不同，渲染不同的内容。React 中的条件渲染与 JavaScript 中的条件语句工作方式相同，可以使用 if 语句、逻辑运算符或三元表达式来实现。本章将介绍各种条件渲染的方法及其适用场景，帮助您创建能够响应用户操作和数据变化的动态界面。

---

## 8.1 条件渲染的基本概念

### 通俗解释

条件渲染就像一个"智能显示牌"，根据不同的情况显示不同的内容。比如：
- 用户登录后显示"欢迎回来"，未登录时显示"请登录"
- 商品有库存时显示"立即购买"，无库存时显示"已售罄"
- 表单验证通过时显示"提交"按钮，验证失败时禁用提交

条件渲染让界面能够"因时而异"，根据当前状态展示最合适的内容。

### 技术定义

条件渲染是 React 根据组件的 props 或 state 来决定渲染什么内容的机制。当条件变化时，React 会自动更新 DOM 以反映新的状态。

```
┌─────────────────────────────────────────────────────────────┐
│                    条件渲染机制                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   State/Props ──► 条件判断 ──► 不同内容渲染                  │
│                                                              │
│   例如：                                                      │
│   ┌────────────────────┐                                     │
│   │ if (isLoggedIn) {  │                                     │
│   │   return <Header />│   显示已登录头部                    │
│   │ } else {           │                                     │
│   │   return <Login /> │   显示登录按钮                      │
│   │ }                  │                                     │
│   └────────────────────┘                                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 8.2 使用逻辑运算符

### && 运算符

使用逻辑与（&&）运算符在条件为 true 时渲染内容，为 false 时不渲染：

```jsx
function Notification({ message, show }) {
    return (
        <div>
            {show && <p>{message}</p>}
        </div>
    );
}

// 使用示例
<Notification message="有新消息" show={true} />  // 渲染 <p>有新消息</p>
<Notification message="有新消息" show={false} /> // 不渲染任何内容
```

### && 运算符的注意事项

```jsx
function WarningBanner({ warn }) {
    // 正确：0 会被渲染（React 中 0 是有效内容）
    // {show && <Component />} 如果 show 是 0，会渲染 0
    // 应该使用显式条件判断
    
    // 正确写法
    return warn ? <div>警告</div> : null;
    
    // 或
    return warn && <div>警告</div>;  // 确认 warn 不会是 0
}
```

### || 运算符

使用逻辑或（||）运算符提供默认值：

```jsx
function UserGreeting({ user }) {
    const displayName = user.name || '游客';
    return <h1>欢迎, {displayName}!</h1>;
}

// 或者用于显示默认值
function Status({ status }) {
    return (
        <p>状态: {status || '未知'}</p>
    );
}
```

### 实际示例

```jsx
function Mailbox({ unreadMessages, name }) {
    return (
        <div>
            <h1>你好, {name || '用户'}!</h1>
            {unreadMessages.length > 0 && (
                <div className="new-messages">
                    您有 {unreadMessages.length} 条未读消息
                </div>
            )}
        </div>
    );
}

function Cart({ items }) {
    return (
        <div>
            <h2>购物车</h2>
            {items.length === 0 ? (
                <p>购物车是空的</p>
            ) : (
                <ul>
                    {items.map(item => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
```

---

## 8.3 使用三元表达式

### 基本语法

```jsx
function LoginButton({ isLoggedIn }) {
    return (
        <button>
            {isLoggedIn ? '退出' : '登录'}
        </button>
    );
}
```

### 在 JSX 中使用三元表达式

```jsx
function UserStatus({ isOnline, username }) {
    return (
        <div className="user-status">
            <span className="status-indicator">
                {isOnline ? '🟢 在线' : '🔴 离线'}
            </span>
            <span>{username}</span>
        </div>
    );
}

function PriceDisplay({ price, discount }) {
    return (
        <div>
            {discount > 0 ? (
                <span>
                    <span style={{ textDecoration: 'line-through' }}>
                        ¥{price}
                    </span>
                    <span style={{ color: 'red', marginLeft: '10px' }}>
                        ¥{(price * (1 - discount)).toFixed(2)}
                    </span>
                </span>
            ) : (
                <span>¥{price.toFixed(2)}</span>
            )}
        </div>
    );
}
```

### 嵌套三元表达式

```jsx
function PermissionGate({ role }) {
    return (
        <div>
            {role === 'admin' ? (
                <p>管理员面板</p>
            ) : role === 'editor' ? (
                <p>编辑面板</p>
            ) : (
                <p>普通用户视图</p>
            )}
        </div>
    );
}
```

---

## 8.4 使用 if 语句

### 在组件外部使用 if

```jsx
function Page({ user, isLoggedIn }) {
    // 在 JSX 外部使用 if 语句
    let content;
    
    if (!isLoggedIn) {
        content = <p>请先登录</p>;
    } else if (user.role === 'admin') {
        content = <AdminPanel />;
    } else {
        content = <UserPanel user={user} />;
    }
    
    return (
        <div>
            <h1>页面标题</h1>
            {content}
        </div>
    );
}
```

### 在函数内部使用 if

```jsx
function StatusMessage({ status }) {
    function getStatusMessage() {
        if (status === 'loading') {
            return '加载中...';
        } else if (status === 'success') {
            return '操作成功！';
        } else if (status === 'error') {
            return '发生错误';
        } else {
            return '未知状态';
        }
    }
    
    return <p>{getStatusMessage()}</p>;
}
```

---

## 8.5 使用 switch 和枚举

### switch 语句

```jsx
function StatusBadge({ status }) {
    const getBadgeConfig = (status) => {
        switch (status) {
            case 'success':
                return { color: 'green', text: '成功' };
            case 'warning':
                return { color: 'yellow', text: '警告' };
            case 'error':
                return { color: 'red', text: '错误' };
            case 'info':
                return { color: 'blue', text: '信息' };
            default:
                return { color: 'gray', text: '未知' };
        }
    };
    
    const config = getBadgeConfig(status);
    
    return (
        <span style={{
            backgroundColor: config.color,
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px'
        }}>
            {config.text}
        </span>
    );
}
```

### 对象映射

```jsx
function StatusBadge({ status }) {
    const statusMap = {
        success: { color: 'green', text: '成功' },
        warning: { color: 'yellow', text: '警告' },
        error: { color: 'red', text: '错误' },
        info: { color: 'blue', text: '信息' }
    };
    
    const config = statusMap[status] || statusMap.info;
    
    return <span className={`badge badge-${config.color}`}>{config.text}</span>;
}
```

---

## 8.6 阻止组件渲染

### 返回 null

```jsx
function WarningBanner({ warn }) {
    // 返回 null 阻止组件渲染
    if (!warn) {
        return null;
    }
    
    return (
        <div className="warning">
            警告！请注意...
        </div>
    );
}
```

### 使用场景

```jsx
function Modal({ isOpen, title, children, onClose }) {
    // 不渲染时返回 null
    if (!isOpen) {
        return null;
    }
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <header>
                    <h3>{title}</h3>
                    <button onClick={onClose}>×</button>
                </header>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
}

function Tooltip({ text, show, children }) {
    if (!show) {
        return <>{children}</>;
    }
    
    return (
        <div style={{ position: 'relative' }}>
            {children}
            <div className="tooltip">{text}</div>
        </div>
    );
}
```

---

## 8.7 完整示例

```jsx
function UserDashboard({ user, isLoading, error }) {
    // 加载状态
    if (isLoading) {
        return <div className="loading">加载中...</div>;
    }
    
    // 错误状态
    if (error) {
        return (
            <div className="error">
                <p>发生错误: {error.message}</p>
                <button onClick={error.onRetry}>重试</button>
            </div>
        );
    }
    
    // 未登录
    if (!user) {
        return (
            <div className="login-prompt">
                <p>请先登录</p>
                <button onClick={() => window.location.href = '/login'}>
                    登录
                </button>
            </div>
        );
    }
    
    // 已登录 - 显示用户面板
    return (
        <div className="dashboard">
            <header>
                <h1>欢迎, {user.name}!</h1>
                <button onClick={user.onLogout}>退出</button>
            </header>
            
            <main>
                {user.role === 'admin' ? (
                    <AdminPanel />
                ) : (
                    <UserPanel user={user} />
                )}
            </main>
        </div>
    );
}
```

---

## 练习题

### 基础练习

**练习要求**：创建一个登录状态组件，根据用户是否登录显示不同的欢迎信息和按钮。

### 进阶练习

**练习要求**：创建一个评分组件，根据星级评分显示不同数量的星星（满星、空星、半星）。

### 挑战练习

**练习要求**：创建一个分步表单组件：
- 根据当前步骤显示不同的表单内容
- 显示进度指示器
- 支持上一步/下一步
- 最后一步显示完成信息

---

## 学习目标检查

- [ ] 理解条件渲染的概念
- [ ] 掌握使用 && 运算符进行条件渲染
- [ ] 掌握使用三元表达式进行条件渲染
- [ ] 学会使用 if 语句处理复杂条件
- [ ] 掌握使用 switch 和对象映射处理多条件
- [ ] 理解如何阻止组件渲染（返回 null）

---

## 文件说明

本章包含以下文件：

| 文件名 | 说明 |
|--------|------|
| `README.md` | 本章教程文档 |
| `logical-operator.jsx` | 逻辑运算符条件渲染示例 |
| `ternary-operator.jsx` | 三元表达式条件渲染示例 |
| `practice-solution.html` | 练习题参考答案 |

---

## 参考资料

- [条件渲染](https://react.dev/learn/conditional-rendering)
- [列表和条件](https://react.dev/learn/conditional-rendering#alternatives-to-conditional-rendering)
