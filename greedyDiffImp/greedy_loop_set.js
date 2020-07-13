/* Greedy iterative method
 * using loops (not taught in book because considered syntactic sugar)
 * using loops require variables
 * uses fractions as objects
 * checks the user input for the fraction first
 * returns a set */
function greedy(num, den) {
    const frac  = make_frac(num, den);
    if (checkValidFrac(frac)) {
        console.log(checkValidFrac(frac));
        return false;
    }
    //continue only if valid fraction
    //while loops
    let result = new Set();
    result.add("While loop");
    result = result.add(greedyWhileLoop(num, den));
    console.log(result);
    //do while loops
    result = new Set();
    result.add("Do while loop");
    result = result.add(greedyDoWhileLoop(num, den));
    console.log(result);
    //for loops do not make sense
    result = new Set();
    result.add("For loop");
    result = result.add(greedyForLoop(num, den));
    console.log(result);
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
/* uses while loop to get a set output for greedy method */
function greedyWhileLoop(num, den) {
    let result = new Set();
    let unit_fraction_den = 1;
    while (num > 0) {
        unit_fraction_den = ceiling(num, den);
        result.add(unit_fraction_den);
        num = num * unit_fraction_den - den;
        den = den * unit_fraction_den;
    }
    return result;
}
/* uses do while loop to get a set output for greedy method */
function greedyDoWhileLoop(num, den) {
    let result = new Set();
    let unit_fraction_den = 1;
    do {
        unit_fraction_den = ceiling(num, den);
        result.add(unit_fraction_den);
        num = num * unit_fraction_den - den;
        den = den * unit_fraction_den;
    } while (num > 0);
    return result;
}
/* uses for loop to get a set output for greedy method */
function greedyForLoop(num, den) {
    let result = new Set();
    let tempNum = num;
    let unit_fraction_den = 1;
    for (tempNum = num; tempNum >= 0; tempNum--) {
        unit_fraction_den = ceiling(num, den);
        result.add(unit_fraction_den);
        num = num * unit_fraction_den - den;
        den = den * unit_fraction_den;
        tempNum = num; //because for loop will decrement it
    }
    return result;
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


greedy(4, 21);
greedy(3, 7);
greedy(3, 2);