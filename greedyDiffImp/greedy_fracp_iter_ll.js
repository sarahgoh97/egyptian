/* Greedy method with chapter 2 data abstraction
 * naming of elements with const
 * iterative calling functions (greedy and intDivision functions)
 * using fraction objects based on pairs
 * abstracted how ans is updated into its own function that changes when different output type
 * returns a linked list */
function greedy(frac) {
    function iter(frac, ans) {
        if (getNum(frac) === 0) {
            return ans;
        } else {
            //largest unit fraction = the integer value that is at least den / num
            const unit_fraction_den = ceiling(getNum(frac), getDen(frac));
            ans = update(ans, unit_fraction_den);
            const newFrac = simplify(
                make_frac(getNum(frac) * unit_fraction_den - getDen(frac), getDen(frac) * unit_fraction_den)
                );
            return iter(newFrac, ans);
        }
    }
    function update(ans, unit_fraction_den) {
        return head(ans) === null
            ? createList(unit_fraction_den, null)
            : addToList(ans, unit_fraction_den);
    }
    return iter(frac, pair(null, null));
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

const frac1 = make_frac(4, 21);
console.log(stringifyList(greedy(frac1)));

console.log(stringifyList(greedy(make_frac(3, 7))));
