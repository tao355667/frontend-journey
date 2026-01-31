// JavaScript Array Basics

// Creating arrays
let fruits = ["apple", "banana", "orange"];
let numbers = new Array(1, 2, 3, 4, 5);
let mixed = ["hello", 42, true, null];

// Accessing elements
console.log(fruits[0]); // "apple"
console.log(fruits[1]); // "banana"
console.log(fruits[fruits.length - 1]); // "orange"

// Modifying arrays
fruits[0] = "grape";
console.log(fruits); // ["grape", "banana", "orange"]

// Array properties and methods
console.log(fruits.length); // 3

// Adding elements
fruits.push("mango"); // Add to end
console.log(fruits); // ["grape", "banana", "orange", "mango"]

fruits.unshift("kiwi"); // Add to beginning
console.log(fruits); // ["kiwi", "grape", "banana", "orange", "mango"]

// Removing elements
let lastFruit = fruits.pop(); // Remove from end
console.log(lastFruit); // "mango"
console.log(fruits); // ["kiwi", "grape", "banana", "orange"]

let firstFruit = fruits.shift(); // Remove from beginning
console.log(firstFruit); // "kiwi"
console.log(fruits); // ["grape", "banana", "orange"]

// Finding elements
console.log(fruits.indexOf("banana")); // 1
console.log(fruits.includes("orange")); // true

// Slicing arrays (doesn't modify original)
let citrus = fruits.slice(1, 3);
console.log(citrus); // ["banana", "orange"]
console.log(fruits); // ["grape", "banana", "orange"]

// Splicing arrays (modifies original)
fruits.splice(1, 1, "strawberry", "blueberry");
console.log(fruits); // ["grape", "strawberry", "blueberry", "orange"]

// Iterating over arrays
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

fruits.forEach(function(fruit, index) {
    console.log(`${index}: ${fruit}`);
});
