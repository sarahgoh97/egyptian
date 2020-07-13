function intDivision(small, big) {
    return big - small >= small
        ? 1 + intDivision(small, big - small)
        : 1;
}
function intDivisionQuotient(small, big) {
    return intDivision(small, big, 1);
}
function intDivisionRemainder(small, big) {
    return big - small * intDivision(small, big, 1);
}
console.log(intDivisionQuotient(3, 14));
console.log(intDivisionRemainder(3, 14));
/*function intDivisionQuotientFast(small, big) {
    function iter(small, big, multiplier, noOfDouble) {
        console.log(small + "|" + big + "|" + multiplier + "|" + noOfDouble);
        return small * multiplier > big //exceeded
            ? noOfDouble - iterOpp(small, big, multiplier - prevMul(small, noOfDouble), noOfDouble - 2)
            : big - small * multiplier > small //not there
                ? 2 * iter(small, big, multiplier * 2, noOfDouble + 1)
                : noOfDouble;
    }
    function iterOpp(small, big, multiplier, noOfDouble) {
        console.log("CHANGED: " + small + "|" + big + "|" + multiplier + "|" + noOfDouble);
        return small * multiplier > big //exceeded
            ? noOfDouble + iterOpp(small, big, multiplier - prevMul(small, noOfDouble), noOfDouble - 1)
            : big - small * multiplier > small //not there
                ? iterOpp(small, big, multiplier + prevMul(small, noOfDouble), noOfDouble - 1)
                : noOfDouble ;
    }
    return iter(small, big, 1, 0);
}
function prevMul(small, noOfDouble) {
    function iter(small, noOfDouble, counter) {
        return counter === noOfDouble
            ? small
            : iter(small * 2, noOfDouble, counter + 1);
    }
    console.log("----------------------------------------------------------------------");
    return iter(small, noOfDouble, 1);
}
console.log(intDivisionQuotientFast(4, 43));






function intDivisionQuotient(small, big) {
    function iter(small, big, noOfDoubles, multiplier) {
        return 0;
    }
    return iter(small, big, 0, small);
}
*/


