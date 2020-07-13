/* Greedy iterative method
 * using loops (not taught in book because considered syntactic sugar)
 * using loops require variables
 * uses fractions as objects
 * checks the user input for the fraction first
 * returns a linked list */
function greedy(num, den) {
    const frac = make_frac(num, den);
    if (checkValidFrac(frac)) {
        console.log(checkValidFrac(frac));
        return false;
    }
    //continue only if valid fraction
    //while loops
    let result = createList("While loop", greedyWhileLoop(num, den));
    console.log(stringifyList(result));
    //do while loops
    result = createList("Do while loop", greedyDoWhileLoop(num, den));
    console.log(stringifyList(result));
    //for loops do not make sense
    result = createList("For loop", greedyForLoop(num, den));
    console.log(stringifyList(result));
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
    let result = createList(unit_fraction_den, null);

    while (num * unit_fraction_den - den > 0) {
        num = num * unit_fraction_den - den;
        den = den * unit_fraction_den;
        unit_fraction_den = ceiling(num, den);
        result = addToList(result, unit_fraction_den);
    }
    return result;
}

/* uses do while loop to get a list of pairs as output for greedy method */
function greedyDoWhileLoop(num, den) {
    let unit_fraction_den = 1;
    let result = createList(null, null);
    do {
        unit_fraction_den = ceiling(num, den);
        result = addToList(result, unit_fraction_den);
        num = num * unit_fraction_den - den;
        den = den * unit_fraction_den;
    } while (num > 0);
    return removeFirst(result);
}

/* uses for loop to get an array output for greedy method */
function greedyForLoop(num, den) {
    let unit_fraction_den = 1;
    let result = createList(null, null);
    let tempNum = num;
    for (tempNum = num; tempNum >= 0; tempNum--) {
        unit_fraction_den = ceiling(num, den);
        result = addToList(result, unit_fraction_den);
        num = num * unit_fraction_den - den;
        den = den * unit_fraction_den;
        tempNum = num; //because for loop will decrement it
    }
    return removeFirst(result);
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
    return {
        numerator: num,
        denominator: den
    };
}

function getDen(frac) {
    return frac.denominator;
}

function getNum(frac) {
    return frac.numerator;
}

/* pair is a primitive function in the environment given by the book
 * implemented like how the book says */
function pair(num, den) {
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

/* constructor for list */
function createList(first, second) {
    return pair(first, second);
}

/* function to add a new thing (toBeAdded) to linked list */
function addToList(p, toBeAdded) {
    return tail(p) === null
        ? pair(head(p), pair(toBeAdded, null))
        : pair(head(p), addToList(tail(p), toBeAdded));
}

/* to be able to see linked list */
function stringifyList(p) {
    if (p === null) {
        return null;
    }
    return "[" + head(p) + ", " + stringifyList(tail(p)) + "]";
}

/* removing first element of list and returning the changed list */
function removeFirst(p) {
    return tail(p);
}

greedy(4, 21);
greedy(3, 7);
greedy(3, 2);
