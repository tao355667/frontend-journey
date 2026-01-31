// 第七章：ES6+ 新特性 - 练习题答案

// 基础练习

// 1. 数组解构：提取第一个和最后一个元素
function getFirstAndLast(arr) {
    const [first, ...rest] = arr;
    const last = rest.pop();
    return { first, last };
}

console.log("getFirstAndLast([1, 2, 3, 4, 5]):", getFirstAndLast([1, 2, 3, 4, 5]));

// 2. 对象解构：提取 name 和 age 属性
function getUserInfo(user) {
    const { name, age } = user;
    return { name, age };
}

console.log("getUserInfo({ name: 'John', age: 30, city: 'Beijing' }):", 
    getUserInfo({ name: "John", age: 30, city: "Beijing" }));

// 3. 数组展开：合并两个数组
function mergeArrays(arr1, arr2) {
    return [...arr1, ...arr2];
}

console.log("mergeArrays([1, 2, 3], [4, 5, 6]):", mergeArrays([1, 2, 3], [4, 5, 6]));

// 进阶练习

// 1. 对象合并：使用展开运算符合并多个对象
function mergeObjects(...objs) {
    return { ...objs };
}

console.log("mergeObjects({ a: 1 }, { b: 2 }, { c: 3 }):", mergeObjects({ a: 1 }, { b: 2 }, { c: 3 }));

// 更好的实现
function mergeObjectsDeep(...objs) {
    return Object.assign({}, ...objs);
}

console.log("mergeObjectsDeep({ a: 1 }, { b: 2 }, { c: 3 }):", mergeObjectsDeep({ a: 1 }, { b: 2 }, { c: 3 }));

// 2. 函数参数解构：创建一个函数，接受配置对象并设置默认值
function createServer(config = {}) {
    const {
        host = "localhost",
        port = 3000,
        ssl = false,
        timeout = 5000,
        retries = 3
    } = config;
    
    return { host, port, ssl, timeout, retries };
}

console.log("createServer({ port: 8080, ssl: true }):", createServer({ port: 8080, ssl: true }));
console.log("createServer():", createServer());

// 3. 模块导出：创建一个工具模块，导出多个函数
// 假设这是 utils.js 模块
const utils = {
    formatDate(date) {
        return new Date(date).toLocaleDateString("zh-CN");
    },
    
    formatCurrency(amount) {
        return `¥${amount.toFixed(2)}`;
    },
    
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
};

console.log("utils.formatDate(new Date()):", utils.formatDate(new Date()));
console.log("utils.formatCurrency(1234.56):", utils.formatCurrency(1234.56));
console.log("utils.generateId():", utils.generateId());

// 挑战练习

// 1. 深度解构：从嵌套对象中提取特定值
function extractNestedValue(obj, path) {
    const keys = path.split(".");
    let value = obj;
    
    for (const key of keys) {
        value = value?.[key];
        if (value === undefined) {
            return undefined;
        }
    }
    
    return value;
}

const data = {
    user: {
        profile: {
            name: "John",
            address: {
                city: "Beijing",
                country: "China"
            }
        }
    }
};

console.log("extractNestedValue(data, 'user.profile.name'):", extractNestedValue(data, "user.profile.name"));
console.log("extractNestedValue(data, 'user.profile.address.city'):", extractNestedValue(data, "user.profile.address.city"));
console.log("extractNestedValue(data, 'user.profile.email'):", extractNestedValue(data, "user.profile.email"));

// 2. 条件合并：根据条件合并对象
function conditionalMerge(base, ...conditions) {
    return conditions.reduce((result, condition) => {
        const [predicate, object] = condition;
        if (predicate) {
            return { ...result, ...object };
        }
        return result;
    }, { ...base });
}

const isActive = true;
const isAdmin = false;
const isPremium = true;

const result = conditionalMerge(
    { name: "John" },
    [isActive, { status: "active" }],
    [isAdmin, { role: "admin" }],
    [isPremium, { subscription: "premium" }]
);

console.log("conditionalMerge:", result);

// 3. 动态导入：实现按需加载模块（模拟）
const modules = {
    math: {
        add: (a, b) => a + b,
        multiply: (a, b) => a * b
    },
    utils: {
        formatDate: (date) => new Date(date).toLocaleDateString()
    },
    logger: {
        log: (msg) => console.log(msg)
    }
};

async function dynamicImport(moduleName) {
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    return modules[moduleName];
}

// 使用示例
async function useDynamicImport() {
    console.log("开始动态导入...");
    const mathModule = await dynamicImport("math");
    console.log("5 + 3 =", mathModule.add(5, 3));
    console.log("5 * 3 =", mathModule.multiply(5, 3));
}

useDynamicImport();

// 额外练习

// 数组解构：提取中间元素
function getMiddleElements(arr) {
    const [, ...middle] = arr;
    middle.pop();
    return middle;
}

console.log("getMiddleElements([1, 2, 3, 4, 5]):", getMiddleElements([1, 2, 3, 4, 5]));

// 对象解构：重命名和默认值结合
function processUser({ name, age = 0, city: location = "Unknown" }) {
    return {
        userName: name,
        userAge: age,
        userCity: location
    };
}

console.log("processUser({ name: 'John', city: 'Beijing' }):", processUser({ name: "John", city: "Beijing" }));

// 展开运算符：数组分块
function chunkArray(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

console.log("chunkArray([1, 2, 3, 4, 5, 6], 2):", chunkArray([1, 2, 3, 4, 5, 6], 2));

// 展开运算符：对象属性过滤
function filterObject(obj, keysToKeep) {
    const result = {};
    keysToKeep.forEach(key => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });
    return result;
}

const user = { name: "John", age: 30, email: "john@example.com", password: "secret" };
console.log("filterObject(user, ['name', 'age', 'email']):", filterObject(user, ["name", "age", "email"]));

// 解构和展开结合：对象属性重命名
function renameKeys(obj, keyMap) {
    const result = {};
    for (const [oldKey, newKey] of Object.entries(keyMap)) {
        if (oldKey in obj) {
            result[newKey] = obj[oldKey];
        }
    }
    return { ...obj, ...result };
}

const keyMap = { name: "fullName", age: "years" };
console.log("renameKeys({ name: 'John', age: 30 }, keyMap):", renameKeys({ name: "John", age: 30 }, keyMap));

// 展开运算符：数组去重并保持顺序
function uniqueArray(arr) {
    return [...new Set(arr)];
}

console.log("uniqueArray([1, 2, 2, 3, 3, 4]):", uniqueArray([1, 2, 2, 3, 3, 4]));

// 解构：函数返回值解构
function getUserAndPosts(userId) {
    return {
        user: { id: userId, name: `User ${userId}` },
        posts: [
            { id: 1, title: "Post 1" },
            { id: 2, title: "Post 2" }
        ],
        comments: 5
    };
}

const { user, posts, comments: commentCount } = getUserAndPosts(1);
console.log("解构函数返回值:", { user, posts, commentCount });

// 展开运算符：条件属性
function conditionalProperties(obj, conditions) {
    return Object.entries(conditions).reduce((result, [key, predicate]) => {
        if (predicate) {
            return { ...result, [key]: obj[key] };
        }
        return result;
    }, {});
}

const user2 = { name: "John", email: "john@example.com", phone: "1234567890", isActive: true };
const conditions2 = {
    showEmail: true,
    showPhone: false,
    showStatus: true
};

console.log("conditionalProperties:", conditionalProperties(user2, conditions2));

// 解构：剩余参数和展开结合
function processConfig(config, overrides = {}) {
    const { timeout = 5000, retries = 3, ...rest } = { ...config, ...overrides };
    return { timeout, retries, ...rest };
}

const config = { timeout: 3000, retries: 5, debug: true, logLevel: "info" };
const overrides = { retries: 2, logLevel: "warn" };
console.log("processConfig:", processConfig(config, overrides));

// 展开运算符：数组交集
function arrayIntersection(arr1, arr2) {
    const set2 = new Set(arr2);
    return [...new Set(arr1)].filter(item => set2.has(item));
}

console.log("arrayIntersection([1, 2, 3, 4], [3, 4, 5, 6]):", arrayIntersection([1, 2, 3, 4], [3, 4, 5, 6]));

// 解构：嵌套数组解构
function extractMatrix(matrix) {
    const [[first, ...firstRow], ...restRows] = matrix;
    return { first, firstRow, restRows };
}

const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log("extractMatrix:", extractMatrix(matrix));
