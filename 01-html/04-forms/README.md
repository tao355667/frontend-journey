# HTML 表单与验证

## 本章目的

**学会收集用户输入并进行基本验证**，掌握表单的创建、数据收集和浏览器内置验证机制，能够创建用户友好的表单。

---

## 什么是表单？

表单是用户与网页交互的重要方式，用于收集和提交用户数据。常见的表单场景包括：

- 用户注册、登录
- 联系我们表单
- 商品评价
- 调查问卷

### 通俗理解

表单就像一张"调查问卷"：

- **问题**：由各种输入控件（文本框、下拉框、复选框）组成
- **答案**：用户填写后点击"提交"按钮
- **处理**：答案会被发送到服务器进行处理

---

## 表单的基本结构

```html
<form action="#" method="post">
    <label for="name">姓名：</label>
    <input id="name" name="name" type="text" placeholder="请输入姓名" required>
    <button type="submit">提交</button>
</form>
```

### 关键元素说明

| 元素         | 作用     | 说明                           |
| ------------ | -------- | ------------------------------ |
| `<form>`   | 表单容器 | 包裹所有表单控件，设置提交方式 |
| `<label>`  | 标签     | 为输入控件提供说明文字         |
| `<input>`  | 输入控件 | 单行文本输入框，有多种类型     |
| `<button>` | 按钮     | 提交或重置表单                 |

---

## 表单容器 `<form>`

```html
<form action="submit.php" method="post">
    <!-- 表单内容 -->
</form>
```

### 常用属性

| 属性        | 值                  | 说明                  |
| ----------- | ------------------- | --------------------- |
| `action`  | URL                 | 表单提交的目标地址    |
| `method`  | get/post            | 提交方式，post 更安全 |
| `enctype` | multipart/form-data | 提交文件时需要设置    |

### method 的区别

- **GET**：数据在 URL 中可见，适合搜索表单，有数据量限制
- **POST**：数据在请求体中，适合登录、注册等敏感数据

---

## 输入控件

### 文本输入 `<input type="text">`

```html
<label for="name">姓名：</label>
<input id="name" name="name" type="text" placeholder="请输入姓名" required>
```

**属性说明**：

- `placeholder`：占位提示文字
- `required`：必填项，不填写无法提交
- `maxlength`：最大字符数限制

---

### 密码输入 `<input type="password">`

```html
<label for="password">密码：</label>
<input id="password" name="password" type="password" required>
```

**说明**：输入内容会显示为圆点或星号，保护密码安全。

---

### 邮箱输入 `<input type="email">`

```html
<label for="email">邮箱：</label>
<input id="email" name="email" type="email" placeholder="name@example.com" required>
```

**说明**：浏览器会自动验证邮箱格式，不符合格式会提示错误。

---

### 数字输入 `<input type="number">`

```html
<label for="age">年龄（18-65）：</label>
<input id="age" name="age" type="number" min="18" max="65" required>
```

**属性说明**：

- `min`：最小值
- `max`：最大值
- `step`：步长（默认为 1）

---

### 日期选择 `<input type="date">`

```html
<label for="birthday">生日：</label>
<input id="birthday" name="birthday" type="date">
```

**说明**：浏览器会显示日期选择器，用户体验更好。

---

### 复选框 `<input type="checkbox">`

```html
<label><input type="checkbox" name="agree" required> 我已阅读并同意条款</label>
```

**说明**：用于多选，多个复选框可以同名。

---

### 单选按钮 `<input type="radio">`

```html
<input type="radio" id="male" name="gender" value="male" checked>
<label for="male">男</label>

<input type="radio" id="female" name="gender" value="female">
<label for="female">女</label>
```

**说明**：用于单选，同一组的 radio 必须使用相同的 `name`。

---

## 其他表单控件

### 文本域 `<textarea>`

```html
<label for="message">留言：</label><br>
<textarea id="message" name="message" rows="4" cols="40" placeholder="写下你的问题或想法"></textarea>
```

**属性说明**：

- `rows`：行数
- `cols`：列数
- `placeholder`：占位提示文字

**说明**：用于多行文本输入，如留言、评论。

---

### 下拉选择 `<select>` 和 `<option>`

```html
<label for="topic">咨询类型：</label>
<select id="topic" name="topic">
    <option value="">请选择</option>
    <option value="learn">学习相关</option>
    <option value="bug">问题反馈</option>
    <option value="other">其他</option>
</select>
```

**说明**：用于从多个选项中选择一个。

---

### 按钮 `<button>`

```html
<button type="submit">提交</button>
<button type="reset">重置</button>
<button type="button">普通按钮</button>
```

**type 的区别**：

- `submit`：提交表单（默认）
- `reset`：重置表单到初始状态
- `button`：普通按钮，需要 JavaScript 来处理点击

---

## 表单验证

### 1. 必填验证 `required`

```html
<input type="text" required>
```

**效果**：不填写就无法提交，浏览器会提示"请填写此项"。

---

### 2. 格式验证 `type`

```html
<input type="email">    <!-- 邮箱格式 -->
<input type="url">      <!-- URL 格式 -->
<input type="number">   <!-- 数字格式 -->
```

**效果**：浏览器会自动验证输入格式。

---

### 3. 范围验证 `min` / `max`

```html
<input type="number" min="18" max="65">
<input type="date" min="2026-01-01" max="2026-12-31">
```

**效果**：超出范围会提示错误。

---

### 4. 正则验证 `pattern`

```html
<label for="password">密码（至少 6 位，包含数字与字母）：</label>
<input id="password" name="password" type="password" required pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}" placeholder="例如: abc123">
```

**说明**：

- `pattern` 属性使用正则表达式
- 上面的正则表示：至少 6 位，必须包含字母和数字

---

## 完整示例：联系表单

```html
<h1>联系表单</h1>
<form action="#" method="post">
    <p>
        <label for="name">姓名：</label>
        <input id="name" name="name" type="text" placeholder="请输入姓名" required>
    </p>
    <p>
        <label for="email">邮箱：</label>
        <input id="email" name="email" type="email" placeholder="name@example.com" required>
    </p>
    <p>
        <label for="topic">咨询类型：</label>
        <select id="topic" name="topic">
            <option value="">请选择</option>
            <option value="learn">学习相关</option>
            <option value="bug">问题反馈</option>
            <option value="other">其他</option>
        </select>
    </p>
    <p>
        <label for="message">留言：</label><br>
        <textarea id="message" name="message" rows="4" cols="40" placeholder="写下你的问题或想法"></textarea>
    </p>
    <p>
        <label><input type="checkbox" name="agree" required> 我已阅读并同意条款</label>
    </p>
    <button type="submit">提交</button>
    <button type="reset">重置</button>
</form>
```

---

## 最佳实践

### 1. 为每个输入控件提供 `<label>`

```html
<!-- 推荐：label 与 input 通过 id 关联 -->
<label for="email">邮箱：</label>
<input id="email" name="email" type="email">

<!-- 或者：input 放在 label 内部 -->
<label>
    邮箱：
    <input type="email" name="email">
</label>
```

**好处**：点击 label 文字也能聚焦到输入框，提升用户体验。

---

### 2. 使用合适的 input 类型

使用 `type="email"` 而不是 `type="text"`，浏览器会提供更好的输入体验和验证。

---

### 3. 提供占位提示 `placeholder`

```html
<input type="email" placeholder="name@example.com">
```

占位提示可以帮助用户理解应该输入什么，但不能替代 label。

---

### 4. 合理使用浏览器验证

浏览器内置验证已经能满足大部分需求，优先使用，不需要用 JavaScript 重复验证。

---

## 文件说明

- `form.html` - 基础联系表单，展示输入框、下拉、文本域、必填与勾选条款
- `validation.html` - 内置校验示例，包含 email、number 范围、password 正则、url、date 范围

---

## 练习题

### 基础练习

创建 `contact.html`，要求：

1. 创建一个联系表单，包含姓名、邮箱、主题、留言
2. 姓名和邮箱设为必填项
3. 使用 `<select>` 选择咨询主题
4. 使用 `<textarea>` 输入留言内容
5. 添加"提交"和"重置"按钮

### 进阶练习

创建 `register.html`，要求：

1. 创建用户注册表单，包含用户名、邮箱、密码、确认密码
2. 密码使用 `type="password"` 并设置至少 8 位的验证
3. 确认密码字段需要与密码字段匹配（思考：如何实现？）
4. 添加性别单选按钮
5. 添加"同意条款"复选框，勾选后才能提交

### 挑战练习

创建 `questionnaire.html`，要求：

1. 创建一个问卷调查表单，包含各种类型的输入控件
2. 使用 `pattern` 验证手机号格式（11位数字）
3. 使用 `min` 和 `max` 限制年龄输入范围（18-100）
4. 为所有输入控件提供清晰的 label 和 placeholder
5. 在浏览器中测试表单验证功能，确保各种错误提示都能正常显示

---

## 学习目标检查

- [ ] 理解表单的作用和基本结构
- [ ] 掌握常用 input 类型的用法
- [ ] 能够使用 select、textarea、checkbox、radio 等表单控件
- [ ] 理解表单验证的概念和方法
- [ ] 能够使用 required、pattern、min、max 进行基本验证
- [ ] 能够创建一个完整的用户友好的表单
