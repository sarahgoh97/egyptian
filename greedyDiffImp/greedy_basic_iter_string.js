/* Greedy method using things from chapter 1
 * naming of elements with const
 * iterative calling functions (greedy and intDivision functions)
 * returns a string */
function greedy(num, den) {
    function iter(num, den, ans) {
        if (num === 0) {
            return ans;
        } else {
            //largest unit fraction = the integer value that is at least den / num
            const unit_fraction_den = ceiling(num, den);
            //ans = ans + unit_fraction_den; //without whitespace
            ans = ans + unit_fraction_den + " ";
            return iter(num * unit_fraction_den - den, den * unit_fraction_den, ans);
        }
    }
    return iter(num, den, "");
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

console.log(greedy(4, 21));
console.log(greedy(3, 7));
