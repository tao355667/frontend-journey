// 第三章：函数 - 练习题答案

// 基础练习

// 1. 求和函数
function sum(a, b) {
    return a + b;
}
console.log("sum(5, 3):", sum(5, 3));

// 2. 判断奇偶
function isEven(num) {
    return num % 2 === 0;
}
console.log("isEven(4):", isEven(4));
console.log("isEven(7):", isEven(7));

// 3. 求平方（箭头函数）
const square = num => num * num;
console.log("square(5):", square(5));

// 进阶练习

// 1. 数组求和
function sumArray(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
}
console.log("sumArray([1, 2, 3, 4, 5]):", sumArray([1, 2, 3, 4, 5]));

// 2. 阶乘计算（递归）
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
console.log("factorial(5):", factorial(5));

// 3. 数组过滤
function filterArray(arr, predicate) {
    return arr.filter(predicate);
}
console.log("filterArray([1, 2, 3, 4, 5], n => n % 2 === 0):", filterArray([1, 2, 3, 4, 5], n => n % 2 === 0));

// 挑战练习

// 1. 记忆化函数
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log("从缓存获取");
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

const memoizedSum = memoize((a, b) => {
    console.log("计算中...");
    return a + b;
});

console.log("memoizedSum(5, 3):", memoizedSum(5, 3));
console.log("memoizedSum(5, 3):", memoizedSum(5, 3));

const memoizedFactorial = memoize(factorial);
console.log("memoizedFactorial(5):", memoizedFactorial(5));
console.log("memoizedFactorial(5):", memoizedFactorial(5));

// 2. 防抖函数
function debounce(fn, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

const debouncedSearch = debounce((query) => {
    console.log("搜索:", query);
}, 500);

console.log("开始输入...");
debouncedSearch("a");
debouncedSearch("ap");
debouncedSearch("app");
debouncedSearch("appl");
debouncedSearch("apple");
console.log("500ms 后执行搜索");

// 3. 计数器模块
function createCounterModule() {
    let count = 0;
    
    return {
        increment() {
            count++;
            return count;
        },
        decrement() {
            count--;
            return count;
        },
        reset() {
            count = 0;
            return count;
        },
        getCount() {
            return count;
        }
    };
}

const counterModule = createCounterModule();
console.log("counterModule.increment():", counterModule.increment());
console.log("counterModule.increment():", counterModule.increment());
console.log("counterModule.increment():", counterModule.increment());
console.log("counterModule.decrement():", counterModule.decrement());
console.log("counterModule.getCount():", counterModule.getCount());
console.log("counterModule.reset():", counterModule.reset());
console.log("counterModule.getCount():", counterModule.getCount());

// 额外练习

// 柯里化函数
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...moreArgs) {
            return curried.apply(this, args.concat(moreArgs));
        };
    };
}

const curriedSum = curry((a, b, c) => a + b + c);
console.log("curriedSum(1)(2)(3):", curriedSum(1)(2)(3));
console.log("curriedSum(1, 2)(3):", curriedSum(1, 2)(3));

// 组合函数
function compose(...fns) {
    return function(x) {
        return fns.reduceRight((acc, fn) => fn(acc), x);
    };
}

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const composed = compose(square, double, addOne);
console.log("composed(3):", composed(3));
// 执行顺序：addOne(3) -> double(4) -> square(8) -> 64
