//Sum all numbers till the given one
function sumToUsingLoop(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

function sumToUsingRecursion(n) {
    if (n === 1) return 1;
    return n + sumToUsingRecursion(n - 1);
}


//Calculate factorial
function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}


//Fibonacci 
function fib(n) {
    let a = 1, b = 1;
    for (let i = 3; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}


//Output a single-linked lis
function printListUsingLoop(list) {
    let current = list;
    while (current) {
        console.log(current.value);
        current = current.next;
    }
}

//recursion
function printListUsingRecursion(list) {
    if (!list) return;
    console.log(list.value);
    printListUsingRecursion(list.next);
}


// Set and decrease for counter
function makeCounter() {
    let count = 0;

    function counter() {
        return count++;
    }

    counter.set = function(value) {
        count = value;
    };

    counter.decrease = function() {
        count--;
    };

    return counter;
}


// Sum with an arbitrary amount of brackets
function sum(a) {
    let currentSum = a;

    function innerSum(b) {
        currentSum += b;
        return innerSum;
    }

    innerSum.toString = function() {
        return currentSum;
    };

    return innerSum;
}


//Output every second
//Using setInterval
function printNumbersWithInterval(from, to) {
    let current = from;
    let timerId = setInterval(() => {
        console.log(current);
        if (current === to) {
            clearInterval(timerId);
        }
        current++;
    }, 1000);
}

//Using nested setTimeout
function printNumbersWithTimeout(from, to) {
    let current = from;

    function go() {
        console.log(current);
        if (current < to) {
            setTimeout(go, 1000);
        }
        current++;
    }

    go();
}


// Spy decorator
function spy(func) {
    function wrapper(...args) {
        wrapper.calls.push(args);
        return func.apply(this, args);
    }

    wrapper.calls = [];
    return wrapper;
}

// Example usage
function work(a, b) {
    console.log(a + b);
}

for (let args of work.calls) {
    console.log('call:' + args.join()); // "call:1,2", "call:4,5"
}

//Delaying decorator
function delay(f, ms) {
    return function(...args) {
        setTimeout(() => f.apply(this, args), ms);
    };
}

// Debounce decorator
function debounce(f, ms) {
    let timeout;

    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => f.apply(this, args), ms);
    };
}


//Throttle decorator
function throttle(f, ms) {
    let isThrottled = false;
    let savedArgs, savedThis;

    function wrapper(...args) {
        if (isThrottled) {
            savedArgs = args;
            savedThis = this;
            return;
        }

        f.apply(this, args);
        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}

