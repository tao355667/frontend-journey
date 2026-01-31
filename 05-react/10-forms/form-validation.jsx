// 表单验证示例

// 1. 基础验证
function BasicValidation() {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState('');
    
    const validate = (val) => {
        if (!val) return '输入不能为空';
        if (val.length < 3) return '至少需要3个字符';
        if (val.length > 20) return '最多20个字符';
        return '';
    };
    
    const handleChange = (e) => {
        const val = e.target.value;
        setValue(val);
        setError(validate(val));
    };
    
    return (
        <div>
            <input value={value} onChange={handleChange} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>字符数: {value.length}/20</p>
        </div>
    );
}

// 2. 邮箱验证
function EmailValidation() {
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState('');
    const [touched, setTouched] = React.useState(false);
    
    const validateEmail = (email) => {
        if (!email) return '邮箱不能为空';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return '请输入有效的邮箱地址';
        }
        return '';
    };
    
    const handleBlur = () => setTouched(true);
    
    const handleChange = (e) => {
        const val = e.target.value;
        setEmail(val);
        if (touched) {
            setError(validateEmail(val));
        }
    };
    
    return (
        <div>
            <label>邮箱:</label>
            <input
                type="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                    borderColor: error && touched ? 'red' : '#ddd'
                }}
            />
            {touched && error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

// 3. 密码验证
function PasswordValidation() {
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [errors, setErrors] = React.useState({});
    
    const validatePassword = (pwd) => {
        const errors = [];
        if (pwd.length < 8) errors.push('至少8个字符');
        if (!/[A-Z]/.test(pwd)) errors.push('包含大写字母');
        if (!/[a-z]/.test(pwd)) errors.push('包含小写字母');
        if (!/[0-9]/.test(pwd)) errors.push('包含数字');
        return errors;
    };
    
    const handlePasswordChange = (e) => {
        const pwd = e.target.value;
        setPassword(pwd);
        setErrors(prev => ({
            ...prev,
            password: validatePassword(pwd),
            match: pwd && confirmPassword && pwd !== confirmPassword ? '两次密码不一致' : ''
        }));
    };
    
    const handleConfirmChange = (e) => {
        const confirm = e.target.value;
        setConfirmPassword(confirm);
        setErrors(prev => ({
            ...prev,
            match: password && confirm && password !== confirm ? '两次密码不一致' : ''
        }));
    };
    
    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                <label>密码:</label>
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                {errors.password && errors.password.map((err, i) => (
                    <p key={i} style={{ color: 'red', fontSize: '12px' }}>
                        {err}
                    </p>
                ))}
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>确认密码:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmChange}
                />
                {errors.match && <p style={{ color: 'red' }}>{errors.match}</p>}
            </div>
            <div style={{
                padding: '10px',
                background: password ? (
                    errors.password?.length === 0 ? '#d4edda' : '#f8d7da'
                ) : '#f8f9fa'
            }}>
                <p>密码强度:</p>
                {password ? (
                    errors.password?.length === 0 ? '✓ 强' : `✗ 弱 (${errors.password?.length} 项不符合)`
                ) : '未输入'}
            </div>
        </div>
    );
}

// 4. 完整注册表单
function RegistrationForm() {
    const [form, setForm] = React.useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = React.useState({});
    const [submitted, setSubmitted] = React.useState(false);
    
    const validate = () => {
        const newErrors = {};
        
        if (!form.username.trim()) {
            newErrors.username = '用户名不能为空';
        } else if (form.username.length < 3) {
            newErrors.username = '用户名至少3个字符';
        }
        
        if (!form.email) {
            newErrors.email = '邮箱不能为空';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = '邮箱格式不正确';
        }
        
        if (!form.password) {
            newErrors.password = '密码不能为空';
        } else if (form.password.length < 8) {
            newErrors.password = '密码至少8个字符';
        }
        
        if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = '两次密码不一致';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (validate()) {
            alert('注册成功！');
        }
    };
    
    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
            <h3>用户注册</h3>
            
            <div>
                <label>用户名:</label>
                <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px' }}
                />
                {submitted && errors.username && (
                    <p style={{ color: 'red' }}>{errors.username}</p>
                )}
            </div>
            
            <div>
                <label>邮箱:</label>
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px' }}
                />
                {submitted && errors.email && (
                    <p style={{ color: 'red' }}>{errors.email}</p>
                )}
            </div>
            
            <div>
                <label>密码:</label>
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px' }}
                />
                {submitted && errors.password && (
                    <p style={{ color: 'red' }}>{errors.password}</p>
                )}
            </div>
            
            <div>
                <label>确认密码:</label>
                <input
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px' }}
                />
                {submitted && errors.confirmPassword && (
                    <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
                )}
            </div>
            
            <button type="submit" style={{ marginTop: '10px' }}>
                注册
            </button>
        </form>
    );
}

// 5. 实时反馈表单
function RealTimeFeedbackForm() {
    const [form, setForm] = React.useState({
        name: '',
        phone: ''
    });
    
    const [feedback, setFeedback] = React.useState({
        name: '',
        phone: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        
        let msg = '';
        if (name === 'name') {
            msg = value.length === 0 ? '请输入姓名' :
                  value.length < 2 ? '姓名太短' : '✓';
        } else if (name === 'phone') {
            msg = value.length === 0 ? '请输入手机号' :
                  /^1[3-9]\d{9}$/.test(value) ? '✓' : '请输入正确的手机号';
        }
        setFeedback(prev => ({ ...prev, [name]: msg }));
    };
    
    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                <label>姓名:</label>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
                <span style={{ color: feedback.name === '✓' ? 'green' : 'orange' }}>
                    {feedback.name}
                </span>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>手机号:</label>
                <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                />
                <span style={{ color: feedback.phone === '✓' ? 'green' : 'orange' }}>
                    {feedback.phone}
                </span>
            </div>
        </div>
    );
}

// 6. 自定义验证规则
function CustomValidationForm() {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(null);
    
    const validators = [
        { test: v => v.length >= 3, message: '至少3个字符' },
        { test: v => /^[a-zA-Z]/.test(v), message: '必须以字母开头' },
        { test: v => /^[a-zA-Z0-9_]+$/.test(v), message: '只能包含字母、数字、下划线' }
    ];
    
    const handleChange = (e) => {
        const val = e.target.value;
        setValue(val);
        
        for (const validator of validators) {
            if (!validator.test(val)) {
                setError(validator.message);
                return;
            }
        }
        setError(null);
    };
    
    return (
        <div>
            <label>用户名:</label>
            <input value={value} onChange={handleChange} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!error && value && <p style={{ color: 'green' }}>✓ 用户名可用</p>}
        </div>
    );
}

export {
    BasicValidation,
    EmailValidation,
    PasswordValidation,
    RegistrationForm,
    RealTimeFeedbackForm,
    CustomValidationForm
};
