/* Greedy iterative method
 * using loops (not taught in book because considered syntactic sugar)
 * using loops require variables
 * uses fractions as objects
 * checks the user input for the fraction first
 * returns a list of pairs, without abstracting out details of pairs */
function greedy(num, den) {
    const frac  = make_frac(num, den);
    if (checkValidFrac(frac)) {
        console.log(checkValidFrac(frac));
        return false;
    }
    //continue only if valid fraction
    //while loops
    let result = pair("While loop", greedyWhileLoop(num, den));
    console.log(stringifyPair(result));
    //do while loops
    result = pair("Do while loop", greedyDoWhileLoop(num, den));
    console.log(stringifyPair(result));
    //for loops do not make sense
    result = pair("For loop", greedyForLoop(num, den));
    console.log(stringifyPair(result));
    return result;
}
/* checks validity of fraction given by user */
function checkValidFrac(frac) {
    const num = getNum(frac);
    const den = getDen(frac);

    if (num >= den) {
        return "This is not a proper fraction, please choose a numerator smaller than the denominator";
    } else if (num < 0 || den < 0) {
        return "Please use positive integers for both the numerators and denominators";
    } else {
        return false;
    }
}
/* uses while loop to get a list of pairs as output for greedy method */
function greedyWhileLoop(num, den) {
    let unit_fraction_den = ceiling(num, den);
    let result = pair(unit_fraction_den, null);

    while (num * unit_fraction_den - den > 0) {
        num = num * unit_fraction_den - den;
        den = den * unit_fraction_den;
        unit_fraction_den = ceiling(num, den);
        result = changeTail(result, pair(unit_fraction_den, null));
    }
    return result;
}
/* uses do while loop to get a list of pairs as output for greedy method */
function greedyDoWhileLoop(num, den) {
    let unit_fraction_den = 1;
    let result = pair(null, null);
    do {
        unit_fraction_den = ceiling(num, den);
        result = changeTail(result, pair(unit_fraction_den, null));
        num = num * unit_fraction_den - den;
        den = den * unit_fraction_den;
    } while (num > 0);
    return tail(result);
}
/* uses for loop to get an array output for greedy method */
function greedyForLoop(num, den) {
    let unit_fraction_den = 1;
    let result = pair(null, null);
    let tempNum = num;
    for (tempNum = num; tempNum >= 0; tempNum--) {
        unit_fraction_den = ceiling(num, den);
        result = changeTail(result, pair(unit_fraction_den, null));
        num = num * unit_fraction_den - den;
        den = den * unit_fraction_den;
        tempNum = num; //because for loop will decrement it
    }
    return tail(result);
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
    function iter(small, big, multiplier) {
        return small * multiplier <= big
            ? iter(small, big, multiplier + 1)
            : multiplier - 1;
    }
    return iter(small, big, 1);
}
/* finds the remainder of big / small, found when big is no longer bigger than small */
function intDivisionRemainder(small, big) {
    function iter(small, big, multiplier) {
        return small * multiplier <= big
            ? iter(small, big, multiplier + 1)
            : big - small * (multiplier - 1);
    }
    return iter(small, big, 1);
}

/* function that fractions use, can be used across all ef algos potentially for the fractions */
function make_frac(num, den) {
    return {numerator: num,
        denominator: den};
}
function getDen(frac) {
    return frac.denominator;
}
function getNum(frac) {
    return frac.numerator;
}

/* pair is a primitive function in the environment given by the book
 * implemented like how the book says */
function pair (num, den) {
    return m => m === 0
        ? num
        : m === 1
            ? den
            : Error("Argument not 0 or 1 in pair", m);
}
function head(p) { //first element of pair
    return p(0);
}
function tail(p) { //second element of pair
    return p(1);
}
/* new function to add things to linked list */
function changeTail(p, newTail) {
    return tail(p) === null
        ? pair(head(p), newTail)
        : pair(head(p), changeTail(tail(p), newTail));
}
/* to be able to see linked list */
function stringifyPair(p) {
    if (p === null) {
        return null;
    }
    return "[" + head(p) + ", " + stringifyPair(tail(p)) + "]";
}

greedy(4, 21);
greedy(3, 7);
greedy(3, 2);