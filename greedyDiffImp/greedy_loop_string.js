/* Greedy iterative method
 * using loops (not taught in book because considered syntactic sugar)
 * using loops require variables
 * uses fractions as objects
 * checks the user input for the fraction first
 * outputs a string for each loop*/
function greedy(num, den) {
    const frac = make_frac(num, den);
    if (checkValidFrac(frac)) {
        console.log(checkValidFrac(frac));
        return false;
    }
    //continue only if valid fraction
    //while loops
    let result = "While loop: ";
    result = result + greedyWhileLoop(num, den);
    console.log(result);
    //do while loops
    result = "Do while loop: ";
    result = result + greedyDoWhileLoop(num, den);
    console.log(result);
    //for loops do not make sense
    result = "For loop: ";
    result = result + greedyForLoop(num, den);
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
/* uses while loop to get string output for greedy method */
function greedyWhileLoop(num, den) {
    let result = "";
    let unit_fraction_den = 1;
    while (num > 0) {
        unit_fraction_den = ceiling(num, den);
        result = result + unit_fraction_den;
        num = num * unit_fraction_den - den;
        den = den * unit_fraction_den;
        if (num !== 0) {
            result = result + " ";
        }
    }
    return result;
}
/* uses do while loop to get string output for greedy method */
function greedyDoWhileLoop(num, den) {
    let result = "";
    let unit_fraction_den = 1;
    do {
        unit_fraction_den = ceiling(num, den);
        result = result + unit_fraction_den;
        num = num * unit_fraction_den - den;
        den = den * unit_fraction_den;
        if (num !== 0) {
            result = result + " ";
        }
    } while (num > 0);
    return result;
}
/* uses for loop to get string output for greedy method (but does not make sense) */
function greedyForLoop(num, den) {
    let result = "";
    let tempNum = num;
    let unit_fraction_den = 1;
    for (tempNum = num; tempNum >= 0; tempNum--) {
        unit_fraction_den = ceiling(num, den);
        result = result + unit_fraction_den;
        num = num * unit_fraction_den - den;
        den = den * unit_fraction_den;
        if (num !== 0) {
            result = result + " ";
        }
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

//prep slides with martin's content with these algos as examples
//when dont have algos as examples, just show dont have
//can put stuff thats not in the book that can be mentioned in conclusion