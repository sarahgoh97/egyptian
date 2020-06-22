//Greedy Recursive Method
//checking validity abstracted
//gcd abstracted
/* Greedy iterative method
 * function for checking validity abstracted
 * gcd as separate function as well */
function checkValidFrac(num, den) {
    if (num >= den) {
        return "This is not a proper fraction, please choose a numerator smaller than the denominator";
    }
    if (num < 0 || den < 0) {
        return "Please use positive integers for both the numerators and denominators";
    }
    return "";
}
/* getting greatest common denominator between a number and a number bigger than it
 * despite the recursive calls, it is considered iterative as the process doesn't grow/shrink when function expanded
 * in chapter 1, loops are also defined by functions */
function gcd(small, big) { //iterative
    if (small === 0) {
        return big;
    } else {
        const remainder = big % small;
        return gcd(remainder, small);
    }
}
function greedy(num, den) {
    if (checkValidFrac(num, den) !== "") {
        return checkValidFrac(num, den);
    }
    if (num === 0) {
        return "";
    } else {
        const unit_fraction_den = ceiling(num, den);
        const newNum = num * unit_fraction_den - den;
        const newDen = den * unit_fraction_den;
        const simplify = gcd(newNum, newDen);
        return unit_fraction_den + " " + greedy(newNum / simplify, newDen / simplify);
    }
}

/* similar format to functions found in chapter 1
 * getting the ceiling of big / small */
function ceiling(small, big) {
    return intDivisionRemainder(small, big) === 0
        ? intDivisionQuotient(small, big)
        : intDivisionQuotient(small, big) + 1;
}
/* finds the quotient of big / small, found when big is no longer bigger than small */
function intDivisionQuotient(small, big) {
    return small <= big
        ? 1 + intDivisionQuotient(small, big - small)
        : 0;
}
/* finds the remainder of big / small, found when big is no longer bigger than small */
function intDivisionRemainder(small, big) {
    return small <= big
        ? intDivisionRemainder(small, big - small)
        : big;
}

console.log(greedy(4,21));
console.log(greedy(3,7));
console.log(greedy(5,3));