// JSX 基本语法示例

// 1. 标签语法
// HTML 风格标签（小写）
const divElement = <div>这是一个 div 元素</div>;

// React 组件标签（首字母大写）
const ComponentElement = <MyComponent>组件内容</MyComponent>;

// 自闭合标签
const inputElement = <input type="text" />;

// 2. 必须有闭合标签
// 正确：使用双标签
const closedDiv = <div></div>;

// 正确：使用自闭合标签
const selfClosing = <img src="image.jpg" alt="图片" />;

// 3. 必须有一个顶级容器包裹
// 错误：多个同级元素没有包裹
// const bad = <h1>标题</h1><p>段落</p>;

// 正确：用 div 包裹
const withContainer = (
    <div>
        <h1>标题</h1>
        <p>段落</p>
    </div>
);

// 正确：使用 Fragment（<>）避免额外容器
const withFragment = (
    <>
        <h1>标题</h1>
        <p>段落</p>
    </>
);

// 4. className 代替 class
const withClassName = (
    <div className="container">
        <h1 className="title">标题</h1>
        <p className="content">内容</p>
    </div>
);

// 5. 属性使用驼峰命名
const withAttributes = (
    <input
        type="text"
        maxLength={10}
        tabIndex={0}
        autoComplete="off"
        placeholder="请输入内容"
    />
);

// 6. 布尔属性
const withBooleanAttrs = (
    <div>
        <input disabled />
        <input readOnly defaultValue="只读内容" />
        <input required />
        <input autoFocus />
    </div>
);

// 7. style 属性使用对象
const withStyle = (
    <div style={{
        color: 'red',
        fontSize: '16px',
        backgroundColor: '#f5f5f5',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px'
    }}>
        带样式的文本
    </div>
);

// 8. 完整组件示例
function BasicExample() {
    return (
        <div className="basic-example">
            <h2>JSX 基本语法示例</h2>

            <section>
                <h3>标签类型</h3>
                <div>HTML 标签</div>
                <button>按钮</button>
                <input type="text" />
            </section>

            <section>
                <h3>嵌套结构</h3>
                <article>
                    <h4>文章标题</h4>
                    <p>文章内容段落</p>
                </article>
            </section>

            <section>
                <h3>特殊属性</h3>
                <div className="highlight" style={{ padding: '10px' }}>
                    使用 className 和 style
                </div>
            </section>
        </div>
    );
}

export default BasicExample;
