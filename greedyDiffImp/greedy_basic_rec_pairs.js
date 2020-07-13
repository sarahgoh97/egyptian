/* Greedy method using things from chapter 1
 * naming of elements with const
 * recursive calling functions (greedy, intDivision functions)
 * returns a list of pairs, without abstracting out details of pairs */
function greedy(num, den) {
    if (num === 0) {
        return null;
    } else {
        //largest unit fraction = the integer value that is at least den / num
        const unit_fraction_den = ceiling(num, den);
        return pair(unit_fraction_den, greedy(num * unit_fraction_den - den, den * unit_fraction_den));
    }
}
/* similar format to functions found in chapter 1
 * getting the ceiling of big / small*/
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
/*For online IDE with source academy:
 * don't need pair part and console.log part, just the above
 * greedy(4,21) will work*/

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
/* to be able to see linked list */
function stringifyPair(p) {
    if (p === null) {
        return null;
    }
    return "[" + head(p) + ", " + stringifyPair(tail(p)) + "]";
}

console.log(stringifyPair(greedy(4, 21)));
console.log(stringifyPair(greedy(3, 7)));
