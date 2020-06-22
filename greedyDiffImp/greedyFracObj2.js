/* Greedy iterative method
 * checking validity abstracted
 * fractions abstracted as an object not 2 separate ints
   * have functions that fractions can use (eg. simplify)
   * avoid using dot operator
 * returns a string */
function checkValidFrac(frac) {
    if (getNum(frac) >= getDen(frac)) {
        return "This is not a proper fraction, please choose a numerator smaller than the denominator";
    }
    if (getNum(frac) < 0 || getDen(frac) < 0) {
        return "Please use positive integers for both the numerators and denominators";
    }
    return "";
}
function greedy(num, den) {
    function iter(frac, ans) {
        //print(frac); //for debugging
        if (getNum(frac) === 0) {
            return ans;
        } else {
            const unit_fraction_den = ceiling(getNum(frac), getDen(frac));
            const newFrac = make_frac(getNum(frac) * unit_fraction_den - getDen(frac),
                getDen(frac) * unit_fraction_den);
            return iter(simplify(newFrac), ans + unit_fraction_den + " ");
        }
    }
    const frac = make_frac(num, den);
    if (checkValidFrac(frac) !== "") {
        return checkValidFrac(frac);
    }
    return iter(frac, "");
}
//function that fractions use, can be used across all ef algos potentially for the fractions
function make_frac(num, den) {
    return {numerator: num,
            denominator: den};
}
function getDen(frac) {
    return frac.denominator;
}
function getNum(frac) {
    return frac.numerator;
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

console.log(greedy(4,21));
console.log(greedy(3,7));
console.log(greedy(5,3));