// 第四章：数组和对象 - 练习题答案

// 基础练习

// 1. 数组求和
function sumArray(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
}
console.log("sumArray([1, 2, 3, 4, 5]):", sumArray([1, 2, 3, 4, 5]));

// 2. 查找最大值
function findMax(arr) {
    return Math.max(...arr);
}
console.log("findMax([1, 2, 3, 4, 5]):", findMax([1, 2, 3, 4, 5]));

// 另一种实现方式
function findMax2(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}
console.log("findMax2([1, 2, 3, 4, 5]):", findMax2([1, 2, 3, 4, 5]));

// 3. 对象属性值
function getObjectValues(obj) {
    return Object.values(obj);
}
console.log("getObjectValues({ name: 'John', age: 30 }):", getObjectValues({ name: "John", age: 30 }));

// 进阶练习

// 1. 数组去重
function uniqueArray(arr) {
    return [...new Set(arr)];
}
console.log("uniqueArray([1, 2, 2, 3, 3, 4]):", uniqueArray([1, 2, 2, 3, 3, 4]));

// 另一种实现方式
function uniqueArray2(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}
console.log("uniqueArray2([1, 2, 2, 3, 3, 4]):", uniqueArray2([1, 2, 2, 3, 3, 4]));

// 2. 对象合并
function mergeObjects(obj1, obj2) {
    return { ...obj1, ...obj2 };
}
console.log("mergeObjects({ a: 1 }, { b: 2, a: 3 }):", mergeObjects({ a: 1 }, { b: 2, a: 3 }));

// 3. 对象数组排序
function sortByProperty(arr, prop, order = "asc") {
    return [...arr].sort((a, b) => {
        if (order === "asc") {
            return a[prop] > b[prop] ? 1 : -1;
        } else {
            return a[prop] < b[prop] ? 1 : -1;
        }
    });
}
console.log("sortByProperty([{ name: 'Bob', age: 30 }, { name: 'Alice', age: 25 }], 'age'):", 
    sortByProperty([{ name: "Bob", age: 30 }, { name: "Alice", age: 25 }], "age"));
console.log("sortByProperty([{ name: 'Bob', age: 30 }, { name: 'Alice', age: 25 }], 'name', 'desc'):", 
    sortByProperty([{ name: "Bob", age: 30 }, { name: "Alice", age: 25 }], "name", "desc"));

// 挑战练习

// 1. 深度克隆对象
function deepClone(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }
    
    const cloned = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    return cloned;
}

const original = {
    name: "John",
    age: 30,
    hobbies: ["reading", "coding"],
    address: {
        city: "Beijing",
        country: "China"
    }
};

const cloned = deepClone(original);
cloned.name = "Jane";
cloned.hobbies.push("gaming");
cloned.address.city = "Shanghai";

console.log("Original:", original);
console.log("Cloned and modified:", cloned);

// 2. 数组分组
function groupBy(arr, keyOrFn) {
    return arr.reduce((groups, item) => {
        const key = typeof keyOrFn === "function" ? keyOrFn(item) : item[keyOrFn];
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(item);
        return groups;
    }, {});
}

const users = [
    { name: "Alice", age: 25, department: "IT" },
    { name: "Bob", age: 30, department: "HR" },
    { name: "Charlie", age: 28, department: "IT" },
    { name: "Diana", age: 32, department: "HR" }
];

console.log("groupBy department:", groupBy(users, "department"));
console.log("groupBy age group:", groupBy(users, user => {
    if (user.age < 30) return "young";
    return "senior";
}));

// 3. 对象路径访问
function getNestedValue(obj, path) {
    const keys = path.split(".");
    let current = obj;
    
    for (const key of keys) {
        if (current === null || current === undefined) {
            return undefined;
        }
        current = current[key];
    }
    
    return current;
}

const data = {
    user: {
        profile: {
            name: "John",
            age: 30
        },
        settings: {
            theme: "dark"
        }
    }
};

console.log("getNestedValue(data, 'user.profile.name'):", getNestedValue(data, "user.profile.name"));
console.log("getNestedValue(data, 'user.settings.theme'):", getNestedValue(data, "user.settings.theme"));
console.log("getNestedValue(data, 'user.profile.email'):", getNestedValue(data, "user.profile.email"));
console.log("getNestedValue(data, 'user.nonexistent.path'):", getNestedValue(data, "user.nonexistent.path"));

// 使用可选链实现
function getNestedValueSafe(obj, path) {
    const keys = path.split(".");
    let current = obj;
    
    for (const key of keys) {
        current = current?.[key];
    }
    
    return current;
}

console.log("getNestedValueSafe(data, 'user.profile.name'):", getNestedValueSafe(data, "user.profile.name"));
console.log("getNestedValueSafe(data, 'user.nonexistent.path'):", getNestedValueSafe(data, "user.nonexistent.path"));

// 额外练习

// 数组扁平化（任意深度）
function flattenDeep(arr) {
    return arr.reduce((flat, item) => {
        if (Array.isArray(item)) {
            return flat.concat(flattenDeep(item));
        }
        return flat.concat(item);
    }, []);
}

const nested = [1, [2, [3, [4, [5]]]]];
console.log("flattenDeep([1, [2, [3, [4, [5]]]]]):", flattenDeep(nested));

// 对象转查询字符串
function objectToQueryString(obj) {
    return Object.keys(obj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join("&");
}

const params = { name: "John Doe", age: 30, city: "New York" };
console.log("objectToQueryString(params):", objectToQueryString(params));

// 数组交集
function arrayIntersection(arr1, arr2) {
    const set2 = new Set(arr2);
    return arr1.filter(item => set2.has(item));
}

console.log("arrayIntersection([1, 2, 3, 4], [3, 4, 5, 6]):", arrayIntersection([1, 2, 3, 4], [3, 4, 5, 6]));

// 数组差集
function arrayDifference(arr1, arr2) {
    const set2 = new Set(arr2);
    return arr1.filter(item => !set2.has(item));
}

console.log("arrayDifference([1, 2, 3, 4], [3, 4, 5, 6]):", arrayDifference([1, 2, 3, 4], [3, 4, 5, 6]));

// 数组分块
function chunkArray(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

console.log("chunkArray([1, 2, 3, 4, 5], 2):", chunkArray([1, 2, 3, 4, 5], 2));

// 对象键转驼峰命名
function toCamelCase(obj) {
    const newObj = {};
    for (const key in obj) {
        const newKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        newObj[newKey] = obj[key];
    }
    return newObj;
}

const snakeCaseObj = { first_name: "John", last_name: "Doe", user_age: 30 };
console.log("toCamelCase(snakeCaseObj):", toCamelCase(snakeCaseObj));

// 深度比较两个对象
function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;
    
    if (typeof obj1 !== typeof obj2 || typeof obj1 !== "object") {
        return false;
    }
    
    if (Array.isArray(obj1) !== Array.isArray(obj2)) {
        return false;
    }
    
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    
    if (keys1.length !== keys2.length) {
        return false;
    }
    
    for (const key of keys1) {
        if (!deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }
    
    return true;
}

const objA = { a: 1, b: { c: 2 } };
const objB = { a: 1, b: { c: 2 } };
const objC = { a: 1, b: { c: 3 } };
console.log("deepEqual(objA, objB):", deepEqual(objA, objB));
console.log("deepEqual(objA, objC):", deepEqual(objA, objC));
