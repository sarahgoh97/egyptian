//Greedy Recursive Method
//checking validity abstracted
//ceiling function separate from greedy

/* Greedy recursive method
 * checking validity abstracted
 * ceiling function separated from greedy
 * returns a string */
function checkValidFrac(num, den) {
    if (num >= den) {
        return "This is not a proper fraction, please choose a numerator smaller than the denominator";
    }
    if (num < 0 || den < 0) {
        return "Please use positive integers for both the numerators and denominators";
    }
    return "";
}
function greedy(num, den) {
    if (checkValidFrac(num, den) !== "") {
        return checkValidFrac(num, den);
    }
    if (num === 0) {
        return "";
    } else {
        //largest unit fraction = the integer value that is at least den / num
        const unit_fraction_den = ceiling(num, den);
        return unit_fraction_den + " " +  greedy(num * unit_fraction_den - den, den * unit_fraction_den);
        //return unit_fraction_den + greedy(num * unit_fraction_den - den, den * unit_fraction_den); //without whitespace
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
console.log(greedy(5, 3));