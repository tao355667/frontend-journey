// JavaScript Async/Await 示例

// 基本的 async 函数
async function fetchData() {
    return "数据获取成功";
}

fetchData().then(data => console.log(data));

// 带有 await 的 async 函数
function simulateApiCall(delay, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error("API 调用失败"));
            } else {
                resolve(`${delay}ms 后的数据`);
            }
        }, delay);
    });
}

// 使用 async/await
async function getData() {
    try {
        console.log("开始获取数据...");
        const result = await simulateApiCall(2000);
        console.log("接收到:", result);
        return result;
    } catch (error) {
        console.log("错误:", error.message);
        throw error;
    }
}

getData();

// 多个异步操作
async function fetchMultipleData() {
    try {
        console.log("正在获取多个数据源...");
        
        const data1 = simulateApiCall(1000);
        const data2 = simulateApiCall(1500);
        const data3 = simulateApiCall(800);
        
        const results = await Promise.all([data1, data2, data3]);
        
        console.log("接收到所有数据:", results);
        return results;
    } catch (error) {
        console.log("多个数据获取错误:", error.message);
    }
}

fetchMultipleData();

// 串行 vs 并行执行
async function sequentialExecution() {
    console.log("串行执行开始...");
    
    const start = Date.now();
    
    const result1 = await simulateApiCall(1000);
    const result2 = await simulateApiCall(1000);
    const result3 = await simulateApiCall(1000);
    
    const end = Date.now();
    console.log(`串行执行完成，耗时 ${end - start}ms`);
    console.log("结果:", [result1, result2, result3]);
}

async function parallelExecution() {
    console.log("并行执行开始...");
    
    const start = Date.now();
    
    const [result1, result2, result3] = await Promise.all([
        simulateApiCall(1000),
        simulateApiCall(1000),
        simulateApiCall(1000)
    ]);
    
    const end = Date.now();
    console.log(`并行执行完成，耗时 ${end - start}ms`);
    console.log("结果:", [result1, result2, result3]);
}

sequentialExecution();
setTimeout(() => parallelExecution(), 4000);

// async/await 错误处理
async function errorHandlingExample() {
    try {
        await simulateApiCall(1000, true);
    } catch (error) {
        console.log("捕获到错误:", error.message);
    }
    
    console.log("错误后继续执行...");
}

errorHandlingExample();

// 不同返回类型的 async 函数
async function getUserData(userId) {
    if (userId <= 0) {
        throw new Error("无效的用户 ID");
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
        id: userId,
        name: `用户 ${userId}`,
        email: `user${userId}@example.com`,
        createdAt: new Date().toISOString()
    };
}

// 使用 async 函数
async function displayUser(userId) {
    try {
        const user = await getUserData(userId);
        console.log("找到用户:", user);
        
        const greeting = `你好，${await Promise.resolve(user.name)}！`;
        console.log(greeting);
        
        return user;
    } catch (error) {
        console.log("获取用户错误:", error.message);
        return null;
    }
}

displayUser(1);
displayUser(-1);

// async 箭头函数
const asyncArrow = async () => {
    return "异步箭头函数结果";
};

asyncArrow().then(console.log);

// 在循环中使用 async/await
async function processUsers(userIds) {
    const results = [];
    
    for (const id of userIds) {
        const user = await getUserData(id);
        results.push(user);
    }
    
    console.log("串行处理结果:", results);
    
    const parallelResults = await Promise.all(
        userIds.map(id => getUserData(id))
    );
    
    console.log("并行处理结果:", parallelResults);
    
    return parallelResults;
}

processUsers([1, 2, 3]);

// 工具函数：async/await 超时
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function withTimeout(promise, ms) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("操作超时")), ms);
    });
    
    return Promise.race([promise, timeoutPromise]);
}

// 使用示例
async function testTimeout() {
    try {
        const result = await withTimeout(simulateApiCall(3000), 2000);
        console.log("结果:", result);
    } catch (error) {
        console.log("超时错误:", error.message);
    }
}

testTimeout();

// async 函数返回 Promise
async function returnsPromise() {
    return "返回的值";
}

const returnedPromise = returnsPromise();
console.log("async 函数返回 Promise:", returnedPromise instanceof Promise);
