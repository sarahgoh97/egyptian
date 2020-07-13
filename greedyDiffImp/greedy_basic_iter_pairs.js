/* Greedy method using things from chapter 1
 * naming of elements with const
 * iterative calling functions (greedy, intDivision functions)
 * abstracted how ans is updated into its own function that changes when different output type
 * returns a list of pairs, without abstracting out details of pairs */
function greedy(num, den) {
    function iter(num, den, ans) {
        if (num === 0) {
            return ans;
        } else {
            //largest unit fraction = the integer value that is at least den / num
            const unit_fraction_den = ceiling(num, den);
            ans = update(ans, unit_fraction_den);
            return iter(num * unit_fraction_den - den, den * unit_fraction_den, ans);
        }
    }
    function update(ans, unit_fraction_den) {
        return head(ans) === null
            ? pair(unit_fraction_den, null)
            : changeTail(ans, pair(unit_fraction_den, null));
    }
    return iter(num, den, pair(null, null));
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
/* For online IDE with source academy:
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
/* new function to add things to linked list */
function changeTail(p, newTail) {
    return tail(p) === null
        ? pair(head(p), newTail)
        : pair(head(p), changeTail(tail(p), newTail));
}
/*to be able to see linked list */
function stringifyPair(p) {
    if (p === null) {
        return null;
    }
    return "[" + head(p) + ", " + stringifyPair(tail(p)) + "]";
}

console.log(stringifyPair(greedy(4, 21)));
console.log(stringifyPair(greedy(3, 7)));
