// ES6+ 模块系统示例

// 命名导出
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

export function divide(a, b) {
    if (b === 0) {
        throw new Error('除数不能为零');
    }
    return a / b;
}

export const user = {
    name: 'John',
    age: 30
};

// 默认导出
export default function calculator(operation, a, b) {
    switch (operation) {
        case 'add':
            return add(a, b);
        case 'multiply':
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
        default:
            throw new Error('未知的操作');
    }
}

// 导出类
export class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `你好，我是 ${this.name}`;
    }
    
    introduce() {
        return `我叫 ${this.name}，今年 ${this.age} 岁`;
    }
}

// 导出常量
export const MAX_RETRY = 3;
export const TIMEOUT = 5000;
export const API_URL = 'https://api.example.com';

// 导出工具函数
export function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

export function formatCurrency(amount) {
    return `¥${amount.toFixed(2)}`;
}

// 重新导出（re-export）
export { add as sum, multiply as product };

// 导出对象
export const config = {
    timeout: 5000,
    retries: 3,
    debug: true
};

// 异步函数导出
export async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP 错误! 状态码: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log('获取数据错误:', error);
        throw error;
    }
}

// 高阶函数导出
export function createLogger(prefix) {
    return function(message) {
        console.log(`[${prefix}] ${message}`);
    };
}

// 验证函数导出
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePhone(phone) {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
}

// 工具类导出
export class MathUtils {
    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
    
    static random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    static degToRad(degrees) {
        return degrees * (Math.PI / 180);
    }
}

// 日期工具导出
export const DateUtils = {
    now() {
        return new Date();
    },
    
    format(date, format = 'YYYY-MM-DD') {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day);
    },
    
    addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
};

// 字符串工具导出
export const StringUtils = {
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    
    truncate(str, length) {
        return str.length > length ? str.slice(0, length) + '...' : str;
    },
    
    reverse(str) {
        return str.split('').reverse().join('');
    }
};
