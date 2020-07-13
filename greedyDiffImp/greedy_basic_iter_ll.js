/* Greedy method using things from chapter 1
 * naming of elements with const
 * iterative calling functions (greedy, intDivision functions)
 * returns a linked list based on pairs */
function greedy(num, den) {
    function iter(num, den, ans) {
        if (num === 0) {
            return ans;
        } else {
            //largest unit fraction = the integer value that is at least den / num
            const unit_fraction_den = ceiling(num, den);
            if (head(ans) === null) {
                ans = createList(unit_fraction_den, null);
            } else {
                ans = addToList(ans, unit_fraction_den);
            }
            return iter(num * unit_fraction_den - den, den * unit_fraction_den, ans);
        }
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
/*to be able to see linked list */
function stringifyList(p) {
    if (p === null) {
        return null;
    }
    return "[" + head(p) + ", " + stringifyList(tail(p)) + "]";
}

console.log(stringifyList(greedy(4, 21)));
console.log(stringifyList(greedy(3, 7)));
