/* Greedy Iterative Method
 * fractions abstracted instead of 2 integers
 * try catch for validity of fractions (for IDE diff from textbook) */

function checkValidFrac(frac) {
    const num = getNum(frac);
    const den = getDen(frac);

    if (num >= den) {
        throw "This is not a proper fraction, please choose a getNum smaller than the getDen";
    } else if (num < 0 || den < 0) {
        throw "Please use positive integers for both the numerators and denominators";
    }
}
function greedy(num, den) {
    function iter(frac, ans) {
        num = getNum(frac);
        den = getDen(frac);
        if (num === 0) {
            return ans;
        } else {
            const unit_fraction = make_fraction(1,ceiling(num, den));
            ans = ans + getDen(unit_fraction) + " ";
            return iter(make_fraction(num * getDen(unit_fraction) - den, den * getDen(unit_fraction)), ans);
        }
    }

    const frac = make_fraction(num, den);
    try {
        checkValidFrac(frac);
    } catch (err) {
        return err;
    }
    return iter(frac, "");
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

function make_fraction(num, den) {
    return pair(num, den);
}
function getNum(fraction) {
    return head(fraction);
}
function getDen(fraction) {
    return tail(fraction);
}
/* pair is a primitive function in the environment given by the book
 * implemented like how the book says */
function pair (num, den) {
    return m => m === 0
        ? num : den
}
function head(p) { //first element of pair
    return p(0);
}
function tail(p) { //second element of pair
    return p(1);
}

console.log(greedy(4, 21));
console.log(greedy(3, 7));
console.log(greedy(5, 3));