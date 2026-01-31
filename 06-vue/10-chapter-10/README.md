# 表单输入绑定 (v-model)

## 本章目的

掌握 Vue 的表单输入绑定机制，使用 v-model 实现表单数据的双向绑定，学习各种表单元素的处理方法。

---

## 内容概述

- v-model 基础用法
- 文本输入绑定
- 复选框和单选按钮
- 选择器（下拉框）
- 值绑定（动态值）
- 修饰符（.lazy, .number, .trim）
- 自定义组件的 v-model

---

## 核心概念讲解

### 什么是 v-model？

`v-model` 是 Vue 提供的用于在表单元素和组件上创建双向数据绑定的指令。它负责监听用户的输入事件并更新数据。

#### 类比理解

想象你和一个朋友通过步话机通话：
- **你说话** → 朋友听到（数据改变 → 视图更新）
- **朋友说话** → 你听到（用户输入 → 数据更新）

v-model 就像这个步话机，让数据和视图保持实时同步。

### v-model 的本质

v-model 实际上是一个语法糖，它等价于：

```html
<!-- v-model 写法 -->
<input v-model="message">

<!-- 等价于 -->
<input 
  :value="message" 
  @input="message = $event.target.value"
>
```

### 文本输入绑定

#### 单行文本

```html
<input v-model="message" placeholder="输入内容">
<p>你输入了: {{ message }}</p>
```

#### 多行文本

```html
<textarea v-model="description" rows="4"></textarea>
<p>描述: {{ description }}</p>
```

**注意**：不要在 `<textarea>` 中使用插值 `{{ }}`，应该使用 v-model。

### 复选框

#### 单个复选框（布尔值）

```html
<input type="checkbox" v-model="isChecked">
<label>同意条款</label>
<p>状态: {{ isChecked ? '已同意' : '未同意' }}</p>
```

#### 多个复选框（数组）

```html
<div>
  <input type="checkbox" v-model="hobbies" value="读书"> 读书
  <input type="checkbox" v-model="hobbies" value="运动"> 运动
  <input type="checkbox" v-model="hobbies" value="音乐"> 音乐
</div>
<p>兴趣爱好: {{ hobbies.join(', ') }}</p>
```

```javascript
const hobbies = ref([]) // 选中后会变成 ['读书', '运动'] 等
```

### 单选按钮

```html
<div>
  <input type="radio" v-model="gender" value="male"> 男
  <input type="radio" v-model="gender" value="female"> 女
  <input type="radio" v-model="gender" value="other"> 其他
</div>
<p>性别: {{ gender }}</p>
```

### 选择器

#### 单选

```html
<select v-model="selected">
  <option disabled value="">请选择</option>
  <option>北京</option>
  <option>上海</option>
  <option>广州</option>
</select>
<p>选中: {{ selected }}</p>
```

#### 多选（数组）

```html
<select v-model="selectedCities" multiple>
  <option>北京</option>
  <option>上海</option>
  <option>广州</option>
  <option>深圳</option>
</select>
<p>选中: {{ selectedCities }}</p>
```

#### 动态选项（v-for）

```html
<select v-model="selected">
  <option v-for="option in options" :value="option.value" :key="option.value">
    {{ option.text }}
  </option>
</select>
```

```javascript
const options = ref([
  { text: '选项 A', value: 'A' },
  { text: '选项 B', value: 'B' },
  { text: '选项 C', value: 'C' }
])
```

### 值绑定

使用 `v-bind` 可以将值绑定到动态属性：

```html
<!-- 复选框绑定对象 -->
<input 
  type="checkbox" 
  v-model="selected"
  :value="{ id: 1, name: '项目一' }"
>

<!-- 单选按钮绑定数字 -->
<input type="radio" v-model="pick" :value="first">
<input type="radio" v-model="pick" :value="second">
```

### v-model 修饰符

#### .lazy

默认情况下，v-model 在每次 input 事件后更新数据。添加 `.lazy` 修饰符后，会在 change 事件后更新：

```html
<!-- 输入完成后（失去焦点或回车）才更新 -->
<input v-model.lazy="message">
```

#### .number

自动将用户输入转为数字类型：

```html
<input v-model.number="age" type="number">
```

#### .trim

自动去除输入内容的首尾空格：

```html
<input v-model.trim="username">
```

#### 修饰符可以链式使用

```html
<input v-model.lazy.trim="message">
```

---

## 代码示例说明

### JavaScript 版本

文件：`src/js/form-binding.html`

一个完整的用户注册表单示例，展示各种表单元素和 v-model 的使用。

### TypeScript 版本

文件：`src/ts/form-binding.html`

功能与 JS 版本相同，添加了表单数据的类型定义。

---

## JS 与 TS 对比

| 方面 | JavaScript | TypeScript |
|------|-----------|------------|
| **类型安全** | 运行时检查 | 编译时类型检查 |
| **表单验证** | 手动实现 | 可结合类型定义验证 |
| **代码提示** | 有限 | 完整的属性提示 |

### 示例对比

**JavaScript：**
```javascript
const form = ref({
  username: '',
  age: null,
  hobbies: []
})
```

**TypeScript：**
```typescript
interface UserForm {
  username: string
  age: number | null
  hobbies: string[]
  gender?: 'male' | 'female' | 'other'
}

const form = ref<UserForm>({
  username: '',
  age: null,
  hobbies: []
})
```

---

## 最佳实践

### ✅ 推荐做法

1. **为 select 提供默认选项**：防止未选中状态
2. **使用 .trim 处理文本输入**：自动清理用户输入
3. **使用 .number 处理数字输入**：确保数据类型正确
4. **为 checkbox/radio 设置 value**：明确绑定的值
5. **使用对象组织表单数据**：便于管理和验证

```html
<!-- 推荐：明确的值绑定 -->
<input type="radio" v-model="gender" value="male"> 男
<input type="radio" v-model="gender" value="female"> 女

<!-- 推荐：组织为对象 -->
<input v-model="form.username">
<input v-model.number="form.age">
```

### ❌ 应避免的做法

1. **不要在 textarea 中使用插值**：使用 v-model 代替
2. **不要忘记处理多个 checkbox**：使用数组绑定
3. **不要混用 value 属性和 v-model**：二选一

---

## 练习题

### 基础练习

创建一个用户信息表单：
1. 姓名输入框（文本，使用 .trim）
2. 年龄输入框（数字，使用 .number）
3. 性别单选按钮
4. 兴趣爱好多选框
5. 城市选择下拉框
6. 自我介绍文本域（使用 .lazy）
7. 实时显示所有输入的值

### 进阶练习

创建一个动态表单生成器：
1. 定义表单配置（字段类型、标签、验证规则）
2. 根据配置自动生成表单
3. 实现字段验证（必填、最小长度、正则等）
4. 显示验证错误信息
5. 支持动态添加/删除字段

### 挑战练习

创建一个多步骤注册向导：
1. 步骤 1：账户信息（用户名、密码、确认密码）
2. 步骤 2：个人资料（姓名、生日、头像上传）
3. 步骤 3：偏好设置（通知、主题、语言）
4. 步骤 4：确认页面（显示所有信息，可编辑）
5. 实现表单数据本地存储（刷新不丢失）
6. 实现每个步骤的独立验证

---

## 学习目标检查清单

- [ ] 理解 v-model 的双向绑定原理
- [ ] 掌握各种表单元素的 v-model 用法
- [ ] 理解 checkbox 的布尔值和数组绑定
- [ ] 掌握 select 的单选和多选
- [ ] 理解动态选项的绑定（v-for + v-model）
- [ ] 掌握 v-model 修饰符的使用场景
- [ ] 能够在自定义组件上实现 v-model

---

## 练习题答案

详见 `practice-solution.html` 文件。

---

## 下一步

完成本章学习后，进入 [第 11 章：组件基础](../11-chapter-11/README.md)，学习 Vue 组件的基本概念和使用方法。
