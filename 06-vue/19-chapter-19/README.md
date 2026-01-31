# 第十九章：组合式 API 概述与 setup

## 学习目标
1. 理解组合式 API（Composition API）的概念和优势
2. 掌握 `setup()` 函数的基本用法
3. 了解组合式 API 与选项式 API 的区别

## 概念讲解

### 什么是组合式 API？

组合式 API（Composition API）是 Vue 3 引入的一种新的代码组织方式。它允许我们将相关功能的代码组织在一起，而不是分散在不同的选项（data、methods、computed 等）中。

**比喻：整理房间**

想象你的房间有两个书架：
- **选项式 API**：一个书架放小说，一个书架放教科书，所有小说放在一起，所有教科书放在一起
- **组合式 API**：按主题整理，比如"科幻类"（包括小说和相关的教科书），"历史类"（包括历史小说和历史书）

组合式 API 就是把相关的功能代码放在一起，更容易理解和维护。

### 为什么需要组合式 API？

当组件变得复杂时，选项式 API 会出现问题：

```javascript
// 选项式 API - 相关代码分散在不同选项中
export default {
  data() {
    return {
      // 搜索功能的变量
      searchQuery: '',
      searchResults: [],
      // 排序功能的变量
      sortKey: 'name',
      sortOrder: 'asc'
    }
  },
  computed: {
    // 搜索的计算属性
    filteredResults() { /* ... */ },
    // 排序的计算属性
    sortedResults() { /* ... */ }
  },
  methods: {
    // 搜索的方法
    performSearch() { /* ... */ },
    // 排序的方法
    changeSort() { /* ... */ }
  }
}
```

组合式 API 可以将搜索相关的代码放在一起，排序相关的代码放在一起，让逻辑更加清晰。

### setup() 函数

`setup()` 是组合式 API 的入口函数，在组件创建之前执行。

**基本结构：**

```javascript
export default {
  setup() {
    // 1. 定义响应式数据
    // 2. 定义方法
    // 3. 定义计算属性
    // 4. 返回需要在模板中使用的数据和方法
    
    return {
      // 暴露给模板使用
    }
  }
}
```

**执行时机：**
- `setup()` 在 `beforeCreate` 钩子之前执行
- 此时组件实例还未创建，不能访问 `this`
- 这是设置响应式数据和逻辑的地方

### 组合式 API 的核心特性

1. **响应式数据**：使用 `ref` 和 `reactive` 创建响应式数据
2. **计算属性**：使用 `computed` 创建计算属性
3. **侦听器**：使用 `watch` 和 `watchEffect` 监听数据变化
4. **生命周期钩子**：使用 `onMounted`、`onUpdated` 等
5. **依赖注入**：使用 `provide` 和 `inject`

## 代码示例

### 基础 setup 示例

```javascript
const { createApp, ref } = Vue

const app = createApp({
  setup() {
    // 定义响应式数据
    const count = ref(0)
    
    // 定义方法
    const increment = () => {
      count.value++
    }
    
    // 返回给模板使用
    return {
      count,
      increment
    }
  }
})
```

### 对比示例：选项式 vs 组合式

**选项式 API：**

```javascript
export default {
  data() {
    return {
      firstName: '张',
      lastName: '三'
    }
  },
  computed: {
    fullName() {
      return this.firstName + this.lastName
    }
  },
  methods: {
    updateName() {
      this.firstName = '李'
    }
  }
}
```

**组合式 API：**

```javascript
import { ref, computed } from 'vue'

export default {
  setup() {
    // 所有相关代码都在一起
    const firstName = ref('张')
    const lastName = ref('三')
    
    const fullName = computed(() => {
      return firstName.value + lastName.value
    })
    
    const updateName = () => {
      firstName.value = '李'
    }
    
    return {
      firstName,
      lastName,
      fullName,
      updateName
    }
  }
}
```

### setup 的参数

`setup()` 接收两个参数：

1. **props**：组件接收的属性
2. **context**：上下文对象，包含 attrs、slots、emit 等

```javascript
export default {
  props: {
    title: String
  },
  setup(props, context) {
    // props 是响应式的，解构会丢失响应性
    console.log(props.title)
    
    // context 不是响应式的，可以解构
    const { attrs, slots, emit } = context
    
    // 触发事件
    const handleClick = () => {
      emit('customEvent', 'some data')
    }
    
    return {
      handleClick
    }
  }
}
```

### 访问组件实例

由于 `setup` 中没有 `this`，如果需要访问组件实例，可以使用 `getCurrentInstance`：

```javascript
import { getCurrentInstance } from 'vue'

export default {
  setup() {
    const instance = getCurrentInstance()
    
    // 访问全局属性
    console.log(instance.appContext.config.globalProperties)
    
    return {}
  }
}
```

## 最佳实践

1. **函数命名**：将相关逻辑抽取为组合式函数（Composables），以 `use` 开头命名
2. **代码组织**：按功能而不是按选项组织代码
3. **返回值**：只返回模板需要的数据和方法
4. **避免在 setup 中使用 `this`**：始终通过返回值访问数据

## 练习题

### 练习 1：基础练习
创建一个计数器组件，使用 `setup()` 函数实现：
- 一个计数器变量，初始值为 0
- 一个增加按钮，点击后计数器 +1
- 一个减少按钮，点击后计数器 -1
- 一个重置按钮，点击后将计数器重置为 0

### 练习 2：进阶练习
创建一个用户信息展示组件：
- 使用 `setup()` 定义用户数据（姓名、年龄、职业）
- 提供一个更新用户信息的方法
- 提供一个计算属性显示用户的简介（"XX，XX岁，职业是XX"）

### 练习 3：综合练习
创建一个待办事项列表组件：
- 使用 `setup()` 管理待办事项数组
- 提供添加、删除、标记完成的方法
- 提供一个计算属性显示未完成的待办事项数量
- 使用 `setup` 的参数接收一个 `title` prop 并显示

---

完成练习后，可以查看 `practice-solution.html` 中的参考答案。
