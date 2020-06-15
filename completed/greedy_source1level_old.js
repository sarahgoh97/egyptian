//from: https://github.com/holzschu/Carnets/blob/master/Library/lib/python3.7/site-packages/sympy/ntheory/egyptian_fraction.py and 
//from: https://www.geeksforgeeks.org/greedy-algorithm-egyptian-fraction/

function greedyEasy (num, den) { //easier version of greedy
    if (num === 0) {
        return num;
    }
    else {
        const biggest = math_ceil(den/num);
        const newNum = num * biggest - den;
        const newDen = den * biggest;
        display(biggest);
        greedyEasy(newNum, newDen);
        return 0;
    }
}
display("6/14 unit fractions denominators:");
greedyEasy(6,14);

display("2/3 unit fractions denominators:");
greedyEasy(2,3);

display("13/14 unit fractions denominators:");
greedyEasy(13,14);

display("23/254 unit fractions denominators:");
greedyEasy(23,254);

//abstraction of actual numbers by naming them to know whats happening
//naming of variables - having constants to use
//usage of combination of variables
//recursive just like how JS reads stuff in fns will keep calling - like evaluating of ops
//substitution model if dont use constants to rep the abstracted names stuff
//defines op with itself with base case

function Fib(num,den) {
    
    function greedyFib (num, den) { //actual Fibonacci algorithm
        if (num === 1) {
            display(den);
            return 1;
        } else {
            display(math_floor(den/num + 1));
            const a = (0 - den) % num + num;
            const b = den * (math_floor(den/num) + 1);
            const c = gcd(a,b);
            //display(c);
            const newNum = c > 1 ? math_floor(a/c) : a;
            const newDen = c > 1 ? math_floor(b/c) : b;
            //const nextUF = math_floor(den/num + 1) + 
            greedyFib(newNum, newDen);
        }
        return 1;
    }
    
    function gcd (small, big) {
        if (small === 0) {
            return big;
        } else {
            const remainder = big % small;
            const greatest = gcd(remainder, small);
            return greatest;
        }
    }
    
    
    greedyFib(num,den);
    
    return 0;
}


display("6/14 unit fractions denominators:");
Fib(6,14);

display("2/3 unit fractions denominators:");
Fib(2,3);

display("13/14 unit fractions denominators:");
Fib(13,14);

display("23/254 unit fractions denominators:");
Fib(23,254);
