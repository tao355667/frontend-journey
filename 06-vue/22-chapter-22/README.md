# 第二十二章：生命周期钩子（组合式）

## 学习目标
1. 理解组合式 API 中的生命周期钩子
2. 掌握常用生命周期钩子的用法
3. 了解组合式 API 与选项式 API 生命周期的对应关系
4. 学会在合适的时机执行代码

## 概念讲解

### 什么是生命周期？

组件从创建到销毁会经历一系列阶段，Vue 在这些关键阶段提供了钩子函数，让我们可以在特定时机执行代码。

**比喻：人的生命阶段**

想象一个人的一生：
- **出生前**（setup）：准备各种条件
- **出生**（onMounted）：来到这个世界，开始与环境互动
- **成长**（onUpdated）：身体变化，学习新技能
- **离世**（onUnmounted）：离开世界，清理遗物

组件的生命周期也是类似的，每个阶段都有特定的事情要做。

### 组合式 API 的生命周期钩子

Vue 3 为组合式 API 提供了以下生命周期钩子（需要在 `setup()` 中使用）：

| 钩子函数 | 执行时机 | 用途 |
|---------|---------|------|
| `onBeforeMount` | 组件挂载之前 | 最后的准备工作 |
| `onMounted` | 组件挂载之后 | DOM 操作、数据获取 |
| `onBeforeUpdate` | 组件更新之前 | 获取更新前的 DOM 状态 |
| `onUpdated` | 组件更新之后 | 更新后的 DOM 操作 |
| `onBeforeUnmount` | 组件卸载之前 | 清理前的准备工作 |
| `onUnmounted` | 组件卸载之后 | 清理副作用（定时器、事件监听等） |
| `onErrorCaptured` | 捕获后代组件错误 | 错误处理 |

**注意：**
- `setup()` 本身执行在 `beforeCreate` 和 `created` 之间
- 不需要 `beforeCreate` 和 `created`，直接在 `setup()` 中写代码即可

### 与选项式 API 的对应关系

```
选项式 API          组合式 API
beforeCreate    →   不需要，直接写在 setup 中
created         →   不需要，直接写在 setup 中
beforeMount     →   onBeforeMount
mounted         →   onMounted
beforeUpdate    →   onBeforeUpdate
updated         →   onUpdated
beforeUnmount   →   onBeforeUnmount
unmounted       →   onUnmounted
errorCaptured   →   onErrorCaptured
```

### 常用钩子详解

**onMounted - 组件挂载完成**

组件挂载到 DOM 后调用，此时可以访问模板引用和 DOM 元素。

```javascript
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const inputRef = ref(null)
    
    onMounted(() => {
      // DOM 已经渲染完成
      console.log('组件已挂载')
      
      // 可以操作 DOM
      inputRef.value.focus()
      
      // 可以获取数据
      fetchData()
    })
    
    return {
      inputRef
    }
  }
}
```

**onUnmounted - 组件卸载完成**

组件从 DOM 中移除后调用，用于清理副作用。

```javascript
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  setup() {
    const timer = ref(null)
    
    onMounted(() => {
      // 创建定时器
      timer.value = setInterval(() => {
        console.log('定时器执行')
      }, 1000)
    })
    
    onUnmounted(() => {
      // 清理定时器，防止内存泄漏
      clearInterval(timer.value)
      console.log('组件已卸载，定时器已清理')
    })
    
    return {}
  }
}
```

**onUpdated - 组件更新完成**

组件数据变化导致重新渲染后调用。

```javascript
import { ref, onUpdated, nextTick } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const listRef = ref(null)
    
    onUpdated(() => {
      // DOM 已经更新
      console.log('组件已更新')
      
      // 可以获取更新后的 DOM 状态
      nextTick(() => {
        console.log('列表高度：', listRef.value?.clientHeight)
      })
    })
    
    return {
      count,
      listRef
    }
  }
}
```

### 清理副作用的重要性

在组件中使用定时器、事件监听、WebSocket 等，必须在卸载时清理，否则会导致内存泄漏。

**常见需要清理的资源：**

1. **定时器**：`setInterval`、`setTimeout`
2. **事件监听**：`addEventListener`
3. **订阅**：WebSocket、EventBus、RxJS 订阅
4. **外部资源**：第三方库实例、图表实例

```javascript
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  setup() {
    // 清理函数数组
    const cleanupFns = []
    
    onMounted(() => {
      // 定时器
      const timer = setInterval(() => {}, 1000)
      cleanupFns.push(() => clearInterval(timer))
      
      // 事件监听
      const handler = () => {}
      window.addEventListener('resize', handler)
      cleanupFns.push(() => window.removeEventListener('resize', handler))
      
      // WebSocket
      const ws = new WebSocket('ws://example.com')
      cleanupFns.push(() => ws.close())
    })
    
    onUnmounted(() => {
      // 执行所有清理函数
      cleanupFns.forEach(fn => fn())
    })
    
    return {}
  }
}
```

## 代码示例

### 基础生命周期示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>生命周期示例</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>
    .container { padding: 20px; border: 2px solid #ccc; margin: 10px; }
    .log { background: #f0f0f0; padding: 10px; margin: 5px 0; }
  </style>
</head>
<body>
  <div id="app">
    <button @click="showComponent = !showComponent">
      {{ showComponent ? '卸载' : '挂载' }}组件
    </button>
    
    <lifecycle-demo v-if="showComponent" />
  </div>

  <script>
    const { createApp, ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } = Vue

    const LifecycleDemo = {
      setup() {
        const count = ref(0)
        const logs = ref([])
        
        const addLog = (msg) => {
          logs.value.push(`${new Date().toLocaleTimeString()}: ${msg}`)
        }
        
        onBeforeMount(() => addLog('onBeforeMount - 组件即将挂载'))
        onMounted(() => addLog('onMounted - 组件已挂载'))
        onBeforeUpdate(() => addLog('onBeforeUpdate - 组件即将更新'))
        onUpdated(() => addLog('onUpdated - 组件已更新'))
        onBeforeUnmount(() => addLog('onBeforeUnmount - 组件即将卸载'))
        onUnmounted(() => console.log('onUnmounted - 组件已卸载'))
        
        return { count, logs }
      },
      template: `
        <div class="container">
          <h3>生命周期演示组件</h3>
          <p>计数：{{ count }}</p>
          <button @click="count++">增加</button>
          <div class="log" v-for="log in logs" :key="log">{{ log }}</div>
        </div>
      `
    }

    createApp({
      components: { LifecycleDemo },
      setup() {
        const showComponent = ref(false)
        return { showComponent }
      }
    }).mount('#app')
  </script>
</body>
</html>
```

### 数据获取示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>数据获取示例</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">
    <user-list />
  </div>

  <script>
    const { createApp, ref, onMounted } = Vue

    const UserList = {
      setup() {
        const users = ref([])
        const loading = ref(false)
        const error = ref(null)
        
        const fetchUsers = async () => {
          loading.value = true
          error.value = null
          
          try {
            // 模拟 API 调用
            await new Promise(resolve => setTimeout(resolve, 1000))
            users.value = [
              { id: 1, name: '张三' },
              { id: 2, name: '李四' },
              { id: 3, name: '王五' }
            ]
          } catch (err) {
            error.value = err.message
          } finally {
            loading.value = false
          }
        }
        
        // 组件挂载后获取数据
        onMounted(() => {
          fetchUsers()
        })
        
        return { users, loading, error, fetchUsers }
      },
      template: `
        <div>
          <h2>用户列表</h2>
          <button @click="fetchUsers" :disabled="loading">
            {{ loading ? '加载中...' : '刷新' }}
          </button>
          <p v-if="error" style="color: red;">错误：{{ error }}</p>
          <ul v-else>
            <li v-for="user in users" :key="user.id">{{ user.name }}</li>
          </ul>
        </div>
      `
    }

    createApp({
      components: { UserList }
    }).mount('#app')
  </script>
</body>
</html>
```

### 定时器清理示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>定时器清理示例</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">
    <button @click="showTimer = !showTimer">
      {{ showTimer ? '停止' : '开始' }}计时
    </button>
    <timer-component v-if="showTimer" />
  </div>

  <script>
    const { createApp, ref, onMounted, onUnmounted } = Vue

    const TimerComponent = {
      setup() {
        const seconds = ref(0)
        let timer = null
        
        onMounted(() => {
          console.log('计时器组件挂载')
          timer = setInterval(() => {
            seconds.value++
          }, 1000)
        })
        
        onUnmounted(() => {
          console.log('计时器组件卸载，清理定时器')
          clearInterval(timer)
        })
        
        return { seconds }
      },
      template: `<p>已计时：{{ seconds }} 秒</p>`
    }

    createApp({
      components: { TimerComponent },
      setup() {
        const showTimer = ref(false)
        return { showTimer }
      }
    }).mount('#app')
  </script>
</body>
</html>
```

### 事件监听清理示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>事件监听示例</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>
    .box { width: 200px; height: 200px; background: #42b983; margin: 20px; }
  </style>
</head>
<body>
  <div id="app">
    <button @click="showBox = !showBox">
      {{ showBox ? '隐藏' : '显示' }}盒子
    </button>
    <mouse-tracker v-if="showBox" />
  </div>

  <script>
    const { createApp, ref, onMounted, onUnmounted } = Vue

    const MouseTracker = {
      setup() {
        const x = ref(0)
        const y = ref(0)
        
        const updatePosition = (event) => {
          x.value = event.clientX
          y.value = event.clientY
        }
        
        onMounted(() => {
          window.addEventListener('mousemove', updatePosition)
          console.log('开始监听鼠标移动')
        })
        
        onUnmounted(() => {
          window.removeEventListener('mousemove', updatePosition)
          console.log('停止监听鼠标移动')
        })
        
        return { x, y }
      },
      template: `
        <div class="box">
          <p>鼠标位置：</p>
          <p>X: {{ x }}</p>
          <p>Y: {{ y }}</p>
        </div>
      `
    }

    createApp({
      components: { MouseTracker },
      setup() {
        const showBox = ref(false)
        return { showBox }
      }
    }).mount('#app')
  </script>
</body>
</html>
```

## 常见错误

### 错误 1：在 setup 中访问 DOM

```javascript
// 错误 - setup 执行时 DOM 还未创建
setup() {
  const div = document.getElementById('myDiv')  // null
  
  // 正确 - 在 onMounted 中访问
  onMounted(() => {
    const div = document.getElementById('myDiv')  // 可以获取到
  })
}
```

### 错误 2：忘记清理副作用

```javascript
// 错误 - 会导致内存泄漏
setup() {
  setInterval(() => {
    console.log('执行中...')
  }, 1000)
}

// 正确 - 清理定时器
setup() {
  let timer = setInterval(() => {
    console.log('执行中...')
  }, 1000)
  
  onUnmounted(() => {
    clearInterval(timer)
  })
}
```

### 错误 3：在 onUpdated 中修改状态

```javascript
// 错误 - 会导致无限循环
onUpdated(() => {
  count.value++  // 这会触发更新，再次调用 onUpdated
})

// 正确 - 使用条件判断
onUpdated(() => {
  if (someCondition) {
    count.value++
  }
})
```

## 练习题

### 练习 1：基础练习
创建一个倒计时组件：
- 使用 `ref` 创建一个倒计时变量（初始值 60）
- 使用 `onMounted` 启动倒计时
- 使用 `onUnmounted` 清理定时器
- 显示倒计时，时间到后显示"时间到！"

### 练习 2：进阶练习
创建一个实时时钟组件：
- 在 `onMounted` 中启动一个每秒更新一次的时钟
- 显示当前时间（时:分:秒）
- 提供开始/暂停按钮控制时钟
- 确保组件卸载时清理定时器
- 添加一个日期显示（年-月-日）

### 练习 3：综合练习
创建一个无限滚动列表组件：
- 使用 `ref` 存储数据列表
- 在 `onMounted` 中加载初始数据（模拟 API）
- 监听窗口滚动事件，当滚动到底部时加载更多数据
- 显示加载状态和是否还有更多数据
- 实现防抖：滚动停止 300ms 后才触发加载
- 确保所有事件监听器和定时器在组件卸载时清理

---

完成练习后，可以查看 `practice-solution.html` 中的参考答案。
