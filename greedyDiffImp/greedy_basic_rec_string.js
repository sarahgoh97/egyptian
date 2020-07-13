/* Greedy method using things from chapter 1
 * naming of elements with const
 * recursive calling functions (greedy, intDivision functions)
 * returns a string */
function greedy(num, den) {
    if (num === 0) {
        return "";
    } else {
        //largest unit fraction = the integer value that is at least den / num
        const unit_fraction_den = getBiggestUF(ceiling)(num, den);
        return unit_fraction_den + " " +  greedy(num * unit_fraction_den - den, den * unit_fraction_den);
        //return unit_fraction_den + greedy(num * unit_fraction_den - den, den * unit_fraction_den); without whitespace
    }
}
function getBiggestUF(func) {
    return func;
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
//for chapter 2, the int division can return pairs for quotient and remainder
//also for fractions, can use quotient and remainder pair as derived attributes
//also diff approaches (functional / procedural / object)
//slides for oop
console.log(greedy(4, 21));
console.log(greedy(3, 7));

/* assume natural numbers (look at cs1231)
 * 5 divide by 2
 * 5 = 2q + r, q is quotient, r is remainder
 * q = 2, r = 1 (r < 2)
 */
