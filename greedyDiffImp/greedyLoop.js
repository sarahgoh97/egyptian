/* Greedy iterative method
 * using loops (not taught in book because considered syntactic sugar)
 * using loops require variables, the others can just use constants */
function greedy(num, den) {
    if (!checkValid(num, den)) { //change to error message?
        return;
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
}

//checks if fraction given is valid
function checkValid(num, den) {
    if (num >= den) {
        return "This is not a proper fraction, please choose a numerator smaller than the denominator";
    }
    if (num < 0 || den < 0) {
        return "Please use positive integers for both the numerators and denominators";
    }
    return true;
}
//this is returning smth diff from greedyRec - string
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
/* doesn't make sense because not fixed iterations but it can work */
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


greedy(4,21);
greedy(3,7);