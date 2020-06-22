/* Greedy Recursive Method
 * checking validity abstracted
 * fractions abstracted instead of 2 integers (using another way of defining objects in js)
 * fractions using dot operator
 * returns a string */
function checkValidFrac(frac) {
    if (frac.numerator >= frac.denominator) {
        return "This is not a proper fraction, please choose a numerator smaller than the denominator";
    }
    if (frac.numerator < 0 || frac.denominator < 0) {
        return "Please use positive integers for both the numerators and denominators";
    }
    return "";
}
function greedy(num, den) {
    function iter(frac, ans) {
        // print(frac); //abstracted debugging
        if (frac.numerator === 0) {
            return ans;
        } else {
            const unit_fraction_den = ceiling(frac.numerator, frac.denominator);
            const newFrac = {
                numerator: frac.numerator * unit_fraction_den - frac.denominator,
                denominator: frac.denominator * unit_fraction_den
            };
            return iter(newFrac, ans + unit_fraction_den + " ");
        }
    }

    const frac = { //fraction as object variable
        numerator: num,
        denominator: den
    };
    if (checkValidFrac(frac) !== "") {
        return checkValidFrac(frac);
    }
    return iter(frac, "");
}
function print(frac) {
    console.log("The fraction is " + frac.numerator + " / " + frac.denominator);
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
console.log(greedy(5, 3));