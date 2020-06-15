//Greedy Recursive Method
//checking validity abstracted
//gcd abstracted
function checkValidFrac(num, den) {
    if (num >= den) {
        console.log("This is not a proper fraction, please choose a numerator smaller than the denominator");
        return false;
    }
    if (num < 0 || den < 0) {
        console.log("Please use positive integers for both the numerators and denominators");
        return false;
    }
    return true;
}
//getting greatest common denominator between a number and a number bigger than it
//despite the recursive calls, it is considered iterative as the process doesn't grow/shrink when function expanded
//in chapter 1, loops are also defined by functions
function gcd(small, big) { //iterative
    if (small === 0) {
        return big;
    } else {
        const remainder = big % small;
        return gcd(remainder, small);
    }
}
function greedy(num, den) {
    if (!checkValidFrac(num, den)) {
        return false;
    }
    if (num === 0) {
        console.log(" ");
        return;
    } else {
        const unit_fraction_den = Math.ceil(den/num);
        console.log(unit_fraction_den);
        const newNum = num * unit_fraction_den - den;
        const newDen = den * unit_fraction_den;
        const simplify = gcd(newNum, newDen);
        greedy(newNum / simplify, newDen / simplify);
    }
}

greedy(4,21);
greedy(3,7);
greedy(5,3);