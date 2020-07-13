/* Greedy method using things from chapter 1
 * naming of elements with const
 * recursive calling functions (greedy, intDivision functions)
 * returns a set (unordered) */
function greedy(num, den) {
    if (num === 0) {
        return new Set();
    } else {
        //largest unit fraction = the integer value that is at least den / num
        const unit_fraction_den = ceiling(num, den);
        return greedy(num * unit_fraction_den - den, den * unit_fraction_den).add(unit_fraction_den);
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

console.log(greedy(4, 21));
console.log(greedy(3, 7));
