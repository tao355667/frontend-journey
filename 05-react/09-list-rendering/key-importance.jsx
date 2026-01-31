// key 属性重要性示例

// 1. key 的作用
function KeyImportanceDemo() {
    const [items, setItems] = React.useState([
        { id: 'a', content: '项目 A' },
        { id: 'b', content: '项目 B' },
        { id: 'c', content: '项目 C' }
    ]);
    
    const handleMoveUp = (index) => {
        if (index > 0) {
            const newItems = [...items];
            [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
            setItems(newItems);
        }
    };
    
    const handleMoveDown = (index) => {
        if (index < items.length - 1) {
            const newItems = [...items];
            [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
            setItems(newItems);
        }
    };
    
    return (
        <ul>
            {items.map((item, index) => (
                <li key={item.id}>
                    <span ref={el => el && (el.textContent = item.content)}>{item.content}</span>
                    <button onClick={() => handleMoveUp(index)} disabled={index === 0}>↑</button>
                    <button onClick={() => handleMoveDown(index)} disabled={index === items.length - 1}>↓</button>
                </li>
            ))}
        </ul>
    );
}

// 2. 使用索引作为 key 的问题
function IndexKeyProblem() {
    const [names, setNames] = React.useState([
        { id: 1, name: '张三' },
        { id: 2, name: '李四' },
        { id: 3, name: '王五' }
    ]);
    
    return (
        <ul>
            {names.map((name, index) => (
                <li key={index}>
                    <input defaultValue={name.name} />
                    <span> (id: {name.id})</span>
                </li>
            ))}
        </ul>
    );
}

// 3. 使用唯一 ID 作为 key
function UniqueIdKey() {
    const [items, setItems] = React.useState([
        { id: 'uuid-1', name: '项目 A' },
        { id: 'uuid-2', name: '项目 B' },
        { id: 'uuid-3', name: '项目 C' }
    ]);
    
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );
}

// 4. 动态列表
function DynamicList() {
    const [list, setList] = React.useState([
        { id: 1, text: '初始项目 1' },
        { id: 2, text: '初始项目 2' },
        { id: 3, text: '初始项目 3' }
    ]);
    
    const addItem = () => {
        const newItem = {
            id: Date.now(),
            text: `新项目 ${list.length + 1}`
        };
        setList([...list, newItem]);
    };
    
    const removeFirst = () => {
        setList(list.slice(1));
    };
    
    return (
        <div>
            <button onClick={addItem}>添加项目</button>
            <button onClick={removeFirst}>删除第一个</button>
            <ul>
                {list.map(item => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        </div>
    );
}

// 5. 带复选框的列表
function CheckboxList() {
    const [items, setItems] = React.useState([
        { id: 1, text: '任务一', checked: false },
        { id: 2, text: '任务二', checked: true },
        { id: 3, text: '任务三', checked: false }
    ]);
    
    const toggleCheck = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };
    
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>
                    <label>
                        <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => toggleCheck(item.id)}
                        />
                        <span style={{
                            textDecoration: item.checked ? 'line-through' : 'none'
                        }}>
                            {item.text}
                        </span>
                    </label>
                </li>
            ))}
        </ul>
    );
}

export {
    KeyImportanceDemo,
    IndexKeyProblem,
    UniqueIdKey,
    DynamicList,
    CheckboxList
};
