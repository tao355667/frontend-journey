class TodoApp {
    constructor() {
        // 从 localStorage 加载待办事项
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.init();
    }
    
    // 初始化应用
    init() {
        this.bindEvents();
        this.render();
    }
    
    // 绑定事件
    bindEvents() {
        // 添加待办事项
        document.getElementById('addBtn').addEventListener('click', () => this.addTodo());
        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        
        // 过滤按钮
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });
    }
    
    // 添加待办事项
    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();
        
        if (text) {
            const todo = {
                id: Date.now(),
                text: text,
                completed: false,
                createdAt: new Date().toISOString()
            };
            
            this.todos.unshift(todo);
            this.saveTodos();
            this.render();
            input.value = '';
        }
    }
    
    // 切换完成状态
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }
    
    // 删除待办事项
    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.render();
    }
    
    // 编辑待办事项
    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            const todoItem = document.querySelector(`[data-id="${id}"]`);
            const textElement = todoItem.querySelector('.todo-text');
            const actionsElement = todoItem.querySelector('.todo-actions');
            
            // 创建编辑输入框
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.className = 'edit-input';
            editInput.value = todo.text;
            
            // 创建保存和取消按钮
            const saveBtn = document.createElement('button');
            saveBtn.className = 'save-btn';
            saveBtn.textContent = '保存';
            
            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'cancel-btn';
            cancelBtn.textContent = '取消';
            
            // 替换元素
            textElement.replaceWith(editInput);
            actionsElement.innerHTML = '';
            actionsElement.appendChild(saveBtn);
            actionsElement.appendChild(cancelBtn);
            
            editInput.focus();
            editInput.select();
            
            // 保存功能
            const save = () => {
                const newText = editInput.value.trim();
                if (newText) {
                    todo.text = newText;
                    this.saveTodos();
                    this.render();
                }
            };
            
            // 取消功能
            const cancel = () => {
                this.render();
            };
            
            saveBtn.addEventListener('click', save);
            cancelBtn.addEventListener('click', cancel);
            editInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') save();
                if (e.key === 'Escape') cancel();
            });
        }
    }
    
    // 设置过滤器
    setFilter(filter) {
        this.currentFilter = filter;
        
        // 更新激活的按钮
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.render();
    }
    
    // 获取过滤后的待办事项
    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }
    
    // 渲染列表
    render() {
        const todoList = document.getElementById('todoList');
        const filteredTodos = this.getFilteredTodos();
        
        // 清空列表
        todoList.innerHTML = '';
        
        // 渲染待办事项
        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.dataset.id = todo.id;
            
            li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <div class="todo-actions">
                    <button class="edit-btn">编辑</button>
                    <button class="delete-btn">删除</button>
                </div>
            `;
            
            // 添加事件监听器
            const checkbox = li.querySelector('.todo-checkbox');
            checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
            
            const editBtn = li.querySelector('.edit-btn');
            editBtn.addEventListener('click', () => this.editTodo(todo.id));
            
            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));
            
            todoList.appendChild(li);
        });
        
        // 更新统计信息
        this.updateStats();
    }
    
    // 更新统计信息
    updateStats() {
        const activeCount = this.todos.filter(t => !t.completed).length;
        document.getElementById('activeCount').textContent = activeCount;
    }
    
    // 保存待办事项到 localStorage
    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    
    // 从 localStorage 加载待办事项
    loadTodos() {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    }
    
    // 转义 HTML（防止 XSS 攻击）
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// DOM 加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
