/* Greedy method with chapter 2 data abstraction
 * naming of elements with const
 * iterative calling functions (greedy and intDivision functions)
 * using fraction objects based on pairs
 * abstracted how ans is updated into its own function that changes when different output type
 * returns an array */
function greedy(num, den) {
    function iter(frac, ans) {
        if (getNum(frac) === 0) {
            return ans;
        } else {
            //largest unit fraction = the integer value that is at least den / num
            const unit_fraction_den = ceiling(getNum(frac), getDen(frac));
            update(ans, unit_fraction_den);
            const newFrac = simplify(
                make_frac(getNum(frac) * unit_fraction_den - getDen(frac), getDen(frac) * unit_fraction_den)
                );
            return iter(newFrac, ans);
        }
    }
    function update(ans, unit_fraction_den) {
        return ans.push(unit_fraction_den);
    }
    return iter(make_frac(num, den), []);
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
/* new function to add things to linked list */
function changeTail(p, newTail) {
    return tail(p) === null
        ? pair(head(p), newTail)
        : pair(head(p), changeTail(tail(p), newTail));
}
/* to be able to see linked list */
function stringifyPair(p) {
    if (p === null) {
        return null;
    }
    return "[" + head(p) + ", " + stringifyPair(tail(p)) + "]";
}

console.log(greedy(4, 21));
console.log(greedy(3, 7));
