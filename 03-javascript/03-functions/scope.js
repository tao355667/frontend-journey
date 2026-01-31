// JavaScript 作用域和闭包

// 全局作用域
const globalVar = "I'm global";

function showGlobal() {
    console.log("showGlobal:", globalVar);
}

showGlobal();
console.log("global scope:", globalVar);

// 函数作用域
function outerFunction() {
    const outerVar = "I'm from outer function";
    
    function innerFunction() {
        const innerVar = "I'm from inner function";
        console.log("innerFunction can access outerVar:", outerVar);
        console.log("innerFunction can access innerVar:", innerVar);
    }
    
    innerFunction();
    console.log("outerFunction can access outerVar:", outerVar);
    // console.log(innerVar); // 报错：无法访问 innerVar
}

outerFunction();

// 块级作用域（let 和 const）
{
    const blockVar = "I'm in a block";
    let blockLet = "I'm also in a block";
    console.log("block scope:", blockVar);
}

// console.log(blockVar); // 报错：无法访问 blockVar

// var 没有块级作用域
{
    var blockVarVar = "I'm var in a block";
}
console.log("var outside block:", blockVarVar);

// 作用域链
const x = 10;

function level1() {
    const x = 20;
    
    function level2() {
        const x = 30;
        console.log("level2 x:", x); // 30
    }
    
    level2();
    console.log("level1 x:", x); // 20
}

level1();
console.log("global x:", x); // 10

// 闭包：函数可以访问创建时作用域中的变量
function createCounter() {
    let count = 0;
    
    return function() {
        count++;
        return count;
    };
}

const counter1 = createCounter();
console.log("counter1:", counter1());
console.log("counter1:", counter1());
console.log("counter1:", counter1());

const counter2 = createCounter();
console.log("counter2:", counter2());
console.log("counter2:", counter2());

// 闭包：数据私有化
function createBankAccount(initialBalance) {
    let balance = initialBalance;
    
    return {
        deposit(amount) {
            balance += amount;
            return balance;
        },
        withdraw(amount) {
            if (amount <= balance) {
                balance -= amount;
                return balance;
            }
            console.log("Insufficient funds");
            return balance;
        },
        getBalance() {
            return balance;
        }
    };
}

const account = createBankAccount(100);
console.log("account.deposit(50):", account.deposit(50));
console.log("account.withdraw(30):", account.withdraw(30));
console.log("account.getBalance():", account.getBalance());
// console.log(account.balance); // undefined，无法直接访问

// 闭包：函数工厂
function createPower(exponent) {
    return function(base) {
        return Math.pow(base, exponent);
    };
}

const square = createPower(2);
const cube = createPower(3);

console.log("square(4):", square(4)); // 16
console.log("cube(4):", cube(4)); // 64

// 闭包陷阱：循环中的闭包
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log("var loop:", i); // 输出 3, 3, 3
    }, 100);
}

// 解决方案 1：使用 let
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log("let loop:", i); // 输出 0, 1, 2
    }, 200);
}

// 解决方案 2：使用 IIFE
for (var i = 0; i < 3; i++) {
    (function(j) {
        setTimeout(function() {
            console.log("IIFE loop:", j); // 输出 0, 1, 2
        }, 300);
    })(i);
}

// 解决方案 3：使用 let 和箭头函数
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log("arrow loop:", i); // 输出 0, 1, 2
    }, 400);
}

// 模块模式：使用闭包创建模块
const ShoppingCart = (function() {
    const cart = [];
    
    return {
        addItem(item) {
            cart.push(item);
            console.log(`Added ${item.name} to cart`);
        },
        removeItem(id) {
            const index = cart.findIndex(item => item.id === id);
            if (index > -1) {
                const removed = cart.splice(index, 1)[0];
                console.log(`Removed ${removed.name} from cart`);
            }
        },
        getItems() {
            return [...cart];
        },
        getTotal() {
            return cart.reduce((total, item) => total + item.price, 0);
        }
    };
})();

ShoppingCart.addItem({ id: 1, name: "Book", price: 20 });
ShoppingCart.addItem({ id: 2, name: "Pen", price: 5 });
console.log("ShoppingCart.getItems():", ShoppingCart.getItems());
console.log("ShoppingCart.getTotal():", ShoppingCart.getTotal());
ShoppingCart.removeItem(1);
console.log("ShoppingCart.getItems():", ShoppingCart.getItems());
