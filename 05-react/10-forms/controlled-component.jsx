// 受控组件示例

// 1. 文本输入框
function TextInputDemo() {
    const [text, setText] = React.useState('');
    
    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="请输入..."
            />
            <p>输入内容: {text}</p>
        </div>
    );
}

// 2. 多行文本
function TextareaDemo() {
    const [content, setContent] = React.useState('');
    
    return (
        <div>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="请输入多行文本..."
                rows={4}
            />
            <p>字数: {content.length}</p>
        </div>
    );
}

// 3. 下拉选择
function SelectDemo() {
    const [selected, setSelected] = React.useState('');
    
    const options = [
        { value: '', label: '请选择' },
        { value: 'apple', label: '苹果' },
        { value: 'banana', label: '香蕉' },
        { value: 'orange', label: '橙子' }
    ];
    
    return (
        <div>
            <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <p>选择: {selected || '未选择'}</p>
        </div>
    );
}

// 4. 复选框
function CheckboxDemo() {
    const [isChecked, setIsChecked] = React.useState(false);
    const [hobbies, setHobbies] = React.useState([]);
    
    const toggleHobby = (hobby) => {
        setHobbies(prev =>
            prev.includes(hobby)
                ? prev.filter(h => h !== hobby)
                : [...prev, hobby]
        );
    };
    
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                />
                同意条款
            </label>
            <p>状态: {isChecked ? '已同意' : '未同意'}</p>
            
            <div>
                <p>爱好:</p>
                {['阅读', '运动', '音乐', '游戏'].map(hobby => (
                    <label key={hobby}>
                        <input
                            type="checkbox"
                            checked={hobbies.includes(hobby)}
                            onChange={() => toggleHobby(hobby)}
                        />
                        {hobby}
                    </label>
                ))}
                <p>已选: {hobbies.join(', ') || '无'}</p>
            </div>
        </div>
    );
}

// 5. 单选按钮
function RadioDemo() {
    const [color, setColor] = React.useState('blue');
    
    const colors = ['red', 'green', 'blue', 'yellow'];
    
    return (
        <div>
            <p>选择颜色:</p>
            {colors.map(c => (
                <label key={c}>
                    <input
                        type="radio"
                        name="color"
                        value={c}
                        checked={color === c}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    {c}
                </label>
            ))}
            <p>选择: {color}</p>
            <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: color,
                border: '1px solid #ddd'
            }} />
        </div>
    );
}

// 6. 多字段表单
function MultiFieldForm() {
    const [form, setForm] = React.useState({
        username: '',
        email: '',
        phone: '',
        city: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };
    
    return (
        <form>
            <div>
                <label>用户名:</label>
                <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="请输入用户名"
                />
            </div>
            <div>
                <label>邮箱:</label>
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="请输入邮箱"
                />
            </div>
            <div>
                <label>电话:</label>
                <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="请输入电话"
                />
            </div>
            <div>
                <label>城市:</label>
                <select name="city" value={form.city} onChange={handleChange}>
                    <option value="">请选择</option>
                    <option value="beijing">北京</option>
                    <option value="shanghai">上海</option>
                    <option value="guangzhou">广州</option>
                </select>
            </div>
            <pre>{JSON.stringify(form, null, 2)}</pre>
        </form>
    );
}

// 7. 文件输入
function FileInputDemo() {
    const [file, setFile] = React.useState(null);
    
    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };
    
    return (
        <div>
            <input type="file" onChange={handleChange} />
            {file && (
                <div>
                    <p>文件名: {file.name}</p>
                    <p>大小: {(file.size / 1024).toFixed(2)} KB</p>
                    <p>类型: {file.type}</p>
                </div>
            )}
        </div>
    );
}

// 8. 数字输入
function NumberInputDemo() {
    const [quantity, setQuantity] = React.useState(1);
    const [price, setPrice] = React.useState(99);
    
    const total = quantity * price;
    
    return (
        <div>
            <label>
                数量:
                <input
                    type="number"
                    min="1"
                    max="100"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
            </label>
            <label>
                单价:
                <input
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
            </label>
            <p>总价: ¥{total.toFixed(2)}</p>
        </div>
    );
}

// 9. 范围滑块
function RangeInputDemo() {
    const [value, setValue] = React.useState(50);
    
    return (
        <div>
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
            />
            <p>值: {value}</p>
            <div style={{
                width: '200px',
                height: '20px',
                background: `linear-gradient(to right, #007bff ${value}%, #ddd ${value}%)`,
                borderRadius: '4px'
            }} />
        </div>
    );
}

// 10. 完整登录表单
function LoginForm() {
    const [form, setForm] = React.useState({
        email: '',
        password: '',
        remember: false
    });
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('表单数据:', form);
        alert('登录信息: ' + JSON.stringify(form));
    };
    
    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '300px' }}>
            <h3>用户登录</h3>
            <div style={{ marginBottom: '10px' }}>
                <label>邮箱:</label>
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>密码:</label>
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    <input
                        name="remember"
                        type="checkbox"
                        checked={form.remember}
                        onChange={handleChange}
                    />
                    记住我
                </label>
            </div>
            <button type="submit" style={{ width: '100%', padding: '10px' }}>
                登录
            </button>
        </form>
    );
}

export {
    TextInputDemo,
    TextareaDemo,
    SelectDemo,
    CheckboxDemo,
    RadioDemo,
    MultiFieldForm,
    FileInputDemo,
    NumberInputDemo,
    RangeInputDemo,
    LoginForm
};
