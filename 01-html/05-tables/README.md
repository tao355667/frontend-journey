# HTML 表格

## 本章目的

**学会规范展示结构化数据**，掌握表格的创建、结构组织和样式设置，能够清晰呈现数据信息。

---

## 什么是表格？

表格（Table）用于展示结构化的二维数据，比如成绩单、价格表、课程表等。

### 通俗理解

表格就像 Excel 中的电子表格，由行和列组成，在行与列的交叉处形成单元格，每个单元格可以放置数据。

```
+--------+--------+--------+
|  姓名  |  年龄  |  城市  |
+--------+--------+--------+
|  张三  |   25   |  北京  |
+--------+--------+--------+
|  李四  |   30   |  上海  |
+--------+--------+--------+
```

---

## 什么时候使用表格？

### 应该使用表格的场景：

1. **结构化数据**：成绩单、财务报表、产品价格表
2. **对比信息**：不同产品的参数对比
3. **日程安排**：课程表、会议日程

### 不应该使用表格的场景：

1. **页面布局**：不要用表格来做网页布局（应该用 CSS）
2. **装饰性排版**：图片排列、卡片展示（应该用 CSS）

---

## 表格的基本结构

```html
<table>
    <thead>
        <tr>
            <th>姓名</th>
            <th>年龄</th>
            <th>城市</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>张三</td>
            <td>25</td>
            <td>北京</td>
        </tr>
        <tr>
            <td>李四</td>
            <td>30</td>
            <td>上海</td>
        </tr>
    </tbody>
</table>
```

---

## 表格标签详解

### 1. 表格容器 `<table>`

```html
<table>
    <!-- 表格内容 -->
</table>
```

**作用**：创建一个表格，包裹所有表格内容。

---

### 2. 表头区域 `<thead>`

```html
<thead>
    <tr>
        <th>姓名</th>
        <th>年龄</th>
        <th>城市</th>
    </tr>
</thead>
```

**作用**：定义表格的表头部分，通常包含列标题。

**说明**：

- `<thead>` 中的内容会以粗体显示
- 表头内容使用 `<th>` 标签（th = table header）
- 可选标签，但建议使用以明确表格结构

---

### 3. 表格行 `<tr>`

```html
<tr>
    <td>张三</td>
    <td>25</td>
    <td>北京</td>
</tr>
```

**作用**：定义表格的一行（tr = table row）。

**说明**：`<tr>` 可以包含 `<th>`（表头单元格）或 `<td>`（数据单元格）。

---

### 4. 数据单元格 `<td>`

```html
<td>张三</td>
```

**作用**：定义表格的数据单元格（td = table data）。

**说明**：

- 普通数据使用 `<td>` 标签
- 表头数据使用 `<th>` 标签

---

### 5. 表头单元格 `<th>`

```html
<th>姓名</th>
```

**作用**：定义表格的表头单元格。

**说明**：

- `<th>` 内容通常以粗体、居中显示
- 在 `<thead>` 中使用，也可以在 `<tbody>` 中使用（行标题）

---

### 6. 表体区域 `<tbody>`

```html
<tbody>
    <tr>
        <td>张三</td>
        <td>25</td>
        <td>北京</td>
    </tr>
</tbody>
```

**作用**：定义表格的主体内容，包含数据行。

**说明**：

- 可选标签，但建议使用以明确表格结构
- 一个表格可以有多个 `<tbody>`

---

### 7. 表尾区域 `<tfoot>`

```html
<tfoot>
    <tr>
        <td>总计</td>
        <td>2</td>
        <td>-</td>
    </tr>
</tfoot>
```

**作用**：定义表格的页脚，通常包含汇总信息。

**说明**：

- 可选标签
- 如果使用，必须放在 `<tbody>` 之后

---

## 完整示例：学生成绩表

```html
<table border="1" cellpadding="10" cellspacing="0">
    <thead>
        <tr>
            <th>学号</th>
            <th>姓名</th>
            <th>语文</th>
            <th>数学</th>
            <th>英语</th>
            <th>总分</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1001</td>
            <td>张三</td>
            <td>85</td>
            <td>90</td>
            <td>88</td>
            <td>263</td>
        </tr>
        <tr>
            <td>1002</td>
            <td>李四</td>
            <td>78</td>
            <td>85</td>
            <td>92</td>
            <td>255</td>
        </tr>
        <tr>
            <td>1003</td>
            <td>王五</td>
            <td>92</td>
            <td>88</td>
            <td>90</td>
            <td>270</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="4">平均分</td>
            <td>90</td>
            <td>262.67</td>
        </tr>
    </tfoot>
</table>
```

---

## 单元格合并

### 跨列合并 `colspan`

```html
<tr>
    <th colspan="3">三个学期成绩</th>
</tr>
```

**作用**：让一个单元格跨越多列。

**说明**：`colspan="3"` 表示这个单元格横跨 3 列。

---

### 跨行合并 `rowspan`

```html
<tr>
    <th rowspan="2">张三</th>
    <td>语文</td>
    <td>85</td>
</tr>
<tr>
    <td>数学</td>
    <td>90</td>
</tr>
```

**作用**：让一个单元格跨越多行。

**说明**：`rowspan="2"` 表示这个单元格纵跨 2 行。

---

## 完整示例：合并单元格

```html
<table border="1" cellpadding="10" cellspacing="0">
    <thead>
        <tr>
            <th rowspan="2">姓名</th>
            <th colspan="3">成绩</th>
            <th rowspan="2">总分</th>
        </tr>
        <tr>
            <th>语文</th>
            <th>数学</th>
            <th>英语</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>张三</td>
            <td>85</td>
            <td>90</td>
            <td>88</td>
            <td>263</td>
        </tr>
    </tbody>
</table>
```

**效果**：

- "姓名" 纵跨 2 行
- "成绩" 横跨 3 列

---

## 表格属性（已过时，仅供参考）

| 属性            | 说明         | 推荐替代方案            |
| --------------- | ------------ | ----------------------- |
| `border`      | 边框宽度     | CSS `border`          |
| `cellpadding` | 单元格内边距 | CSS `padding`         |
| `cellspacing` | 单元格间距   | CSS `border-collapse` |

**注意**：这些 HTML 属性已经过时，建议使用 CSS 来控制表格样式。

---

## 最佳实践

### 1. 使用语义化结构

```html
<!-- 推荐：使用 thead、tbody、tfoot -->
<table>
    <thead>...</thead>
    <tbody>...</tbody>
    <tfoot>...</tfoot>
</table>

<!-- 避免：不使用语义化标签 -->
<table>
    <tr><th>...</th></tr>
    <tr><td>...</td></tr>
</table>
```

---

### 2. 为表格添加说明 `<caption>`

```html
<table>
    <caption>2026年第一季度销售报表</caption>
    <thead>...</thead>
</table>
```

**作用**：为表格添加标题，帮助理解表格内容。

---

### 3. 使用 `<th>` 标记表头

```html
<!-- 推荐 -->
<thead>
    <tr>
        <th>姓名</th>
        <th>年龄</th>
    </tr>
</thead>

<!-- 避免 -->
<thead>
    <tr>
        <td><b>姓名</b></td>
        <td><b>年龄</b></td>
    </tr>
</thead>
```

---

### 4. 使用 CSS 控制样式

不要使用 HTML 的 `border`、`cellpadding` 等属性，应该用 CSS：

```css
table {
    border-collapse: collapse;
    width: 100%;
}

th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}

th {
    background-color: #f5f5f5;
    font-weight: bold;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}
```

---

## 文件说明

- `table.html` - 表格示例，展示表格的基本结构和单元格合并

---

## 练习题

### 基础练习


1. 创建一个 3 列 4 行的表格（表头 + 3 行数据）
2. 包含姓名、年龄、城市三列
3. 使用 `<thead>` 和 `<tbody>` 结构
4. 为表格添加 `<caption>` 标题"学生信息表"

### 进阶练习

创建 `product.html`，要求：

1. 创建产品对比表，包含产品名称、价格、库存、状态
2. 使用 `<th>` 标记表头
3. 使用 `<tfoot>` 添加汇总行
4. 使用 `colspan` 合并最后一行的前 3 个单元格

### 挑战练习

创建 `schedule.html`，要求：

1. 创建一个课程表（周一到周五，每天 4 节课）
2. 使用 `rowspan` 合并连续的相同课程
3. 使用 `colspan` 合并午休时间（跨所有列）
4. 为表头添加背景色
5. 使用 CSS 添加斑马纹效果（偶数行背景色不同）

---

## 学习目标检查

- [ ] 理解表格的作用和适用场景
- [ ] 掌握表格的基本结构（table, thead, tbody, tfoot）
- [ ] 理解 tr、th、td 标签的区别和用法
- [ ] 掌握单元格合并（colspan 和 rowspan）
- [ ] 能够为表格添加说明（caption）
- [ ] 能够创建清晰美观的数据表格
