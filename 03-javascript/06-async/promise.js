// JavaScript Promise 示例

// 创建一个简单的 Promise
const myPromise = new Promise((resolve, reject) => {
    const success = true;
    
    setTimeout(() => {
        if (success) {
            resolve("操作成功！");
        } else {
            reject("操作失败！");
        }
    }, 2000);
});

// 使用 Promise
myPromise
    .then(result => {
        console.log("成功:", result);
    })
    .catch(error => {
        console.log("失败:", error);
    })
    .finally(() => {
        console.log("操作完成");
    });

// 模拟 API 调用的 Promise
function fetchData(userId) {
    return new Promise((resolve, reject) => {
        console.log(`正在获取用户 ${userId} 的数据...`);
        
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: `用户 ${userId}`,
                    email: `user${userId}@example.com`
                });
            } else {
                reject("无效的用户 ID");
            }
        }, 1500);
    });
}

// 使用 Promise
fetchData(1)
    .then(user => {
        console.log("用户数据:", user);
        return fetchData(2);
    })
    .then(user2 => {
        console.log("第二个用户数据:", user2);
    })
    .catch(error => {
        console.log("错误:", error);
    });

// Promise 静态方法

// Promise.all：等待所有 Promise 都成功
const promise1 = Promise.resolve(3);
const promise2 = new Promise(resolve => setTimeout(() => resolve('foo'), 1000));
const promise3 = Promise.resolve(42);

Promise.all([promise1, promise2, promise3])
    .then(values => {
        console.log("Promise.all 结果:", values);
    })
    .catch(error => {
        console.log("Promise.all 错误:", error);
    });

// Promise.race：第一个 Promise 完成（成功或失败）就返回
const promise4 = new Promise(resolve => setTimeout(() => resolve('first'), 500));
const promise5 = new Promise(resolve => setTimeout(() => resolve('second'), 1000));

Promise.race([promise4, promise5])
    .then(value => {
        console.log("Promise.race 胜出:", value);
    });

// Promise.allSettled：等待所有 Promise 完成（无论成功或失败）
const promise6 = Promise.resolve(33);
const promise7 = new Promise(resolve => setTimeout(() => resolve(66), 100));
const promise8 = new Promise((resolve, reject) => setTimeout(() => reject(new Error('失败')), 50));

Promise.allSettled([promise6, promise7, promise8])
    .then(results => {
        console.log("Promise.allSettled 结果:");
        results.forEach((result, i) => {
            console.log(`Promise ${i + 1}:`, result.status, result.value || result.reason);
        });
    });

// 使用 Promise 创建工具函数
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 使用 delay 函数
delay(1000)
    .then(() => console.log("1 秒后的延迟消息"))
    .then(() => delay(500))
    .then(() => console.log("0.5 秒后的另一条消息"));

// Promise 重试函数
function retry(fn, maxAttempts = 3) {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        
        function attempt() {
            attempts++;
            
            fn()
                .then(resolve)
                .catch(error => {
                    if (attempts >= maxAttempts) {
                        reject(error);
                    } else {
                        console.log(`第 ${attempts} 次尝试失败，正在重试...`);
                        setTimeout(attempt, 1000);
                    }
                });
        }
        
        attempt();
    });
}

// 重试示例
function randomSuccess() {
    return new Promise((resolve, reject) => {
        const success = Math.random() > 0.7;
        if (success) {
            resolve("成功！");
        } else {
            reject("失败！");
        }
    });
}

retry(randomSuccess)
    .then(result => console.log("重试成功:", result))
    .catch(error => console.log("所有尝试都失败:", error));
