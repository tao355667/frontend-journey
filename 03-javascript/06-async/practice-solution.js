// 第六章：异步编程 - 练习题答案

// 基础练习

// 1. 延迟执行
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function testDelay() {
    console.log("开始");
    await delay(2000);
    console.log("2 秒后");
}
testDelay();

// 2. 获取用户数据
async function fetchUser(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP 错误! 状态码: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log("获取用户错误:", error);
        return null;
    }
}

fetchUser(1).then(user => console.log("用户:", user));

// 3. 链式调用
async function chainedOperations() {
    const user = await fetchUser(1);
    console.log("步骤 1: 获取用户", user?.name);
    
    const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=1`);
    const posts = await postsResponse.json();
    console.log("步骤 2: 获取帖子", posts.length, "篇");
    
    const firstPost = posts[0];
    console.log("步骤 3: 第一篇帖子", firstPost?.title);
    
    return { user, posts };
}

chainedOperations();

// 进阶练习

// 1. 并行请求
async function fetchAllUsers(userIds) {
    const promises = userIds.map(id => fetchUser(id));
    const users = await Promise.all(promises);
    return users.filter(user => user !== null);
}

async function testParallel() {
    const users = await fetchAllUsers([1, 2, 3, 4, 5]);
    console.log("并行获取的用户:", users);
}
testParallel();

// 2. 重试机制
async function fetchWithRetry(url, options = {}, maxRetries = 3, delayMs = 1000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP 错误! 状态码: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.log(`第 ${i + 1} 次尝试失败:`, error.message);
            if (i === maxRetries - 1) {
                throw error;
            }
            await delay(delayMs);
        }
    }
}

async function testRetry() {
    try {
        const data = await fetchWithRetry('https://jsonplaceholder.typicode.com/users/1');
        console.log("重试成功:", data);
    } catch (error) {
        console.log("所有尝试失败:", error);
    }
}
testRetry();

// 3. 请求缓存
class FetchCache {
    constructor() {
        this.cache = new Map();
    }
    
    async fetch(url, options = {}) {
        const cacheKey = url + JSON.stringify(options);
        
        if (this.cache.has(cacheKey)) {
            console.log("从缓存获取:", url);
            return this.cache.get(cacheKey);
        }
        
        const response = await fetch(url, options);
        const data = await response.json();
        
        this.cache.set(cacheKey, data);
        console.log("获取并缓存:", url);
        
        return data;
    }
    
    clear() {
        this.cache.clear();
    }
}

const fetchCache = new FetchCache();

async function testCache() {
    await fetchCache.fetch('https://jsonplaceholder.typicode.com/users/1');
    await fetchCache.fetch('https://jsonplaceholder.typicode.com/users/1');
    fetchCache.clear();
    await fetchCache.fetch('https://jsonplaceholder.typicode.com/users/1');
}
testCache();

// 挑战练习

// 1. 进度追踪（模拟）
async function uploadWithProgress(file) {
    return new Promise((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            console.log(`上传进度: ${progress}%`);
            
            if (progress >= 100) {
                clearInterval(interval);
                resolve({ status: "success", progress: 100 });
            }
        }, 200);
    });
}

async function testUploadProgress() {
    console.log("开始上传...");
    const result = await uploadWithProgress("example.txt");
    console.log("上传完成:", result);
}
testUploadProgress();

// 2. 并发控制
async function fetchWithConcurrency(items, fn, concurrency = 2) {
    const results = [];
    const executing = [];
    
    for (const item of items) {
        const promise = fn(item).then(result => {
            executing.splice(executing.indexOf(promise), 1);
            return result;
        });
        
        executing.push(promise);
        results.push(promise);
        
        if (executing.length >= concurrency) {
            await Promise.race(executing);
        }
    }
    
    return Promise.all(results);
}

async function testConcurrency() {
    const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    console.time("并发控制");
    const results = await fetchWithConcurrency(userIds, id => fetchUser(id), 3);
    console.timeEnd("并发控制");
    console.log("获取的用户:", results);
}
testConcurrency();

// 3. 取消请求（使用 AbortController）
function fetchWithAbort(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    return fetch(url, { ...options, signal: controller.signal })
        .then(response => {
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error(`HTTP 错误! 状态码: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error('请求已取消');
            }
            throw error;
        });
}

async function testAbort() {
    try {
        console.log("发送请求（3秒超时）...");
        const data = await fetchWithAbort('https://jsonplaceholder.typicode.com/users/1', {}, 3000);
        console.log("请求成功:", data);
    } catch (error) {
        console.log("请求失败:", error.message);
    }
}
testAbort();

// 额外练习

// Promise 队列
class PromiseQueue {
    constructor(concurrency = 2) {
        this.concurrency = concurrency;
        this.queue = [];
        this.running = 0;
    }
    
    add(fn) {
        return new Promise((resolve, reject) => {
            this.queue.push({ fn, resolve, reject });
            this.run();
        });
    }
    
    async run() {
        if (this.running >= this.concurrency || this.queue.length === 0) {
            return;
        }
        
        this.running++;
        const { fn, resolve, reject } = this.queue.shift();
        
        try {
            const result = await fn();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.running--;
            this.run();
        }
    }
}

const queue = new PromiseQueue(2);

async function testQueue() {
    console.time("队列执行");
    const tasks = [1, 2, 3, 4, 5].map(id => 
        queue.add(() => {
            console.log(`开始任务 ${id}`);
            return delay(1000).then(() => {
                console.log(`完成任务 ${id}`);
                return id;
            });
        })
    );
    
    const results = await Promise.all(tasks);
    console.timeEnd("队列执行");
    console.log("队列结果:", results);
}
testQueue();

// 超时重试
async function fetchWithTimeoutAndRetry(url, options = {}, timeout = 5000, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);
            
            const response = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP 错误! 状态码: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.log(`第 ${i + 1} 次尝试失败:`, error.message);
            if (i === maxRetries - 1) {
                throw error;
            }
            await delay(1000);
        }
    }
}

async function testTimeoutAndRetry() {
    try {
        console.log("带超时和重试的请求...");
        const data = await fetchWithTimeoutAndRetry('https://jsonplaceholder.typicode.com/users/1', {}, 3000, 2);
        console.log("请求成功:", data);
    } catch (error) {
        console.log("请求失败:", error);
    }
}
testTimeoutAndRetry();

// 批量处理
async function batchProcess(items, fn, batchSize = 3) {
    const results = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const batchResults = await Promise.all(batch.map(fn));
        results.push(...batchResults);
    }
    
    return results;
}

async function testBatch() {
    console.time("批量处理");
    const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const results = await batchProcess(userIds, id => fetchUser(id), 3);
    console.timeEnd("批量处理");
    console.log("批量处理结果:", results);
}
testBatch();
