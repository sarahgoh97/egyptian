/* Greedy method with chapter 2 data abstraction
 * naming of elements with const
 * recursive calling functions (greedy, intDivision functions)
 * using fraction objects based on pairs
 * returns a list of pairs, without abstracting out details of pairs */
function greedy(frac) {
    if (getNum(frac) === 0) {
        return null;
    } else {
        //largest unit fraction = the integer value that is at least den / num
        const unit_fraction_den = ceiling(getNum(frac), getDen(frac));
        const next_fraction = simplify(
            make_frac(getNum(frac) * unit_fraction_den - getDen(frac), getDen(frac) * unit_fraction_den)
            );
        return pair(unit_fraction_den, greedy(next_fraction));
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
/* function that fractions use, can be used across all ef algos potentially for the fractions */
function make_frac(num, den) {
    return pair(num, den);
}
function getDen(frac) {
    return tail(frac);
}
function getNum(frac) {
    return head(frac);
}
function print(frac) {
    console.log("The fraction is " + getNum(frac) + " / " + getDen(frac));
}
function simplify(frac) { //can see difference for 4/21
    const greatestCommonDen = gcd(getNum(frac), getDen(frac));
    return make_frac(getNum(frac) / greatestCommonDen, getDen(frac) / greatestCommonDen);
}
function gcd(small, big) { //iterative
    if (small === 0) {
        return big;
    } else {
        const remainder = big % small;
        return gcd(remainder, small);
    }
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
/* to be able to see linked list */
function stringifyPair(p) {
    if (p === null) {
        return null;
    }
    return "[" + head(p) + ", " + stringifyPair(tail(p)) + "]";
}

const frac1 = make_frac(4, 21);
console.log(stringifyPair(greedy(frac1)));

console.log(stringifyPair(greedy(make_frac(3, 7))));
